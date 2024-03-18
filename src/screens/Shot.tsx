import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Button from '../components/Button/Button';
import {NavigationProp} from '@react-navigation/native';

interface ShotProps {
  navigation: NavigationProp<any>;
}

const Shot: React.FC<ShotProps> = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.head}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.dis}>Discard</Text>
          </TouchableOpacity>
          <Text style={styles.obj}>Object</Text>
          <Text style={styles.black}>none</Text>
        </View>
        <View style={styles.middle}>
          <Image
            source={require('../statics/images/cover.png')}
            style={styles.skate_image}
            resizeMode="cover" // 或者 'stretch' 来填满容器
          />
        </View>
        <View style={styles.grey}>
          <View style={styles.top}>
            <View style={styles.left}>
              <Text style={styles.word}>
                As you shoot, the sensors on the skateboard will record your
                movement data in real time.
              </Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.time}>00:00</Text>
            </View>
          </View>
          <View style={styles.bottom}>
            <Button />
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
    justifyContent: 'space-between',
  },
  head: {
    width: '100%',
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 35,
  },
  dis: {
    color: 'red',
    fontSize: 15,
    fontWeight: '500',
  },
  obj: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  black: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  middle: {
    flex: 1, // 这里的flex: 1是关键，它会使得图片容器填充所有剩余空间
    width: '100%', // 确保图片宽度铺满屏幕宽度
    // 如果不需要Image的边距或填充，这些可以不设置或设置为0
  },
  skate_image: {
    width: '100%',
    height: '100%', // 确保图片高度铺满容器高度
  },
  grey: {
    width: '100%',
    height: 190,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  top: {
    flexDirection: 'row',
    width: 330,
    height: 68,
    //backgroundColor: 'pink',
  },
  left: {
    width: 265,
    height: 68,
    //backgroundColor: '#FFBEB1',
  },
  word: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
  },
  right: {
    justifyContent: 'flex-end',
    marginBottom: 0,
  },
  time: {
    fontSize: 24,
    fontWeight: '700',
    color: '#848484',
  },
  bottom: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Shot;
