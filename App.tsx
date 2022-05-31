import 'react-native-gesture-handler';
import React from 'react';
import AppProvider from './AppProvider';
import BayWalletNavigation from "./screens/BayWalletNavigation"

const App = () => {

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
