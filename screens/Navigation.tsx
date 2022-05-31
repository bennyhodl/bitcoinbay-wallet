import React, { useEffect } from "react"
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Receive, Send, Camera, CreateInvoice} from './index';
import CreateWallet from "./onboarding/CreateWallet";
import stores from "../stores"
import { observer } from "mobx-react";
import Loading from "../components/Loading";

const BitcoinBayNavigation = observer(() => {
    const BitcoinBay = createNativeStackNavigator();
    const {loggedIn, checkLoggedIn} = stores.userStore
    
    useEffect(() => {
      checkLoggedIn()
    }, [])

    if (!loggedIn) {
      return (
        <BitcoinBay.Navigator>
          <BitcoinBay.Screen
            name="CreateWallet"
            component={CreateWallet}
            options={{
              headerShown: false
            }}
          />
        </BitcoinBay.Navigator>
      )
    }
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
  });

  export default BitcoinBayNavigation