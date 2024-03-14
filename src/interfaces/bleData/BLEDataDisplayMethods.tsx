import VideoData from "./VideoData";
interface BLEDataDisplayMethods {
    getBLEDataAsync: () => Promise<VideoData>;
  }

export default BLEDataDisplayMethods;