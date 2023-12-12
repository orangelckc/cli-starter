import { DataTypes } from 'sequelize'

import type { ModelOptions, Sequelize } from 'sequelize'

export default function (sequelize: Sequelize) {
  const attributes = {
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: '用户ID',
      field: 'user_id',
      references: {
        key: 'id',
        model: 'sysUserModel',
      },
    },
    roleId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: '角色ID',
      field: 'role_id',
      references: {
        key: 'id',
        model: 'sysRoleModel',
      },
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
    tableName: 'sys_user_role',
    comment: '',
    indexes: [{
      name: 'role_id',
      unique: false,
      type: 'BTREE',
      fields: ['role_id'],
    }],
  }
  const SysUserRoleModel = sequelize.define('sysUserRoleModel', attributes, options as ModelOptions)
  return SysUserRoleModel
}
