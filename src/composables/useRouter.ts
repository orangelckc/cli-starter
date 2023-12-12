export function useRouter(config: RouterConfig = {}): Router {
  function getQueryStringify(params: Record<string, any>) {
    return Object.entries(params) // 将对象转换成 [key, value] 数组
      .map(([key, value]) => encodeURI(
        `${key}=${typeof value === 'object' ? JSON.stringify(value) : value}`,
      )) // 将每个数组元素转换成 key=value 字符串，需要对 value 进行 JSON 序列化和 URL 编码
      .join('&') // 将数组用 & 符号连接成字符串
  }

  function push(to: RouterLocationRaw) {
    let url = ''
    let replace = false
    let relaunch = false
    let arg = {}
    if (typeof to === 'string') {
      url = to
    }
    else {
      const { query: _query, path: _path, url: _url, replace: _replace, relaunch: _relaunch, ..._arg } = to
      const queryParams = getQueryStringify(_query || {})
      url = `${_path || _url}?${queryParams}`
      replace = _replace || false
      relaunch = _relaunch || false
      arg = _arg
    }

    const isLink = url.startsWith('http')
    if (isLink) {
      // #ifdef H5
      window.open(url, replace ? '_self' : '_blank')
      // #endif

      // #ifndef H5
      if (config?.webview) {
        uni.navigateTo({
          url: `${config.webview}?url=${url}`,
          ...arg,
        })
      }
      else { throw new Error('请先配置 webview 路由地址') }
      // #endif

      return
    }

    if (replace)
      uni.redirectTo({ ...arg, url })
    else if (relaunch)
      uni.reLaunch({ ...arg, url })
    else
      uni.navigateTo({ ...arg, url })
  }

  function replace(to: RouterLocationRaw) {
    const arg = typeof to === 'string' ? { path: to } : to

    push({
      ...arg,
      replace: true,
    })
  }

  function back(delta = 1) {
    uni.navigateBack({
      delta,
    })
  }

  function relaunch(to: RouterLocationRaw) {
    const arg = typeof to === 'string' ? { path: to } : to

    push({
      ...arg,
      relaunch: true,
    })
  }

  return {
    push,
    replace,
    back,
    relaunch,
  }
}
