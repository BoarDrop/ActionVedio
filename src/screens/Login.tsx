// 进入app的介绍欢迎界面
import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import Google from '../components/Google/Google';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface LoginProps {
  navigation: NavigationProp<any>;
}

// 有序列表中的详情信息
const listItems = [
  'Captures Your Moves: A camera records all your skateboarding tricks in high detail.',
  'Tracks Your Board Data: Sensors on the skateboard track speed, turns, and more, as you ride.',
  'Syncs Video & Data: The system matches your moves with the skateboard data, showing them together.',
  'Analyzes Your Skills: Use our software to see your performance and improve your skateboarding.',
];

const Login: React.FC<LoginProps> = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        {/* 固定信息部分*/}
        <View style={styles.word}>
          {/* 标题 */}
          <View style={styles.title}>
            <Text style={styles.title_inner}>
              REAL-TIME SHOOTING SYNCHRONIZED DATA
            </Text>
          </View>

          {/* 图片 */}
          <View style={styles.img}>
            <Image
              source={require('../statics/images/first.png')}
              style={styles.img_inner}
            />
          </View>
          <View style={styles.dear}>
            <Text style={styles.dear_inner}>Dear Skater:</Text>
          </View>

          {/* 详情 */}
          <View style={styles.content}>
            <Text style={styles.content_inner}>
              Excited to share our latest tech: a system that captures your
              skateboarding moves in real-time and syncs it with data from your
              board!{' '}
            </Text>
            <View>
              <Text style={styles.content_inner}>What It Does:</Text>
              {listItems.map((item, index) => (
                <View key={index} style={styles.content_box}>
                  <Text style={styles.content_number}>{index + 1}.</Text>
                  <Text style={styles.content_word}>{item}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.content_inner}>
              You can try Google login to try our latest application.
            </Text>
          </View>
        </View>

        {/* 谷歌一键登录按钮 */}
        <View style={styles.google_btn}>
          <Google />
        </View>
        <View style={styles.bottom}>
          {/* 分割线 */}
          <View style={styles.front}>
            <View style={styles.line}></View>
            <View>
              <Text style={styles.or}>or</Text>
            </View>
            <View style={styles.line}></View>
          </View>
          <View style={styles.way}>
            <Text style={styles.way_text}>Want to use another way?</Text>
            {/* 切换登录方式 */}
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
              <Text style={styles.sign_text}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  google_btn: {
    // width: 320,
    // height: 60,
    // marginTop: -25,
    width: wp('90%'), // 假设屏幕宽度为375pt，则此处约为320pt
    height: hp('8%'), // 基于高度的百分比
    marginTop: hp('-3%'),
  },
  word: {
    //width: 320,
    //height: 580,
    //marginTop: 35,
    //marginBottom: 40,
    width: wp('90%'),
    height: hp('76.5%'), // 根据屏幕高度的百分比调整
    marginTop: hp('4.6%'),
    marginBottom: hp('5.3%'),
    justifyContent: 'space-between',
  },
  title: {
    width: '100%',
    //height: 60,
    height: hp('8%'),
  },
  title_inner: {
    color: 'white',
    //fontSize: 24,
    fontSize: wp('6.7%'), // 基于屏幕宽度的百分比调整字体大小
    fontWeight: '700',
  },
  img: {
    width: '100%',
    //height: 190,
    height: hp('25%'),
  },
  img_inner: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  dear: {
    width: '100%',
    //height: 26,
    height: hp('3.4%'),
  },
  dear_inner: {
    color: 'white',
    //fontSize: 20,
    fontSize: wp('5.6%'),
    fontWeight: '700',
  },
  content: {
    width: '100%',
    //height: 250,
    height: hp('33%'),
    justifyContent: 'space-between',
  },
  content_inner: {
    color: 'white',
    //fontSize: 12,
    fontSize: wp('3.3%'),
    fontWeight: '700',
    lineHeight: 17,
  },
  content_box: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content_number: {
    color: 'white',
    //fontSize: 12,
    fontSize: wp('3.3%'),
    fontWeight: '700',
    lineHeight: 17,
    marginRight: 5,
  },
  content_word: {
    color: 'white',
    //fontSize: 12,
    fontSize: wp('3.3%'),
    fontWeight: '700',
    lineHeight: 17,
  },
  bottom: {
    // width: 320,
    // height: 60,
    width: wp('90%'),
    height: hp('8%'),
    justifyContent: 'space-between',
  },
  front: {
    // width: 320,
    // height: 25,
    width: wp('90%'),
    height: hp('3.3%'),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    //marginTop: 5,
    marginTop: hp('0.66%'),
  },
  line: {
    //width: 100,
    width: wp('28%'),
    height: 1, // 线条的高度
    backgroundColor: 'white', // 线条的颜色
  },
  or: {
    color: '#FFFFFF',
    //fontSize: 16,
    fontSize: wp('4.4%'),
    fontWeight: '400',
    marginLeft: 20,
    marginRight: 20,
  },
  way: {
    //width: 320,
    //height: 35,
    width: wp('90%'),
    height: hp('4.6%'),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    //gap: 10,
    gap: wp('3.2%'),
    //marginTop: -5,
    marginTop: hp('-0.66%'),
  },
  way_text: {
    color: '#FFFFFF',
    //fontSize: 15,
    fontSize: wp('4.2%'),
    fontWeight: '400',
    //backgroundColor: 'pink',
  },
  sign_text: {
    color: '#FFFFFF',
    //fontSize: 15,
    fontSize: wp('4.2%'),
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});

export default Login;
