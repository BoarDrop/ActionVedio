import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Button from '../components/Button/Button';
import {NavigationProp} from '@react-navigation/native';
import InputDialog from '../components/Modals/InputDialog';
import {useEffect, useState} from 'react';
// 导入useServices接口
import useServices from '../hooks/useServices';             // 引入useServices钩子
import {
  widthPercent,
  heightPercent,
  fontSizePercent,
  marginTopPercent,
  marginBottomPercent,
} from '../utils/responsiveUtils';

interface UploadProps {
  navigation: NavigationProp<any>;
}

// 提示详情信息
const listItems = [
  'Analyze these videos and the data \n collected by the sensors on the skateboard. ',
  'Give your ratings and  recommendations \n based on this data.',
];

// 引入必要的类型，如果你使用的是TypeScript
import { RouteProp } from '@react-navigation/native';

// 定义Props的类型，如果你使用的是TypeScript
type UploadScreenRouteProp = RouteProp<{ Upload: { videoId: string } }, 'Upload'>;

interface UploadProps {
  route: UploadScreenRouteProp;
}

const Upload: React.FC<UploadProps> = ({ route, navigation }) => {
  // 使用route.params.videoId来获取传递的videoId参数
  const { videoId } = route.params;
  // 将videoId转为number类型
  const NumbervideoId = Number(videoId);
  // 页面加载的时候，弹窗inputDialog
  const [isDialogVisible, setDialogVisible] = useState(true);
  const { addAnalysisResultTest } = useServices(); // 使用useServices钩子来在组件加载完成后更改弹窗状态

  // 使用useEffect钩子来在组件加载完成后更改弹窗状态
  useEffect(() => {
    setDialogVisible(true); // 页面加载完成时显示弹窗
  }, []); // 空数组[]意味着这个effect只在组件首次渲染时运行

  return (
    <>
    <View style={styles.img_inner}>
    <InputDialog   
        visible={isDialogVisible}
        onClose={() => setDialogVisible(false)}
        onSubmit={(input) => {
          console.log(input); // 或者其他处理输入内容的逻辑
          addAnalysisResultTest(NumbervideoId, input); // 调用useServices钩子中的addAnalysisResultTest方法
          setDialogVisible(false);
        }}
      />
    </View>
      
      <View style={styles.container}>
        {/* 返回上一级 */}
        <View style={styles.head}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.dis}>Discard</Text>
          </TouchableOpacity>
          <Text style={styles.obj}>Object</Text>
          <Text style={styles.black}>none</Text>
        </View>

        {/* 照片 */}
        <View style={styles.middle}>
          <View style={styles.img_box}>
            <Image
              source={require('../statics/images/cover.png')}
              style={styles.skate_image}
              //resizeMode="cover" // 或者 'stretch' 来填满容器
            />
            <View style={styles.img_inner}>
              <InputDialog
                visible={true} // 或根据实际情况来设置
                onClose={() => {
                  // 处理关闭逻辑
                }}
                onSubmit={text => {
                  // 处理提交逻辑，text 是提交的字符串
                }}
              />
            </View>
          </View>
        </View>

        {/* 底部栏 */}
        <View style={styles.grey}>
          {/* 可修改信息 */}
          <View style={styles.top}>
            <View style={styles.top_inner}>
              <Text style={styles.title}>Capture Title</Text>
              <Text style={styles.day}>Today, January 21</Text>
            </View>
          </View>

          {/* 信息介绍 */}
          <View style={styles.center}>
            <View>
              <Text style={styles.click}>
                Click to upload, our AI model will:
              </Text>
              {listItems.map((item, index) => (
                <View key={index} style={styles.box}>
                  <View>
                    <Text style={styles.number}>{index + 1}.</Text>
                  </View>
                  <View>
                    <Text style={styles.word}>{item}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* 固定状态的Button组件 */}
          <View style={styles.bottom}>
            <Button fixedStatus="upload" />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({

img_inner: {
  //backgroundColor: 'pink',
  width: widthPercent(250),
  height: heightPercent(190),
  position: 'absolute', // 设置为绝对定位
  transform: [{translateX: widthPercent(0)}, {translateY: heightPercent(0)}], // 根据盒子大小调整偏移，使其居中
  alignItems: 'center',
  justifyContent: 'center',
},
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'space-between',
  },
  head: {
    width: '100%',
    height: heightPercent(50),
    backgroundColor: 'black',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 35,
  },
  dis: {
    color: 'red',
    fontSize: fontSizePercent(15),
    fontWeight: '500',
  },
  obj: {
    color: 'white',
    fontSize: fontSizePercent(18.5),
    fontWeight: '500',
  },
  black: {
    color: 'black',
    fontSize: fontSizePercent(18.5),
    fontWeight: '500',
  },
  middle: {
    alignItems: 'center',
    marginTop: -15,
    justifyContent: 'center',
  },
  img_box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  skate_image: {
    width: widthPercent(320),
    height: heightPercent(390), // 确保图片高度铺满容器高度
    borderRadius: 20,
  },
  grey: {
    width: '100%',
    height: heightPercent(288),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#272726',
    borderTopLeftRadius: 20, // 设置左上角的弧度
    borderTopRightRadius: 20, // 设置右上角的弧度
  },
  top: {
    flexDirection: 'row',
    width: widthPercent(330),
    height: heightPercent(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -15,
  },
  top_inner: {
    alignItems: 'center',
  },
  title: {
    color: '#848484',
    fontSize: fontSizePercent(24),
    fontWeight: '700',
  },
  day: {
    color: '#B3B3B3',
    fontSize: fontSizePercent(12),
    fontWeight: '700',
  },
  bottom: {
    width: '100%',
    height: heightPercent(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flexDirection: 'row',
    width: widthPercent(330),
    height: heightPercent(130),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
  },
  click: {
    color: '#FFFFFF',
    fontSize: fontSizePercent(16),
    fontWeight: '500',
    marginLeft: 8,
    marginBottom: 5,
  },
  box: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  number: {
    color: '#FFFFFF',
    fontSize: fontSizePercent(16),
    fontWeight: '500',
    marginRight: 8,
  },
  word: {
    color: '#FFFFFF',
    fontSize: fontSizePercent(16),
    fontWeight: '500',
    lineHeight: 22,
  },
});

export default Upload;
