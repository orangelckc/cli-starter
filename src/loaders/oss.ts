import OSS from 'ali-oss'

import config from '@/config'

const { region, accessKeyId, accessKeySecret, bucket } = config.oss

function createOss() {
  if (!region || !accessKeyId || !accessKeySecret || !bucket)
    return null

  return new OSS({
    region,
    accessKeyId,
    accessKeySecret,
    bucket,
  })
}

const oss = createOss()

export default oss
