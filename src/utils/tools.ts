import type { ComponentInternalInstance } from 'vue'

/**
 * uni.showToast 封装
 */
export function useToast(
  title: string,
  icon: 'success' | 'error' | 'none' = 'none',
  duration = 1000,
) {
  uni.showToast({
    title,
    icon,
    duration,
  })
}

/**
 * 复制内容到剪切板
 * @param content 内容
 */
export function copyToClipboard(content: string) {
  uni.setClipboardData({
    data: content,
    success: () => {
      useToast('复制成功', 'none')
    },
  })
}

/**
 * 滚动到目标元素，使其位于屏幕中间
 */
export function getScrollTop(instance: ComponentInternalInstance, selector: string): Promise<number> {
  return new Promise((resolve, reject) => {
    let targetScrollTop = 0
    const query = uni.createSelectorQuery().in(instance)
    query.select(selector).boundingClientRect()
    query.exec((res) => {
      const rect = res[0]
      if (rect) {
        targetScrollTop = rect.top - (uni.getSystemInfoSync().windowHeight - rect.height) / 2
        resolve(Math.round(targetScrollTop))
      }
      else {
        reject(new Error('No rect found'))
      }
    })
  })
}

/**
 * 转换秒数为时间格式 00:00
 * @params seconds 秒数
 */
export function secondsToTime(seconds: number) {
  if (Number.isNaN(seconds))
    return '--:--'

  const min = Math.floor(seconds / 60)
  const sec = Math.floor(seconds % 60)
  return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`
}
