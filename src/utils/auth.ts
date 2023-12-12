import jwt from 'jsonwebtoken'

import config from '@/config'

const { secret, algorithm, expired, refreshExpired } = config.jwt

/**
 * 生成请求头中的accesstoken
 * @param data 生成token的数据，一般是用户信息
 */
export function generateAccessToken(data: jwt.JwtPayload) {
  return {
    token: jwt.sign(data, secret, { expiresIn: expired, algorithm: algorithm as jwt.Algorithm }),
    expires: getExpires(expired),
  }
}

/**
 * 生成refreshToken
 *
 * 加入 refreshToken 用于刷新token，同时可以缩短accessToken的有效期
 * 预防accessToken被盗用，增加安全性
 * 前端在请求时，判断expires是否过期，如果过期则请求refreshToken接口，获取新的accessToken
 *
 * @param data 生成token的数据，一般是用户信息
 *
 */
export function generateRefreshToken(data: jwt.JwtPayload) {
  return jwt.sign(data, secret, { expiresIn: refreshExpired, algorithm: algorithm as jwt.Algorithm })
}

/**
 * 验证token是否有效
 * @param token
 */
export function validateToken(token: string) {
  return jwt.verify(token, secret, { algorithms: [algorithm as jwt.Algorithm] })
}

/**
 * 计算过期时间
 * @param str jwt的过期时间，如：1h，1d，1m
 */
function getExpires(str: string) {
  let value = Number.parseInt(str.slice(0, -1))
  const type = str.slice(-1)

  switch (type.toLowerCase()) {
    case 'h':
      value = value * 60 * 60 * 1000
      break
    case 'd':
      value = value * 24 * 60 * 60 * 1000
      break
    default:
      value = value * 60 * 1000
  }

  return Date.now() + value
}
