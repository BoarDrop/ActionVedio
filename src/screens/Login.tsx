import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {
  GoogleSigninButton,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {NavigationProp} from '@react-navigation/native';

interface LoginProps {
  navigation: NavigationProp<any>;
}

const listItems = [
  'Captures Your Moves: A camera records all your skateboarding tricks in high detail.',
  'Tracks Your Board Data: Sensors on the skateboard track speed, turns, and more, as you ride.',
  'Syncs Video & Data: The system matches your moves with the skateboard data, showing them together.',
  'Analyzes Your Skills: Use our software to see your performance and improve your skateboarding.',
];

const Login: React.FC<LoginProps> = ({navigation}) => {
  // 配置谷歌登录
  GoogleSignin.configure({
    webClientId:
      '324249181996-hte70tk62vquevj1gmnme9m2uv4joti5.apps.googleusercontent.com',
  });

  const signInWithGoogleAsync = async () => {
    try {
      // 触发Google登录流程，返回一个包含idToken的对象
      const {idToken} = await GoogleSignin.signIn();
      // 创建一个Firebase认证凭据
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // 完成Firebase认证过程，返回一个包含用户信息和令牌的对象
      const userSignInResult = await auth().signInWithCredential(
        googleCredential,
      );

      // 从userSignInResult中获取Firebase的ID令牌
      const firebaseToken = await userSignInResult.user.getIdToken(
        /* forceRefresh */ true,
      );

      // 这里可以将firebaseToken发送到你的服务器
      console.log(firebaseToken);

      // 例如，使用fetch或者其他HTTP客户端将token发送到你的后端
      // fetch('你的服务器URL', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ token: firebaseToken }),
      // });
    } catch (error) {
      console.log(error);
    }
  };

  // 定义一个异步函数signInWithGoogleAsync，用于处理Google登录流程
  // const signInWithGoogleAsync = async () => {
  //   try {
  //     // 调用GoogleSignin的signIn方法启动Google登录流程，并等待用户登录，获取idToken
  //     const {idToken} = await GoogleSignin.signIn();

  //     // 使用从Google登录获取的idToken创建一个认证凭据
  //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  //     // 使用上一步创建的认证凭据来通过Firebase的auth模块进行登录操作，并等待登录结果
  //     const userSignInResult = await auth().signInWithCredential(
  //       googleCredential,
  //     );

  //     // 如果登录成功，控制台将打印登录结果（用户信息）
  //     console.log(userSignInResult);
  //     //console.log(idToken);
  //   } catch (error) {
  //     // 如果在登录流程中发生错误，捕获错误并在控制台中打印
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.word}>
          <View style={styles.title}>
            <Text style={styles.title_inner}>
              REAL-TIME SHOOTING SYNCHRONIZED DATA
            </Text>
          </View>
          <View style={styles.img}>
            <Image
              source={require('../statics/images/first.png')}
              style={styles.img_inner}
            />
          </View>
          <View style={styles.dear}>
            <Text style={styles.dear_inner}>Dear Skater:</Text>
          </View>
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
        <View>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            style={styles.google}
            // 点击触发事件 跳转or登录
            onPress={() => navigation.navigate('Home')}
            //onPress={signInWithGoogleAsync}
          />
        </View>
        <View style={styles.bottom}>
          <View style={styles.front}>
            <View style={styles.line}></View>
            <View>
              <Text style={styles.or}>or</Text>
            </View>
            <View style={styles.line}></View>
          </View>
          <View style={styles.way}>
            <Text style={styles.way_text}>Want to use another way?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
  google: {
    width: 220,
    marginTop: -15,
  },
  word: {
    width: 320,
    height: 580,
    marginTop: 35,
    marginBottom: 40,
    justifyContent: 'space-between',
  },
  title: {
    width: '100%',
    height: 60,
  },
  title_inner: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  img: {
    width: '100%',
    height: 190,
  },
  img_inner: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  dear: {
    width: '100%',
    height: 26,
  },
  dear_inner: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    width: '100%',
    height: 250,
    justifyContent: 'space-between',
  },
  content_inner: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 17,
  },
  content_box: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content_number: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 17,
    marginRight: 5,
  },
  content_word: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 17,
  },
  bottom: {
    width: 320,
    height: 60,
    //backgroundColor: 'pink',
    justifyContent: 'space-between',
  },
  front: {
    width: 320,
    height: 25,
    //backgroundColor: '#9747FF',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  line: {
    width: 80,
    height: 1, // 线条的高度
    backgroundColor: 'white', // 线条的颜色
  },
  or: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 20,
    marginRight: 20,
  },
  way: {
    width: 320,
    height: 35,
    //backgroundColor: '#16D46B',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: -5,
  },
  way_text: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '400',
    //backgroundColor: 'pink',
  },
  sign_text: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});

export default Login;
