module.exports = {
  dbOptions: { // sequelize 数据库配置，该配置用于读取库配置信息
    database: 'rabbit', // 数据库名称
    username: 'root', // 用户
    password: '12345678', // 密码
    dialect: 'mysql', // 数据库类型
    host: 'localhost', // 数据库服务地址
    port: 3306, // 数据库服务端口号
  },
  options: { // 生成文件的配置信息
    type: 'ts', // 生成代码类型，支持 ts、js
    dir: './src/models', // 生成代码文件的输出位置
    camelCase: true, // 是否将下划线转换为驼峰命名
    fileNameCamelCase: true,
    typesDir: './src/models/types', // 生成的类型文件的输出位置
  },
}
