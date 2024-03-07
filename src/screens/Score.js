import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Skate from '../statics/images/skate.svg';
import {LineChart} from 'react-native-chart-kit';
import Play from '../components/Play';

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
  legend: ['Fly Height(max)', 'Skate Speed(max)'], // 可选
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
  formatXLabel: label => parseInt(label), // 确保X轴标签为整数
  formatYLabel: label => parseInt(label), // 确保Y轴标签为整数
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
                      <Image
                        style={{width: 30, height: 30}}
                        source={require('../statics/images/x.png')}></Image>
                    </View>
                    <Text style={styles.number}>2 tricks</Text>
                    <Text style={styles.regular}>X - Regular</Text>
                  </View>
                  <View style={styles.right_center}>
                    <View style={styles.right_two}>
                      <Image
                        style={{width: 30, height: 30}}
                        source={require('../statics/images/y.png')}></Image>
                    </View>
                    <Text style={styles.number}>1 tricks</Text>
                    <Text style={styles.regular}>Y - Regular</Text>
                  </View>
                  <View style={styles.right_center}>
                    <View style={styles.right_three}>
                      <Image
                        style={{width: 30, height: 30}}
                        source={require('../statics/images/z.png')}></Image>
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
    alignItems: 'center',
  },
  three: {
    width: 320,
    height: 320,
    //backgroundColor: '#1D4549',
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
    height: 250,
    //backgroundColor: '#B3B3B3',
    justifyContent: 'space-between',
  },
  activity: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  curve: {
    width: 320,
    height: 200,
    //backgroundColor: 'pink',
  },
  four: {
    width: 320,
    height: 190,
    marginTop: 25,
    justifyContent: 'space-between',
  },
  action_box: {
    width: 320,
    height: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3A',
  },
  action: {
    color: '#B3B3B3',
    fontSize: 14,
    fontWeight: '700',
  },
  trick_box: {
    width: 320,
    height: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    width: 55,
    height: 150,
  },
  yellow: {
    width: 50,
    height: 50,
    backgroundColor: '#FB9820',
    borderRadius: 10,
    justifyContent: 'center', // 垂直居中
    alignItems: 'center', // 水平居中
  },
  right: {
    width: 245,
    height: 150,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  right_top: {
    width: 245,
    height: 45,
  },
  right_down: {
    width: 245,
    height: 105,
    justifyContent: 'space-around',
    alignItems: 'center', // 水平居中
    flexDirection: 'row',
  },
  tricks: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  longest: {
    color: '#B3B3B3',
    fontSize: 10,
    fontWeight: '400',
  },
  right_center: {
    width: 70,
    height: 85,
    //backgroundColor: 'white',
    alignItems: 'center', // 水平居中
  },
  right_one: {
    width: 55,
    height: 55,
    backgroundColor: '#5144C6',
    borderRadius: 10,
    justifyContent: 'center', // 垂直居中
    alignItems: 'center', // 水平居中
  },
  right_two: {
    width: 55,
    height: 55,
    backgroundColor: '#429D3C',
    borderRadius: 10,
    justifyContent: 'center', // 垂直居中
    alignItems: 'center', // 水平居中
  },
  right_three: {
    width: 55,
    height: 55,
    backgroundColor: '#2E6F74',
    borderRadius: 10,
    justifyContent: 'center', // 垂直居中
    alignItems: 'center', // 水平居中
  },
  number: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  regular: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default Score;
