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
import Google from '../components/Google/Google';
import config from '../../config';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface SigninProps {
  navigation: NavigationProp<any>;
}

const Signin: React.FC<SigninProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const API_BASE_URL: string = config.API_BASE_URL;

  const handleLogin = () => {
    const loginData = {
      email: email,
      password: password,
    };

    fetch(`${API_BASE_URL}users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.code === 0) {
          // 登录成功，可以将data.data（token）保存起来，用于之后的请求认证
          // 跳转到Home页面
          navigation.navigate('Home');
        } else {
          // 显示错误消息
          Alert.alert('Login Failed', data.msg);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Login Error', 'An error occurred. Please try again.');
      });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.title}>
            <Text style={styles.title_text}>Sign In</Text>
          </View>

          {/* 输入框 */}
          <View style={styles.input}>
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
              onChangeText={setPassword} // 当文本变化时，更新状态
            />
          </View>

          {/* 登录按钮 */}
          {/* <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style={styles.button}>
              <Text style={styles.button_text}>Sign In</Text>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={handleLogin}>
            <View style={styles.button}>
              <Text style={styles.button_text}>Sign In</Text>
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

          {/* 忘记密码跳转注册 */}
          <View style={styles.forgot}>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.forgot_text}>Forgot Password?</Text>
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
  front: {
    //width: 320,
    //height: 25,
    width: wp('89%'),
    height: hp('3.3%'),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    //marginTop: 20,
    marginTop: hp('2.6%'),
  },
  line: {
    //width: 90,
    //height: 1, // 线条的高度
    width: wp('25%'),
    height: hp('0.13%'),
    backgroundColor: '#A8A6A7', // 线条的颜色
  },
  or: {
    color: '#000000',
    //fontSize: 16,
    fontSize: wp('4.4%'),
    fontWeight: '400',
    marginLeft: 20,
    marginRight: 20,
  },
  google_button: {
    //width: 320,
    //height: 60,
    width: wp('89%'),
    height: hp('8%'),
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 15,
    marginTop: hp('1.95%'),
    //marginBottom: 10,
    marginBottom: hp('1.3%'),
  },
  google: {
    //width: 220,
    width: wp('61%'),
  },
  forgot: {
    //width: 320,
    //height: 30,
    width: wp('89%'),
    height: hp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 5,
    marginTop: hp('0.65%'),
  },
  forgot_text: {
    color: '#000000',
    //fontSize: 16,
    fontSize: wp('4.4%'),
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

export default Signin;
