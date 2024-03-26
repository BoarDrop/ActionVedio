import React, { useState } from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';

// 定义 Props 的类型
interface LoadingScreenModalProps {
  visible: boolean; // 明确声明 visible 为 boolean 类型
}

const LoadingScreenModal: React.FC<LoadingScreenModalProps> = ({ visible }) => (
  <Modal
    transparent
    animationType="none"
    visible={visible}>
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator size="large" animating={visible} />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000040', // 半透明背景
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingScreenModal;

