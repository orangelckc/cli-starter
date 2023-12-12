import { createClient } from 'redis'

import config from '@/config'

const { redis } = config

const client = createClient({
  username: redis.username,
  password: redis.password,
  socket: {
    host: redis.host,
    port: redis.port,
  },
})

client.on('error', (err) => {
  console.error(`Redis 连接失败: ${err}`)
})

client.connect().then(() => {
  console.info('Redis 连接成功')
})

export default client
