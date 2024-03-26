// 进入app的介绍欢迎界面
import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import Google from '../components/Google/Google';
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
    width: widthPercent(320),
    height: heightPercent(60),
    marginTop: marginTopPercent(-23),
  },
  word: {
    width: widthPercent(322),
    height: heightPercent(570),
    marginTop: marginTopPercent(35),
    marginBottom: marginBottomPercent(40),
    justifyContent: 'space-between',
  },
  title: {
    width: '100%',
    height: heightPercent(60),
  },
  title_inner: {
    color: 'white',
    fontSize: fontSizePercent(24),
    fontWeight: '700',
  },
  img: {
    width: '100%',
    height: heightPercent(183),
  },
  img_inner: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  dear: {
    width: '100%',
    height: heightPercent(25),
  },
  dear_inner: {
    color: 'white',
    fontSize: fontSizePercent(20),
    fontWeight: '700',
  },
  content: {
    width: '100%',
    height: heightPercent(250),
    justifyContent: 'space-between',
  },
  content_inner: {
    color: 'white',
    fontSize: fontSizePercent(12),
    fontWeight: '700',
    lineHeight: 17,
  },
  content_box: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content_number: {
    color: 'white',
    fontSize: fontSizePercent(12),
    fontWeight: '700',
    lineHeight: 17,
    marginRight: 5,
  },
  content_word: {
    color: 'white',
    fontSize: fontSizePercent(12),
    fontWeight: '700',
    lineHeight: 17,
  },
  bottom: {
    width: widthPercent(320),
    height: heightPercent(60),
    justifyContent: 'space-between',
  },
  front: {
    width: widthPercent(320),
    height: heightPercent(22),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: marginTopPercent(5),
  },
  line: {
    width: widthPercent(100),
    height: 1, // 线条的高度
    backgroundColor: 'white', // 线条的颜色
  },
  or: {
    color: '#FFFFFF',
    fontSize: fontSizePercent(16),
    fontWeight: '400',
    marginLeft: 20,
    marginRight: 20,
  },
  way: {
    width: widthPercent(320),
    height: heightPercent(35),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    //gap: 10,
    gap: wp('3.2%'),
    marginTop: marginTopPercent(-5),
  },
  way_text: {
    color: '#FFFFFF',
    fontSize: fontSizePercent(15),
    fontWeight: '400',
  },
  sign_text: {
    color: '#FFFFFF',
    fontSize: fontSizePercent(15),
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});

export default Login;
