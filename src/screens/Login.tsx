import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  GoogleSigninButton,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const Login = () => {
  GoogleSignin.configure({
    webClientId:
      '324249181996-hte70tk62vquevj1gmnme9m2uv4joti5.apps.googleusercontent.com',
  });

  // 定义一个异步函数signInWithGoogleAsync，用于处理Google登录流程
  const signInWithGoogleAsync = async () => {
    try {
      // 调用GoogleSignin的signIn方法启动Google登录流程，并等待用户登录，获取idToken
      const {idToken} = await GoogleSignin.signIn();

      // 使用从Google登录获取的idToken创建一个认证凭据
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // 使用上一步创建的认证凭据来通过Firebase的auth模块进行登录操作，并等待登录结果
      const userSignInResult = await auth().signInWithCredential(
        googleCredential,
      );

      // 如果登录成功，控制台将打印登录结果（用户信息）
      console.log(userSignInResult);
    } catch (error) {
      // 如果在登录流程中发生错误，捕获错误并在控制台中打印
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signInWithGoogleAsync}
          // onPress={() => console.log('Button Clicked')}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default Login;
