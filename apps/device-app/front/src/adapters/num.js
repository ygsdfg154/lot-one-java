/**
 * 数值/空值归一。
 *
 * 契约 0.2：标注 int64 的字段（各类 id、里程、配额、持续时长）在 JSON 里是**字符串**，
 * 避免超出 JS 安全整数范围时精度丢失。前端拿来做运算/比较前必须转数值——直接
 * `mileage - prev` 会得到字符串拼接或 NaN。
 *
 * int32 字段（计数、枚举码、档位、秒级时长）本来就是 JSON 数字，不需要转。
 */

/**
 * 转数值。null/undefined/空串/非数字 → 回落 fallback（默认 0）。
 * @param {*} v
 * @param {number} [fallback]
 * @returns {number}
 */
export function toNum(v, fallback = 0) {
  if (v === null || v === undefined || v === '') return fallback;
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * 判空：契约 0.2 里"无值"有两种表现——`null` 与**字段缺省**（protojson 不输出未设置的
 * optional 字段，JS 侧是 undefined）。只判 null 会漏掉一半情况。
 * @param {*} v
 * @returns {boolean}
 */
export function isBlank(v) {
  return v === null || v === undefined || v === '';
}

/**
 * 取第一个非空值，全空则返回 fallback。用于"新旧字段名过渡"或"多来源取一个"。
 * @param {...*} args 最后一个参数不作为 fallback，需显式传 ''/0
 * @returns {*}
 */
export function firstOf(...args) {
  for (const v of args) {
    if (!isBlank(v)) return v;
  }
  return undefined;
}
