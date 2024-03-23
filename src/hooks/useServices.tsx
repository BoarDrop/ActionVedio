// 存放所有的网络请求
import axios from 'axios';      // 引入axios库,用于发送http请求
import { config } from '../config';  // 引入配置文件

const useServices = () => {
    // 定义一个添加视频分析数据接口，video/addAnalysis
    const addAnalysis = async (data: any) => {
        try {
            console.log('【视频分析数据接口】data:', data);
            // 发送http请求添加视频分析数据
            const response = await axios.post(`${config.API_URL}/video/addAnalysis`, data, {
                headers: {
                    token: `${config.TOKEN}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error adding video analysis: ', error);
        }
    };

    return { addAnalysis };
}

export default useServices;