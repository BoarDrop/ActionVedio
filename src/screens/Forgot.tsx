// 登录界面
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import config from '../../config'; //接口全局配置部分
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';

interface SigninProps {
  navigation: NavigationProp<any>;
}

const Forgot: React.FC<SigninProps> = ({navigation}) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [newPassword, setnewPassword] = useState('');

  const API_BASE_URL: string = config.API_BASE_URL;

  const handleLogin = async () => {
    if (!emailAddress) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    try {
      const type = 'forget'; //选择需要发送验证码的类型，此处是注册
      // 假设这是你的发送验证码API
      const response = await axios.get(
        `${API_BASE_URL}users/emailCode/register?emailAddress=${emailAddress}&type=${type}`,
      );
      if (response.data.code === 0) {
        Alert.alert('Success', 'Verification code sent to your email.');
        console.log('Received data:', response.data); // 打印全部数据
        console.log("Navigating to 'Verify' with data:", {
          emailAddress,
          newPassword,
        });
        // 成功后，带着必要信息跳转到验证码界面
        navigation.navigate('VerifyForgot', {
          emailAddress: emailAddress,
          newPassword: newPassword,
        });
      } else {
        Alert.alert('Error', response.data.msg);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // 检查HTTP状态码
        const statusCode = error.response?.status;
        console.error('HTTP Status Code:', statusCode);

        // 解析错误响应体
        const errorData = error.response?.data;
        console.error('Error Response:', errorData);

        // 记录请求配置
        const requestConfig = error.config;
        console.error('Request Config:', requestConfig);

        // 使用error.toJSON()获取错误概述
        const errorDetails = error.toJSON();
        console.error('Error Details:', errorDetails);

        // 构建并显示错误消息
        const errorMessage =
          errorData?.message || errorData || 'Registration failed.';
        Alert.alert('Error', `Status Code: ${statusCode}, ${errorMessage}`);
      } else {
        // 其他类型的错误（例如网络问题或者配置错误）
        console.error('An unexpected error occurred:', error);
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.title}>
            <Text style={styles.title_text}>Reset Password</Text>
          </View>

          {/* 输入框 */}
          <View style={styles.input}>
            <TextInput
              style={styles.input_box}
              placeholder="Email"
              value={emailAddress}
              onChangeText={setEmailAddress}
            />
            <TextInput
              style={styles.input_box}
              placeholder="New Password"
              secureTextEntry={true} // 这会隐藏密码输入
              value={newPassword}
              onChangeText={setnewPassword} // 当文本变化时，更新状态
            />
          </View>

          {/* 登录按钮 */}
          <TouchableOpacity onPress={handleLogin}>
            <View style={styles.button}>
              <Text style={styles.button_text}>Confirm</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  content: {
    //width: 320,
    //height: 460,
    width: wp('89%'),
    height: hp('61%'),
    //marginTop: 100,
    marginTop: hp('13.5%'),
  },
  title: {
    //width: 320,
    //height: 40,
    width: wp('89%'),
    height: hp('5.3%'),
    alignItems: 'center',
    justifyContent: 'center',
    //marginBottom: 10,
    marginBottom: hp('1.3%'),
  },
  title_text: {
    color: '#0A0615',
    //fontSize: 26,
    fontSize: wp('7.25%'),
    fontWeight: '600',
  },
  input: {
    //width: 320,
    //height: 150,
    width: wp('89%'),
    height: hp('19.5%'),
    alignItems: 'center',
    //marginBottom: 20,
    marginBottom: hp('2.6%'),
  },
  input_box: {
    //height: 53,
    width: '100%',
    height: hp('7%'),
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#F8FAFC',
  },
  button: {
    //width: 320,
    //height: 53,
    width: wp('89%'),
    height: hp('7%'),
    backgroundColor: '#000000',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_text: {
    color: '#FFFFFF',
    //fontSize: 18,
    fontSize: wp('5%'),
    fontWeight: '500',
  },
});

export default Forgot;
