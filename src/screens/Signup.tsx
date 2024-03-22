// 注册界面
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
import Google from '../components/Google/Google';
import axios from 'axios';
import config from '../../config';

interface SignupProps {
  navigation: NavigationProp<any>;
}

const Signup: React.FC<SignupProps> = ({navigation}) => {
  const [isSelected, setSelection] = useState(false);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const API_BASE_URL: string = config.API_BASE_URL;

  const sendVerificationCode = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    try {
      // 假设这是你的发送验证码API
      const response = await axios.get(
        `${API_BASE_URL}users/emailCode/register?emailAddress=${email}`,
      );
      if (response.data.code === 0) {
        Alert.alert('Success', 'Verification code sent to your email.');
        console.log('Received data:', response.data); // 打印全部数据
        console.log("Navigating to 'Verify' with data:", {
          email,
          username,
          password,
        });
        // 成功后，带着必要信息跳转到验证码界面
        navigation.navigate('Verify', {
          email: email,
          username: username,
          password: password,
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
            <Text style={styles.title_text}>Sign Up</Text>
          </View>

          <View style={styles.input}>
            {/* 输入框 */}
            <TextInput
              style={styles.input_box}
              placeholder="Full Name"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input_box}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input_box}
              placeholder="Password"
              secureTextEntry={true} // 这会隐藏密码输入
              value={password}
              onChangeText={setPassword}
            />

            {/* 圆形可选框 */}
            <TouchableOpacity
              style={styles.click}
              onPress={() => setSelection(!isSelected)}>
              <View style={styles.checkbox}>
                {isSelected && <View style={styles.checked} />}
              </View>
              <Text style={styles.label}>
                By continuing you accept our Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>

          {/* 点击注册跳转验证 */}
          {/* <TouchableOpacity onPress={() => navigation.navigate('Verify')}>
            <View style={styles.button}>
              <Text style={styles.button_text}>Send the verification code</Text>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={sendVerificationCode}>
            <View style={styles.button}>
              <Text style={styles.button_text}>Send the verification code</Text>
            </View>
          </TouchableOpacity>

          {/* 分割线 */}
          <View style={styles.front}>
            <View style={styles.line}></View>
            <View>
              <Text style={styles.or}>or sign in with</Text>
            </View>
            <View style={styles.line}></View>
          </View>

          {/* 谷歌一键登录按钮 */}
          <View style={styles.google_button}>
            <Google />
          </View>

          {/* 更改登录方式跳转登录界面 */}
          <View style={styles.way}>
            <Text style={styles.way_text}>Want to use another way?</Text>
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
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  content: {
    width: 320,
    height: 550,
    //backgroundColor: 'pink',
    marginTop: 100,
  },
  title: {
    width: 320,
    height: 40,
    //backgroundColor: '#DCFFDE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  title_text: {
    color: '#0A0615',
    fontSize: 26,
    fontWeight: '600',
  },
  input: {
    width: 320,
    height: 255,
    //backgroundColor: '#BCFDF5',
    alignItems: 'center',
    marginBottom: 20,
  },
  input_box: {
    height: 53,
    width: '100%',
    marginVertical: 10,
    //borderWidth: 1,
    //borderColor: 'black',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#F8FAFC',
  },
  click: {
    height: 30,
    width: 320,
    //backgroundColor: '#16D46B',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  checkbox: {
    height: 18,
    width: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E9EF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginLeft: 10,
  },
  checked: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#8A9BA3',
  },
  label: {
    fontSize: 13,
    color: '#9299A3',
  },
  button: {
    width: 320,
    height: 53,
    backgroundColor: '#000000',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -8,
  },
  button_text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
  front: {
    width: 320,
    height: 25,
    //backgroundColor: '#9747FF',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  line: {
    width: 90,
    height: 1, // 线条的高度
    backgroundColor: '#A8A6A7', // 线条的颜色
  },
  or: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 20,
    marginRight: 20,
  },
  google_button: {
    width: 320,
    height: 60,
    //backgroundColor: '#6473B6',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  way: {
    width: 320,
    height: 35,
    //backgroundColor: '#16D46B',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  way_text: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '400',
    //backgroundColor: 'pink',
  },
  sign_text: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});

export default Signup;
