import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  onPress: () => void;
}

const BluetoothButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.combinedFrame}>
      <Text style={styles.textContent}>
      Please connect the Bluetooth sensor first
      </Text>
    </TouchableOpacity>
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

export default BluetoothButton;
