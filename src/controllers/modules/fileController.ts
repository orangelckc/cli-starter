import type { MulterRequest } from './types/fileController.d'

import sequelize from '@/loaders/mysql'
import { addRecord, fileExists, uploadFile } from '@/services'
import { HttpResponse } from '@/utils'

/**
 * 上传头像文件
 * @file {File} 头像文件信息
 */
export async function upload(req: MulterRequest, res) {
  const transaction = await sequelize.transaction()

  try {
    // 1.上传文件的信息
    const { path, originalname, fieldname, filename } = req.file

    // 2.获取文件后缀名
    const ext = originalname.split('.').pop()
    const ossPath = `${fieldname}/${filename}.${ext}`

    // 3. 检查文件是否已经存在
    const exist = await fileExists(ossPath)

    if (exist) {
      return res.json(new HttpResponse({
        message: '文件已经存在',
        success: false,
      }))
    }

    // 4. 上传文件到OSS
    const { name: filePath, url } = await uploadFile(ossPath, path)

    // 5. 写入日志
    await addRecord('Upload', req as any, req.auth, transaction)

    return res.json(new HttpResponse({
      message: '文件上传成功',
      success: true,
      data: {
        filePath,
        url,
      },
    }))
  }
  catch (error) {
    transaction.rollback()

    return res.json(new HttpResponse({
      message: '文件上传失败',
      success: false,
    }))
  }
  finally {
    transaction.commit()
  }
}
