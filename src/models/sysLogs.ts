import { DataTypes } from 'sequelize'

import type { Sequelize } from 'sequelize'

export default function (sequelize: Sequelize) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: 'id',
    },
    level: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'level',
    },
    message: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'message',
    },
    meta: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'meta',
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'timestamp',
    },
  }
  const options = {
    tableName: 'sys_logs',
    comment: '',
    indexes: [],
  }
  const SysLogsModel = sequelize.define('sysLogsModel', attributes, options)
  return SysLogsModel
}
