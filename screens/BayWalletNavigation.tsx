import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BitcoinBayNavigation from './Navigation';
import Transactions from "./Transactions"
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import {theme} from "../util/config"
// import Deals from "./Deals"
// import Map from "./Map"
// import CreateWallet from './onboarding/CreateWallet';

const BayWalletNavigation = () => {
  const BitcoinBayDrawer = createDrawerNavigator();  
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <BitcoinBayDrawer.Navigator>
              <BitcoinBayDrawer.Screen options={{headerShown: false}} name="Wallet" component={BitcoinBayNavigation}/>
              <BitcoinBayDrawer.Screen name="Transactions" component={Transactions} />
              {/* <BitcoinBayDrawer.Screen name="Map" component={Map} /> 
              <BitcoinBayDrawer.Screen name="Deals" component={Deals} />  */}
        </BitcoinBayDrawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default BayWalletNavigation;
