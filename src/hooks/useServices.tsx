// 存放所有的网络请求
import axios from 'axios';      // 引入axios库,用于发送http请求
import { config } from '../config';  // 引入配置文件

const useServices = () => {
    // 定义一个添加视频分析数据接口，video/addAnalysis
    const addAnalysis = async (originalData: string[][], videoId: number) => {
        try {
           // 转换数据格式
           let transformedData: { time: number; data: string }[] = [];
           originalData.forEach((innerArray, index) => {
               const groupData = innerArray.map(dataString => ({
                   time: index + 1, // 外层数组的索引作为time
                   data: dataString // 内层数组的每个字符串作为data
               }));
               transformedData = [...transformedData, ...groupData];
           });

            // 构造数据对象
            const data = {
                videoId: videoId,
                version: config.VERSION,
                data: transformedData,
            };

            console.log('【视频分析数据接口】data:');
            console.log(data);

            // 发送http请求添加视频分析数据
            const response = await axios.post(`${config.API_URL}/Collection/addRawData`, data, {
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