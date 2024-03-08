import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Video from 'react-native-video';

interface PlayProps {
  source: { uri: string }; // 假设source是这种形式，根据实际情况调整
}

// 函数组件
const Play: React.FC<PlayProps> = ({ source }) => {
  const videoRef = useRef<Video>(null);
  const [paused, setPaused] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{
          uri: 'https://prod-streaming-video-msn-com.akamaized.net/45101561-a78f-4a5d-88f9-0efc175a1ae6/481ec582-3cae-4b68-8e2d-5833bcd2a593.mp4',
        }} // Can be a URL or a local file.
        style={styles.video}
        paused={paused} // 控制视频播放和暂停
      // ...其他你需要的Video属性
      />

      <View style={styles.overlay}>
        {/* 播放按钮 */}
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => setPaused(!paused)}>
          <Image
            style={styles.playIcon}
            source={
              paused
                ? require('../statics/images/play.png')
                : require('../statics/images/stop.png')
            }
          />
        </TouchableOpacity>

        {/* 自定义其他覆盖控件 */}
        <View style={styles.controls}>
          {/* 这里放置控件，如播放进度条等 */}
          <Text style={styles.watermark}>Made at Theorem with love</Text>
          {/* 假设水印文本是一个Image，则可以替换为：
            <Image source={require('./path-to-watermark.png')} style={styles.watermark} />
            */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // 设置尺寸以适应视频的宽高比
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  playButton: {
    // 根据你的播放按钮样式调整

  },
  playIcon: {
    // 根据你的播放图标尺寸调整
    width: 50,
    height: 50,
  },
  controls: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  watermark: {
    color: 'white',
    fontSize: 12,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
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
