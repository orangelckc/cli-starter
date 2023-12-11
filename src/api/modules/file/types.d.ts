/**
 * 返回的数据
 *
 * IFileUploadData
 */
export interface IFileUploadData {
    /**
     * 文件在oss的相对路径
     */
    filePath: string;
    /**
     * 文件在oss的绝对路径
     */
    url: string;
}

/**
 * 上传头像
 * 
 * IAvatarUploadData
 */
export interface IAvatarUploadData {
    avatar: File
}