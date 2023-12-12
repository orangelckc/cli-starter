import fs from 'node:fs'
import path from 'node:path'

import schedule from 'node-schedule'

/**
 * 定时任务
 * 每小时的第2分钟执行，清理上传文件夹的文件
 */
const scheduleClearUploadFiles = schedule.scheduleJob(
  { minute: 2 },
  () => {
    try {
    // 清除 upload/avatar 文件夹下的文件
      const folder = path.normalize('uploads/avatar')
      // 1. 删除文件夹
      fs.rmSync(folder, { recursive: true })
      // 2. 重新创建文件夹
      fs.mkdirSync(folder)

      console.info('执行定时任务：清理上传头像文件夹成功')
    }
    catch (error) {
      console.error('执行定时任务：清理上传头像文件夹失败', error)
    }
  },
)

const Jobs: schedule.Job[] = [
  scheduleClearUploadFiles,
]

export default Jobs
