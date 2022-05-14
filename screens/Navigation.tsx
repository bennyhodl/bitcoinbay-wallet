import React from "react"
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Receive, Send, Camera, CreateInvoice} from './index';

const BitcoinBayNavigation = () => {
    const BitcoinBay = createNativeStackNavigator();
    return (
      <BitcoinBay.Navigator initialRouteName="Home">
        <BitcoinBay.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <BitcoinBay.Screen
          name="Receive"
          component={Receive}
          options={{
            headerStyle: {
              backgroundColor: '#fff6f2',
            },
            headerBackTitleVisible: false,
          }}
        />
        <BitcoinBay.Screen
          name="Send"
          component={Send}
          options={{
            headerStyle: {
              backgroundColor: '#fff6f2',
            },
            headerBackTitleVisible: false,
          }}
        />
        <BitcoinBay.Screen
          name="Camera"
          component={Camera}
          options={{
            headerStyle: {
              backgroundColor: '#fff6f2',
            },
            headerBackTitleVisible: false,
            headerShown: false
          }}
        />
        <BitcoinBay.Screen
          name="CreateInvoice"
          component={CreateInvoice}
          options={{
            headerStyle: {
              backgroundColor: '#fff6f2',
            },
            headerBackTitleVisible: false,
          }}
        />
      </BitcoinBay.Navigator>
    );
  };

  export default BitcoinBayNavigation