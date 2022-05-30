import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Provider } from 'mobx-react';
import stores from "./stores"
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
  const {checkLoggedIn} = stores.userStore
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  console.log("Refresh app.tsx: ", loggedIn)
  const userLoggedIn = async () => {
    const login = await checkLoggedIn()
    setLoggedIn(login)
  }
  useEffect(() => {
    userLoggedIn()
  }, [loggedIn])

  if (!loggedIn) {
    return (
      <OnboardingNavigation />
    )
  }

  return (
    <Provider userStore={stores.userStore} lnbitsStore={stores.lnbitsStore}>
        <BayWalletNavigation />
    </Provider>
  );
};

export default App;
