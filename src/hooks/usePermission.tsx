import { Alert } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { Platform } from 'react-native';
import { request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

const usePermission = () => {
  // 获取用户权限
  async function getCameraPermission() {
    const cameraPermission = await Camera.requestCameraPermission();
    const microphonePermission = await Camera.requestMicrophonePermission();
    console.log("获取Camera权限");
    if ( cameraPermission === 'denied') {
        console.log('Camera permission denied');
        showAlertToOpenSettings()
    }       
    if ( microphonePermission === 'denied') {
        console.log('Microphone permission denied');
        showAlertToOpenSettings()
    }
  }

  // 请求PhotoLibraryAddOnly权限
  const getPhotoLibraryAddOnlyPermission = async () => {
    try {
      const result = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY
          : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      );

      console.log('请求PhotoLibraryAddOnly权限结果', result);
  
      if (result === RESULTS.GRANTED) {
        console.log('PhotoLibraryAddOnly权限已授予');
      } else {
        // 请求权限被拒绝 & 无法再次请求权限
        console.log('请求PhotoLibraryAddOnly权限被拒绝');
        // 提示用户手动打开权限
        showAlertToOpenSettings();
      }
    } catch (error) {
      console.error('请求PhotoLibraryAddOnly权限时发生错误', error);
    }
  };

  // 弹窗请求权限
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

  return { getCameraPermission, getPhotoLibraryAddOnlyPermission };
};

export default usePermission;
