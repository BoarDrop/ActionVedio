import React, {useState} from 'react';
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

interface ShotProps {
  navigation: NavigationProp<any>;
}

const Shot: React.FC<ShotProps> = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
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
          <Image
            source={require('../statics/images/cover.png')}
            style={styles.skate_image}
            resizeMode="cover" // 或者 'stretch' 来填满容器
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
              <Text style={styles.time}>00:00</Text>
            </View>
          </View>

          {/* 调用Button组件 */}
          <View style={styles.bottom}>
            <Button />
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
