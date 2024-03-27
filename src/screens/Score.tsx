// 详情视频界面，echarts图表（样式先放着）
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import Skate from '../statics/images/skate.svg';
import Play from '../components/Play/Play';
import Blue from '../statics/images/BluePoint.svg';
import Green from '../statics/images/GreenPoint.svg';
import X from '../statics/images/x.svg';
import Y from '../statics/images/y.svg';
import Z from '../statics/images/z.svg';
import {
  widthPercent,
  heightPercent,
  fontSizePercent,
  marginTopPercent,
  marginBottomPercent,
} from '../utils/responsiveUtils';

// 图表数据
const data = {
  // X轴标签
  labels: ['00', '10', '20', '30', '40'],
  datasets: [
    {
      // 数据集1
      data: [20, 45, 28, 80, 99],
      // 线条颜色函数，根据不透明度变化
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // 可选
      // 线条粗细
      strokeWidth: 2, // 可选
    },
    {
      // 数据集2
      data: [30, 79, 47, 76, 100],
      // 线条颜色函数，根据不透明度变化
      color: (opacity = 1) => `rgba(34, 128, 176, ${opacity})`, // 可选
      // 线条粗细
      strokeWidth: 2, // 可选
    },
  ],
  // 图例
  //legend: ['Fly Height(max)', 'Skate Speed(max)'], // 可选
};

// 图表配置
const chartConfig = {
  // 背景渐变起始颜色
  backgroundGradientFrom: 'black',
  // 背景渐变结束颜色
  backgroundGradientTo: 'black',
  color: (opacity = 1) => `rgba(179, 179, 179, ${opacity})`, // 设置坐标数据颜色为B3B3B3
  labelColor: (opacity = 1) => `rgba(179, 179, 179, ${opacity})`, // 设置标签文字颜色为B3B3B3
  strokeWidth: 2,
  barPercentage: 0.5,
  formatXLabel: (label: number | string) => {
    // 计算整数值
    const intValue = parseInt(label.toString(), 10);
    // 将整数值转换为字符串
    return intValue.toString();
  },
  formatYLabel: (label: number | string) => {
    // 计算整数值
    const intValue = parseInt(label.toString(), 10);
    // 将整数值转换为字符串
    return intValue.toString();
  },
};

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
          <View style={styles.two}>
            <Play />
          </View>
          <View style={styles.three}>
            <View style={styles.three_top}>
              <Text style={styles.today}>Yesterday, January 21</Text>
              <Text style={styles.fraction}>Score: 90</Text>
            </View>
            <View style={styles.chart}>
              <Text style={styles.activity}>Activity Data</Text>
              <View style={styles.curve}>
                <LineChart
                  data={data}
                  width={350}
                  height={160}
                  chartConfig={chartConfig}
                  bezier
                />
              </View>
              <View style={styles.max}>
                <View style={styles.max_one}>
                  <View style={{top: 4}}>
                    <Blue width={10} height={10} />
                  </View>

                  <View>
                    <Text style={styles.point_max}>Fly Height(max)</Text>
                    <Text style={styles.point_cm}>50 cm</Text>
                  </View>
                </View>
                <View style={styles.max_two}>
                  <View style={{top: 4}}>
                    <Green width={10} height={10} />
                  </View>

                  <View>
                    <Text style={styles.point_max}>Skate Speed(max)</Text>
                    <Text style={styles.point_cm}>10 km/h</Text>
                  </View>
                </View>
                <View style={styles.max_three}>
                  <Text style={styles.point_max}>Air Time</Text>
                  <Text style={styles.point_cm}>40 sec</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.four}>
            <View style={styles.action_box}>
              <Text style={styles.action}>Detected action</Text>
            </View>
            <View style={styles.trick_box}>
              <View style={styles.left}>
                <View style={styles.yellow}>
                  <Skate width={30} height={30} />
                </View>
              </View>
              <View style={styles.right}>
                <View style={styles.right_top}>
                  <Text style={styles.tricks}>Tricks: 6</Text>
                  <Text style={styles.longest}>
                    Longest number of consecutive tricks landed in a line
                  </Text>
                </View>
                <View style={styles.right_down}>
                  <View style={styles.right_center}>
                    <View style={styles.right_one}>
                      <X width={40} height={40} />
                    </View>
                    <Text style={styles.number}>2 tricks</Text>
                    <Text style={styles.regular}>X - Regular</Text>
                  </View>
                  <View style={styles.right_center}>
                    <View style={styles.right_two}>
                      <Y width={40} height={40} />
                    </View>
                    <Text style={styles.number}>1 tricks</Text>
                    <Text style={styles.regular}>Y - Regular</Text>
                  </View>
                  <View style={styles.right_center}>
                    <View style={styles.right_three}>
                      <Z width={40} height={40} />
                    </View>
                    <Text style={styles.number}>3 tricks</Text>
                    <Text style={styles.regular}>Z - Regular</Text>
                  </View>
                </View>
              </View>
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
    height: heightPercent(900),
  },
  one: {
    width: widthPercent(320),
    height: heightPercent(100),
  },
  skateboard: {
    color: 'white',
    fontSize: fontSizePercent(32),
    fontWeight: '700',
    marginTop: 10,
  },
  aenean: {
    color: '#B3B3B3',
    fontSize: fontSizePercent(18),
    fontWeight: '400',
  },
  two: {
    width: widthPercent(320),
    height: heightPercent(190),
    backgroundColor: '#B3B3B3',
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 5,
  },
  three: {
    width: widthPercent(320),
    height: heightPercent(310),
    marginTop: 20,
  },
  three_top: {
    width: widthPercent(320),
    height: heightPercent(70),
  },
  today: {
    color: '#B3B3B3',
    fontSize: fontSizePercent(14),
    fontWeight: '700',
  },
  fraction: {
    color: 'white',
    fontSize: fontSizePercent(24),
    fontWeight: '700',
  },
  chart: {
    width: widthPercent(320),
    height: heightPercent(250),
    justifyContent: 'space-between',
  },
  activity: {
    color: 'white',
    fontSize: fontSizePercent(14),
    fontWeight: '700',
  },
  curve: {
    width: widthPercent(320),
    height: heightPercent(160),
  },
  max: {
    width: widthPercent(320),
    height: heightPercent(60),
    top: -3,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  max_one: {
    width: widthPercent(110),
    height: heightPercent(40),
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  point_max: {
    color: '#B3B3B3',
    fontSize: fontSizePercent(12),
    fontWeight: '700',
  },
  point_cm: {
    color: 'white',
    fontSize: fontSizePercent(12),
    fontWeight: '700',
  },
  max_two: {
    width: widthPercent(120),
    height: heightPercent(40),
    //backgroundColor: '#429D3C',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  max_three: {
    width: widthPercent(50),
    height: heightPercent(40),
    //backgroundColor: '#2E6F74',
  },
  four: {
    width: widthPercent(320),
    height: heightPercent(190),
    marginTop: 25,
    justifyContent: 'space-between',
  },
  action_box: {
    width: widthPercent(320),
    height: heightPercent(25),
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3A',
  },
  action: {
    color: '#B3B3B3',
    fontSize: fontSizePercent(14),
    fontWeight: '700',
  },
  trick_box: {
    width: widthPercent(320),
    height: heightPercent(150),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    width: widthPercent(55),
    height: heightPercent(150),
  },
  yellow: {
    width: widthPercent(50),
    height: heightPercent(50),
    backgroundColor: '#FB9820',
    borderRadius: 10,
    justifyContent: 'center', // 垂直居中
    alignItems: 'center', // 水平居中
  },
  right: {
    width: widthPercent(245),
    height: heightPercent(150),
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  right_top: {
    width: widthPercent(245),
    height: heightPercent(45),
  },
  right_down: {
    width: widthPercent(245),
    height: heightPercent(105),
    justifyContent: 'space-around',
    alignItems: 'center', // 水平居中
    flexDirection: 'row',
  },
  tricks: {
    color: 'white',
    fontSize: fontSizePercent(18),
    fontWeight: '700',
  },
  longest: {
    color: '#B3B3B3',
    fontSize: 10,
    fontWeight: '400',
  },
  right_center: {
    width: widthPercent(70),
    height: heightPercent(85),
    //backgroundColor: 'white',
    alignItems: 'center', // 水平居中
  },
  right_one: {
    width: widthPercent(55),
    height: heightPercent(55),
    backgroundColor: '#5144C6',
    borderRadius: 10,
    justifyContent: 'center', // 垂直居中
    alignItems: 'center', // 水平居中
  },
  right_two: {
    width: widthPercent(55),
    height: heightPercent(55),
    backgroundColor: '#429D3C',
    borderRadius: 10,
    justifyContent: 'center', // 垂直居中
    alignItems: 'center', // 水平居中
  },
  right_three: {
    width: widthPercent(55),
    height: heightPercent(55),
    backgroundColor: '#2E6F74',
    borderRadius: 10,
    justifyContent: 'center', // 垂直居中
    alignItems: 'center', // 水平居中
  },
  number: {
    color: 'white',
    fontSize: fontSizePercent(12),
    fontWeight: '700',
  },
  regular: {
    color: 'white',
    fontSize: fontSizePercent(12),
    fontWeight: '700',
  },
});

export default Score;
