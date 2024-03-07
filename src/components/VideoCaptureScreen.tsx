import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Button, Alert} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import RNFS from 'react-native-fs';
import CameraRoll from '@react-native-community/cameraroll';
import axios from 'axios';      // 引入axios库,用于发送http请求


import usePermission from '../hooks/usePermission';         // 引入usePermission钩子
import useFileUpload from '../hooks/useFileUpload';         // 引入useFileUpload钩子



function VideoCaptureScreen() {
  const camera = useRef(null);
  // 使用useCameraDevices钩子获取设备上的相机设备列表，这里主要关注后置相机
  const device = useCameraDevice('back')

  const [showCamera, setShowCamera] = useState(true);              // 是否显示相机视图
  const [isRecording, setIsRecording] = useState(false);            // 是否正在录制
  const [videoSource, setVideoSource] = useState('');               // 视频源路径

  const { getCameraPermission, getPhotoLibraryAddOnlyPermission } = usePermission();                     // 使用useVideoRecorder钩子
  const { getUploadCredentials } = useFileUpload();                     // 使用useFileUpload钩子
  
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
        // uploadVideoToOSS(destinationPath, uploadCredentials);
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


  if (!device) {
    return <Text>No camera device found</Text>;
  }

  return (
    <View style={styles.container}>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={showCamera}     // 是否激活相机
          audio={true}              // 开启音频录制
          video={true}              // 开启视频录制
        />
      

      {/* UI to start/stop recording */}
      {/* 简化布局来测试按钮功能 */}
      <TouchableOpacity style={styles.button} onPress={isRecording ? stopRecording : startRecording}>
          <Text style={styles.buttonText}>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
      </TouchableOpacity>

      {/* 根据需要决定是否显示视频
      {videoSource ? (
        <View style={styles.videoContainer}>
          <Video source={{uri: videoSource}} style={styles.video} controls resizeMode="contain" />
        </View>
      ) : null} */}
      </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
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

export default VideoCaptureScreen;
