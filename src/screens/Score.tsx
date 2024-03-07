import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';

//函数组件
const Score = () => {
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.one}>
            <Text style={styles.skateboard}>Skateboard</Text>
            <Text style={styles.aenean}>
              Aenean aliquet lectus vestibulum gravida sed vulputate vitae.
            </Text>
          </View>
          <View style={styles.two}></View>
          <View style={styles.three}>
            <View style={styles.three_top}>
              <Text style={styles.today}>Yesterday, January 21</Text>
              <Text style={styles.fraction}>Score: 90</Text>
            </View>
            <View style={styles.chart}>
              <Text style={styles.activity}>Activity Data</Text>
              <View style={styles.curve}></View>
            </View>
          </View>
          <View style={styles.four}>
            <View style={styles.action_box}>
              <Text style={styles.action}>Detected action</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    height: 900,
  },
  one: {
    width: 320,
    height: 100,
  },
  skateboard: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 10,
  },
  aenean: {
    color: '#B3B3B3',
    fontSize: 18,
    fontWeight: '400',
  },
  two: {
    width: 320,
    height: 190,
    backgroundColor: '#B3B3B3',
    marginTop: 20,
  },
  three: {
    width: 320,
    height: 320,
    backgroundColor: '#1D4549',
    marginTop: 20,
  },
  three_top: {
    width: 320,
    height: 70,
  },
  today: {
    color: '#B3B3B3',
    fontSize: 14,
    fontWeight: '700',
  },
  fraction: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  chart: {
    width: 320,
    height: 180,
    backgroundColor: '#B3B3B3',
    justifyContent: 'space-between',
  },
  activity: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  curve: {
    width: 320,
    height: 150,
    backgroundColor: 'pink',
  },
  four: {
    width: 320,
    height: 190,
    backgroundColor: '#B3B3B3',
    marginTop: 25,
  },
  action_box: {
    width: 320,
    height: 26,
    backgroundColor: 'white',
  },
  action: {
    color: '#B3B3B3',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default Score;
