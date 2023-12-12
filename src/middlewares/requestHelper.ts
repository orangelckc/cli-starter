import morgan from 'morgan'

import Logger from './loggerHelper'

import type { StreamOptions } from 'morgan'

import config from '@/config'

const stream: StreamOptions = {
  write: message => Logger.http(message),
}

const mode = config.isDev ? 'dev' : 'combined'

function skip() {
  return !config.isDev
}

const requestHelper = morgan(
  mode,
  { stream, skip },
)

export { requestHelper }
