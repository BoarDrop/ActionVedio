// 定义DataItem接口，用来描述data数组中的对象结构
interface DataItem {
    node: number;       // 视频节点（秒为单位）
    high: number;       // 跳跃高度
    distance: number;   // 滑行距离
  }

export default DataItem;