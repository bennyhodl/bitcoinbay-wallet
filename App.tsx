import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import stores from './stores'
import AppProvider from './AppProvider'
import BayWalletNavigation from './screens/BayWalletNavigation'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

const App = () => {
  const [appReady, setAppReady] = useState<boolean>(false)

  const { checkLoggedIn } = stores.appStore

  useEffect(() => {
    async function prepare() {
      try {
        checkLoggedIn()
      } catch (e) {
        console.warn(e)
      } finally {
        // Tell the application to render
        await SplashScreen.hideAsync()
        setAppReady(true)
      }
    }

    prepare()
  }, [])

  if (!appReady) {
    return null
  }

  return (
    <AppProvider>
      <BayWalletNavigation />
    </AppProvider>
  )
}

export default App

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
