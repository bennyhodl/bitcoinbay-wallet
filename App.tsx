import 'react-native-gesture-handler';
import React from 'react';
import {NativeBaseProvider} from 'native-base';
import { Provider } from 'mobx-react';
import Stores from "./stores/Stores"
import {theme} from './util/config';
import BayWalletNavigation from "./screens/BayWalletNavigation"
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
  const loggedIn = Stores.userStore.loggedIn

  if (!loggedIn) {
    return (
      <OnboardingNavigation />
    )
  }

  return (
    <Provider userStore={Stores.userStore}>
      <NativeBaseProvider theme={theme}>
          <BayWalletNavigation />
      </NativeBaseProvider>
    </Provider>
  );
};
export default App;
