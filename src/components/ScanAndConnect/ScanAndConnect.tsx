
import React from 'react';
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import ScanDevicesRecord from "../ScanDevicesRecord/ScanDevicesRecord";
import BluetoothButton from '../BluetoothButton/BluetoothButton';
import { ActivityIndicator } from 'react-native';
// 导入你之前提供的 useBLE 钩子和一个名为 DeviceModal 的组件。
import useBLE from "../../hooks/useBLE";
import { Device } from 'react-native-ble-plx';
interface Props {
    connectToDevice: (device: Device) => void;  // 新的属性，当设备连接成功时调用
}

const ScanAndConnect: React.FC<Props> = ({connectToDevice}) => {
    const {
        scanForPeripherals,  // 扫描外围设备
        requestPermissions,  // 请求权限
        Open_BleState,      // 检测蓝牙是否打开
        disconnectDevice,   // 断开设备
        connectedDevice,    // 已连接的设备
        allDevices,         // 所有设备
    } = useBLE();

    const [isLoading, setIsLoading] = useState(false); // Initially, the model is considered to be loading

    // 定义 scanForDevices 函数，它会先请求必要的权限，然后扫描外围设备。
    const scanForDevices = async () => {
        setIsLoading(true);
        const isPermissionsEnabled = await requestPermissions();

        if (isPermissionsEnabled) {
            // 如果权限被授予，则开始扫描外围设备。
            // 扫描外部设备
            scanForPeripherals();
        }
    };

    const openModal = async () => {
        console.log("openModal");
        // 断开蓝牙连接
        if (connectedDevice) {
            // 如果蓝牙已连接则先断开蓝牙连接
            await disconnectDevice();
        }

        // 检测蓝牙是否打开
        try {
            const isBleState = await Open_BleState()
            console.log("isBleState", isBleState);
            if (isBleState) {
                // 如果蓝牙打开，则开始扫描外围设备。
                console.log("蓝牙已打开，开始扫描外围设备");
                scanForDevices();
            } else {
                Alert.alert("Please turn on Bluetooth");
            }
        } catch (error) {
            console.log("error", error);
        }

    };
    return (
        <>
            {/* 蓝牙扫描按钮 */}
            <BluetoothButton onPress={openModal} />

            {
                // 如果扫描到设备，就显示扫描到的设备，如果没有扫描到设备，就显示加载动画。
                (!allDevices.length && isLoading) ? (
                    // 如果加载中，则出现加载动画
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="white" />
                        <Text style={{ marginTop: 10, fontSize: 16, color: "white" }}>Bluetooth scanning...</Text>
                    </View>
                ) : (
                    allDevices.length ? (
                        // 如果allDevices中有设备，则显示扫描到的设备
                        /* 蓝牙扫描记录 */
                        <ScanDevicesRecord recordDate={allDevices} connectToDevice={connectToDevice} />
                    ) : (
                        <></>
                    )
                )
            }
        </>
    );
}
const styles = StyleSheet.create({
    combinedFrame: {
        width: '90%',  // Updated to fill parent width
        height: 50,
        paddingVertical: 15,
        paddingHorizontal: 20,
        justifyContent: "center", // Updated to center
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "#D9D9D9",
    },
    textContent: {
        color: "#000",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center"
    },
});

export default ScanAndConnect;