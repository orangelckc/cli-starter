import { DataTypes } from 'sequelize'

import type { Sequelize } from 'sequelize'

export default function (sequelize: Sequelize) {
  const attributes = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: '权限ID',
      field: 'id',
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: '接口路径',
      field: 'path',
    },
    method: {
      type: DataTypes.STRING(8),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: '接口方法',
      field: 'method',
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: '接口名称',
      field: 'name',
    },
    public: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0',
      primaryKey: false,
      autoIncrement: false,
      comment: '是否公开(0:否;1:是)',
      field: 'public',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: '创建时间',
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: '修改时间',
      field: 'updated_at',
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: '删除时间',
      field: 'deleted_at',
    },
  }
  const options = {
    tableName: 'sys_interface',
    comment: '',
    indexes: [],
  }
  const SysInterfaceModel = sequelize.define('sysInterfaceModel', attributes, options)
  return SysInterfaceModel
}
