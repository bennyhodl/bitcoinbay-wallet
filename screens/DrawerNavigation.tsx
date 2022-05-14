import React, {useState} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BitcoinBayNavigation from './Navigation';


const Drawer = () => {
  const BitcoinBayDrawer = createDrawerNavigator();    
  return (
    <BitcoinBayDrawer.Navigator>
      <BitcoinBayDrawer.Screen options={{headerShown: false}} name="BayWallet" component={BitcoinBayNavigation} />
    </BitcoinBayDrawer.Navigator>
  );
};

export default Drawer;
