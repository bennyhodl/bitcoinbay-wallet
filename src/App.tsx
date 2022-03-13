import React from 'react';
import {
  Link,
  Text,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  VStack,
  Code,
  Button,
} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {theme} from './util/config';

import {Home, Receive, Send} from './screens';

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
        }}
      />
      <BitcoinBay.Screen
        name="Send"
        component={Send}
        options={{
          headerStyle: {
            backgroundColor: '#fff6f2',
          },
        }}
      />
    </BitcoinBay.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <BitcoinBayNavigation />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};
export default App;
