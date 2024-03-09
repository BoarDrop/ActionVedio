import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import bleContext from './src/contexts/BLEContext';
import useBLE from './src/hooks/useBLE';

// 函数组件
const App: React.FC = () => {
  const bleData = useBLE();      // 使用useBLE自定义hook，创建蓝牙实例
  return (
    <>
    <bleContext.Provider value={bleData}> 
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </bleContext.Provider>
    </>
  );
};

export default App;

// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import AppNavigator from './src/navigation/AppNavigator';

// //函数组件
// const App = () => {
//   return (
//     <>
//       <NavigationContainer>
//         <AppNavigator />
//       </NavigationContainer>
//     </>
//   );
// };

// export default App;
