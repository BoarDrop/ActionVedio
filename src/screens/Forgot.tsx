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
import config from '../../config';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface SigninProps {
  navigation: NavigationProp<any>;
}

const Forgot: React.FC<SigninProps> = ({navigation}) => {
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
            <Text style={styles.title_text}>Reset Password</Text>
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
              placeholder="New Password"
              secureTextEntry={true} // 这会隐藏密码输入
              value={password}
              onChangeText={setPassword} // 当文本变化时，更新状态
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
