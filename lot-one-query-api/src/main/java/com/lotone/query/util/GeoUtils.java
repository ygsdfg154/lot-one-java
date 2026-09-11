package com.lotone.query.util;

public class GeoUtils {

    private static final double EARTH_RADIUS = 6371000.0; // 地球半径，单位米

    /**
     * 计算两点之间的距离（米）
     */
    public static double distance(double lat1, double lng1, double lat2, double lng2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLng = Math.toRadians(lng2 - lng1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS * c;
    }

    /**
     * 轨迹抽稀（道格拉斯-普克算法简化版：按最小距离抽稀）
     * 保留起点、终点和距离大于 minDistance 的点
     */
    public static java.util.List<java.util.Map<String, Object>> simplifyByDistance(
            java.util.List<java.util.Map<String, Object>> points, double minDistance) {
        if (points == null || points.size() <= 2) {
            return points;
        }

        java.util.List<java.util.Map<String, Object>> result = new java.util.ArrayList<>();
        result.add(points.get(0));

        java.util.Map<String, Object> lastKept = points.get(0);
        for (int i = 1; i < points.size() - 1; i++) {
            java.util.Map<String, Object> current = points.get(i);
            double lat1 = getDouble(lastKept, "latitude");
            double lng1 = getDouble(lastKept, "longitude");
            double lat2 = getDouble(current, "latitude");
            double lng2 = getDouble(current, "longitude");
            double dist = distance(lat1, lng1, lat2, lng2);
            if (dist >= minDistance) {
                result.add(current);
                lastKept = current;
            }
        }
        result.add(points.get(points.size() - 1));
        return result;
    }

    /**
     * 计算轨迹总里程（米）
     */
    public static double calculateMileage(java.util.List<java.util.Map<String, Object>> points) {
        if (points == null || points.size() < 2) {
            return 0.0;
        }
        double total = 0.0;
        for (int i = 1; i < points.size(); i++) {
            double lat1 = getDouble(points.get(i - 1), "latitude");
            double lng1 = getDouble(points.get(i - 1), "longitude");
            double lat2 = getDouble(points.get(i), "latitude");
            double lng2 = getDouble(points.get(i), "longitude");
            total += distance(lat1, lng1, lat2, lng2);
        }
        return total;
    }

    private static double getDouble(java.util.Map<String, Object> map, String key) {
        Object val = map.get(key);
        if (val == null) return 0.0;
        if (val instanceof Number) return ((Number) val).doubleValue();
        try {
            return Double.parseDouble(val.toString());
        } catch (Exception e) {
            return 0.0;
        }
    }
}
