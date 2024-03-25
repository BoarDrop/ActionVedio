// 始终定位在屏幕右上角的半透明灰色背景的组件，用于显示蓝牙数据
// 该组件包含一个按钮，点击按钮后，该组件会隐藏，再次点击按钮，该组件会显示
import React, { useState } from 'react';
import { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import bleContext from '../../contexts/BLEContext';    // 导入bleContext上下文
import BluetoothLowEnergyApi from '../../interfaces/BluetoothLowEnergyApi';    // 导入BluetoothLowEnergyApi接口
import useInterval from '../../hooks/useInterval';    // 导入useInterval自定义钩子

import VideoData from '../../interfaces/bleData/VideoData';    // 导入VideoData接口
import DataItem from '../../interfaces/bleData/DataItem';    // 导入DataItem接口
import { forwardRef, useImperativeHandle, useEffect } from 'react';
import { set } from 'firebase/database';

// 定义一个名为BLEDataDisplay的函数组件
const BLEDataDisplay = forwardRef((props, ref) => {
    const bleData = useContext(bleContext); // 从bleContext中获取bleManager和connectedPeripheral
    const [bleDataArray, setBLEDataArray] = useState<DataItem[]>([]); // 用于存储蓝牙数据的数组
    const [show, setShow] = useState(true); // 是否显示组件
    const [realOriginData, setOriginData] =  useState<String[]>([]);  // 用于存储原始数据的数组
    const [OriginBLEDataArray, setOriginBLEDataArray] = useState<String[][]>([]);
    const [realHigh, setrealHigh] = useState<number | null>(null);


    // 定义一个用于开始数据收集的函数
    const startCollectingData = () => {
      // 使用setInterval或自定义的useInterval逻辑开始收集数据
      // 使用useInterval钩子，每隔10ms获取一次蓝牙数据,将其存入数组中
      useInterval(() => {
        if (bleData && bleData.originalData !== null) {
          setOriginData([...realOriginData, bleData.originalData]);
        }
      }, 10);

      // 每秒在控制台输出收集到的数据量，每s回传一次原始数据数组
      useInterval(() => {
        console.log(`每秒数据量: ${realOriginData.length}`);
        // console.log(`每秒原始数据数组如下: ${realOriginData}`);
        // 将这个数组存入OriginBLEDataArray
        setOriginBLEDataArray([...OriginBLEDataArray, realOriginData]);
        // console.log(`每秒原始数据数组数组如下: ${OriginBLEDataArray}`);
        console.log(`每秒原始数据数组数组长度如下: ${OriginBLEDataArray.length}`);
        setOriginData([]); // 每秒清空数组，重新计数
      }, 1000);
    };

    // 定义一个停止数据收集的函数，清空数据数组
    const stopCollectingData = () => {
      setOriginData([]);
      setOriginBLEDataArray([]);
    };

    // 使用useImperativeHandle钩子，暴露一个名为getBLEDataAsync的方法
    useImperativeHandle(ref, () => ({
      // 返回获取到的数据数组
      getBLEDataAsync: async () => {
        return OriginBLEDataArray; 
      },
      // 开始获取蓝牙数据
      startCollectingData,
      // 停止获取蓝牙数据
      stopCollectingData,
    }));

    return (
        <View style={styles.container}>
        {show && (
            <View style={styles.dataContainer}>
                {/* 暂时只展示每s的高度即可 */}
                {/* <Text style={styles.dataText}>原始数据: {bleData?.originalData}</Text> */}
                <Text style={styles.dataText}>高度: {bleData?.height}</Text>
            </View>
        )}
        <TouchableOpacity
            style={styles.button}
            onPress={() => setShow(!show)}
        >
            <Text style={styles.buttonText}>显示/隐藏</Text>
        </TouchableOpacity>
        </View>
    );
  }
);

// 创建样式表
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 200,
    right: 0,
    width: 150,
    height: 100,
    zIndex: 100,
  },
  dataContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  dataText: {
    color: 'white',
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default BLEDataDisplay;