import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Button, Alert} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import RNFS from 'react-native-fs';
import CameraRoll from '@react-native-community/cameraroll';
import Red from '../statics/images/RedButton.svg';
import LoadingScreen from '../components/Modals/LoadingScreenModal';
import usePermission from '../hooks/usePermission';         // 引入usePermission钩子
import useFileUpload from '../hooks/useFileUpload';         // 引入useFileUpload钩子
import BLEDataDisplay from '../components/BLEDataDisplay/BLEDataDisplay';
import useServices from '../hooks/useServices';             // 引入useServices钩子
import BLEDataDisplayMethods from '../interfaces/bleData/BLEDataDisplayMethods';    // 导入BLEDataDisplayMethods接口

function VideoCapture() {
  const camera = useRef(null);
  // 使用useCameraDevices钩子获取设备上的相机设备列表，这里主要关注后置相机
  const device = useCameraDevice('back')

  const [showCamera, setShowCamera] = useState(true);              // 是否显示相机视图
  const [isRecording, setIsRecording] = useState(false);            // 是否正在录制
  const [videoSource, setVideoSource] = useState('');               // 视频源路径
  const [loading, setLoading] = useState(false);                     // 是否正在加载
  // 当前视频id
  const [videoId, setVideoId] = useState(0);

  const { getCameraPermission, getPhotoLibraryAddOnlyPermission } = usePermission();                     // 使用useVideoRecorder钩子
  const { getUploadCredentials, uploadFile } = useFileUpload();                     // 使用useFileUpload钩子
  const { addAnalysis } = useServices();                     // 使用useServices钩子
  // 组件创立后获取用户权限
  useEffect(() => {
    getCameraPermission();                                        // 获取相机权限
    getPhotoLibraryAddOnlyPermission();                           // 获取PhotoLibraryAddOnly权限
  },[]);

  // 定义一个异步函数startRecording来开始录制视频，并更新视频源路径和录制状态
  const startRecording = async () => {
    // console.log(camera.current);
    if (camera.current && !isRecording) {
        console.log("开始录制视频");
        const video = await (camera.current as Camera).startRecording({       // 开始录制视频
        onRecordingFinished: (video) => {                                     // 当录制完成时
          !loading && setLoading(true);                                       // 更新加载状态
          const sourcePath = video.path;
          moveVideoFile(sourcePath);                                          // 移动视频文件
          setIsRecording(false);
          console.log(video.path);
        },
        onRecordingError: (error) => {                                 // 当录制发生错误时
            console.error(error);
            setIsRecording(false);
        },
      });
      setIsRecording(true);                                      // 更新录制状态
    }
  };

  // 定义一个stopRecording函数来停止录制视频
  const stopRecording = () => {
    if (camera.current && isRecording) {
        (camera.current as Camera).stopRecording();
        setIsRecording(false);
    }
  };

  // 定义一个异步函数moveVideoFile来移动视频文件到应用程序的MyVideos文件夹
  const moveVideoFile = async (sourcePath: string) => {
    const folderPath = `${RNFS.DocumentDirectoryPath}/MyVideos`;
    const fileName = `${new Date().toISOString()}.mov`;
    const destinationPath = `${folderPath}/${fileName}`;
    
    // 检查MyVideos文件夹是否存在
    const folderExists = await RNFS.exists(folderPath);
    if (!folderExists) {
      // 如果文件夹不存在，则创建它
      await RNFS.mkdir(folderPath);
    }
  
    // 然后尝试移动文件
    try {
      await RNFS.moveFile(sourcePath, destinationPath);
      console.log(`Video saved to ${destinationPath}`);
      // 这里更新你的应用状态或UI，如必要
      setVideoSource(destinationPath);
      saveVideoToCameraRoll(destinationPath);  // 保存视频到相册
      const uploadCredentials = await getUploadCredentials();  // 获取上传凭证
      if (uploadCredentials) {
        console.log('上传凭证', uploadCredentials);
        // 上传视频到OSS
        const video_id =  await uploadFile(destinationPath, fileName, uploadCredentials);
        setVideoId(video_id);  // 更新视频id
        console.log('上传视频到OSS成功，视频id:', videoId);
        await handleBLEData();  // 获取蓝牙数据
      }
    } catch (error) {
      console.error('Failed to save video', error);
    }
  };

  // 定义一个异步函数saveVideoToCameraRoll来保存视频到相册
  const saveVideoToCameraRoll = async (sourcePath: string) => {
    try {
      // videoPath变量是你录制视频的完整路径，且以file://开头。如果你的视频文件路径不是以file://开头，你可能需要手动添加它
      if (!sourcePath.startsWith('file://')) {
        sourcePath = `file://${sourcePath}`;
      }
      const asset = await CameraRoll.save(sourcePath, {type: 'video'});
      console.log('Video saved to camera roll', asset);
    } catch (error) {
      console.error('Failed to save video to camera roll', error);
    }
  };

  // Assuming BLEDataDisplayMethods is the correct interface that includes getBLEDataAsync method
  const bleDataDisplayRef = useRef<BLEDataDisplayMethods | null>(null);
  // 从子组件获取蓝牙数据
  const handleBLEData = async () => {
    if (bleDataDisplayRef.current) {
      const bleData = await bleDataDisplayRef.current.getBLEDataAsync();
      // 修改bleData中的videoId: videoId,
      bleData.videoId = videoId;
      console.log('从子组件获取的蓝牙数据:', bleData);
      // 在这里处理获取到的蓝牙数据
      // 调用API发送蓝牙数据
      const response = await addAnalysis(bleData);
      console.log('发送蓝牙数据结果:', response);
    }
  };

  if (!device) {
    return <Text>No camera device found</Text>;
  }

  return (
    <View style={styles.container}>
        {/* 相机视图 */}
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={showCamera}     // 是否激活相机
          audio={true}              // 开启音频录制
          video={true}              // 开启视频录制
        />

        {/* 加载视图*/}
        {loading && <LoadingScreen />}

        {/* 蓝牙数据展示 */}
        {/* <BLEDataDisplay onBLEDataUpdate={handleBLEData}/> */}
        <BLEDataDisplay ref={bleDataDisplayRef}/>
      
        {/* UI to start/stop recording */}
        <View style={styles.grey}>
          <View>
            <Text style={styles.time}>00:00</Text>
          </View>
          <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
            {/* 没有录制的时候，按钮是圆形⭕️，开始录制⏺️的时候，按钮缩小 */}
            <View style={styles.red}>
                {
                  isRecording ? <Red width={50} height={50} /> : <Red width={70} height={70} />
                }
            </View>
          </TouchableOpacity>
        </View>

      </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  grey: {
    width: '100%',
    height: 170,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 50% 透明度的黑色
  },
  time: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
  },
  red: {
    top: -8,
  },
  videoContainer: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    top: 50, // 根据实际情况调整
  },
  video: {
    width: '100%',
    height: 300,
  },
});

export default VideoCapture;
