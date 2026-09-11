package com.lotone.iot.worker.service;

import java.io.InputStream;

/**
 * 对象存储服务接口
 * 支持 MinIO / 本地文件系统 等多种存储后端
 */
public interface ObjectStorageService {

    /**
     * 上传文件
     * @param bucket 存储桶
     * @param objectName 对象名称（路径）
     * @param inputStream 文件输入流
     * @param contentType 文件类型
     * @param fileSize 文件大小
     * @return 文件访问URL
     */
    String upload(String bucket, String objectName, InputStream inputStream, String contentType, long fileSize);

    /**
     * 下载文件
     * @param bucket 存储桶
     * @param objectName 对象名称
     * @return 文件输入流
     */
    InputStream download(String bucket, String objectName);

    /**
     * 删除文件
     * @param bucket 存储桶
     * @param objectName 对象名称
     */
    void delete(String bucket, String objectName);

    /**
     * 获取文件访问URL
     * @param bucket 存储桶
     * @param objectName 对象名称
     * @param expirySeconds 过期时间（秒）
     * @return 预签名URL
     */
    String getPresignedUrl(String bucket, String objectName, int expirySeconds);

    /**
     * 检查文件是否存在
     */
    boolean exists(String bucket, String objectName);
}
