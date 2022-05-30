import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'mobx-react';
import Stores from "./stores/Stores"
import {theme} from './util/config';
import DrawerNavigation from "./screens/DrawerNavigation"
import Loading from './components/Loading';
import OnboardingNavigation from './screens/onboarding/OnboardingNavigation';

// Color Switch Component
// const ToggleDarkMode = () => {
//   const {colorMode, toggleColorMode} = useColorMode();
//   return (
//     <HStack space={2} alignItems="center">
//       <Text>Dark</Text>
//       <Switch
//         isChecked={colorMode === 'light'}
//         onToggle={toggleColorMode}
//         aria-label={
//           colorMode === 'light' ? 'switch to dark mode' : 'switch to light mode'
//         }
//       />
//       <Text>Light</Text>
//     </HStack>
//   );
// };

const App = () => {
  const [loading, setLoading] = useState(true);
  const [init, setInit] = useState(true);

  const checkInit = async () => {
    setLoading(true)
    try {
      const value = await AsyncStorage.getItem('init');
      if (value === "false") {
        setInit(false);
      }
    } catch (err) {
      console.log('Error retrieving init in App.tsx', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkInit();
  }, []);

  if (init) {
    return <OnboardingNavigation />
  }

  return (
    <Provider userStore={Stores.userStore}>
      <NavigationContainer>
        <NativeBaseProvider theme={theme}>
            {loading ? <Loading /> : <DrawerNavigation />}
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
