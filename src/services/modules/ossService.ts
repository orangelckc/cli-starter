import { Buffer } from 'node:buffer'
import path from 'node:path'

import oss from '@/loaders/oss'

/**
 * 查看文件是否存在
 * @param ossPath OSS路径
 */
export async function fileExists(ossPath: string) {
  await oss.head(ossPath).catch(() => {
    return true
  })

  return false
}

/**
 * 创建文件夹
 * @param ossPath OSS路径，必须以/结尾
 */
export async function createFolder(ossPath: string) {
  return await oss.put(ossPath, Buffer.from(''))
}

/**
 * 上传文件到OSS
 * @param ossPath OSS路径
 * @param filePath 本地文件路径
 */
export async function uploadFile(ossPath: string, filePath: string) {
  return await oss.put(ossPath, path.normalize(filePath))
}

/**
 * 获取文件URL
 * @param ossPath OSS路径
 */
export async function getFileUrl(ossPath: string) {
  return await oss.signatureUrl(ossPath)
}

/**
 * 删除文件
 * @param ossPath OSS路径
 */
export async function deleteFile(ossPath: string) {
  return await oss.delete(ossPath)
}

/**
 * 删除多个文件
 * @param ossPaths OSS路径数组
 */
export async function deleteFiles(ossPaths: string[]) {
  return await oss.deleteMulti(ossPaths, {
    quiet: true,
  })
}
