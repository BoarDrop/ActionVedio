import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {
  GoogleSigninButton,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';

interface SignupProps {
  navigation: NavigationProp<any>;
}

const Signup: React.FC<SignupProps> = ({navigation}) => {
  const [isSelected, setSelection] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.title}>
            <Text style={styles.title_text}>Sign Up</Text>
          </View>
          <View style={styles.input}>
            <TextInput style={styles.input_box} placeholder="Full Name" />
            <TextInput style={styles.input_box} placeholder="Email" />
            <TextInput
              style={styles.input_box}
              placeholder="Password"
              secureTextEntry={true} // 这会隐藏密码输入
            />
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
          <TouchableOpacity onPress={() => navigation.navigate('Verify')}>
            <View style={styles.button}>
              <Text style={styles.button_text}>Sign Up</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.front}>
            <View style={styles.line}></View>
            <View>
              <Text style={styles.or}>or sign in with</Text>
            </View>
            <View style={styles.line}></View>
          </View>
          <View style={styles.google_button}>
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              style={styles.google}
              // 点击触发事件 跳转or登录
              onPress={() => navigation.navigate('Home')}
              //onPress={signInWithGoogleAsync}
            />
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
    marginTop: 15,
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
    marginTop: 20,
  },
  google: {
    width: 220,
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
