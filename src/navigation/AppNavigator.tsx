import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PhotoCaptureScreen from '../PhotoCaptureScreen'; // 导入PhotoCaptureScreen
import VideoCaptureScreen from '../VideoCaptureScreen'; // 导入VideoCaptureScreen
import HomeScreen from '../screens/Home'; // 导入HomeScreen
import ScoreScreen from '../screens/Score'; // 导入ScoreScreen
import ShotScreen from '../screens/Shot'; // 导入ShotScreen
import LoginScreen from '../screens/Login';

// 创建一个类型，用于定义StackNavigator的屏幕参数
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Score: undefined;
  Shot: undefined;
  PhotoCapture: undefined;
  VideoCapture: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Score"
          component={ScoreScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Shot"
          component={ShotScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="PhotoCapture" component={PhotoCaptureScreen} />
        <Stack.Screen name="VideoCapture" component={VideoCaptureScreen} />
      </Stack.Navigator>
    </>
  );
}

export default AppNavigator;
