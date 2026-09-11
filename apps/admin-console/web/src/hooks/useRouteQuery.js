// 从当前路由的 query 里取一个字段的初始值，用于"从别的页面带参数跳进来自动应用筛选"的场景
// （例如设备详情页跳到指令日志/统计报表页并带上 deviceId）。
// query 参数缺失/为空串时返回 null，交给调用方决定要不要覆盖默认值。
import { useRoute } from 'vue-router'

/**
 * @param {string} key route.query 里的字段名
 * @param {(raw: string) => any} [transform] 可选的值转换（如 parseInt）
 * @returns {any}
 */
export function useRouteQueryValue(key, transform) {
  const route = useRoute()
  const raw = route.query[key]
  if (raw === undefined || raw === null || raw === '') return null
  return transform ? transform(raw) : String(raw)
}
