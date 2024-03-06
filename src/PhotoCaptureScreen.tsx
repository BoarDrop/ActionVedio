/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState, useRef } from 'react'; // 正确的导入方式
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { Linking } from 'react-native';

function PhotoCaptureScreen(): React.JSX.Element {

  // 使用useRef创建一个引用来持有Camera组件
  const camera = useRef<Camera | null>(null);
  // 使用useCameraDevices钩子获取设备上的相机设备列表，这里主要关注后置相机
  const device = useCameraDevice('back')

  // 使用useState管理相机视图的显示状态和照片的源路径
  const [showCamera, setShowCamera] = useState(false);                // 是否显示相机视图
  const [imageSource, setImageSource] = useState('');                 // 照片源路径

  // 使用useEffect钩子在组件加载时请求相机📷权限
  useEffect(() => {
    async function getPermission() {
      console.log("获取用户权限");
      const permission = await Camera.requestCameraPermission();    // 请求相机许可
      console.log(`Camera permission status: ${permission}`);       // 打印相机许可状态
      if (permission === 'denied') await Linking.openSettings();    // 如果用户拒绝了相机许可，打开设置页面
    }
    getPermission();                                                // 调用获取权限函数
  }, []);

  // 定义一个异步函数capturePhoto来拍照，并更新照片源路径和相机视图的显示状态
  const capturePhoto = async () => {
    console.log("拍照");
    try {
      // 尝试拍照并使用提供的选项
      console.log("尝试拍照并使用提供的选项");
      const photo = await (camera.current as Camera).takePhoto({});
      // 如果拍照成功，更新照片源路径并关闭相机视图
      setImageSource(photo.path);
      setShowCamera(false);
      console.log(photo.path);
    } catch (error) {
      // 如果发生错误，这里捕获异常
      console.error(error);
      // 可以根据error.code来决定如何处理不同类型的错误
      if ((error as any).code) {
        // 处理不同的错误代码
        console.log(`Error code: ${(error as any).code}`);
      }
      // 这里可以实现一些错误处理逻辑，比如显示错误消息给用户
      console.log('Failed to take photo. Please try again.');
    }
  };

  // 如果设备上没有可用的相机，则显示一条消息
  if (device == null) return <Text>No back camera device found</Text>;

  // 根据showCamera的状态显示相机界面或照片预览界面
  return (
    <View style={styles.container}>
      {showCamera ? (
        // 相机视图
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={showCamera}
            photo={true}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.camButton}
              onPress={() => capturePhoto()}
            />
          </View>
        </>
      ) : (
        // 照片预览视图
        <>
          {imageSource !== '' ? (
            <Image
              style={styles.image}
              source={{
                uri: `file://'${imageSource}`,
              }}
            />
          ) : null}

          <View style={styles.backButton}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#fff',
                width: 100,
              }}
              onPress={() => setShowCamera(true)}>
              <Text style={{ color: 'red', fontWeight: '500' }}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: '#77c3ec',
                }}
                onPress={() => setShowCamera(true)}>
                <Text style={{ color: '#77c3ec', fontWeight: '500' }}>
                  Retake
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#77c3ec',
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: 'white',
                }}
                onPress={() => setShowCamera(true)}>
                <Text style={{ color: 'white', fontWeight: '500' }}>
                  Use Photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

// 定义组件使用的样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'gray',
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.0)',
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    top: 0,
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    padding: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  camButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#B2BEB5',
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    aspectRatio: 9 / 16,
  },
});

// 导出App组件
export default PhotoCaptureScreen;