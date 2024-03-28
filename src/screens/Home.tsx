import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video from '../components/Video/Video';
import Sensor from '../components/Sensor/Sensor';
import Stars from '../statics/images/three-stars.svg';
import Camera from '../statics/images/camera.svg';
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

// 如果您的 navigation prop 有具体的类型定义，可以替换 `any`
interface HomeProps {
  navigation: NavigationProp<any>;
}

const {width} = Dimensions.get('window');

const Home: React.FC<HomeProps> = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(true);
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

          {/* 设备状态 */}
          <View style={styles.device}>
            <Text style={styles.device_text}> None Device</Text>
          </View>

          {/* 全部视频文件夹 */}
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

      {/* 跳转拍摄按钮 */}
      <View style={styles.button_box}>
        <TouchableOpacity
          style={styles.shot}
          onPress={() => navigation.navigate('Shot')}>
          <Camera width={30} height={30} />
        </TouchableOpacity>
      </View>

      {/* 蓝牙连接遮罩部分 */}
      {/* <View style={styles.mask}>
        <Sensor />
      </View> */}
      {isVisible && (
        <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
          <View style={styles.fullScreen}>
            {isVisible && (
              <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
                <View style={styles.mask}>
                  {/* 你的 Sensor 组件 */}
                  <Sensor />
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
  fullScreen: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'flex-end',
  },
  mask: {
    width: '100%', // 全屏宽度
    height: heightPercent(375),
    //backgroundColor: 'pink',
    position: 'absolute',
    bottom: 0,
  },
});

export default Home;
