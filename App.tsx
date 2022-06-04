import 'react-native-gesture-handler';
import React, {useState} from 'react';
import AppLoading from 'expo-app-loading'
import stores from "./stores"
import AppProvider from './AppProvider';
import BayWalletNavigation from "./screens/BayWalletNavigation"

const App = () => {
  const [appReady, setAppReady] = useState<boolean>(false)

  const {checkLoggedIn} = stores.appStore

  if (!appReady) {
    return (
      <AppLoading
        startAsync={checkLoggedIn}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    )
  }
  return (
    <AppProvider>
      <BayWalletNavigation />
    </AppProvider>
  );
};

export default App;

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
