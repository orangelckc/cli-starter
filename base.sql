/*
 Navicat Premium Data Transfer

 Source Server         : local-mysql
 Source Server Type    : MySQL
 Source Server Version : 80030
 Source Host           : localhost:3306
 Source Schema         : synaptrix

 Target Server Type    : MySQL
 Target Server Version : 80030
 File Encoding         : 65001

 Date: 09/05/2023 17:12:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept`;
CREATE TABLE `sys_dept` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '部门名称',
  `parent_id` bigint DEFAULT '0' COMMENT '父节点id',
  `tree_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '父节点id路径',
  `sort` int DEFAULT '0' COMMENT '显示顺序',
  `status` tinyint DEFAULT '1' COMMENT '状态(1:正常;0:禁用)',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=190 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='部门表';

-- ----------------------------
-- Records of sys_dept
-- ----------------------------
BEGIN;
INSERT INTO `sys_dept` (`id`, `name`, `parent_id`, `tree_path`, `sort`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES (1, '宇宙', 0, '0', 1, 1, NULL, NULL, NULL);
INSERT INTO `sys_dept` (`id`, `name`, `parent_id`, `tree_path`, `sort`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES (188, '银河系', 1, '0,1', 1, 1, '2023-05-08 11:05:55', '2023-05-08 11:06:22', NULL);
INSERT INTO `sys_dept` (`id`, `name`, `parent_id`, `tree_path`, `sort`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES (189, '阿尔法星系', 1, '0,1', 2, 1, '2023-05-08 11:06:10', '2023-05-08 11:06:10', NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_dict
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict`;
CREATE TABLE `sys_dict` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type_code` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '字典类型编码',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '字典项名称',
  `value` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '字典项值',
  `sort` int DEFAULT '0' COMMENT '排序',
  `status` tinyint DEFAULT '0' COMMENT '状态(1:正常;0:禁用)',
  `defaulted` tinyint DEFAULT '0' COMMENT '是否默认(1:是;0:否)',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '备注',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='字典数据表';

-- ----------------------------
-- Records of sys_dict
-- ----------------------------
BEGIN;
INSERT INTO `sys_dict` (`id`, `type_code`, `name`, `value`, `sort`, `status`, `defaulted`, `remark`, `created_at`, `updated_at`, `deleted_at`) VALUES (1, 'gender', '男', '1', 1, 1, 0, NULL, '2019-05-05 13:07:52', '2022-06-12 23:20:39', NULL);
INSERT INTO `sys_dict` (`id`, `type_code`, `name`, `value`, `sort`, `status`, `defaulted`, `remark`, `created_at`, `updated_at`, `deleted_at`) VALUES (2, 'gender', '女', '2', 2, 1, 0, NULL, '2019-04-19 11:33:00', '2019-07-02 14:23:05', NULL);
INSERT INTO `sys_dict` (`id`, `type_code`, `name`, `value`, `sort`, `status`, `defaulted`, `remark`, `created_at`, `updated_at`, `deleted_at`) VALUES (3, 'gender', '未知', '0', 1, 1, 0, NULL, '2020-10-17 08:09:31', '2020-10-17 08:09:31', NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_dict_type
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_type`;
CREATE TABLE `sys_dict_type` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键 ',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '类型名称',
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '类型编码',
  `status` tinyint DEFAULT '0' COMMENT '状态(0:正常;1:禁用)',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `type_code` (`code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='字典类型表';

-- ----------------------------
-- Records of sys_dict_type
-- ----------------------------
BEGIN;
INSERT INTO `sys_dict_type` (`id`, `name`, `code`, `status`, `remark`, `created_at`, `updated_at`, `deleted_at`) VALUES (1, '性别', 'gender', 1, NULL, '2019-12-06 19:03:32', '2022-06-12 16:21:28', NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_interface
-- ----------------------------
DROP TABLE IF EXISTS `sys_interface`;
CREATE TABLE `sys_interface` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '权限ID',
  `path` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '接口路径',
  `method` varchar(8) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '接口方法',
  `name` varchar(32) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '接口名称',
  `public` tinyint DEFAULT '0' COMMENT '是否公开(0:否;1:是)',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '修改时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_interface
-- ----------------------------
BEGIN;
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (1, '/auth', 'GET', '登陆用户信息', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (2, '/auth/login', 'POST', '登录', 1, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (3, '/auth/refresh-token', 'POST', '刷新token', 1, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (4, '/auth/logout', 'GET', '退出登陆', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (5, '/admin', 'POST', '新增系统用户', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (6, '/admin/list', 'GET', '获取系统用户列表', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (7, '/admin', 'PUT', '修改系统用户信息', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (8, '/admin/status', 'PATCH', '修改系统用户状态', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (9, '/admin/password', 'PATCH', '修改系统用户密码', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (10, '/admin', 'DELETE', '删除系统用户', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (11, '/dept', 'POST', '新增部门', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (12, '/dept/list', 'GET', '获取部门列表', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (13, '/dept', 'PUT', '修改部门', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (14, '/dept', 'DELETE', '删除部门', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (15, '/dept/options', 'GET', '获取部门下拉选项', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (16, '/role/menus', 'GET', '获取角色的菜单ID列表', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (17, '/role', 'POST', '新增角色', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (18, '/role/list', 'GET', '角色分页列表', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (19, '/role', 'PUT', '修改角色', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (20, '/role/status', 'PATCH', '修改角色状态', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (21, '/role', 'DELETE', '删除角色', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (22, '/role/options', 'GET', '角色下拉菜单', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (23, '/role/menus', 'POST', '给角色分配菜单权限', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (24, '/menu', 'GET', '获取用户路由列表', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (25, '/menu', 'POST', '新增菜单', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (26, '/menu/list', 'GET', '菜单列表', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (27, '/menu', 'PATCH', '修改菜单显示状态', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (28, '/menu/options', 'GET', '获取菜单下拉列表', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (29, '/menu', 'PUT', '修改菜单', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (30, '/menu', 'DELETE', '删除菜单', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (31, '/interface/list', 'GET', '获取接口列表', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (32, '/admin/form', 'GET', '获取系统用户表单信息', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (33, '/role/interfaces', 'POST', '给角色分配接口权限', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (34, '/role/interfaces', 'GET', '获取角色接口权限列表', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (35, '/file/avatar', 'POST', '上传头像', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (36, '/dept/form', 'GET', '获取部门表单信息', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (37, '/menu/form', 'GET', '获取菜单表单信息', 0, NULL, NULL, NULL);
INSERT INTO `sys_interface` (`id`, `path`, `method`, `name`, `public`, `created_at`, `updated_at`, `deleted_at`) VALUES (38, '/role/form', 'GET', '获取角色表单信息', 0, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_interface_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_interface_role`;
CREATE TABLE `sys_interface_role` (
  `interface_id` bigint DEFAULT NULL COMMENT '接口ID',
  `role_id` bigint DEFAULT NULL COMMENT '角色ID',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '修改时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_interface_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (1, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (3, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (4, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (2, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (6, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (7, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (8, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (9, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (10, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (11, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (12, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (13, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (14, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (15, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (16, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (17, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (18, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (19, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (20, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (21, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (22, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (23, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (24, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (25, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (26, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (27, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (28, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (29, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (30, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (31, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (32, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (5, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (33, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (34, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (35, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (36, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (37, 2, NULL, NULL, NULL);
INSERT INTO `sys_interface_role` (`interface_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (38, 2, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_logs
-- ----------------------------
DROP TABLE IF EXISTS `sys_logs`;
CREATE TABLE `sys_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `level` varchar(16) COLLATE utf8mb4_general_ci NOT NULL,
  `message` varchar(2048) COLLATE utf8mb4_general_ci NOT NULL,
  `meta` varchar(2048) COLLATE utf8mb4_general_ci NOT NULL,
  `timestamp` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_logs
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `parent_id` bigint NOT NULL COMMENT '父菜单ID',
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '菜单名称',
  `type` tinyint DEFAULT NULL COMMENT '菜单类型(1:菜单；2:目录；3:按钮；4:外链)',
  `path` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '路由路径(浏览器地址栏路径)',
  `component` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '组件路径(vue页面完整路径，省略.vue后缀)',
  `permission` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '权限标识',
  `visible` tinyint NOT NULL DEFAULT '1' COMMENT '显示状态(1-显示;0-隐藏)',
  `sort` int DEFAULT '0' COMMENT '排序',
  `icon` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '菜单图标',
  `redirect_url` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '外链路径',
  `redirect` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '跳转路径',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='菜单管理';

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_menu` (`id`, `parent_id`, `name`, `type`, `path`, `component`, `permission`, `visible`, `sort`, `icon`, `redirect_url`, `redirect`, `created_at`, `updated_at`, `deleted_at`) VALUES (1, 0, '系统管理', 2, '/system', 'Layout', NULL, 1, 1, 'system', '/system/user', '/system/user', '2021-08-28 09:12:21', '2021-08-28 09:12:21', NULL);
INSERT INTO `sys_menu` (`id`, `parent_id`, `name`, `type`, `path`, `component`, `permission`, `visible`, `sort`, `icon`, `redirect_url`, `redirect`, `created_at`, `updated_at`, `deleted_at`) VALUES (2, 1, '管理员管理', 1, 'admin', 'system/admin/index', NULL, 1, 1, 'admin', NULL, NULL, '2021-08-28 09:12:21', '2021-08-28 09:12:21', NULL);
INSERT INTO `sys_menu` (`id`, `parent_id`, `name`, `type`, `path`, `component`, `permission`, `visible`, `sort`, `icon`, `redirect_url`, `redirect`, `created_at`, `updated_at`, `deleted_at`) VALUES (3, 1, '角色管理', 1, 'role', 'system/role/index', NULL, 1, 2, 'role', NULL, NULL, '2021-08-28 09:12:21', '2021-08-28 09:12:21', NULL);
INSERT INTO `sys_menu` (`id`, `parent_id`, `name`, `type`, `path`, `component`, `permission`, `visible`, `sort`, `icon`, `redirect_url`, `redirect`, `created_at`, `updated_at`, `deleted_at`) VALUES (4, 1, '菜单管理', 1, 'menu', 'system/menu/index', NULL, 1, 3, 'menu', NULL, NULL, '2021-08-28 09:12:21', '2021-08-28 09:12:21', NULL);
INSERT INTO `sys_menu` (`id`, `parent_id`, `name`, `type`, `path`, `component`, `permission`, `visible`, `sort`, `icon`, `redirect_url`, `redirect`, `created_at`, `updated_at`, `deleted_at`) VALUES (5, 1, '部门管理', 1, 'dept', 'system/dept/index', NULL, 1, 4, 'dept', NULL, NULL, '2021-08-28 09:12:21', '2023-05-08 16:13:31', NULL);
INSERT INTO `sys_menu` (`id`, `parent_id`, `name`, `type`, `path`, `component`, `permission`, `visible`, `sort`, `icon`, `redirect_url`, `redirect`, `created_at`, `updated_at`, `deleted_at`) VALUES (6, 2, '新增管理员', 3, '', NULL, 'sys:admin:add', 1, 1, '', '', '', '2022-10-23 11:04:08', '2023-05-08 11:07:41', NULL);
INSERT INTO `sys_menu` (`id`, `parent_id`, `name`, `type`, `path`, `component`, `permission`, `visible`, `sort`, `icon`, `redirect_url`, `redirect`, `created_at`, `updated_at`, `deleted_at`) VALUES (7, 2, '编辑管理员', 3, '', NULL, 'sys:admin:edit', 1, 2, '', '', '', '2022-10-23 11:04:08', '2023-05-08 11:07:48', NULL);
INSERT INTO `sys_menu` (`id`, `parent_id`, `name`, `type`, `path`, `component`, `permission`, `visible`, `sort`, `icon`, `redirect_url`, `redirect`, `created_at`, `updated_at`, `deleted_at`) VALUES (8, 2, '删除管理员', 3, '', NULL, 'sys:admin:delete', 1, 3, '', '', '', '2022-10-23 11:04:08', '2023-05-08 11:07:56', NULL);
INSERT INTO `sys_menu` (`id`, `parent_id`, `name`, `type`, `path`, `component`, `permission`, `visible`, `sort`, `icon`, `redirect_url`, `redirect`, `created_at`, `updated_at`, `deleted_at`) VALUES (9, 5, '新增部门', 3, '', '', 'sys:dept:add', 1, 1, '', '', NULL, '2023-05-08 11:07:20', '2023-05-08 16:16:08', NULL);
INSERT INTO `sys_menu` (`id`, `parent_id`, `name`, `type`, `path`, `component`, `permission`, `visible`, `sort`, `icon`, `redirect_url`, `redirect`, `created_at`, `updated_at`, `deleted_at`) VALUES (10, 5, '修改部门', 3, '', '', 'sys:dept:edit', 1, 2, '', '', NULL, '2023-05-08 11:10:37', '2023-05-08 16:16:12', NULL);
INSERT INTO `sys_menu` (`id`, `parent_id`, `name`, `type`, `path`, `component`, `permission`, `visible`, `sort`, `icon`, `redirect_url`, `redirect`, `created_at`, `updated_at`, `deleted_at`) VALUES (11, 5, '删除部门', 3, '', '', 'sys:dept:delete', 1, 3, '', '', NULL, '2023-05-08 11:11:03', '2023-05-08 16:16:18', NULL);
INSERT INTO `sys_menu` (`id`, `parent_id`, `name`, `type`, `path`, `component`, `permission`, `visible`, `sort`, `icon`, `redirect_url`, `redirect`, `created_at`, `updated_at`, `deleted_at`) VALUES (12, 4, '新增菜单', 3, '', NULL, 'sys:menu:add', 1, 1, '', '', NULL, '2023-05-08 11:14:12', '2023-05-08 11:14:12', NULL);
INSERT INTO `sys_menu` (`id`, `parent_id`, `name`, `type`, `path`, `component`, `permission`, `visible`, `sort`, `icon`, `redirect_url`, `redirect`, `created_at`, `updated_at`, `deleted_at`) VALUES (13, 4, '编辑菜单', 3, '', NULL, 'sys:menu:edit', 1, 2, '', '', NULL, '2023-05-08 11:14:32', '2023-05-08 11:14:32', NULL);
INSERT INTO `sys_menu` (`id`, `parent_id`, `name`, `type`, `path`, `component`, `permission`, `visible`, `sort`, `icon`, `redirect_url`, `redirect`, `created_at`, `updated_at`, `deleted_at`) VALUES (14, 4, '删除菜单', 3, '', NULL, 'sys:menu:delete', 1, 3, '', '', NULL, '2023-05-08 11:14:50', '2023-05-08 11:14:50', NULL);
INSERT INTO `sys_menu` (`id`, `parent_id`, `name`, `type`, `path`, `component`, `permission`, `visible`, `sort`, `icon`, `redirect_url`, `redirect`, `created_at`, `updated_at`, `deleted_at`) VALUES (15, 4, '修改菜单显示/隐藏', 3, '', NULL, 'sys:menu:status', 1, 4, '', '', NULL, '2023-05-08 11:15:26', '2023-05-08 11:15:26', NULL);
INSERT INTO `sys_menu` (`id`, `parent_id`, `name`, `type`, `path`, `component`, `permission`, `visible`, `sort`, `icon`, `redirect_url`, `redirect`, `created_at`, `updated_at`, `deleted_at`) VALUES (16, 3, '新增角色', 3, '', NULL, 'sys:role:add', 1, 1, '', '', NULL, '2023-05-09 09:09:22', '2023-05-09 09:09:22', NULL);
INSERT INTO `sys_menu` (`id`, `parent_id`, `name`, `type`, `path`, `component`, `permission`, `visible`, `sort`, `icon`, `redirect_url`, `redirect`, `created_at`, `updated_at`, `deleted_at`) VALUES (17, 3, '编辑角色', 3, '', NULL, 'sys:role:edit', 1, 2, '', '', NULL, '2023-05-09 09:09:42', '2023-05-09 09:09:42', NULL);
INSERT INTO `sys_menu` (`id`, `parent_id`, `name`, `type`, `path`, `component`, `permission`, `visible`, `sort`, `icon`, `redirect_url`, `redirect`, `created_at`, `updated_at`, `deleted_at`) VALUES (18, 3, '删除角色', 3, '', NULL, 'sys:role:delete', 1, 3, '', '', NULL, '2023-05-09 09:10:01', '2023-05-09 09:10:01', NULL);
INSERT INTO `sys_menu` (`id`, `parent_id`, `name`, `type`, `path`, `component`, `permission`, `visible`, `sort`, `icon`, `redirect_url`, `redirect`, `created_at`, `updated_at`, `deleted_at`) VALUES (19, 3, '修改角色状态', 3, '', NULL, 'sys:role:status', 1, 4, '', '', NULL, '2023-05-09 09:10:35', '2023-05-09 09:10:35', NULL);
INSERT INTO `sys_menu` (`id`, `parent_id`, `name`, `type`, `path`, `component`, `permission`, `visible`, `sort`, `icon`, `redirect_url`, `redirect`, `created_at`, `updated_at`, `deleted_at`) VALUES (20, 3, '分配权限', 3, '', NULL, 'sys:role:assign', 1, 5, '', '', NULL, '2023-05-09 09:10:57', '2023-05-09 09:10:57', NULL);
INSERT INTO `sys_menu` (`id`, `parent_id`, `name`, `type`, `path`, `component`, `permission`, `visible`, `sort`, `icon`, `redirect_url`, `redirect`, `created_at`, `updated_at`, `deleted_at`) VALUES (21, 2, '禁用/启用 管理员账户', 3, '', NULL, 'sys:admin:status', 1, 4, '', '', NULL, '2023-05-09 10:31:06', '2023-05-09 10:31:06', NULL);
INSERT INTO `sys_menu` (`id`, `parent_id`, `name`, `type`, `path`, `component`, `permission`, `visible`, `sort`, `icon`, `redirect_url`, `redirect`, `created_at`, `updated_at`, `deleted_at`) VALUES (22, 2, '重置密码', 3, '', NULL, 'sys:admin:reset', 1, 5, '', '', NULL, '2023-05-09 10:32:23', '2023-05-09 10:32:23', NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_menu_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu_role`;
CREATE TABLE `sys_menu_role` (
  `menu_id` bigint NOT NULL COMMENT '菜单ID',
  `role_id` bigint NOT NULL COMMENT '角色ID',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='角色和菜单关联表';

-- ----------------------------
-- Records of sys_menu_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_menu_role` (`menu_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (1, 2, '2023-05-09 10:34:07', '2023-05-09 10:34:07', NULL);
INSERT INTO `sys_menu_role` (`menu_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (2, 2, '2023-05-09 10:34:07', '2023-05-09 10:34:07', NULL);
INSERT INTO `sys_menu_role` (`menu_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (6, 2, '2023-05-09 10:34:07', '2023-05-09 10:34:07', NULL);
INSERT INTO `sys_menu_role` (`menu_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (7, 2, '2023-05-09 10:34:07', '2023-05-09 10:34:07', NULL);
INSERT INTO `sys_menu_role` (`menu_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (8, 2, '2023-05-09 10:34:07', '2023-05-09 10:34:07', NULL);
INSERT INTO `sys_menu_role` (`menu_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (21, 2, '2023-05-09 10:34:07', '2023-05-09 10:34:07', NULL);
INSERT INTO `sys_menu_role` (`menu_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (22, 2, '2023-05-09 10:34:07', '2023-05-09 10:34:07', NULL);
INSERT INTO `sys_menu_role` (`menu_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (3, 2, '2023-05-09 10:34:07', '2023-05-09 10:34:07', NULL);
INSERT INTO `sys_menu_role` (`menu_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (16, 2, '2023-05-09 10:34:07', '2023-05-09 10:34:07', NULL);
INSERT INTO `sys_menu_role` (`menu_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (17, 2, '2023-05-09 10:34:07', '2023-05-09 10:34:07', NULL);
INSERT INTO `sys_menu_role` (`menu_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (18, 2, '2023-05-09 10:34:07', '2023-05-09 10:34:07', NULL);
INSERT INTO `sys_menu_role` (`menu_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (19, 2, '2023-05-09 10:34:07', '2023-05-09 10:34:07', NULL);
INSERT INTO `sys_menu_role` (`menu_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (20, 2, '2023-05-09 10:34:07', '2023-05-09 10:34:07', NULL);
INSERT INTO `sys_menu_role` (`menu_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (4, 2, '2023-05-09 10:34:07', '2023-05-09 10:34:07', NULL);
INSERT INTO `sys_menu_role` (`menu_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (12, 2, '2023-05-09 10:34:07', '2023-05-09 10:34:07', NULL);
INSERT INTO `sys_menu_role` (`menu_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (13, 2, '2023-05-09 10:34:07', '2023-05-09 10:34:07', NULL);
INSERT INTO `sys_menu_role` (`menu_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (14, 2, '2023-05-09 10:34:07', '2023-05-09 10:34:07', NULL);
INSERT INTO `sys_menu_role` (`menu_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (15, 2, '2023-05-09 10:34:07', '2023-05-09 10:34:07', NULL);
INSERT INTO `sys_menu_role` (`menu_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (5, 2, '2023-05-09 10:34:07', '2023-05-09 10:34:07', NULL);
INSERT INTO `sys_menu_role` (`menu_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (9, 2, '2023-05-09 10:34:07', '2023-05-09 10:34:07', NULL);
INSERT INTO `sys_menu_role` (`menu_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (10, 2, '2023-05-09 10:34:07', '2023-05-09 10:34:07', NULL);
INSERT INTO `sys_menu_role` (`menu_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (11, 2, '2023-05-09 10:34:07', '2023-05-09 10:34:07', NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_record
-- ----------------------------
DROP TABLE IF EXISTS `sys_record`;
CREATE TABLE `sys_record` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '日志类型',
  `uid` bigint DEFAULT NULL COMMENT '用户ID',
  `uname` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户名',
  `ip` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'IP地址',
  `api` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '调用接口',
  `client` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '设备信息',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '修改时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=252 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_record
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '角色名称',
  `code` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '角色编码',
  `sort` int DEFAULT NULL COMMENT '显示顺序',
  `status` tinyint DEFAULT '1' COMMENT '角色状态(1-正常；0-停用)',
  `data_scope` tinyint DEFAULT NULL COMMENT '数据权限(0-所有数据；1-部门及子部门数据；2-本部门数据；3-本人数据)',
  `created_at` datetime DEFAULT NULL COMMENT '更新时间',
  `updated_at` datetime DEFAULT NULL COMMENT '创建时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='角色表';

-- ----------------------------
-- Records of sys_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_role` (`id`, `name`, `code`, `sort`, `status`, `data_scope`, `created_at`, `updated_at`, `deleted_at`) VALUES (1, '超级管理员', 'ROOT', 1, 1, 0, '2021-05-21 14:56:51', '2018-12-23 16:00:00', NULL);
INSERT INTO `sys_role` (`id`, `name`, `code`, `sort`, `status`, `data_scope`, `created_at`, `updated_at`, `deleted_at`) VALUES (2, '系统管理员', 'ADMIN', 2, 1, 1, '2021-03-25 12:39:54', '2023-05-08 15:32:00', NULL);
INSERT INTO `sys_role` (`id`, `name`, `code`, `sort`, `status`, `data_scope`, `created_at`, `updated_at`, `deleted_at`) VALUES (3, '访问游客', 'GUEST', 3, 1, 2, '2021-05-26 15:49:05', '2023-05-08 15:31:58', NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户名',
  `realname` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '真实姓名',
  `mobile` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '联系方式',
  `description` text COLLATE utf8mb4_general_ci COMMENT '个人描述',
  `gender` tinyint DEFAULT '1' COMMENT '性别((0:未知;1:男;2:女))',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户头像',
  `email` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户邮箱',
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '密码',
  `dept_id` int DEFAULT NULL COMMENT '部门ID',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注',
  `status` tinyint DEFAULT '1' COMMENT '用户状态((1:正常;0:禁用))',
  `refresh_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户的refreshToken',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=317 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='用户信息表';

-- ----------------------------
-- Records of sys_user
-- ----------------------------
BEGIN;
INSERT INTO `sys_user` (`id`, `username`, `realname`, `mobile`, `description`, `gender`, `avatar`, `email`, `password`, `dept_id`, `remark`, `status`, `refresh_token`, `created_at`, `updated_at`, `deleted_at`) VALUES (1, 'root', '超级管理员', '17621590365', NULL, 0, '', 'youlaitech@163.com', '$2b$10$UCW6g.p3pjbwaJEV4OCf0OjSc9asjJVI25Ot.NZJOX77TRdgqiy.i', NULL, NULL, 1, NULL, NULL, '2023-05-09 13:11:58', NULL);
INSERT INTO `sys_user` (`id`, `username`, `realname`, `mobile`, `description`, `gender`, `avatar`, `email`, `password`, `dept_id`, `remark`, `status`, `refresh_token`, `created_at`, `updated_at`, `deleted_at`) VALUES (2, 'admin', '系统管理员', '17621210366', NULL, 0, 'http://yytapp.oss-cn-shanghai.aliyuncs.com/avatar/fbe0586f976bc1e162af8a2357998061.jpeg', '', '$2b$10$UCW6g.p3pjbwaJEV4OCf0OjSc9asjJVI25Ot.NZJOX77TRdgqiy.i', 1, NULL, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODM2Mzc5MjEsImV4cCI6MTY4NDI0MjcyMX0.9bgTU-avtEMVR5I00rwbmrfSRpUp7ZvaZAGytQ3plhI', '2019-10-10 13:41:22', '2023-05-09 13:12:01', NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `role_id` bigint NOT NULL COMMENT '角色ID',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`user_id`,`role_id`) USING BTREE,
  KEY `role_id` (`role_id`),
  CONSTRAINT `role_id` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='用户和角色关联表';

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_user_role` (`user_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (1, 1, NULL, NULL, NULL);
INSERT INTO `sys_user_role` (`user_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES (2, 2, '2023-05-09 13:07:24', '2023-05-09 13:07:24', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
