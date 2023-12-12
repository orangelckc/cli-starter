import redis from '@/loaders/redis'

export async function checkCache(req, res, next) {
  const { key } = req.query

  if (!key)
    return res.status(400).send({ error: '缺少参数 key' })

  // 尝试读取缓存中的数据
  const value = await redis.get(key)

  if (value) {
    res.send({ value: `数据来自缓存：${value}` })
  }
  else {
    // 不存在则去进行数据库读取
    next()
  }
}
