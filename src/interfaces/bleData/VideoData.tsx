import DataItem from './DataItem';

// 定义VideoData接口，用来描述整个数据结构
interface VideoData {
    videoId: number;
    airTime: number;        // 滞空时间
    sk8Flipping: boolean;   // 滑板是否翻转
    data: DataItem[];
  }

export default VideoData;