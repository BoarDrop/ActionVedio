import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

interface VerifyProps {
  navigation: NavigationProp<any>;
}

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
    // 如果文本长度等于验证码长度，调用onCodeComplete回调函数。
    if (text.length === length) {
      onCodeComplete(newCode.join(''));
    }
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

const Verify: React.FC<VerifyProps> = ({navigation}) => {
  const verifyCode = (code: string) => {
    // 根据你的业务逻辑进行验证码校验
    console.log(code);
    // 校验成功后，可能需要进行导航，如下：
    // navigation.navigate('Home');
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.title}>
            <Text style={styles.title_text}>Email verification</Text>
          </View>
          <View style={styles.sent}>
            <Text style={styles.sent_mes}>We sent a code to your email</Text>
            <View style={styles.gmail}>
              <Text style={styles.gmail_text}>zouyu1121@gmail.com</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.change_text}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.code}>
            <CodeInput length={4} onCodeComplete={verifyCode} />
          </View>
          <View style={styles.no_receive}>
            <Text style={styles.left_text}>Don't receive your code? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={styles.right_text}>Resend</Text>
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
    backgroundColor: 'white',
    alignItems: 'center',
  },
  content: {
    width: 320,
    height: 280,
    //backgroundColor: 'pink',
    marginTop: 170,
  },
  title: {
    width: 320,
    height: 40,
    //backgroundColor: '#DCFFDE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  title_text: {
    color: '#0A0615',
    fontSize: 26,
    fontWeight: '600',
  },
  sent: {
    width: 320,
    height: 50,
    //backgroundColor: '#DCFFDE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sent_mes: {
    color: '#0B0616',
    fontSize: 16,
    fontWeight: '400',
  },
  gmail: {
    width: 320,
    height: 35,
    //backgroundColor: '#16D46B',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: -5,
  },
  gmail_text: {
    color: '#0B0616',
    fontSize: 15,
    fontWeight: '400',
    //backgroundColor: 'pink',
  },
  change_text: {
    color: '#0B0616',
    fontSize: 15,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  code: {
    width: 320,
    height: 80,
    //backgroundColor: '#DCFFDE',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 320,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    marginTop: 10,
  },
  left_text: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
  },
  right_text: {
    color: '#3D37F1',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Verify;
