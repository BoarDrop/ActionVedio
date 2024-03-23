// Shot界面button的三种状态
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

type RecordingState = 'start' | 'stop' | 'upload';

// 定义 Button 组件的 props 类型
type ButtonProps = {
  fixedStatus?: RecordingState; // 添加一个可选的props来固定状态
  onPressCallback?: () => void; // 新增一个回调函数的props
};

const Button: React.FC<ButtonProps> = ({fixedStatus, onPressCallback}) => {
  const [currentStatus, setCurrentStatus] = useState<RecordingState>(
    fixedStatus || 'start',
  );
  const navigation = useNavigation();

  const handlePress = () => {
    // 如果存在fixedStatus，执行相应的操作
    if (fixedStatus) {
      if (fixedStatus === 'upload') {
        navigation.navigate('Home' as never);
      }
    } else {
      // 根据当前状态处理逻辑
      switch (currentStatus) {
        case 'start':
          // 点击开始后，切换到停止状态
          setCurrentStatus('stop');
          break;
        // case 'stop':
        //   // 当处于停止状态时，直接执行导航操作
        //   navigation.navigate('Upload' as never);
        //   // 注意：这里没有更改状态，因为导航后，当前组件可能会被卸载，或者你不需要再更改其状态
        //   break;
        case 'upload':
          // 如果已经在upload状态，并且按钮被点击，根据需要执行操作，或者不做任何事
          // 例如，重新上传或提示用户当前操作已完成
          break;
        default:
          // 重置到开始状态，这可能用在某些特殊逻辑处理中
          setCurrentStatus('start');
      }
    }
    // 调用回调函数，如果提供了
    if (onPressCallback) {
      onPressCallback();
    }
  };

  useEffect(() => {
    // 如果有需要，根据状态变化进行导航或其他副作用
  }, [currentStatus, navigation]);

  const renderButton = () => {
    let backgroundColor = 'white';
    let textColor = 'black';
    let text = '';

    // button样式切换
    switch (currentStatus) {
      case 'start':
        backgroundColor = 'white';
        textColor = 'black';
        text = 'Start Record';
        break;
      case 'stop':
        backgroundColor = 'red';
        textColor = 'white';
        text = 'Stop Record';
        break;
      case 'upload':
        backgroundColor = '#5144C6';
        textColor = 'white';
        text = 'Upload';
        break;
    }
    return (
      <TouchableOpacity
        style={[styles.button, {backgroundColor}]}
        onPress={handlePress}>
        <Text style={[styles.text, {color: textColor}]}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>{renderButton()}</View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 330,
    borderRadius: 10,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
  },
});

export default Button;
