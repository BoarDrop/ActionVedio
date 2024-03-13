// Score界面下的播放组件
import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Video from 'react-native-video';
import Click from '../statics/images/click.svg';
import Begin from '../statics/images/ico-play.svg';
import Next from '../statics/images/ico-next.svg';
import Sound from '../statics/images/ico-sound.svg';
import Hd from '../statics/images/ico-hd.svg';
import Full from '../statics/images/ico-fullscreen.svg';

// 函数组件
const Play: React.FC = () => {

  // const [isMaskVisible, setIsMaskVisible] = useState(false);

  // const toggleMask = () => {
  //   setIsMaskVisible(!isMaskVisible);
  // };

  return (
    <View style={styles.container}>
      <Video
        source={require('../statics/video/sea.mp4')}
        style={styles.video}
        controls={true} // 是否显示控件（播放/暂停等）
        resizeMode="cover" // 视频铺满容器
        repeat={true} // 是否重复播放
      />
      {/* 遮罩层 */}
      {/* <View style={styles.mask}>
        <View style={styles.top}>
          <View style={styles.word}><Text style={styles.made}>Made at Theorem with love</Text></View>
        </View>
        <View style={styles.center}>
          <Click />
        </View>
        <View style={styles.bottom}>
          <View style={styles.bottom_one}></View>
          <View style={styles.bottom_two}>
            <View style={styles.bottom_left}>
              <View style={styles.bottom_play}>
                <Begin />
              </View>
              <View style={styles.bottom_next}>
                <Next />
              </View>
              <View style={styles.bottom_sound}>
                <Sound />
              </View>
              <View style={styles.bottom_time}>
                <Text style={styles.time}>5:07 / 15:28</Text>
              </View>
            </View>
            <View style={styles.bottom_right}>
              <View style={styles.bottom_hd}>
                <Hd />
              </View>
              <View style={styles.bottom_full}>
                <Full />
              </View>
            </View>
          </View>
        </View>
      </View> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'pink',
    width: '100%',
    borderRadius: 5,
  },
  video: {
    width: '100%', // 你的视频宽度
    height: '100%', // 你的视频高度
    resizeMode: 'cover', // 覆盖整个容器
    borderRadius: 5,
  },
  mask: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  top: {
    width: '100%',
    height: 50,
    //backgroundColor: 'pink',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  made: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
  word: {
    left: 25,
  },
  center: {
    width: '100%',
    height: 50,
    //backgroundColor: 'pink',
    alignItems: 'center',
  },
  bottom: {
    width: '100%',
    height: 50,
    //backgroundColor: 'pink',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  bottom_one: {
    width: '100%',
    height: 5,
    //backgroundColor: 'blue',
    top: 10,
  },
  bottom_two: {
    width: '100%',
    height: 40,
    //backgroundColor: 'green',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bottom_left: {
    width: 200,
    height: 40,
    //backgroundColor: 'red',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottom_right: {
    width: 80,
    height: 40,
    //backgroundColor: 'yellow',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottom_play: {},
  bottom_next: {},
  bottom_sound: {},
  bottom_time: {},
  bottom_hd: {},
  bottom_full: {},
  time: {
    color: 'white',
    fontSize: 12,
    fontWeight: '400',
  },
});

export default Play;






// import React, {useRef, useState} from 'react';
// import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
// import Video from 'react-native-video';

// //函数组件
// const Play = ({source}) => {
//   const videoRef = useRef(null);
//   const [paused, setPaused] = useState(true);

//   return (
//     <View style={styles.container}>
//       <Video
//         ref={videoRef}
//         source={{
//           uri: 'https://prod-streaming-video-msn-com.akamaized.net/45101561-a78f-4a5d-88f9-0efc175a1ae6/481ec582-3cae-4b68-8e2d-5833bcd2a593.mp4',
//         }} // Can be a URL or a local file.
//         style={styles.video}
//         paused={paused} // 控制视频播放和暂停
//         // ...其他你需要的Video属性
//       />

//       <View style={styles.overlay}>
//         {/* 播放按钮 */}
//         <TouchableOpacity
//           style={styles.playButton}
//           onPress={() => setPaused(!paused)}>
//           <Image
//             style={styles.playIcon}
//             source={
//               paused
//                 ? require('../statics/images/x.png')
//                 : require('../statics/images/y.png')
//             }
//           />
//         </TouchableOpacity>

//         {/* 自定义其他覆盖控件 */}
//         <View style={styles.controls}>
//           {/* 这里放置控件，如播放进度条等 */}
//           <Text style={styles.watermark}>Made at Theorem with love</Text>
//           {/* 假设水印文本是一个Image，则可以替换为：
//             <Image source={require('./path-to-watermark.png')} style={styles.watermark} />
//             */}
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     // 设置尺寸以适应视频的宽高比
//   },
//   video: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   playButton: {
//     // 根据你的播放按钮样式调整
//   },
//   playIcon: {
//     // 根据你的播放图标尺寸调整
//   },
//   controls: {
//     position: 'absolute',
//     bottom: 10,
//     left: 10,
//     right: 10,
//   },
//   watermark: {
//     color: 'white',
//     fontSize: 12,
//     textShadowColor: 'black',
//     textShadowOffset: {width: 1, height: 1},
//     textShadowRadius: 1,
//   },
// });

// export default Play;
