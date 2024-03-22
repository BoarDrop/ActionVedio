import React from 'react';
import {
  Button,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video from '../components/Video';
import Stars from '../statics/images/three-stars.svg';
import Camera from '../statics/images/camera.svg';
import { NavigationProp } from '@react-navigation/native';
import ScanAndConnect from '../components/ScanAndConnect/ScanAndConnect';
import { useContext } from 'react';
import { ParamListBase } from '@react-navigation/routers';    // 导入ParamListBase类型，用于定义路由参数
import bleContext from '../contexts/BLEContext';    // 导入bleContext上下文

// 如果您的 navigation prop 有具体的类型定义，可以替换 `any`
interface HomeProps {
  navigation: NavigationProp<any>;
}

const {width} = Dimensions.get('window');

const Home: React.FC<{ navigation: NavigationProp<ParamListBase> }> = ({ navigation }) => {
  const bleData = useContext(bleContext);
  return (
    <>    
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.top_image}>
            <Image
              source={require('../statics/images/cover.png')}
              style={styles.jump}
            />
            <LinearGradient
              colors={[
                'rgba(0,0,0,0.0)',
                'rgba(0,0,0,0.1)',
                'rgba(0,0,0,0.25)',
                'rgba(0,0,0,0.4)',
                'rgba(0,0,0,0.65)',
                'rgba(0,0,0,1)',
              ]}
              style={styles.gradientTop}
            />
            <View style={styles.star_box}>
              <View style={{width: 240}}>
                <Text style={styles.real_time}>
                  REAL-TIME SHOOTING SYNCHRONIZED DATA
                </Text>
              </View>
              <View style={{top: 15}}>
                <Stars width={30} height={30} />
              </View>
            </View>
            <Text style={styles.capture}>
              Capture and analyze every skateboard move in real-time with a
              system that syncs high-definition video with onboard sensor data.
            </Text>
          </View> 

          {
            !bleData ? (
              <Text>Loading or Bluetooth not available...</Text>
            ) : !bleData.connectedDevice ? (
              // 确保bleData非null时才渲染ScanAndConnect组件
              <ScanAndConnect connectToDevice={bleData.connectToDevice} />
            ) : (
              // 如果有设备连接则展示设备连接后的组件
              <TouchableOpacity onPress={() => {console.log('Connect Device')}}>
                <View style={styles.connectDeviceButton}>
                  <Text>Device Connected</Text>
                </View>
              </TouchableOpacity>
            )
        }  

          <View style={styles.portfolio}>
            <Text style={styles.port_text}>Portfolio</Text>
            <View style={styles.video_box}>
              <View style={styles.row_box}>
                <Video />
                <Video />
              </View>
              <View style={styles.row_box}>
                <Video />
                <Video />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.button_box}>
        <TouchableOpacity
          style={styles.shot}
          onPress={() => navigation.navigate('Shot')}>
          <Camera width={30} height={30} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  connectDeviceButton: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: undefined, // React Native中通常不需要设置lineHeight为'normal'，你可以移除这一行或者设置具体的数值

    width: 331,
    height: 42,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // gap属性在React Native中没有直接对应，如果需要间隔，通常是通过在子元素间添加额外的视图或空间来实现
    flexShrink: 0,

    borderRadius: 5,
    backgroundColor: '#FFF',

    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  top_image: {
    position: 'relative',
    width: width,
    height: 360,
  },
  jump: {
    width: 360,
    height: 360,
  },
  gradientTop: {
    position: 'absolute',
    height: 90,
    width: width,
    bottom: 0,
  },
  star_box: {
    display: 'flex',
    height: 60,
    width: width,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    gap: 35,
  },
  real_time: {
    position: 'absolute',
    left: 20,
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
  },
  capture: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
    width: 320,
    alignItems: 'center',
  },
  device: {
    width: 290,
    height: 42,
    backgroundColor: 'white',
    marginTop: 20,
    marginBottom: -8,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  device_text: {
    color: 'black',
    fontSize: 24,
    fontWeight: '700',
  },
  portfolio: {
    position: 'relative',
    width: width,
    height: 600,
  },
  port_text: {
    fontSize: 24,
    color: 'white',
    fontWeight: '700',
    left: 20,
    marginTop: 20,
  },
  video_box: {
    width: width - 40,
    height: 550,
    position: 'relative',
    left: 20,
    flexDirection: 'column',
    //backgroundColor: 'white',
  },
  row_box: {
    width: 320,
    flexDirection: 'row',
    marginTop: 30,
    position: 'relative',
    gap: 20,
  },
  button_box: {
    width: 60,
    height: 60,
    position: 'absolute',
    right: 30,
    bottom: 40,
  },
  shot: {
    width: 60,
    height: 60,
    position: 'absolute',
    backgroundColor: '#4527A0',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
