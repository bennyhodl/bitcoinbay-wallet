import React, {useEffect, useState} from 'react';
import {Text, Center} from 'native-base';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BitcoinBayParamList} from './BitcoinBayNavParams';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {decodeInvoice} from "../lnbits/wallet"

type CameraScreenProp = NativeStackNavigationProp<
  BitcoinBayParamList,
  'Camera'
>;

const CameraScreen = () => {
  const navigation = useNavigation<CameraScreenProp>();
  const [permissions, setPermissions] = useState(false)
  const [scanned, setScanned] = useState<boolean>(false)

  useEffect(() => {
    getCameraPermission()
  }, [])

  const getCameraPermission = async () => {
    const cameraPermission = await BarCodeScanner.requestPermissionsAsync()

    setPermissions(cameraPermission.status === 'granted');

    if (cameraPermission.status !== 'granted') {
      alert('Permission for camera access needed to scan for Bitcoin.');
    }
  };

    const handleBarCodeScanned = async ({ type, data }: any) => {
      setScanned(true);
      const invoice = await decodeInvoice(data)
      navigation.navigate('Send', {
        amount: Number(invoice.data.amount_msat) / 1000,
        description: invoice.data.description
      })
    };

  if (permissions == false) {
    return (
      <Center>
        <Text>Fail</Text>
      </Center>
    )
  }
  return (
    <Center
      _dark={{bg: 'primary.dark'}}
      _light={{bg: 'primary.light'}}
      flex={1}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{flex: 1,width:"100%", height:"100%", margin: 0}}
          />
    </Center>
  );
};

export default CameraScreen
