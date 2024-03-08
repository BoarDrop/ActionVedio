import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Red from '../statics/images/RedButton.svg';

// TypeScript版本的函数组件
const Score: React.FC = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.grey}>
          <View>
            <Text style={styles.time}>00:00</Text>
          </View>
          <View style={styles.red}>
            <Red width={70} height={70} />
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
    justifyContent: 'flex-end',
  },
  grey: {
    width: '100%',
    height: 170,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 50% 透明度的黑色
  },
  time: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
  },
  red: {
    top: -8,
  },
});

export default Score;