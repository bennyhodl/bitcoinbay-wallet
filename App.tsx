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
import {theme} from './util/config';
import DrawerNavigation from "./screens/DrawerNavigation"

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

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
          <DrawerNavigation />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};
export default App;
