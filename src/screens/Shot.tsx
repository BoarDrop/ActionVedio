import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Button from '../components/Button/Button';
import Allow from '../components/Allow/Allow';
import {NavigationProp} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  widthPercent,
  heightPercent,
  fontSizePercent,
  marginTopPercent,
  marginBottomPercent,
} from '../utils/responsiveUtils';

import {useEffect, useState, useRef} from 'react';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import RNFS from 'react-native-fs';
import CameraRoll from '@react-native-community/cameraroll';
import LoadingScreenModal from '../components/Modals/LoadingScreenModal';
import usePermission from '../hooks/usePermission';         // 引入usePermission钩子
import useFileUpload from '../hooks/useFileUpload';         // 引入useFileUpload钩子
import BLEDataDisplay from '../components/BLEDataDisplay/BLEDataDisplay';
import useServices from '../hooks/useServices';             // 引入useServices钩子
import BLEDataDisplayMethods from '../interfaces/bleData/BLEDataDisplayMethods';    // 导入BLEDataDisplayMethods接口


interface ShotProps {
  navigation: NavigationProp<any>;
}

const Shot: React.FC<ShotProps> = ({navigation}) => {

  const camera = useRef(null);
  // 使用useCameraDevices钩子获取设备上的相机设备列表，这里主要关注后置相机
  const device = useCameraDevice('back')

  const [showCamera, setShowCamera] = useState(true);              // 是否显示相机视图
  const [isRecording, setIsRecording] = useState(false);            // 是否正在录制
  const [videoSource, setVideoSource] = useState('');               // 视频源路径
  const [loading, setLoading] = useState(false);                     // 是否正在加载
  // 当前视频id
  const [videoId, setVideoId] = useState(0);
  // 计时⌛️
  const [time, setTime] = useState(0);

  const { getCameraPermission, getPhotoLibraryAddOnlyPermission } = usePermission();                     // 使用useVideoRecorder钩子
  const { getUploadCredentials, uploadFile, uploadVideoTest } = useFileUpload();                     // 使用useFileUpload钩子
  const { addAnalysis } = useServices();                     // 使用useServices钩子
  // 组件创立后获取用户权限
  useEffect(() => {
    getCameraPermission();                                        // 获取相机权限
    getPhotoLibraryAddOnlyPermission();                           // 获取PhotoLibraryAddOnly权限
  },[]);

  useEffect(() => {
    // 如果有需要，根据状态变化进行导航或其他副作用
    console.log('videoId changed:', videoId);
    if(videoId !== 0) { // 如果有实际的 videoId，执行相关操作
      handleBLEData();
    }
  }, [videoId]);

  // 如果是正在录制状态，每秒更新一次时间
  useEffect(() => {
    if(isRecording) {
      const interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  // 定义一个异步函数startRecording来开始录制视频，并更新视频源路径和录制状态
  const startRecording = async () => {
    // // 给子组件发送开始收集数据的信号
    if (bleDataDisplayRef.current) {
      bleDataDisplayRef.current.startCollectingData();
    }
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

  // 判断isRecording状态，如果是正在录制状态
  useEffect(() => {
    console.log('isRecording changed:', isRecording);
  }, [isRecording]);

  // 定义一个stopRecording函数来停止录制视频
  const stopRecording = () => {
    // 给子组件发送停止收集数据的信号
    if (bleDataDisplayRef.current) {
      bleDataDisplayRef.current.stopCollectingData();
    }
    // 停止计时⌛️
    setTime(0);
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
  
    // // 然后尝试移动文件
    // try {
    //   await RNFS.moveFile(sourcePath, destinationPath);
    //   console.log(`Video saved to ${destinationPath}`);
    //   // 这里更新你的应用状态或UI，如必要
    //   setVideoSource(destinationPath);
    //   await saveVideoToCameraRoll(destinationPath);  // 保存视频到相册
    //   const uploadCredentials = await getUploadCredentials();  // 获取上传凭证
    //   if (uploadCredentials) {
    //     console.log('上传凭证', uploadCredentials);
    //     // 上传视频到OSS
    //     const video_id =  await uploadFile(destinationPath, fileName, uploadCredentials);
    //     console.log('上传视频到OSS成功，视频id:', video_id);
    //     setVideoId(video_id);  // 更新视频id
    //   }
    // } catch (error) {
    //   console.error('Failed to save video', error);
    // }

    // 然后尝试移动文件
    try {
      await RNFS.moveFile(sourcePath, destinationPath);
      console.log(`Video saved to ${destinationPath}`);
      // 这里更新你的应用状态或UI，如必要
      setVideoSource(destinationPath);
      await saveVideoToCameraRoll(destinationPath);  // 保存视频到相册
      // 上传视频到内部服务器
      const video_id =  await uploadVideoTest(destinationPath, fileName);
      console.log('上传视频到内部服务器，视频id:', video_id);
      setVideoId(video_id);  // 更新视频id
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
      // console.log('从子组件获取的蓝牙数据:', bleData);
      // 在这里处理获取到的蓝牙数据
      // 调用API发送蓝牙数据
      const response = await addAnalysis(bleData, videoId);
      console.log('发送蓝牙数据结果:', response);
      setLoading(false);  // 更新加载状态
      // 跳转的时候传入videoId
      navigation.navigate('Upload', {videoId: videoId});
    }
  };

  if (!device) {
    return <Text>No camera device found</Text>;
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    // 使用模板字符串和三元运算符确保时间总是以两位数字格式显示
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      <View style={styles.container}>
        {/* 加载视图*/}
        <LoadingScreenModal visible={loading} />

        {/* 蓝牙数据展示 */}
        {/* <BLEDataDisplay onBLEDataUpdate={handleBLEData}/> */}
        <BLEDataDisplay ref={bleDataDisplayRef}/>

        {/* 返回上一级 */}
        <View style={styles.head}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.dis}>Discard</Text>
          </TouchableOpacity>
          <Text style={styles.obj}>Object</Text>
          <Text style={styles.black}>none</Text>
        </View>

        {/* 照片 */}
        <View style={styles.middle}>
          {/* 相机视图 */}
          <Camera
            ref={camera}
            // style={StyleSheet.absoluteFill}
            style={styles.skate_image}
            resizeMode="cover" // 或者 'stretch' 来填满容器
            device={device}
            isActive={showCamera}     // 是否激活相机
            audio={true}              // 开启音频录制
            video={true}              // 开启视频录制
          />

          <View style={styles.allow}>
            <Allow />
          </View>
        </View>

        {/* 底部栏 */}
        <View style={styles.grey}>
          <View style={styles.top}>
            <View style={styles.left}>
              <Text style={styles.word}>
                As you shoot, the sensors on the skateboard will record your
                movement data in real time.
              </Text>
            </View>
            {/* 倒计时 */}
            <View style={styles.right}>
              {/* 使用formatTime函数来格式化显示时间 */}
              <Text style={styles.time}>{formatTime(time)}</Text>
            </View>
          </View>

          {/* 调用Button组件 */}
          <View style={styles.bottom}>
            {/* 获取用户是否点击Button组件的回调 */}
            <Button onPressCallback={isRecording ? stopRecording : startRecording} />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  head: {
    width: '100%',
    height: heightPercent(50),
    backgroundColor: 'black',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 35,
    //gap: wp('10.5%'),
  },
  dis: {
    color: 'red',
    fontSize: fontSizePercent(15),
    fontWeight: '500',
  },
  obj: {
    color: 'white',
    fontSize: fontSizePercent(18.5),
    fontWeight: '500',
  },
  black: {
    color: 'black',
    fontSize: fontSizePercent(18.5),
    fontWeight: '500',
  },
  middle: {
    flex: 1, // 这里的flex: 1是关键，它会使得图片容器填充所有剩余空间
    width: wp('100%'), // 确保图片宽度铺满屏幕宽度
    alignItems: 'center',
    justifyContent: 'center',
  },
  allow: {
    //backgroundColor: 'pink',
    width: widthPercent(280),
    height: heightPercent(135),
    position: 'absolute', // 设置为绝对定位
    transform: [{translateX: widthPercent(0)}, {translateY: heightPercent(0)}], // 根据盒子大小调整偏移，使其居中
    alignItems: 'center',
    justifyContent: 'center',
  },
  skate_image: {
    width: '100%',
    height: '100%', // 确保图片高度铺满容器高度
  },
  grey: {
    width: '100%',
    height: heightPercent(190),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  top: {
    flexDirection: 'row',
    width: widthPercent(325),
    height: heightPercent(68),
  },
  left: {
    width: widthPercent(264),
    height: heightPercent(68),
  },
  word: {
    color: 'white',
    fontSize: fontSizePercent(18),
    fontWeight: '400',
  },
  right: {
    justifyContent: 'flex-end',
    marginBottom: 0,
  },
  time: {
    fontSize: fontSizePercent(24),
    fontWeight: '700',
    color: '#848484',
  },
  bottom: {
    width: '100%',
    height: heightPercent(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Shot;
