import { Sequelize } from 'sequelize'

import config from '@/config'

function connect() {
  const { host, password, port, user, database } = config.mysql
  if (!host || !password || !port || !user || !database)
    return null

  return new Sequelize({
    dialect: 'mysql',
    host: config.mysql.host,
    port: config.mysql.port,
    username: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    define: {
      timestamps: true,
      // freezeTableName: true,
      underscored: true,
      charset: 'utf8',
      paranoid: true,
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  })
}

const sequelize = connect()

if (sequelize) {
  sequelize.authenticate().then(() => {
    console.info('连接数据库成功')
  }).catch((err) => {
    console.error('数据库连接失败:', err)
  })
}

export default sequelize
