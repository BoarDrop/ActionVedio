import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Address from '../statics/images/address.svg';

const Video = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.photo}>
          <Image
            source={require('../statics/images/people.png')}
            style={styles.people}></Image>
          <View style={styles.address}>
            <Address width={20} height={20} />
            <Text style={styles.phnom}>phnom penh</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  photo: {
    width: 150,
    height: 240,
  },
  people: {
    width: 150,
    height: 210,
    borderRadius: 20,
  },
  address: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: -50,
    marginTop: 10,
  },
  phnom: {
    color: '#565A5E',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default Video;
