// 用于导航的根目录
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PhotoCaptureScreen from '../PhotoCaptureScreen'; // 导入PhotoCaptureScreen
import HomeScreen from '../screens/Home'; // 导入HomeScreen
import ScoreScreen from '../screens/Score'; // 导入ScoreScreen
import VideoCaptureScreen from '../components/VideoCaptureScreen';    // 导入VideoCaptureScreen
const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Score"
          component={ScoreScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="VideoCapture" component={VideoCaptureScreen} />
      </Stack.Navigator>
    </>
  );
}

export default AppNavigator;
