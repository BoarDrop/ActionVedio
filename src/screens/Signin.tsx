// 登录界面
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import Google from '../components/Google/Google';

interface SigninProps {
  navigation: NavigationProp<any>;
}

const Signin: React.FC<SigninProps> = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.title}>
            <Text style={styles.title_text}>Sign In</Text>
          </View>

          {/* 输入框 */}
          <View style={styles.input}>
            <TextInput style={styles.input_box} placeholder="Email" />
            <TextInput
              style={styles.input_box}
              placeholder="Password"
              secureTextEntry={true} // 这会隐藏密码输入
            />
          </View>

          {/* 登录按钮 */}
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
    width: 320,
    height: 460,
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
    height: 150,
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
  button: {
    width: 320,
    height: 53,
    backgroundColor: '#000000',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
  google: {
    width: 220,
  },
  forgot: {
    width: 320,
    height: 30,
    //backgroundColor: '#6473B6',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  forgot_text: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

export default Signin;
