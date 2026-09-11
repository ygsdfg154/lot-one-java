package com.lotone.iot.worker.service.impl;

import com.lotone.iot.worker.service.ObjectStorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
@Service
@ConditionalOnProperty(name = "iot.worker.storage.type", havingValue = "local", matchIfMissing = true)
public class LocalObjectStorageService implements ObjectStorageService {

    @Value("${iot.worker.storage.local.path:./data/storage}")
    private String storagePath;

    @Override
    public String upload(String bucket, String objectName, InputStream inputStream, String contentType, long fileSize) {
        try {
            Path dir = Paths.get(storagePath, bucket);
            if (!Files.exists(dir)) {
                Files.createDirectories(dir);
            }
            Path file = dir.resolve(objectName);
            if (file.getParent() != null && !Files.exists(file.getParent())) {
                Files.createDirectories(file.getParent());
            }
            try (OutputStream out = Files.newOutputStream(file)) {
                byte[] buffer = new byte[8192];
                int bytesRead;
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    out.write(buffer, 0, bytesRead);
                }
            }
            String url = "/storage/" + bucket + "/" + objectName;
            log.info("File uploaded to local storage: {}", url);
            return url;
        } catch (Exception e) {
            log.error("Upload file to local storage failed: bucket={}, object={}", bucket, objectName, e);
            throw new RuntimeException("Upload failed: " + e.getMessage(), e);
        }
    }

    @Override
    public InputStream download(String bucket, String objectName) {
        try {
            Path file = Paths.get(storagePath, bucket, objectName);
            return Files.newInputStream(file);
        } catch (Exception e) {
            log.error("Download file from local storage failed: bucket={}, object={}", bucket, objectName, e);
            throw new RuntimeException("Download failed: " + e.getMessage(), e);
        }
    }

    @Override
    public void delete(String bucket, String objectName) {
        try {
            Path file = Paths.get(storagePath, bucket, objectName);
            Files.deleteIfExists(file);
        } catch (Exception e) {
            log.warn("Delete file from local storage failed: bucket={}, object={}", bucket, objectName, e);
        }
    }

    @Override
    public String getPresignedUrl(String bucket, String objectName, int expirySeconds) {
        return "/storage/" + bucket + "/" + objectName;
    }

    @Override
    public boolean exists(String bucket, String objectName) {
        Path file = Paths.get(storagePath, bucket, objectName);
        return Files.exists(file);
    }
}
