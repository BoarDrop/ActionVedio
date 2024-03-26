import VideoData from "./VideoData";
interface BLEDataDisplayMethods {
    // getBLEDataAsync: () => Promise<VideoData>;
    getBLEDataAsync: () => Promise<string[][]>;
    startCollectingData: () => void;
    stopCollectingData: () => void;
  }

export default BLEDataDisplayMethods;