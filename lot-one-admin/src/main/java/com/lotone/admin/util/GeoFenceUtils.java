package com.lotone.admin.util;

/**
 * 地理围栏工具类
 * 支持圆形围栏和多边形围栏的点判断
 */
public class GeoFenceUtils {

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
     * 判断点是否在圆形围栏内
     * @param lat 点纬度
     * @param lng 点经度
     * @param centerLat 圆心纬度
     * @param centerLng 圆心经度
     * @param radius 半径（米）
     * @return true=在围栏内
     */
    public static boolean isPointInCircle(double lat, double lng, double centerLat, double centerLng, double radius) {
        double dist = distance(lat, lng, centerLat, centerLng);
        return dist <= radius;
    }

    /**
     * 判断点是否在多边形围栏内（射线法）
     * @param lat 点纬度
     * @param lng 点经度
     * @param polygon 多边形顶点数组，每个元素为 [lat, lng]
     * @return true=在围栏内
     */
    public static boolean isPointInPolygon(double lat, double lng, double[][] polygon) {
        if (polygon == null || polygon.length < 3) {
            return false;
        }
        int count = 0;
        for (int i = 0; i < polygon.length; i++) {
            double lat1 = polygon[i][0];
            double lng1 = polygon[i][1];
            double lat2 = polygon[(i + 1) % polygon.length][0];
            double lng2 = polygon[(i + 1) % polygon.length][1];

            // 判断点的纬度是否在边的纬度范围内
            if ((lat1 > lat) != (lat2 > lat)) {
                // 计算边与点所在水平线的交点经度
                double intersectLng = (lat - lat1) * (lng2 - lng1) / (lat2 - lat1) + lng1;
                if (lng < intersectLng) {
                    count++;
                }
            }
        }
        return count % 2 != 0;
    }

    /**
     * 判断点是否在围栏内（自动判断圆形或多边形）
     * @param lat 点纬度
     * @param lng 点经度
     * @param fenceShapeType 围栏形状类型 1=圆形 2=多边形
     * @param centerLat 圆心纬度（圆形围栏用）
     * @param centerLng 圆心经度（圆形围栏用）
     * @param radius 半径（圆形围栏用）
     * @param polygon 多边形顶点（多边形围栏用）
     * @return true=在围栏内
     */
    public static boolean isPointInFence(double lat, double lng, int fenceShapeType,
                                          Double centerLat, Double centerLng, Integer radius,
                                          double[][] polygon) {
        if (fenceShapeType == 1) {
            // 圆形围栏
            if (centerLat == null || centerLng == null || radius == null) {
                return false;
            }
            return isPointInCircle(lat, lng, centerLat, centerLng, radius);
        } else if (fenceShapeType == 2) {
            // 多边形围栏
            return isPointInPolygon(lat, lng, polygon);
        }
        return false;
    }
}
