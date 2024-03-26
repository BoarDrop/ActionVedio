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

    const [dataQueue, setDataQueue] = useState<String[]>([]); // 用作队列的状态，存储蓝牙数据
    const [processedData, setProcessedData] = useState<String[][]>([]); // 存储每秒处理的队列数据

    // 新增一个状态来控制是否收集数据
    const [isCollectingData, setIsCollectingData] = useState(false);

    // 处理接收到的蓝牙数据
    const handleNewBLEData = (newData: String) => {
      if (isCollectingData) {
        setDataQueue(prevQueue => [...prevQueue, newData]);
      }
    };

    useEffect(() => {
      // 注册事件监听器以接收蓝牙数据
      if (bleData) {
        if (isCollectingData) {
          // subscribeToBLEData();
          // 订阅并获取取消订阅的方法
          const unsubscribe = bleData.subscribe((data) => {
            // console.log("Received data:", data);
            handleNewBLEData(data);
          });
          return unsubscribe;   // 组件卸载时取消订阅
        }
      }
    }, [isCollectingData]);

    useEffect(() => {
      let processDataInterval: string | number | NodeJS.Timeout | undefined;
      if (isCollectingData) {
        processDataInterval = setInterval(() => {
          setDataQueue(prevQueue => {
            console.log('执行加入数组操作前：【数据队列】长度:', prevQueue.length);
            setProcessedData(prevData => {
              console.log('执行加入数组操作后：【回传数据】长度:', [...prevData, prevQueue].length);
              return [...prevData, prevQueue];
            });
            return [];
          });
        }, 1000);
        return () => clearInterval(processDataInterval);
      }
    }, [isCollectingData]);

    // 定义一个用于开始数据收集的函数
    const startCollectingData = () => {
      console.log('开始收集传感器数据');
      setIsCollectingData(true);
    };

    // 定义一个停止数据收集的函数，清空数据数组
    const stopCollectingData = () => {
      setIsCollectingData(false);   // 停止收集数据
      setOriginData([]);
      setOriginBLEDataArray([]);
    };

    // 使用useImperativeHandle钩子，暴露一个名为getBLEDataAsync的方法
    useImperativeHandle(ref, () => ({
      // 返回获取到的数据数组
      getBLEDataAsync: async () => {
        console.log('触发【回传数据】长度:', processedData.length);
        return processedData; 
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
                <Text style={styles.dataText}>四元数: {bleData?.quaternion.Quaternion_Y}</Text>
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