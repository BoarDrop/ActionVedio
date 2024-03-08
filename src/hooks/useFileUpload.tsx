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
    };
  };

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
    
    // 上传文件函数
    async function uploadFile(filePath: string, fileName: string, uploadCredentials: UploadCredentials): Promise<void> {
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
          formData.append('file', {
            uri: fileUri,
            type: fileType,
            name: fileName,
            data: fileData,
          });
          // 请求success_action_status=200，表示上传成功后返回200状态码


          console.log('开始上传文件,地址：', uploadCredentials.data.host);
          console.log('表单数据：', formData);
      
          const response = await axios.post(uploadCredentials.data.host, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          if (response.status !== 200) {
            throw new Error('response status is not 200,上传失败！');
          } else {
            console.log('文件上传成功！');
          }
        } catch (error) {
          console.error('Upload error:', error);
        }
      }

    return { getUploadCredentials, uploadFile};
};

export default useFileUpload;