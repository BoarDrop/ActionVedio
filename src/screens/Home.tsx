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
    width: wp('100%'), // 全屏宽度
    //height: 360,
    height: hp('47.5%'), // 调整为屏幕高度的百分比
  },
  jump: {
    // width: 360,
    // height: 360,
    width: wp('100%'), // 全屏宽度
    height: hp('47.5%'), // 高度也做相应调整
  },
  gradientTop: {
    position: 'absolute',
    //height: 90,
    height: hp('12%'),
    width: wp('100%'),
    bottom: 0,
  },
  star_box: {
    display: 'flex',
    //height: 60,
    height: hp('7.9%'),
    width: wp('100%'),
    flexDirection: 'row',
    position: 'absolute',
    // bottom: 20,
    // gap: 35,
    bottom: hp('2.7%'),
    gap: wp('9.6%'),
  },
  real_time: {
    position: 'absolute',
    //left: 20,
    left: wp('5.5%'),
    color: 'white',
    //fontSize: 22,
    fontSize: wp('5.8%'),
    fontWeight: '700',
  },
  capture: {
    position: 'absolute',
    bottom: 0,
    //left: 20,
    left: wp('5.5%'),
    color: 'white',
    //fontSize: 10,
    fontSize: wp('2.8%'),
    fontWeight: '700',
    //width: 320,
    width: wp('90%'),
    alignItems: 'center',
  },
  device: {
    // width: 310,
    // height: 42,
    width: wp('86%'),
    height: hp('5.6%'),
    backgroundColor: 'white',
    // marginTop: 20,
    // marginBottom: -8,
    marginTop: hp('2.6%'),
    marginBottom: hp('-1.1%'),
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
    //fontSize: 24,
    fontSize: wp('6.7%'),
    color: 'white',
    fontWeight: '700',
    //left: 20,
    left: wp('5.5%'),
    //marginTop: 20,
    marginTop: hp('3.7%'),
  },
  video_box: {
    //width: width - 40,
    width: wp('90%'),
    //height: 550,
    height: hp('72.5%'),
    position: 'relative',
    //left: 20,
    left: wp('5.5%'),
    flexDirection: 'column',
    //marginTop: -15,
    marginTop: hp('-2%'),
  },
  row_box: {
    //width: 320,
    width: wp('89%'),
    flexDirection: 'row',
    //marginTop: 30,
    marginTop: hp('3.9%'),
    position: 'relative',
    //gap: 20,
    gap: wp('5.6%'),
  },
  button_box: {
    //width: 60,
    width: wp('13.8%'),
    //height: 60,
    height: hp('7.9%'),
    position: 'absolute',
    // right: 30,
    // bottom: 40,
    right: wp('8.5%'),
    bottom: hp('5%'),
  },
  shot: {
    width: 60,
    //width: wp('13.8%'),
    height: 60,
    //height: hp('7.9%'),
    position: 'absolute',
    backgroundColor: '#4527A0',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
