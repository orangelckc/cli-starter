import path from 'node:path'
import process from 'node:process'

import dotenv from 'dotenv'

let envFound
const envPath = path.resolve(process.cwd(), '.env')
// 按优先级由高到低的顺序加载.env文件
envFound = dotenv.config({ path: `${envPath}.local` })
envFound = dotenv.config({ path: `${envPath}.production` })
envFound = dotenv.config({ path: `${envPath}.development` })
envFound = dotenv.config({ path: envPath })

if (envFound.error)
  throw new Error('⚠️ 未发现.env文件 ⚠️')

const env = process.env
env.NODE_ENV = env.NODE_ENV || 'development'

export default {
  isDev: env.NODE_ENV === 'development',
  // 对外端口
  port: Number.parseInt(env.PORT, 10),
  // jwt加密配置
  jwt: {
    secret: env.JWT_SECRET || 'rabbit',
    algorithm: env.JWT_ALGO || 'HS256',
    expired: env.JWT_EXPIRED || '1h',
    refreshExpired: env.JWT_REFRESH_EXPIRED || '7d',
  },
  // 日志配置
  logs: {
    level: env.NODE_ENV === 'development' ? 'debug' : 'info',
    path: env.LOG_PATH,
  },
  // 数据库配置
  mysql: {
    host: env.DATABASE_HOST || 'localhost',
    port: Number.parseInt(env.DATABASE_PORT, 10) || 3306,
    database: env.DATABASE_NAME || 'mydb',
    user: env.DATABASE_USER || 'root',
    password: env.DATABASE_PASSWORD || '12345678',
  },
  // api配置
  api: {
    prefix: env.API_BASE_PATH,
    limit: {
      interval: Number.parseInt(env.API_LIMIT_INTERVAL) || 60,
      max: Number.parseInt(env.API_LIMIT_MAX) || 30,
    },
    timeout: Number.parseInt(env.API_TIMEOUT) || 10000,
  },
  // redis配置
  redis: {
    host: env.REDIS_HOST,
    port: Number.parseInt(env.REDIS_PORT),
    username: env.REDIS_USERNAME,
    password: env.REDIS_PASSWORD,
  },
  // 阿里云oss配置
  oss: {
    region: env.OSS_REGION,
    accessKeyId: env.OSS_ACCESS_KEY_ID,
    accessKeySecret: env.OSS_ACCESS_KEY_SECRET,
    bucket: env.OSS_BUCKET,
    endpoint: env.OSS_ENDPOINT,
  },
  // 邮件发送配置
  // emails: {
  //   apiKey: env.MAILGUN_API_KEY,
  //   domain: env.MAILGUN_DOMAIN,
  // },
}
