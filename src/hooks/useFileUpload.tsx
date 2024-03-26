// 文件上传钩子🪝
import axios from 'axios';      // 引入axios库,用于发送http请求
import RNFS from 'react-native-fs';
import { config } from '../config';  // 引入配置文件

// 定义上传凭证的类型
type UploadCredentials = {
    data: {
      accessid: string;
      policy: string;
      signature: string;
      dir: string;
      host: string;
      callback: string;
    };
  };

const useFileUpload = () => {
    // 定义一个获取上传凭证的异步函数getUploadCredentials
    const getUploadCredentials = async () => {
        try {
            // 发送http请求获取上传凭证
            // console.log('获取上传凭证，发送http请求，地址：', `${config.API_URL}/oss/policy`);
            // 发送请求，带请求头TOKEN
            const response = await axios.get(`${config.API_URL}/oss/policy`, {
                headers: {
                  token: `${config.TOKEN}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error getting upload credentials: ', error);
        }
    };
    
    // 上传文件函数
    async function uploadFile(filePath: string, fileName: string, uploadCredentials: UploadCredentials): Promise<number> {
        const fileUri = filePath; // 确保路径是正确的文件URI
        const fileType = 'video/quicktime'; // 根据您的视频文件类型进行更改

        try {
          const fileData = await RNFS.readFile(fileUri, 'base64'); // 以Base64格式读取文件
          const formData = new FormData();
          formData.append('key', `${uploadCredentials.data.dir}/${fileName}`);
          formData.append('success_action_status', '200');
          formData.append('policy', uploadCredentials.data.policy);
          formData.append('OSSAccessKeyId', uploadCredentials.data.accessid);
          formData.append('signature', uploadCredentials.data.signature);
          formData.append('callback', uploadCredentials.data.callback);
          formData.append('file', {
            uri: fileUri,
            type: fileType,
            name: fileName,
            data: fileData,
          });

          // console.log('开始上传文件,地址：', uploadCredentials.data.host);
          // console.log('表单数据：', formData);
          
          // 发送给文件存储服务器
          const response = await axios.post(uploadCredentials.data.host, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });

          console.log('上传结果：', response);
          if (response.status !== 200) {
            throw new Error('response status is not 200,上传失败！');
            return Promise.reject(new Error('response status is not 200,上传失败！'));
          } else {
            if (response.data.code === 0) {
              console.log('上传成功！code:', response.data.code);
              return response.data.data;
            } else {
              throw new Error('上传失败！');
              return Promise.reject(new Error('上传失败！'));
            }
          }
        } catch (error) {
          console.error('Upload error:', error);
          return Promise.reject(error); // 这里直接将错误向上抛出
        }
      }

    // 编写一个内部测试用的上传视频文件的接口，直接调用Collection/upload接口上传视频文件
    const uploadVideoTest = async (filePath: string, fileName: string) => {
        try {
          const fileUri = filePath; // 确保路径是正确的文件URI
          const fileType = 'video/quicktime'; // 根据您的视频文件类型进行更改
          const fileData = await RNFS.readFile(filePath, 'base64'); // 以Base64格式读取文件
          const formData = new FormData();
          formData.append('file', {
            uri: fileUri,
            type: fileType,
            name: fileName,
            data: fileData,
          });

          console.log('开始上传文件', formData);

          // 发送给文件存储服务器
          const response = await axios.post(`${config.API_URL}/Collection/upload`, formData, {
            headers: { 
              token: `${config.TOKEN}`
            },
          });

          console.log('上传结果：', response);
          return response.data.data.videoId;
        } catch (error) {
            console.error('Failed to upload video', error);
        }
    };

    return { getUploadCredentials, uploadFile, uploadVideoTest};
};

export default useFileUpload;