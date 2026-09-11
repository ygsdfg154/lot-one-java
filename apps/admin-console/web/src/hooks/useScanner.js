/**
 * 扫码枪 Hook
 * 扫码枪模拟键盘输入，通过监听 keydown 事件识别扫码数据。
 * 扫码枪输入特点：连续快速输入字符，最后以 Enter 结尾。
 *
 * @param {Object} options
 * @param {Function} options.onScan - 扫码成功回调，接收扫描到的字符串
 * @param {Function} options.onError - 扫码失败回调
 * @param {number}  options.timeout - 字符间超时(ms)，默认 500
 * @param {number}  options.minLength - 最小有效长度，默认 6
 * @returns {{ start: Function, stop: Function }}
 */
export function useScanner(options = {}) {
  const { onScan, onError, timeout = 500, minLength = 6 } = options

  let buffer = ''
  let timer = null
  let isActive = true

  const handleKeydown = (event) => {
    if (!isActive || event.isComposing) return
    const key = event.key

    // 忽略修饰键
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock'].includes(key)) return

    if (key === 'Enter') {
      event.preventDefault()
      if (buffer.length >= minLength) {
        onScan?.(buffer.trim())
      } else if (buffer.length > 0) {
        onError?.('扫描内容无效')
      }
      buffer = ''
      clearTimeout(timer)
      return
    }

    if (key.length === 1) {
      clearTimeout(timer)
      buffer += key
      timer = setTimeout(() => { buffer = '' }, timeout)
    }
  }

  const start = () => {
    isActive = true
    document.addEventListener('keydown', handleKeydown)
  }

  const stop = () => {
    isActive = false
    document.removeEventListener('keydown', handleKeydown)
    buffer = ''
    clearTimeout(timer)
  }

  return { start, stop }
}
