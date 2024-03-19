import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

interface VerifyProps {
  navigation: NavigationProp<any>;
}

const Verify: React.FC<VerifyProps> = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <Text>Verify</Text>
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
});

export default Verify;
