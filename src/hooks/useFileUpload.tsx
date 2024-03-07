// 文件上传钩子🪝
import axios from 'axios';      // 引入axios库,用于发送http请求
import { config } from '../config';  // 引入配置文件
const useFileUpload = () => {
    // 定义一个获取上传凭证的异步函数getUploadCredentials
    const getUploadCredentials = async () => {
        try {
            // 发送http请求获取上传凭证
            console.log('获取上传凭证，发送http请求，地址：', `${config.API_URL}/oss/policy`);
            const response = await axios.get(`${config.API_URL}/oss/policy`);
            return response.data;
        } catch (error) {
            console.error('Error getting upload credentials: ', error);
        }
    };

    return { getUploadCredentials };
};

export default useFileUpload;