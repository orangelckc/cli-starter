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
    name: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: '部门名称',
      field: 'name',
    },
    parentId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0',
      primaryKey: false,
      autoIncrement: false,
      comment: '父节点id',
      field: 'parent_id',
    },
    treePath: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '',
      primaryKey: false,
      autoIncrement: false,
      comment: '父节点id路径',
      field: 'tree_path',
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0',
      primaryKey: false,
      autoIncrement: false,
      comment: '显示顺序',
      field: 'sort',
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '1',
      primaryKey: false,
      autoIncrement: false,
      comment: '状态(1:正常;0:禁用)',
      field: 'status',
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
    tableName: 'sys_dept',
    comment: '',
    indexes: [],
  }
  const SysDeptModel = sequelize.define('sysDeptModel', attributes, options)
  return SysDeptModel
}
