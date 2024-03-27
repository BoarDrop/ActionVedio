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
import {NavigationProp} from '@react-navigation/native';

interface AllowProps {
  navigation: NavigationProp<any>;
}

const Allow: React.FC = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.during}>
            <Text style={styles.during_text}>
              During the recording process, when you complete a skill, you can
              double-tap the screen to place a time stamp.
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <View style={styles.bottom}>
            <Text style={styles.allow_text}>Allow</Text>
          </View>
        </TouchableOpacity>
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
    width: widthPercent(280),
    height: heightPercent(90),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderColor: 'white',
    borderBottomWidth: 0.3,
  },
  during: {
    width: widthPercent(245),
    height: heightPercent(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  during_text: {
    color: '#FFFFFF',
    fontSize: fontSizePercent(13),
    fontWeight: '400',
  },
  bottom: {
    width: widthPercent(280),
    height: heightPercent(45),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#282828',
    borderBottomLeftRadius: 14, // 设置左下角的弧度
    borderBottomRightRadius: 14, // 设置右下角的弧度
  },
  allow_text: {
    color: '#007AFF',
    fontSize: fontSizePercent(16),
    fontWeight: '400',
  },
});
export default Allow;
