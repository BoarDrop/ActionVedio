import * as React from 'react';
import {Button, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PhotoCaptureScreen from './src/PhotoCaptureScreen'; // 假设你已经创建了这个组件
import {useNavigation} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  PhotoCapture: undefined;
  VideoCapture: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen({navigation}: {navigation: any}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="拍摄照片"
        onPress={() => navigation.navigate('PhotoCapture')}
      />
      <Button
        title="拍摄视频"
        onPress={() => navigation.navigate('VideoCapture')}
      />
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PhotoCapture" component={PhotoCaptureScreen} />
        {/* <Stack.Screen name="VideoCapture" component={VideoCaptureScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
