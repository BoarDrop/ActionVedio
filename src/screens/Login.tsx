import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import Google from '../components/Google/Google';

interface LoginProps {
  navigation: NavigationProp<any>;
}

const listItems = [
  'Captures Your Moves: A camera records all your skateboarding tricks in high detail.',
  'Tracks Your Board Data: Sensors on the skateboard track speed, turns, and more, as you ride.',
  'Syncs Video & Data: The system matches your moves with the skateboard data, showing them together.',
  'Analyzes Your Skills: Use our software to see your performance and improve your skateboarding.',
];

const Login: React.FC<LoginProps> = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.word}>
          <View style={styles.title}>
            <Text style={styles.title_inner}>
              REAL-TIME SHOOTING SYNCHRONIZED DATA
            </Text>
          </View>
          <View style={styles.img}>
            <Image
              source={require('../statics/images/first.png')}
              style={styles.img_inner}
            />
          </View>
          <View style={styles.dear}>
            <Text style={styles.dear_inner}>Dear Skater:</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.content_inner}>
              Excited to share our latest tech: a system that captures your
              skateboarding moves in real-time and syncs it with data from your
              board!{' '}
            </Text>
            <View>
              <Text style={styles.content_inner}>What It Does:</Text>
              {listItems.map((item, index) => (
                <View key={index} style={styles.content_box}>
                  <Text style={styles.content_number}>{index + 1}.</Text>
                  <Text style={styles.content_word}>{item}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.content_inner}>
              You can try Google login to try our latest application.
            </Text>
          </View>
        </View>
        <View style={styles.google_btn}>
          <Google />
        </View>
        <View style={styles.bottom}>
          <View style={styles.front}>
            <View style={styles.line}></View>
            <View>
              <Text style={styles.or}>or</Text>
            </View>
            <View style={styles.line}></View>
          </View>
          <View style={styles.way}>
            <Text style={styles.way_text}>Want to use another way?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={styles.sign_text}>Sign In</Text>
            </TouchableOpacity>
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
    backgroundColor: 'black',
  },
  google_btn: {
    width: 320,
    height: 60,
    //backgroundColor: 'pink',
    marginTop: -25,
  },
  word: {
    width: 320,
    height: 580,
    marginTop: 35,
    marginBottom: 40,
    justifyContent: 'space-between',
  },
  title: {
    width: '100%',
    height: 60,
  },
  title_inner: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  img: {
    width: '100%',
    height: 190,
  },
  img_inner: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  dear: {
    width: '100%',
    height: 26,
  },
  dear_inner: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    width: '100%',
    height: 250,
    justifyContent: 'space-between',
  },
  content_inner: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 17,
  },
  content_box: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content_number: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 17,
    marginRight: 5,
  },
  content_word: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 17,
  },
  bottom: {
    width: 320,
    height: 60,
    //backgroundColor: 'pink',
    justifyContent: 'space-between',
  },
  front: {
    width: 320,
    height: 25,
    //backgroundColor: '#9747FF',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  line: {
    width: 100,
    height: 1, // 线条的高度
    backgroundColor: 'white', // 线条的颜色
  },
  or: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 20,
    marginRight: 20,
  },
  way: {
    width: 320,
    height: 35,
    //backgroundColor: '#16D46B',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: -5,
  },
  way_text: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '400',
    //backgroundColor: 'pink',
  },
  sign_text: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});

export default Login;
