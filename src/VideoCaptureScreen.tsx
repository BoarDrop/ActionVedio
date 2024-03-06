import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Button, Alert} from 'react-native';
import {Camera, useCameraDevice, CameraPermissionStatus} from 'react-native-vision-camera';
import Video from 'react-native-video';
import RNFS from 'react-native-fs';     // 引入react-native-fs库，将视频数据先保存在本地
import CameraRoll from '@react-native-community/cameraroll';  // 引入react-native-cameraroll库，将视频保存到相册
import {request, PERMISSIONS, RESULTS, openSettings} from 'react-native-permissions'; // 引入react-native-permissions库，用于请求权限
import { Platform } from 'react-native';    // 引入Platform模块，用于判断平台
function VideoCaptureScreen() {
  const camera = useRef(null);
  // 使用useCameraDevices钩子获取设备上的相机设备列表，这里主要关注后置相机
  const device = useCameraDevice('back')

  const [showCamera, setShowCamera] = useState(false);              // 是否显示相机视图
  const [isRecording, setIsRecording] = useState(false);            // 是否正在录制
  const [videoSource, setVideoSource] = useState('');               // 视频源路径

  useEffect(() => {
    async function getPermission() {
        const cameraPermission = await Camera.requestCameraPermission();
        const microphonePermission = await Camera.requestMicrophonePermission();
        console.log("获取用户权限");
        console.log(`Camera permission status: ${cameraPermission}`);
        console.log(`Microphone permission status: ${microphonePermission}`);
        if ( cameraPermission === 'denied') {
            console.log('Camera permission denied');
        }       
        if ( microphonePermission === 'denied') {
            console.log('Microphone permission denied');
        }
    }

    const requestPermissions = async () => {
      try {
        const result = await request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY
            : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        );

        console.log('请求权限结果', result);
    
        if (result === RESULTS.GRANTED) {
          console.log('权限已授予');
        } else {
          // 请求权限被拒绝 & 无法再次请求权限
          console.log('权限被拒绝');

          // 提示用户手动打开权限
          showAlertToOpenSettings();
        }
      } catch (error) {
        console.error('请求权限时发生错误', error);
      }
    };

    function showAlertToOpenSettings() {
      Alert.alert(
        '需要权限',
        '我们需要相应的权限来继续，您可以去应用设置中手动开启。',
        [
          {
            text: '取消',
            style: 'cancel',
          },
          {
            text: '设置',
            onPress: () => openSettings(),
          },
        ],
      );
    }

    requestPermissions();
    getPermission();
  }, []);

  

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
    } catch (error) {
      console.error('Failed to save video', error);
    }
  };

  // 定义一个异步函数startRecording来开始录制视频，并更新视频源路径和录制状态
  const startRecording = async () => {
    setShowCamera(true);
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
            setShowCamera(false);                               // 更新录制状态,停止开摄像头
        },
      });
      setIsRecording(true);                                      // 更新录制状态
    }
  };

  const stopRecording = () => {
    if (camera.current && isRecording) {
        (camera.current as Camera).stopRecording();
        setIsRecording(false);
        setShowCamera(false);                               // 更新录制状态,停止开摄像头
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

      {/* 根据需要决定是否显示视频 */}
      {videoSource ? (
        <View style={styles.videoContainer}>
          <Video source={{uri: videoSource}} style={styles.video} controls resizeMode="contain" />
        </View>
      ) : null}
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
