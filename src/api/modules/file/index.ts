import type { IAvatarUploadData, IFileUploadData } from './types'

import request from '@/utils/request'

const prefix = '/file'

/** 上传头像 */
export function uploadAvatarApi(data: IAvatarUploadData) {
  return request<IFileUploadData>({
    url: `${prefix}/avatar`,
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
