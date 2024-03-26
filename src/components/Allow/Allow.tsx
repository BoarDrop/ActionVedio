// 可以接收输入的弹窗组件(Upload界面)
import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercent,
  heightPercent,
  fontSizePercent,
  marginTopPercent,
  marginBottomPercent,
} from '../../utils/responsiveUtils';

const Allow = ({
  visible,
  onClose,
  onSubmit,
}: {
  visible: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
}) => {
  const [inputText, setInputText] = useState('');
  const handleInputSubmit = () => {
    onSubmit(inputText);
    setInputText(''); // 清空输入框
    onClose(); // 关闭弹窗
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.title}>
            <Text style={styles.title_text}>Enter your action ID</Text>
          </View>
          <View style={styles.refer}>
            <Text style={styles.refer_text}>
              Please refer to the action ID table for details.
            </Text>
          </View>
          <View style={styles.input}>
            <TextInput style={styles.input_box} />
          </View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity>
            <View style={styles.cancel}>
              <Text style={styles.cancel_text}>Cancel</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.upload}>
              <Text style={styles.upload_text}>Upload</Text>
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
    backgroundColor: '#282828',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
  top: {
    width: widthPercent(230),
    height: heightPercent(150),
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    width: widthPercent(200),
    height: heightPercent(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title_text: {
    color: '#FFFFFF',
    fontSize: fontSizePercent(17),
    fontWeight: '700',
  },
  refer: {
    width: widthPercent(230),
    height: heightPercent(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  refer_text: {
    color: '#FFFFFF',
    fontSize: fontSizePercent(13),
    fontWeight: '400',
  },
  input: {
    width: widthPercent(225),
    alignItems: 'center',
    justifyContent: 'center',
  },
  input_box: {
    height: heightPercent(40),
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#1B1C1E',
    color: 'white',
  },
  bottom: {
    width: '100%',
    height: heightPercent(40),
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomLeftRadius: 14, // 设置左下角的弧度
    borderBottomRightRadius: 14, // 设置右下角的弧度
    flexDirection: 'row',
    overflow: 'hidden', // 添加这个属性来裁剪溢出的子视图部分
  },
  cancel: {
    backgroundColor: '#282828',
    width: widthPercent(125),
    height: heightPercent(40),
    borderColor: 'white',
    borderTopWidth: 0.3,
    borderRightWidth: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancel_text: {
    color: '#007AFF',
    fontSize: fontSizePercent(16),
    fontWeight: '400',
  },
  upload: {
    backgroundColor: '#282828',
    width: widthPercent(125),
    height: heightPercent(40),
    borderColor: 'white',
    borderTopWidth: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upload_text: {
    color: '#007AFF',
    fontSize: fontSizePercent(16),
    fontWeight: '400',
  },
});
export default Allow;
