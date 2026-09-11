package com.lotone.protocol.jt808.message;

import lombok.Data;

import java.io.ByteArrayOutputStream;

/**
 * 平台RSA公钥 (0x8A00)
 * 平台向终端下发RSA公钥，用于终端加密上传数据
 */
@Data
public class PlatformRsaKey {
    public static final int MSG_ID = 0x8A00;

    /** 公钥长度（4字节） */
    private int keyLength;

    /** RSA公钥指数e（4字节） */
    private long publicExponent;

    /** RSA公钥模N（128字节，1024位） */
    private byte[] modulus;

    public byte[] encodeBody() {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            // 公钥长度 (4字节)
            out.write((keyLength >> 24) & 0xFF);
            out.write((keyLength >> 16) & 0xFF);
            out.write((keyLength >> 8) & 0xFF);
            out.write(keyLength & 0xFF);
            // 公钥指数e (4字节)
            out.write((int) ((publicExponent >> 24) & 0xFF));
            out.write((int) ((publicExponent >> 16) & 0xFF));
            out.write((int) ((publicExponent >> 8) & 0xFF));
            out.write((int) (publicExponent & 0xFF));
            // 公钥模N (128字节)
            if (modulus != null) {
                out.write(modulus);
            }
            return out.toByteArray();
        } catch (Exception e) {
            return new byte[0];
        }
    }

    public static PlatformRsaKey decode(byte[] body) {
        PlatformRsaKey key = new PlatformRsaKey();
        if (body == null || body.length < 8) return key;
        // 公钥长度
        key.setKeyLength(((body[0] & 0xFF) << 24) | ((body[1] & 0xFF) << 16)
                | ((body[2] & 0xFF) << 8) | (body[3] & 0xFF));
        // 公钥指数e
        key.setPublicExponent(((body[4] & 0xFFL) << 24) | ((body[5] & 0xFFL) << 16)
                | ((body[6] & 0xFFL) << 8) | (body[7] & 0xFFL));
        // 公钥模N
        if (body.length > 8) {
            byte[] modulus = new byte[body.length - 8];
            System.arraycopy(body, 8, modulus, 0, modulus.length);
            key.setModulus(modulus);
        }
        return key;
    }
}
