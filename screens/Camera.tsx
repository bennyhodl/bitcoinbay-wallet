import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react"
import stores from "../stores"
import {Text, Center, Button} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BitcoinBayParamList} from './BitcoinBayNavParams';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Clipboard from "expo-clipboard"

type CameraScreenProp = NativeStackNavigationProp<
  BitcoinBayParamList,
  'Camera'
>;

const CameraScreen = observer(() => {
  const navigation = useNavigation<CameraScreenProp>();
  const [permissions, setPermissions] = useState(false)
  const [scanned, setScanned] = useState<boolean>(false)
  const {decodeInvoice} = stores.lnbitsStore

  useEffect(() => {
    getCameraPermission()
  }, [permissions])

  const getCameraPermission = async () => {
    const cameraPermission = await BarCodeScanner.requestPermissionsAsync()

    setPermissions(cameraPermission.status === 'granted');

    if (cameraPermission.status !== 'granted') {
      alert('Permission for camera access needed to scan invoices.');
    }
  };

  const handleBarCodeScanned = async ({ type, data }: any) => {
    setScanned(true);
    let invoice = await decodeInvoice(data)
    navigation.navigate('Send', {
      amount: Number(invoice.data.amount_msat) / 1000,
      description: invoice.data.description,
      pay_req: data
    })
  };

  const pasteInvoiceFromClipboard = async () => {
    let clipboard = await Clipboard.getStringAsync()
    if (!clipboard) {
      return alert("Nothing copied from clipboard")
    }
    // Validate QR code
    let invoice = await decodeInvoice(clipboard)
    navigation.navigate('Send', {
      amount: Number(invoice.data.amount_msat) / 1000,
      description: invoice.data.description,
      pay_req: clipboard
    })
  }

  if (permissions == false) {
    return (
      <Center>
        <Text>Failed to read QR Code</Text>
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
          <Button 
            position="absolute" 
            top="80%" 
            left="34%"
            w={125} 
            h="50px" 
            borderRadius="3xl" 
            backgroundColor="#444444"
            onPress={async () => await pasteInvoiceFromClipboard()}>
              Paste Invoice
          </Button>
    </Center>
  );
});

export default CameraScreen
