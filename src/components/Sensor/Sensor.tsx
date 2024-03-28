// Home界面的视频组件
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/core';
import {
  widthPercent,
  heightPercent,
  fontSizePercent,
  marginTopPercent,
  marginBottomPercent,
} from '../../utils/responsiveUtils';

const Sensor: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.title_box}>
          <Text style={styles.title}>Setup Sensor</Text>
        </View>
        <View style={styles.img_box}>
          <Image
            source={require('../../statics/images/sensor.png')}
            style={styles.img}
          />
        </View>
        <View style={styles.content_box}>
          <Text style={styles.content}>
            Sensor requires bluetooth permission to connect to the Trackers
          </Text>
        </View>
        <View style={styles.btn_box}>
          <TouchableOpacity>
            <View style={styles.btn}>
              <Text style={styles.btn_text}>ENABLE BLUETOOTH</Text>
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
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#272726',
    borderTopLeftRadius: 20, // 设置左下角的弧度
    borderTopRightRadius: 20, // 设置右下角的弧度
    overflow: 'hidden', //弧度部分遮罩子视图
  },
  title_box: {
    width: '100%',
    height: heightPercent(50),
    //backgroundColor: '#14AE5C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSizePercent(26),
    color: 'white',
    fontWeight: '700',
  },
  img_box: {
    width: '100%',
    //backgroundColor: '#14AE5C',
    marginTop: marginTopPercent(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    margin: 3,
    width: widthPercent(160),
    height: heightPercent(160),
  },
  content_box: {
    width: '100%',
    //backgroundColor: '#14AE5C',
    marginTop: marginTopPercent(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    margin: 3,
    fontSize: fontSizePercent(16),
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 22,
  },
  btn_box: {
    width: '100%',
    //height: heightPercent(30),
    //backgroundColor: '#14AE5C',
    marginTop: marginTopPercent(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    margin: 3,
    width: widthPercent(270),
    height: heightPercent(50),
    backgroundColor: '#2AB0ED',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btn_text: {
    fontSize: fontSizePercent(24),
    color: 'white',
    fontWeight: '700',
  },
});

export default Sensor;
