// 可以接收输入的弹窗组件

import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet } from 'react-native';

const InputDialog = ({ visible, onClose, onSubmit }: { visible: boolean, onClose: () => void, onSubmit: (text: string) => void }) => {
  const [inputText, setInputText] = useState('');

  const handleInputSubmit = () => {
    onSubmit(inputText);
    setInputText(''); // 清空输入框
    onClose(); // 关闭弹窗
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.textInput}
            onChangeText={setInputText}
            value={inputText}
            placeholder="请输入内容"
          />
          <Button title="提交" onPress={handleInputSubmit} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    width: '80%',
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
});

export default InputDialog;
