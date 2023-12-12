import { DataTypes } from 'sequelize'

import type { Sequelize } from 'sequelize'

export default function (sequelize: Sequelize) {
  const attributes = {
    interfaceId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: '接口ID',
      field: 'interface_id',
    },
    roleId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: '角色ID',
      field: 'role_id',
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
    tableName: 'sys_interface_role',
    comment: '',
    indexes: [],
  }
  const SysInterfaceRoleModel = sequelize.define('sysInterfaceRoleModel', attributes, options)
  return SysInterfaceRoleModel
}
