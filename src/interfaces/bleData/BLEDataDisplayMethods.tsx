import VideoData from "./VideoData";
interface BLEDataDisplayMethods {
    getBLEDataAsync: () => Promise<VideoData>;
    startCollectingData: () => void;
    stopCollectingData: () => void;
  }

export default BLEDataDisplayMethods;