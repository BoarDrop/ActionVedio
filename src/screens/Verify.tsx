// 验证界面
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {
  NavigationProp,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import axios from 'axios';
import {RouteProp} from '@react-navigation/native';
import config from '../../config';
import {
  widthPercent,
  heightPercent,
  fontSizePercent,
  marginTopPercent,
  marginBottomPercent,
} from '../utils/responsiveUtils';

type VerifyScreenRouteProp = RouteProp<
  {params: {email: string; username: string; password: string}},
  'params'
>;

interface VerifyProps {
  navigation: NavigationProp<any>;
}

type RootStackParamList = {
  Signup: undefined; // 定义其他路由及其参数类型
  // ...其他路由
};

type VerifyRouteParams = {
  email: string;
  username: string;
  password: string;
};

// 验证框逻辑
// 定义CodeInput组件，它接收length和onCodeComplete两个属性。
// length是验证码的长度，onCodeComplete是当用户完成验证码输入时调用的回调函数。
const CodeInput: React.FC<{
  length: number; // 验证码长度
  onCodeComplete: (code: string) => void; // 完成输入时的回调
}> = ({length, onCodeComplete}) => {
  // 使用useState钩子创建code状态，初始值是由length长度定义的空字符串数组。
  // 这个数组用来存储用户输入的每个数字。
  const [code, setCode] = useState(new Array(length).fill(''));

  // 使用useRef钩子创建inputRefs引用，存储每个TextInput的引用。
  // 这允许我们在需要时操作这些TextInput，例如自动聚焦到下一个输入框。
  const inputRefs = useRef<(TextInput | null)[]>(new Array(length).fill(null));

  // 用于侦听length属性的变化并进行更新
  useEffect(() => {
    // 当length属性变化时，重置code状态和inputRefs
    setCode(new Array(length).fill(''));
    inputRefs.current = new Array(length).fill(null);
  }, [length]); // 依赖项列表中包含length，表示此副作用依赖length属性

  // handleTextChange处理每次用户输入变化。
  // 它接收文本和对应输入框的索引，更新code状态，并在适当的时候移动焦点。
  const handleTextChange = (text: string, index: number) => {
    const newCode = [...code]; // 复制当前的code数组以进行修改。
    newCode[index] = text; // 更新当前索引处的文本。
    setCode(newCode); // 设置新的code状态。

    // 如果当前输入框有文本，并且不是最后一个输入框，自动聚焦到下一个输入框。
    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    // 如果所有输入框都有了值，则视为完成输入
    if (
      newCode.every(digit => digit.trim() !== '') &&
      newCode.length === length
    ) {
      onCodeComplete(newCode.join(''));
    }
    console.log('Code completed: ', newCode);
  };

  // handleFocus处理输入框聚焦事件，用于当用户尝试在空的输入框输入时，自动将焦点移至前一个输入框。
  const handleFocus = (index: number) => {
    if (code[index].length === 0 && index > 0 && code[index - 1].length === 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // 渲染TextInput组件数组，每个组件对应验证码的一个数字输入框。
  return (
    <>
      <View style={styles.codeInputContainer}>
        {code.map(
          (
            digit,
            index, // 为code数组中的每个元素渲染一个TextInput。
          ) => (
            <TextInput
              key={index}
              ref={ref => {
                inputRefs.current[index] = ref; // 将输入框的引用存储在inputRefs中。
              }}
              style={styles.codeInput}
              value={digit} // 将输入框的值设置为当前数字。
              onChangeText={text => handleTextChange(text, index)} // 当文本改变时，调用handleTextChange。
              onKeyPress={({nativeEvent}) => {
                // 处理Backspace按键事件，当用户按下Backspace并且当前输入框不是第一个时，聚焦到前一个输入框。
                if (nativeEvent.key === 'Backspace' && index > 0) {
                  inputRefs.current[index - 1]?.focus();
                }
              }}
              onFocus={() => handleFocus(index)} // 当输入框获得焦点时，调用handleFocus。
              keyboardType="number-pad" // 设置键盘类型为数字键盘。
              maxLength={1} // 限制每个输入框的最大长度为1。
              textContentType="oneTimeCode" // iOS特有属性，提示这是一次性验证码输入。
            />
          ),
        )}
      </View>
    </>
  );
};

const Verify = () => {
  // 在你的组件内部
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<VerifyScreenRouteProp>();
  const {email, username, password} = route.params;

  const API_BASE_URL: string = config.API_BASE_URL;

  // 用于存储用户输入的验证码
  const [code, setCode] = useState('');

  const handleCodeComplete = (inputCode: string) => {
    setCode(inputCode);
    console.log('Code entered:', inputCode); // 输出用户输入的验证码
  };

  useEffect(() => {
    console.log('Code updated in Verify component:', code);
  }, [code]);

  const registerUser = async () => {
    try {
      const numericCode = parseInt(code, 10);
      if (isNaN(numericCode)) {
        Alert.alert('Error', 'The code must be a number.');
        return;
      }

      // 这里构建请求体
      const payload = {
        email: email,
        username: username,
        password: password,
        code: numericCode, // 这是用户输入的验证码
      };

      // 发送请求到验证API
      const response = await axios.post(
        `${API_BASE_URL}users/register`,
        payload,
      );

      // 这里假设服务器返回一个字段来表示成功或失败
      if (response.data.code === 0) {
        // 验证成功
        Alert.alert('Success', 'Your code is correct,registration success!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Signin' as never),
          },
        ]);
      } else {
        // 验证失败
        Alert.alert(
          'Error',
          'The entered code is incorrect, please try again.',
        );
      }
    } catch (error) {
      // 这里处理请求错误
      console.error('Error when trying to verify code:', error);
      Alert.alert(
        'Error',
        'An error occurred while trying to verify the code.',
      );
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.title}>
            <Text style={styles.title_text}>Email verification</Text>
          </View>

          {/* 消息发送提示 */}
          <View style={styles.sent}>
            <Text style={styles.sent_mes}>We sent a code to your email</Text>
            <View style={styles.gmail}>
              <Text style={styles.gmail_text}>{email}</Text>

              {/* 切换接收邮件的邮箱 */}
              <TouchableOpacity
                onPress={() => navigation.navigate('Signup' as never)}>
                <Text style={styles.change_text}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 验证码框 */}
          <View style={styles.code}>
            {/* <CodeInput length={4} onCodeComplete={verifyCode} /> */}
            <CodeInput length={4} onCodeComplete={handleCodeComplete} />
          </View>

          {/* 确认登录 */}
          <View style={styles.button_box}>
            {/* <TouchableOpacity
              onPress={() => navigation.navigate('Verify' as never)}>
              <View style={styles.button}>
                <Text style={styles.button_text}>Confirm registration</Text>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={registerUser}>
              <View style={styles.button}>
                <Text style={styles.button_text}>Confirm registration</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* 重新发送验证码 */}
          <View style={styles.no_receive}>
            <Text style={styles.left_text}>Don't receive your code? </Text>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={styles.right_text}>Resend</Text>
            </TouchableOpacity> */}
            <Text style={styles.right_text}>Resend</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  content: {
    width: widthPercent(320),
    height: heightPercent(280),
    marginTop: 170,
  },
  title: {
    width: widthPercent(320),
    height: heightPercent(40),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  title_text: {
    color: '#0A0615',
    fontSize: fontSizePercent(26),
    fontWeight: '600',
  },
  sent: {
    width: widthPercent(320),
    height: heightPercent(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  sent_mes: {
    color: '#0B0616',
    fontSize: fontSizePercent(16),
    fontWeight: '400',
  },
  gmail: {
    width: widthPercent(320),
    height: heightPercent(35),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: -5,
  },
  gmail_text: {
    color: '#0B0616',
    fontSize: fontSizePercent(15),
    fontWeight: '400',
  },
  change_text: {
    color: '#0B0616',
    fontSize: fontSizePercent(15),
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  code: {
    width: widthPercent(320),
    height: heightPercent(80),
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_box: {
    width: widthPercent(320),
    height: heightPercent(53),
    marginBottom: 10,
    alignItems: 'center',
  },
  button: {
    width: widthPercent(280),
    height: heightPercent(53),
    backgroundColor: '#000000',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  button_text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
  codeInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 8,
    width: 55,
    height: 55,
    textAlign: 'center',
    borderRadius: 6,
  },
  no_receive: {
    width: widthPercent(320),
    height: heightPercent(35),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    marginTop: 10,
  },
  left_text: {
    color: '#000000',
    fontSize: fontSizePercent(16),
    fontWeight: '400',
  },
  right_text: {
    color: '#3D37F1',
    fontSize: fontSizePercent(16),
    fontWeight: '500',
  },
});

export default Verify;
