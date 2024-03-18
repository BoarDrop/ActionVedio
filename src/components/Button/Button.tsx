// Shot界面button的三种状态
import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

type RecordingState = 'start' | 'stop' | 'upload';

const Button: React.FC = () => {
  const [currentStatus, setCurrentStatus] = useState<RecordingState>('start');

  const handlePress = () => {
    setCurrentStatus(prevStatus => {
      switch (prevStatus) {
        case 'start':
          return 'stop';
        case 'stop':
          return 'upload';
        case 'upload':
          return 'start';
        default:
          return 'start';
      }
    });
  };

  const renderButton = () => {
    let backgroundColor = 'white';
    let textColor = 'black';
    let text = '';

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
      <View style={styles.container}>
        {renderButton()}
        {/* <View style={styles.startButton}>
          <Text style={styles.startText}>Start Record</Text>
        </View>
        <View style={styles.stopButton}>
          <Text style={styles.stopText}>Stop Record</Text>
        </View>
        <View style={styles.uploadButton}>
          <Text style={styles.uploadText}>Upload</Text>
        </View> */}
      </View>
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
  // startButton: {
  //   backgroundColor: 'white',
  //   width: 330,
  //   borderRadius: 10,
  //   height: 48,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // startText: {
  //   color: 'black',
  //   fontSize: 24,
  //   fontWeight: '700',
  // },
  // stopButton: {
  //   backgroundColor: 'red',
  //   width: 330,
  //   borderRadius: 10,
  //   height: 48,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // stopText: {
  //   color: 'white',
  //   fontSize: 24,
  //   fontWeight: '700',
  // },
  // uploadButton: {
  //   backgroundColor: '#5144C6',
  //   width: 330,
  //   borderRadius: 10,
  //   height: 48,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // uploadText: {
  //   color: 'white',
  //   fontSize: 24,
  //   fontWeight: '700',
  // },
});

export default Button;
