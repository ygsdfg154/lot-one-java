package com.lotone.iot.worker.consumer;

import com.alibaba.fastjson.JSON;
import com.lotone.iot.worker.service.ObjectStorageService;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class MultimediaConsumer {

    @Autowired
    private ObjectStorageService objectStorageService;

    @Autowired
    private MongoTemplate mongoTemplate;

    private static final DateTimeFormatter PATH_FORMATTER = DateTimeFormatter.ofPattern("yyyy/MM/dd");

    /**
     * 消费多媒体上传数据，自动保存到对象存储
     */
    @KafkaListener(topics = "device-multimedia", groupId = "iot-worker-multimedia-group", concurrency = "2")
    public void consumeMultimedia(ConsumerRecord<String, String> record, Acknowledgment ack) {
        try {
            Map<String, Object> multimedia = JSON.parseObject(record.value(), Map.class);
            String deviceId = (String) multimedia.get("deviceId");
            Integer mediaType = multimedia.get("mediaType") != null ?
                    ((Number) multimedia.get("mediaType")).intValue() : 0;
            Integer mediaFormat = multimedia.get("mediaFormat") != null ?
                    ((Number) multimedia.get("mediaFormat")).intValue() : 0;
            String mediaDataBase64 = (String) multimedia.get("mediaData");

            if (mediaDataBase64 == null || mediaDataBase64.isEmpty()) {
                log.warn("Multimedia data is empty: deviceId={}", deviceId);
                ack.acknowledge();
                return;
            }

            // Base64 解码
            byte[] mediaData = Base64.getDecoder().decode(mediaDataBase64);

            // 生成存储路径：multimedia/{deviceId}/{yyyy/MM/dd}/{mediaId}.{ext}
            String mediaId = multimedia.get("mediaId") != null ?
                    String.valueOf(multimedia.get("mediaId")) :
                    String.valueOf(System.currentTimeMillis());
            String extension = getExtension(mediaType, mediaFormat);
            String datePath = LocalDateTime.now().format(PATH_FORMATTER);
            String objectName = deviceId + "/" + datePath + "/" + mediaId + extension;

            // 保存到对象存储
            String bucket = "multimedia";
            String contentType = getContentType(mediaType, extension);
            String fileUrl = objectStorageService.upload(bucket, objectName,
                    new ByteArrayInputStream(mediaData), contentType, mediaData.length);

            // 记录到 MongoDB
            Map<String, Object> recordDoc = new HashMap<>();
            recordDoc.put("deviceId", deviceId);
            recordDoc.put("mediaId", mediaId);
            recordDoc.put("mediaType", mediaType);
            recordDoc.put("mediaTypeName", getMediaTypeName(mediaType));
            recordDoc.put("mediaFormat", mediaFormat);
            recordDoc.put("fileUrl", fileUrl);
            recordDoc.put("fileSize", mediaData.length);
            recordDoc.put("fileSizeFormatted", formatFileSize(mediaData.length));
            recordDoc.put("eventCode", multimedia.get("eventCode"));
            recordDoc.put("channelId", multimedia.get("channelId"));
            recordDoc.put("location", multimedia.get("location"));
            recordDoc.put("uploadTime", LocalDateTime.now().toString());
            recordDoc.put("createdAt", System.currentTimeMillis());

            mongoTemplate.save(recordDoc, "device_multimedia");

            log.info("Multimedia saved: deviceId={}, mediaId={}, type={}, size={}, url={}",
                    deviceId, mediaId, getMediaTypeName(mediaType), formatFileSize(mediaData.length), fileUrl);

            ack.acknowledge();
        } catch (Exception e) {
            log.error("Consume multimedia failed: key={}", record.key(), e);
            ack.acknowledge();
        }
    }

    private String getExtension(int mediaType, int mediaFormat) {
        if (mediaType == 0) { // 图像
            return mediaFormat == 0 ? ".jpg" : ".tif";
        } else if (mediaType == 1) { // 音频
            return mediaFormat == 2 ? ".mp3" : ".wav";
        } else if (mediaType == 2) { // 视频
            return ".wmv";
        }
        return ".bin";
    }

    private String getContentType(int mediaType, String extension) {
        if (extension.equals(".jpg")) return "image/jpeg";
        if (extension.equals(".tif")) return "image/tiff";
        if (extension.equals(".mp3")) return "audio/mpeg";
        if (extension.equals(".wav")) return "audio/wav";
        if (extension.equals(".wmv")) return "video/x-ms-wmv";
        return "application/octet-stream";
    }

    private String getMediaTypeName(int mediaType) {
        switch (mediaType) {
            case 0: return "图像";
            case 1: return "音频";
            case 2: return "视频";
            default: return "未知";
        }
    }

    private String formatFileSize(long bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return String.format("%.1f KB", bytes / 1024.0);
        if (bytes < 1024 * 1024 * 1024) return String.format("%.1f MB", bytes / (1024.0 * 1024));
        return String.format("%.1f GB", bytes / (1024.0 * 1024 * 1024));
    }
}
