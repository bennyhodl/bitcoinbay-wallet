import 'react-native-gesture-handler';
import React from 'react';
import {
  Text,
  HStack,
  Switch,
  useColorMode,
  NativeBaseProvider,
} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {theme} from './util/config';

import {Home, Receive, Send, Camera, Invoice, PayInvoice} from './screens';

// Color Switch Component
const ToggleDarkMode = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === 'light'}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === 'light' ? 'switch to dark mode' : 'switch to light mode'
        }
      />
      <Text>Light</Text>
    </HStack>
  );
};

const BitcoinBay = createNativeStackNavigator();
// const BitcoinBayDrawer = createDrawerNavigator();

export const BitcoinBayNavigation = () => {
  return (
    <BitcoinBay.Navigator initialRouteName="Home">
      <BitcoinBay.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <BitcoinBay.Screen
        name="Receive"
        component={Receive}
        options={{
          headerStyle: {
            backgroundColor: '#fff6f2',
          },
          headerBackTitleVisible: false,
        }}
      />
      <BitcoinBay.Screen
        name="Send"
        component={Send}
        options={{
          headerStyle: {
            backgroundColor: '#fff6f2',
          },
          headerBackTitleVisible: false,
        }}
      />
      <BitcoinBay.Screen
        name="Camera"
        component={Camera}
        options={{
          headerStyle: {
            backgroundColor: '#fff6f2',
          },
          headerBackTitleVisible: false,
          headerShown: false
        }}
      />
      <BitcoinBay.Screen
        name="Invoice"
        component={Invoice}
        options={{
          headerStyle: {
            backgroundColor: '#fff6f2',
          },
          headerBackTitleVisible: false,
        }}
      />
      <BitcoinBay.Screen
        name="PayInvoice"
        component={PayInvoice}
        options={{
          headerStyle: {
            backgroundColor: '#fff6f2',
          },
          headerBackTitleVisible: false,
        }}
      />
    </BitcoinBay.Navigator>
  );
};

// export const BitcoinBayDrawerNavigation = () => {
//   return (
//     <BitcoinBayDrawer.Navigator>
//       <BitcoinBayDrawer.Screen name="Home" component={Home} />
//     </BitcoinBayDrawer.Navigator>
//   );
// };

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        {/* <BitcoinBayDrawerNavigation /> */}
        <BitcoinBayNavigation />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};
export default App;
