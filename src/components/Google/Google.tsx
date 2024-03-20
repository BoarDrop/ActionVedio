// Google按钮
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  GoogleSigninButton,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/core';

import auth from '@react-native-firebase/auth';
import Goog from '../../statics/images/google.svg';

const Google: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

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
        <TouchableOpacity onPress={signInWithGoogleAsync}>
          <View style={styles.frame}>
            <Goog />
            <Text style={styles.google_text}>Sign in with Google</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={styles.frame}>
            <Goog />
            <Text style={styles.google_text}>Sign in with Google</Text>
          </View>
        </TouchableOpacity> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    width: 320,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 15,
    borderWidth: 0.8,
    borderColor: '#D6DECF',
  },
  google_text: {
    color: '#757575',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Google;
