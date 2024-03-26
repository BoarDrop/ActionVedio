// ScanDevicesRecord.tsx
import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import RecordItem from './RecordItem';
import { Device } from 'react-native-ble-plx';

interface Props {
  recordDate: Device[];
  connectToDevice: (device: Device) => void;  // 新的属性，当设备连接成功时调用
}

const ScanDevicesRecord: React.FC<Props> = ({ recordDate, connectToDevice }) => {
  const [isLoading, setIsLoading] = useState(false);  // 新的状态


  const handleDeviceConnection = async (device: Device) => {
    setIsLoading(true);  // 开始连接时，设置加载状态为 true
    await connectToDevice(device);
    setIsLoading(false);  // 设备连接后，设置加载状态为 false
  }


  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Scanning equipment is as follows</Text>
      {isLoading ? (
        // 如果加载中，则显示加载动画
        <ActivityIndicator size="large" color="#000" />
      ) : (
        recordDate.map((device, index) => (
          <TouchableOpacity key={index} onPress={() => handleDeviceConnection(device)}>
            <RecordItem recordDate={device.name} />
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',  // Add this line to fill the parent width
    flexShrink: 0,
    backgroundColor: "rgba(255, 255, 255, 1)",
    alignItems: "flex-start",
    rowGap: 30,
    padding: 20,
    borderRadius: 20
  },
  headerText: {
    flexShrink: 0,
    textAlign: "left",
    color: "rgba(0, 0, 0, 1)",
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "700"
  }
});


export default ScanDevicesRecord;
