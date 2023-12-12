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
      comment: '主键',
      field: 'id',
    },
    typeCode: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: '字典类型编码',
      field: 'type_code',
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: '字典项名称',
      field: 'name',
    },
    value: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: '字典项值',
      field: 'value',
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0',
      primaryKey: false,
      autoIncrement: false,
      comment: '排序',
      field: 'sort',
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0',
      primaryKey: false,
      autoIncrement: false,
      comment: '状态(1:正常;0:禁用)',
      field: 'status',
    },
    defaulted: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0',
      primaryKey: false,
      autoIncrement: false,
      comment: '是否默认(1:是;0:否)',
      field: 'defaulted',
    },
    remark: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: '备注',
      field: 'remark',
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
      comment: '更新时间',
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
    tableName: 'sys_dict',
    comment: '',
    indexes: [],
  }
  const SysDictModel = sequelize.define('sysDictModel', attributes, options)
  return SysDictModel
}
