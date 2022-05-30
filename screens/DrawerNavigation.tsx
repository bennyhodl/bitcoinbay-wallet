import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BitcoinBayNavigation from './Navigation';
import Transactions from "./Transactions"
// import Deals from "./Deals"
// import Map from "./Map"
// import CreateWallet from './onboarding/CreateWallet';

const Drawer = () => {
  const BitcoinBayDrawer = createDrawerNavigator();  
  return (
    <BitcoinBayDrawer.Navigator>
          <BitcoinBayDrawer.Screen options={{headerShown: false}} name="Wallet" component={BitcoinBayNavigation}/>
          <BitcoinBayDrawer.Screen name="Transactions" component={Transactions} />
          {/* <BitcoinBayDrawer.Screen name="Map" component={Map} /> 
          <BitcoinBayDrawer.Screen name="Deals" component={Deals} />  */}
    </BitcoinBayDrawer.Navigator>
  );
};

export default Drawer;
