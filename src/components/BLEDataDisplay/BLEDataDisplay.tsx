// 始终定位在屏幕右上角的半透明灰色背景的组件，用于显示蓝牙数据
// 该组件包含一个按钮，点击按钮后，该组件会隐藏，再次点击按钮，该组件会显示
import React, { useState } from 'react';
import { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import bleContext from '../../contexts/BLEContext';    // 导入bleContext上下文
import BluetoothLowEnergyApi from '../../interfaces/BluetoothLowEnergyApi';    // 导入BluetoothLowEnergyApi接口
import useInterval from '../../hooks/useInterval';    // 导入useInterval自定义钩子

// 定义一个名为BLEDataDisplay的函数组件
function BLEDataDisplay() {
    const bleData = useContext(bleContext); // 从bleContext中获取bleManager和connectedPeripheral
    const [bleDataArray, setBLEDataArray] = useState<BluetoothLowEnergyApi[]>([]); // 用于存储蓝牙数据的数组
    const [show, setShow] = useState(true); // 是否显示组件
    const [realHigh, setRealHigh] = useState<number | null>(null); // 允许null和number类型

    // 使用useInterval钩子，每隔1秒获取一次蓝牙数据,将其存入数组中
    useInterval(() => {
        if (bleData) {              
            console.log(bleData);
            setBLEDataArray([...bleDataArray, bleData]);

            // 获取实时高度
            setRealHigh(bleData.height);
        }
    }, 1000);

    return (
        <View style={styles.container}>
        {show && (
            <View style={styles.dataContainer}>
                {/* 暂时只展示每s的高度即可 */}
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

// 创建样式表
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 150,
    height: 100,
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