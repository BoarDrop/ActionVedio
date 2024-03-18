// Shot界面button的三种状态
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

type RecordingState = 'start' | 'stop' | 'upload';

// 定义 Button 组件的 props 类型
type ButtonProps = {
  fixedStatus?: RecordingState; // 添加一个可选的props来固定状态
};

const Button: React.FC<ButtonProps> = ({fixedStatus}) => {
  const [currentStatus, setCurrentStatus] = useState<RecordingState>(
    fixedStatus || 'start',
  );
  const navigation = useNavigation();

  // 如果传入了 fixedStatus，忽略 currentStatus
  const displayStatus = fixedStatus ?? currentStatus;

  // useEffect(() => {
  //   if (currentStatus === 'upload') {
  //     navigation.navigate('Upload' as never);
  //   }
  // }, [currentStatus, navigation]);

  // 点击button进行切换
  // const handlePress = () => {
  //   setCurrentStatus(prevStatus => {
  //     switch (prevStatus) {
  //       case 'start':
  //         return 'stop';
  //       case 'stop':
  //         // 不再返回状态，我们将在 useEffect 中处理导航
  //         return prevStatus;
  //       //return 'upload';
  //       case 'upload':
  //         return 'start';
  //       default:
  //         return 'start';
  //     }
  //   });
  // };
  const handlePress = () => {
    if (fixedStatus) {
      // 如果有 fixedStatus，可能需要处理点击事件
      // 例如，固定状态为 'upload' 时的特定行为
      if (fixedStatus === 'upload') {
        navigation.navigate('Home' as never);
      }
    } else {
      // 如果没有 fixedStatus，按照正常逻辑处理状态变化
      setCurrentStatus(prevStatus => {
        switch (prevStatus) {
          case 'start':
            return 'stop';
          case 'stop':
            navigation.navigate('Upload' as never);
            return prevStatus; // 如果这里没有返回 prevStatus，状态不会改变
          case 'upload':
            navigation.navigate('Home' as never);
            return prevStatus;
          default:
            return 'start';
        }
      });
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
