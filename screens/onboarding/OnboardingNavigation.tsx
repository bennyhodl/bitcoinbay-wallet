import React from "react"
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateWallet from "./CreateWallet";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import {theme} from '../../util/config';

const OnboardingNavigation = () => {
    const OnboardingNavigation = createNativeStackNavigator()
    return (
        <NativeBaseProvider theme={theme}>
            <NavigationContainer>
                <OnboardingNavigation.Navigator>
                    <OnboardingNavigation.Screen options={{headerShown: false}} name="CreateWallet" component={CreateWallet} />
                </OnboardingNavigation.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    )
}

export default OnboardingNavigation