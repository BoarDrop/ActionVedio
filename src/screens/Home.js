import React from 'react';
import {Button, View} from 'react-native';

function Home({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="拍摄照片"
        onPress={() => navigation.navigate('PhotoCapture')}
      />
      <Button
        title="拍摄视频"
        onPress={() => navigation.navigate('VideoCapture')}
      />
    </View>
  );
}

export default Home;
