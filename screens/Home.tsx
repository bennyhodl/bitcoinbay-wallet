import React, {useState} from 'react';
import {Text, Box, HStack, Button} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BitcoinBayParamList} from './BitcoinBayNavParams';
import WalletFooter from '../components/WalletFooter';
import MapView, {Marker} from 'react-native-maps';
import {Dimensions} from 'react-native';
import {stores} from "../util/stores"
import axios from "axios"

type HomeScreenProp = NativeStackNavigationProp<BitcoinBayParamList, 'Home'>;

const Home = () => {
  const navigation = useNavigation<HomeScreenProp>();
 
  return (
    <Box
      _dark={{bg: 'primary.dark'}}
      _light={{bg: 'primary.light'}}
      height="100%"
      flex={1}
      flexDirection="column"
      justifyContent="space-between">
      <MapView
        style={{width: '100%', height: Dimensions.get('window').height - 100}}
        region={{
          latitude: 27.964157,
          longitude: -82.452606,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {stores.map(store => {
          return(
            <Marker
            key={store.id}
            title={store.title}
            description={store.description}
            coordinate={{
              latitude: store.latitude,
              longitude: store.longitude
            }}
            pinColor="#ff581a"
            />
          )
        })}
      </MapView>
      <HStack>
        <WalletFooter navigation={navigation} />
      </HStack>
    </Box>
  );
};

export default Home;
