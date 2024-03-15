import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Button} from 'react-native';
import {
  Camera,
  useCameraDevice,
  CameraPermissionStatus,
} from 'react-native-vision-camera';
import Video from 'react-native-video';
function VideoCaptureScreen() {
  const camera = useRef(null);
  // 使用useCameraDevices钩子获取设备上的相机设备列表，这里主要关注后置相机
  const device = useCameraDevice('back');

  const [showCamera, setShowCamera] = useState(false); // 是否显示相机视图
  const [isRecording, setIsRecording] = useState(false); // 是否正在录制
  const [videoSource, setVideoSource] = useState(''); // 视频源路径

  useEffect(() => {
    async function getPermission() {
      const cameraPermission = await Camera.requestCameraPermission();
      const microphonePermission = await Camera.requestMicrophonePermission();
      console.log('获取用户权限');
      console.log(`Camera permission status: ${cameraPermission}`);
      console.log(`Microphone permission status: ${microphonePermission}`);
      if (cameraPermission === 'denied') {
        console.log('Camera permission denied');
      }
      if (microphonePermission === 'denied') {
        console.log('Microphone permission denied');
      }
    }
    getPermission();
  }, []);

  // 定义一个异步函数startRecording来开始录制视频，并更新视频源路径和录制状态
  const startRecording = async () => {
    setShowCamera(true);
    // console.log(camera.current);
    if (camera.current && !isRecording) {
      console.log('开始录制视频');
      const video = await (camera.current as Camera).startRecording({
        // 开始录制视频
        onRecordingFinished: video => {
          // 当录制完成时
          setVideoSource(video.path);
          setIsRecording(false);
          console.log(video.path);
        },
        onRecordingError: error => {
          // 当录制发生错误时
          console.error(error);
          setIsRecording(false);
          setShowCamera(false); // 更新录制状态,停止开摄像头
        },
      });
      setIsRecording(true); // 更新录制状态
    }
  };

  const stopRecording = () => {
    if (camera.current && isRecording) {
      (camera.current as Camera).stopRecording();
      setIsRecording(false);
      setShowCamera(false); // 更新录制状态,停止开摄像头
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
        isActive={showCamera} // 是否激活相机
        audio={true} // 开启音频录制
        video={true} // 开启视频录制
      />

      {/* UI to start/stop recording */}
      {/* 简化布局来测试按钮功能 */}
      <TouchableOpacity
        style={styles.button}
        onPress={isRecording ? stopRecording : startRecording}>
        <Text style={styles.buttonText}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Text>
      </TouchableOpacity>

      {/* 根据需要决定是否显示视频 */}
      {videoSource ? (
        <View style={styles.videoContainer}>
          <Video
            source={{uri: videoSource}}
            style={styles.video}
            controls
            resizeMode="contain"
          />
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
