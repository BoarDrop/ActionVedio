import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Address from '../statics/images/address.svg';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/core';

const Video: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.photo}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('Score')}>
            <Image
              source={require('../statics/images/people.png')}
              style={styles.people}></Image>
          </TouchableOpacity>

          <View style={styles.address}>
            <Address width={20} height={20} />
            <Text style={styles.phnom}>phnom penh</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  photo: {
    width: 150,
    height: 240,
  },
  people: {
    width: 150,
    height: 210,
    borderRadius: 20,
  },
  address: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // TypeScript 不直接支持 gap 属性在 React Native StyleSheet 中，可能需要其他方法实现或移除
    marginTop: 10,
    marginLeft: 25,
  },
  phnom: {
    color: '#565A5E',
    fontSize: 12,
    fontWeight: '700',
    marginRight: 20,
  },
});

export default Video;


// import React from 'react';
// import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
// import Address from '../statics/images/address.svg';
// import {useNavigation} from '@react-navigation/native';

// const Video = () => {
//   const navigation = useNavigation();
//   return (
//     <>
//       <View style={styles.container}>
//         <View style={styles.photo}>
//           <TouchableOpacity
//             activeOpacity={1}
//             onPress={() => navigation.navigate('Score')}>
//             <Image
//               source={require('../statics/images/people.png')}
//               style={styles.people}></Image>
//           </TouchableOpacity>

//           <View style={styles.address}>
//             <Address width={20} height={20} />
//             <Text style={styles.phnom}>phnom penh</Text>
//           </View>
//         </View>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   photo: {
//     width: 150,
//     height: 240,
//   },
//   people: {
//     width: 150,
//     height: 210,
//     borderRadius: 20,
//   },
//   address: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     gap: -50,
//     marginTop: 10,
//   },
//   phnom: {
//     color: '#565A5E',
//     fontSize: 12,
//     fontWeight: '700',
//   },
// });

// export default Video;
