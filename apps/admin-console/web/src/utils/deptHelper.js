/**
 * 部门展示工具函数
 *
 * 后端在 getLotDeptList / getLotDeptTree / 设备列表等接口中为每个部门节点返回
 * fullDeptName 字段（完整层级路径，如 "深圳公司 > 财务部门"），前端统一通过本工具
 * 读取该字段，确保所有页面中同名部门可区分。
 */

/**
 * 获取部门的完整展示名称
 * 有 fullDeptName 时直接返回（如 "深圳公司 > 财务部门"）；
 * platform 节点加"（平台）"后缀；否则直接显示 deptName
 *
 * @param {Object} dept - 部门对象 { deptName, fullDeptName, orgType, ID }
 * @returns {string} 层级化后的展示文本
 */
export function getDeptDisplayName(dept) {
  if (!dept) return '-'
  // 优先使用后端计算的完整路径
  if (dept.fullDeptName) return dept.fullDeptName
  if (dept.orgType === 'platform') return `${dept.deptName || dept.ID}（平台）`
  return dept.deptName || String(dept.ID || '-')
}

/**
 * 将扁平部门列表转换为 Element Plus select/cascader options
 * label 自动使用完整路径，value 为部门 ID
 *
 * @param {Array} list - 后端返回的部门列表
 * @returns {Array<{label: string, value: number}>}
 */
export function deptListToOptions(list) {
  return (list || []).map(item => ({
    label: getDeptDisplayName(item),
    value: Number(item.ID)
  }))
}

/**
 * 将部门树数据转换为 el-tree-select 的 options 格式
 * label 使用 fullDeptName（完整路径），value 使用部门 ID
 *
 * @param {Array} tree - 后端返回的树形部门数据
 * @returns {Array} 树形 options，每个节点含 { value, label, children }
 */
export function deptTreeToOptions(tree) {
  return (tree || []).map(item => ({
    value: Number(item.ID),
    label: getDeptDisplayName(item),
    children: deptTreeToOptions(item.children || [])
  }))
}
