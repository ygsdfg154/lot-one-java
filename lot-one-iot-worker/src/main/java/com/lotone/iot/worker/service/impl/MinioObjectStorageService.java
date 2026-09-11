package com.lotone.iot.worker.service.impl;

import com.lotone.iot.worker.service.ObjectStorageService;
import io.minio.*;
import io.minio.http.Method;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.io.InputStream;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@ConditionalOnProperty(name = "iot.worker.storage.type", havingValue = "minio")
public class MinioObjectStorageService implements ObjectStorageService {

    @Value("${iot.worker.storage.minio.endpoint:http://localhost:9000}")
    private String endpoint;

    @Value("${iot.worker.storage.minio.access-key:minioadmin}")
    private String accessKey;

    @Value("${iot.worker.storage.minio.secret-key:minioadmin}")
    private String secretKey;

    @Value("${iot.worker.storage.minio.bucket:lot-one}")
    private String defaultBucket;

    private MinioClient minioClient;

    @PostConstruct
    public void init() {
        try {
            minioClient = MinioClient.builder()
                    .endpoint(endpoint)
                    .credentials(accessKey, secretKey)
                    .build();
            log.info("MinIO client initialized: endpoint={}", endpoint);
        } catch (Exception e) {
            log.error("Initialize MinIO client failed", e);
        }
    }

    @Override
    public String upload(String bucket, String objectName, InputStream inputStream, String contentType, long fileSize) {
        try {
            String targetBucket = bucket != null ? bucket : defaultBucket;
            // 确保 bucket 存在
            ensureBucketExists(targetBucket);

            minioClient.putObject(PutObjectArgs.builder()
                    .bucket(targetBucket)
                    .object(objectName)
                    .stream(inputStream, fileSize, -1)
                    .contentType(contentType)
                    .build());

            String url = endpoint + "/" + targetBucket + "/" + objectName;
            log.info("File uploaded to MinIO: bucket={}, object={}, size={}", targetBucket, objectName, fileSize);
            return url;
        } catch (Exception e) {
            log.error("Upload file to MinIO failed: bucket={}, object={}", bucket, objectName, e);
            throw new RuntimeException("Upload failed: " + e.getMessage(), e);
        }
    }

    @Override
    public InputStream download(String bucket, String objectName) {
        try {
            String targetBucket = bucket != null ? bucket : defaultBucket;
            return minioClient.getObject(GetObjectArgs.builder()
                    .bucket(targetBucket)
                    .object(objectName)
                    .build());
        } catch (Exception e) {
            log.error("Download file from MinIO failed: bucket={}, object={}", bucket, objectName, e);
            throw new RuntimeException("Download failed: " + e.getMessage(), e);
        }
    }

    @Override
    public void delete(String bucket, String objectName) {
        try {
            String targetBucket = bucket != null ? bucket : defaultBucket;
            minioClient.removeObject(RemoveObjectArgs.builder()
                    .bucket(targetBucket)
                    .object(objectName)
                    .build());
            log.info("File deleted from MinIO: bucket={}, object={}", targetBucket, objectName);
        } catch (Exception e) {
            log.warn("Delete file from MinIO failed: bucket={}, object={}", bucket, objectName, e);
        }
    }

    @Override
    public String getPresignedUrl(String bucket, String objectName, int expirySeconds) {
        try {
            String targetBucket = bucket != null ? bucket : defaultBucket;
            return minioClient.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
                    .method(Method.GET)
                    .bucket(targetBucket)
                    .object(objectName)
                    .expiry(expirySeconds, TimeUnit.SECONDS)
                    .build());
        } catch (Exception e) {
            log.error("Get presigned URL failed: bucket={}, object={}", bucket, objectName, e);
            return endpoint + "/" + (bucket != null ? bucket : defaultBucket) + "/" + objectName;
        }
    }

    @Override
    public boolean exists(String bucket, String objectName) {
        try {
            String targetBucket = bucket != null ? bucket : defaultBucket;
            minioClient.statObject(StatObjectArgs.builder()
                    .bucket(targetBucket)
                    .object(objectName)
                    .build());
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private void ensureBucketExists(String bucket) {
        try {
            boolean found = minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucket).build());
            if (!found) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucket).build());
                log.info("Bucket created: {}", bucket);
            }
        } catch (Exception e) {
            log.warn("Ensure bucket exists failed: {}", bucket, e);
        }
    }
}
