// Home界面的视频组件
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Button: React.FC = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.start}>Start Record</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    width: 330,
    borderRadius: 10,
    justifyContent: 'center',
  },
  start: {
    color: 'black',
    fontSize: 24,
    fontWeight: '700',
  },
});

export default Button;
