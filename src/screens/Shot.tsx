import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Button from '../components/Button/Button';
import {NavigationProp} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
    //width: '100%',
    //height: 50,
    width: wp('100%'),
    height: hp('6.67%'),
    backgroundColor: 'black',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    //gap: 35,
    gap: wp('10.5%'),
  },
  dis: {
    color: 'red',
    //fontSize: 15,
    fontSize: wp('4.2%'),
    fontWeight: '500',
  },
  obj: {
    color: 'white',
    //fontSize: 18,
    fontSize: wp('5%'),
    fontWeight: '500',
  },
  black: {
    color: 'black',
    //fontSize: 18,
    fontSize: wp('5%'),
    fontWeight: '500',
  },
  middle: {
    flex: 1, // 这里的flex: 1是关键，它会使得图片容器填充所有剩余空间
    width: wp('100%'), // 确保图片宽度铺满屏幕宽度
    // 如果不需要Image的边距或填充，这些可以不设置或设置为0
  },
  skate_image: {
    width: '100%',
    height: '100%', // 确保图片高度铺满容器高度
  },
  grey: {
    width: '100%',
    //height: 190,
    height: hp('25%'),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  top: {
    flexDirection: 'row',
    //width: 330,
    width: wp('91%'),
    //height: 68,
    height: hp('9%'),
  },
  left: {
    //width: 265,
    width: wp('73.5%'),
    //height: 68,
    height: hp('9%'),
  },
  word: {
    color: 'white',
    //fontSize: 18,
    fontSize: wp('5%'),
    fontWeight: '400',
  },
  right: {
    justifyContent: 'flex-end',
    marginBottom: 0,
  },
  time: {
    //fontSize: 24,
    fontSize: wp('6.7%'),
    fontWeight: '700',
    color: '#848484',
  },
  bottom: {
    width: '100%',
    //height: 48,
    height: hp('6.4%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Shot;
