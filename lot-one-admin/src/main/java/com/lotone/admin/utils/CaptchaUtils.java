package com.lotone.admin.utils;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.Base64;

public class CaptchaUtils {

    private static final int WIDTH = 240;
    private static final int HEIGHT = 80;
    private static final int CODE_LENGTH = 4;
    private static final String CHARS = "0123456789";
    private static final Random RANDOM = new Random();

    private static final Map<String, String> STORE = new HashMap<>();

    public static Map<String, Object> generate() {
        String code = generateCode();
        String id = java.util.UUID.randomUUID().toString().replace("-", "");
        String base64 = generateImage(code);
        STORE.put(id, code);
        Map<String, Object> result = new HashMap<>();
        result.put("captchaId", id);
        result.put("picPath", base64);
        result.put("captchaLength", CODE_LENGTH);
        return result;
    }

    public static boolean verify(String id, String code) {
        String stored = STORE.get(id);
        if (stored == null) return false;
        boolean match = stored.equalsIgnoreCase(code);
        if (match) STORE.remove(id);
        return match;
    }

    private static String generateCode() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < CODE_LENGTH; i++) {
            sb.append(CHARS.charAt(RANDOM.nextInt(CHARS.length())));
        }
        return sb.toString();
    }

    private static String generateImage(String code) {
        BufferedImage image = new BufferedImage(WIDTH, HEIGHT, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = image.createGraphics();
        g.setColor(Color.WHITE);
        g.fillRect(0, 0, WIDTH, HEIGHT);
        g.setFont(new Font("Arial", Font.BOLD, 48));
        for (int i = 0; i < code.length(); i++) {
            g.setColor(new Color(RANDOM.nextInt(100), RANDOM.nextInt(100), RANDOM.nextInt(100)));
            g.drawString(String.valueOf(code.charAt(i)), 30 + i * 50, 55);
        }
        for (int i = 0; i < 30; i++) {
            g.setColor(new Color(RANDOM.nextInt(200), RANDOM.nextInt(200), RANDOM.nextInt(200)));
            g.drawLine(RANDOM.nextInt(WIDTH), RANDOM.nextInt(HEIGHT), RANDOM.nextInt(WIDTH), RANDOM.nextInt(HEIGHT));
        }
        g.dispose();
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(image, "png", baos);
            return "data:image/png;base64," + Base64.getEncoder().encodeToString(baos.toByteArray());
        } catch (Exception e) {
            throw new RuntimeException("验证码生成失败", e);
        }
    }
}
