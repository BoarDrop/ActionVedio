import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../components/Button/Button';

const Score: React.FC = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.dis}>Discard</Text>
          <Text style={styles.obj}>Object</Text>
          <Text style={styles.black}>none</Text>
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
    //backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Score;
