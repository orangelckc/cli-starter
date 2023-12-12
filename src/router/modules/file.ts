import { Router } from 'express'

import { FileController } from '@/controllers'
import { avatarUploader, fileHeaderRules, handleValidationError } from '@/validators'

const fileRouter = Router()

fileRouter.post(
  '/avatar',
  fileHeaderRules(),
  handleValidationError,
  avatarUploader.single('avatar'),
  FileController.upload,
)

export default fileRouter
