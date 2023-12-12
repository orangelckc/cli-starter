import { header } from 'express-validator'
import multer from 'multer'

const avatarUploader = multer({
  dest: 'uploads/avatar/',
  limits: {
    files: 1, // 限制1个文件
    fileSize: 1024 * 200, // 限制200kb
  },
  fileFilter(_req, file, cb) {
    const { mimetype } = file
    if (!mimetype.includes('image'))
      cb(new Error('图片格式错误'))
    else
      cb(null, true)
  },
})

/**
 * 上传文件的公共头校验规则
 */
function fileHeaderRules() {
  /**
   * @header Content-Type
   * 1. Content-Type 参数只能是 multipart/form-data
   */
  const formDataChain = header('Content-Type')
    .custom((value: string) => {
      if (!value.startsWith('multipart/form-data;'))
        return false

      return true
    })
    .withMessage('请求头错误，请检查')
    .bail()

  return [formDataChain]
}

export {
  avatarUploader,
  fileHeaderRules,
}
