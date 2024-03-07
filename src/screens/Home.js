import React from 'react';
import {
  Button,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video from '../components/Video';
import Stars from '../statics/images/three-stars.svg';
import Camera from '../statics/images/camera.svg';

const {width} = Dimensions.get('window');

function Home({navigation}) {
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.top_image}>
            <Image
              source={require('../statics/images/cover.png')}
              style={styles.jump}></Image>
            {/* 顶部阴影 */}
            <LinearGradient
              colors={[
                'rgba(0,0,0,0.0)',
                'rgba(0,0,0,0.1)',
                'rgba(0,0,0,0.25)',
                'rgba(0,0,0,0.4)',
                'rgba(0,0,0,0.65)',
                'rgba(0,0,0,1)',
              ]}
              //colors={['transparent', '#000000']}
              style={styles.gradientTop}
            />
            <View style={styles.star_box}>
              <View style={{width: 240}}>
                <Text style={styles.real_time}>
                  REAL-TIME SHOOTING SYNCHRONIZED DATA
                </Text>
              </View>
              <Stars width={30} height={30} top={15} />
            </View>
            <Text style={styles.capture}>
              Capture and analyze every skateboard move in real-time with a
              system that syncs high-definition video with onboard sensor data.
            </Text>
          </View>
          <View style={styles.portfolio}>
            <Text style={styles.port_text}>Portfolio</Text>
            <View style={styles.video_box}>
              {/* <TouchableOpacity onPress={() => navigation.navigate('Score')}>
                <View style={styles.row_box}>
                  <Video />
                  <Video />
                </View>
              </TouchableOpacity> */}
              <View style={styles.row_box}>
                <Video />
                <Video />
              </View>

              <View style={styles.row_box}>
                <Video />
                <Video />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.button_box}>
        {/* <Button
          title="拍摄照片"
          onPress={() => navigation.navigate('PhotoCapture')}
        /> */}
        {/* <Button
          title="拍摄视频"
          onPress={() => navigation.navigate('VideoCapture')}
        /> */}
        <TouchableOpacity
          style={styles.shot}
          onPress={() =>
            navigation.navigate('PhotoCapture')
          }></TouchableOpacity>
        <Camera width={30} height={30} top={15} left={15} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  top_image: {
    position: 'relative',
    width: width,
    height: 360,
  },
  jump: {
    width: 360,
    height: 360,
  },
  gradientTop: {
    position: 'absolute',
    height: 90,
    width: width,
    bottom: 0,
  },
  star_box: {
    display: 'flex',
    height: 60,
    width: width,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    gap: 35,
  },
  real_time: {
    position: 'absolute',
    left: 20,
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
  },
  capture: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
    width: 320,
    alignItems: 'center',
  },
  portfolio: {
    position: 'relative',
    width: width,
    height: 600,
  },
  port_text: {
    fontSize: 24,
    color: 'white',
    fontWeight: '700',
    left: 20,
    marginTop: 20,
  },
  video_box: {
    width: width - 40,
    height: 550,
    position: 'relative',
    left: 20,
    flexDirection: 'column',
    //backgroundColor: 'white',
  },
  row_box: {
    width: 320,
    flexDirection: 'row',
    marginTop: 30,
    position: 'relative',
    gap: 20,
  },
  button_box: {
    width: 60,
    height: 60,
    position: 'absolute',
    right: 30,
    bottom: 40,
    //backgroundColor: 'white',
  },
  shot: {
    width: 60,
    height: 60,
    position: 'absolute',
    backgroundColor: '#4527A0',
    borderRadius: 50,
  },
});

export default Home;
