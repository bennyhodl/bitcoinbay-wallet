import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BitcoinBayNavigation from './Navigation';
import Transactions from "./Transactions"
import { NavigationContainer } from '@react-navigation/native';

const BayWalletNavigation = () => {
  const BitcoinBayDrawer = createDrawerNavigator();  
  return (
    <NavigationContainer>
      <BitcoinBayDrawer.Navigator>
        <BitcoinBayDrawer.Screen options={{headerShown: false}} name="Wallet" component={BitcoinBayNavigation}/>
        <BitcoinBayDrawer.Screen name="Transactions" component={Transactions} />
        {/* <BitcoinBayDrawer.Screen name="Map" component={Map} /> 
        <BitcoinBayDrawer.Screen name="Deals" component={Deals} />  */}
      </BitcoinBayDrawer.Navigator>
    </NavigationContainer>

  );
};

export default BayWalletNavigation;
