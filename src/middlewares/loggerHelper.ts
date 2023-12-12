import process from 'node:process'

import winston from 'winston'
import MySQLTransport from 'winston-mysql'

import 'winston-daily-rotate-file'
import config from '@/config'

// 控制台日志配置
const consoleTransport = new winston.transports.Console({
  level: 'debug',
  format: winston.format.simple(),
})

// 错误日志配置（存储）
const errorTransport = new winston.transports.DailyRotateFile({
  level: 'error',
  dirname: config.logs.path,
  filename: '%DATE%-Error.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
})

// 信息日志配置（存储）
const infoTransport = new winston.transports.DailyRotateFile({
  level: 'info',
  dirname: config.logs.path,
  filename: '%DATE%-日志.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
})

// 存储日志到mysql
const mysqlTransport = new MySQLTransport({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  table: 'sys_logs',
})

const transports: winston.transport[] = []

if (process.env.NODE_ENV === 'development')
  transports.push(consoleTransport)
else
  transports.push(mysqlTransport, infoTransport, errorTransport)

// 常规输出日志
const Logger = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.colorize(),
    winston.format.json(),
  ),
  transports,
})

// 改写console.info/error/warn方法
console.info = (...args) =>
  Logger.info(args)

console.warn = (...args) =>
  Logger.warn(args)

console.error = (...args) =>
  Logger.error(args)

Logger.info('成功初始化日志模块')

export default Logger
