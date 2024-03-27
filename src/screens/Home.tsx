import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video from '../components/Video/Video';
import Stars from '../statics/images/three-stars.svg';
import Camera from '../statics/images/camera.svg';
import { NavigationProp } from '@react-navigation/native';
import ScanAndConnect from '../components/ScanAndConnect/ScanAndConnect';
import { useContext } from 'react';
import { ParamListBase } from '@react-navigation/routers';    // 导入ParamListBase类型，用于定义路由参数
import bleContext from '../contexts/BLEContext';    // 导入bleContext上下文
import { useState,useEffect } from 'react';
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

// 如果您的 navigation prop 有具体的类型定义，可以替换 `any`
interface HomeProps {
  navigation: NavigationProp<any>;
}

interface VideoData {
  videoId: number;
  address: string;
  name: string;
  jumpNum: number;
  score: number;
  olleeNum: number;
  time: number;
}


const {width} = Dimensions.get('window');

const Home: React.FC<{ navigation: NavigationProp<ParamListBase> }> = ({ navigation }) => {
  const bleData = useContext(bleContext);

  // 明确指定 videos 状态的类型为 VideoData 数组
  const [videos, setVideos] = useState<VideoData[]>([]);

  // 模拟从API获取数据
  useEffect(() => {
    // 假设这是你调用API并获取数据的函数
    fetchData();
  }, []);

  const fetchData = async () => {
    // 模拟API调用
    const apiResponse = {
      erroCode: 0,
      message: "success",
      data: [
        {
          videoId: 1,
          address: "https://static.tgt8.xyz/video/43cb772f87aaf9491f40149324fa60f7.mp4",
          name: "测试", // 假设这是你想要作为标题的属性
          jumpNum: 0,
          score: 0,
          olleeNum: 0,
          time: 24
        },
        // 添加更多视频数据以模拟多个视频
      ]
    };

    if(apiResponse.erroCode === 0) {
      setVideos(apiResponse.data);
    }
  };

  return (
    <>    
      <ScrollView>
        <View style={styles.container}>
          {/* 封面照片 */}
          <View style={styles.top_image}>
            <Image
              source={require('../statics/images/cover.png')}
              style={styles.jump}
            />

            {/* 阴影部分 */}
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

            {/* 信息介绍 */}
            <View style={styles.star_box}>
              <View style={{width: widthPercent(240)}}>
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
              {videos.map((video, index) => (
                <View key={video.videoId} style={styles.row_box}>
                  <Video imageSource={{uri: video.address}} title={video.name} />
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 跳转拍摄按钮 */}
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
    width: '100%', // 全屏宽度
    height: heightPercent(360),
  },
  jump: {
    width: widthPercent(360),
    height: heightPercent(360),
  },
  gradientTop: {
    position: 'absolute',
    height: heightPercent(90),
    width: '100%',
    bottom: 0,
  },
  star_box: {
    display: 'flex',
    height: heightPercent(60),
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: marginBottomPercent(20),
    gap: 35,
  },
  real_time: {
    position: 'absolute',
    //left: 20,
    left: wp('5.5%'),
    color: 'white',
    fontSize: fontSizePercent(21.3),
    fontWeight: '700',
  },
  capture: {
    position: 'absolute',
    bottom: 0,
    //left: 20,
    left: wp('5.5%'),
    color: 'white',
    fontSize: fontSizePercent(10),
    fontWeight: '700',
    width: widthPercent(320),
    alignItems: 'center',
  },
  device: {
    width: widthPercent(310),
    height: heightPercent(42),
    backgroundColor: 'white',
    marginTop: marginTopPercent(20),
    marginBottom: marginBottomPercent(-8),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  device_text: {
    color: 'black',
    //fontSize: 24,
    fontSize: wp('6.7%'),
    fontWeight: '700',
  },
  portfolio: {
    position: 'relative',
    width: wp('100%'),
    //height: 600,
    height: hp('80%'),
  },
  port_text: {
    fontSize: fontSizePercent(24),
    color: 'white',
    fontWeight: '700',
    //left: 20,
    left: wp('5.5%'),
    marginTop: marginTopPercent(28),
  },
  video_box: {
    width: width - 40,
    height: heightPercent(550),
    position: 'relative',
    //left: 20,
    left: wp('5.5%'),
    flexDirection: 'column',
    marginTop: marginTopPercent(-15),
  },
  row_box: {
    width: widthPercent(320),
    flexDirection: 'row',
    marginTop: marginTopPercent(30),
    position: 'relative',
    //gap: 20,
    gap: wp('5.6%'),
  },
  button_box: {
    width: widthPercent(60),
    height: heightPercent(60),
    position: 'absolute',
    // right: 30,
    bottom: marginBottomPercent(40),
    right: wp('6.5%'),
  },
  shot: {
    width: widthPercent(60),
    height: heightPercent(60),
    position: 'absolute',
    backgroundColor: '#4527A0',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
