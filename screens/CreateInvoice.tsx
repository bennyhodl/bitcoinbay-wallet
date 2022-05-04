import React, {useEffect, useState} from 'react';
import {Alert, Share} from 'react-native';
import {Text, Box, VStack, HStack, Pressable, Button} from 'native-base';
import Clipboard from '@react-native-community/clipboard';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BitcoinBayParamList} from './BitcoinBayNavParams';
import QRCode from 'react-native-qrcode-svg';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClipboard} from '@fortawesome/free-solid-svg-icons';
import {createInvoice} from "../lnbits/wallet"
import Loading from "../components/Loading"
// import Logo from '../assets/logo.jpg';

type InvoiceScreenProp = NativeStackNavigationProp<
  BitcoinBayParamList,
  'CreateInvoice'
>;

type InvoiceProps = {
  route: RouteProp<BitcoinBayParamList, 'CreateInvoice'>;
};

type InvoiceDialogProps = {
  invoice: string;
}

const InvoiceDialog = (props: InvoiceDialogProps) => {
  return (
    <Pressable
      onPress={() => {
        Clipboard.setString(props.invoice);
        alert('Copied to clipboard.');
      }}>
      <Box
        borderWidth={1}
        borderColor="warmGray.600"
        rounded="3xl"
        py={2}
        w="75%">
        <HStack px={5} alignItems="center">
          <Text numberOfLines={1} pr={1}>
            {props.invoice}
          </Text>
          <FontAwesomeIcon icon={faClipboard} color="#57534e" />
        </HStack>
      </Box>
    </Pressable>
  );
};

const CreateInvoice = (props: InvoiceProps) => {
  const navigation = useNavigation<InvoiceScreenProp>();
  const [invoice, setInvoice] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)
  const invoiceData = {
    amount: props.route.params.amount,
    memo: props.route.params.description
  }
  
  const requestInvoice = async () => {
    setLoading(true)
    const lnbitsInvoice = await createInvoice(invoiceData)
    setLoading(false)
    console.log("Invoice", lnbitsInvoice.data)
    setInvoice(lnbitsInvoice.data.payment_request)
  }
  useEffect(() => {
    requestInvoice()
  }, [])

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: invoice,
      });
    } catch (error) {
      console.log('Error', error);
    }
  };

  if (loading) {
    return <Loading />
  }

  return (
    <Box
      _dark={{bg: 'primary.dark'}}
      _light={{bg: 'primary.light'}}
      px={4}
      flex={1}>
      <VStack space={5} mt={5} alignItems="center">
        <Text color="#555555" p={0} m={0}>{props.route.params.amount} sats</Text>
        <Text color="#555555" p={0} m={0}>For: {props.route.params.description}</Text>
        <QRCode value={invoice} logoSize={50} size={350} />
        <InvoiceDialog invoice={invoice} />
        <Button borderRadius="3xl" w={100} py={2} onPress={() => onShare()}>
          Share
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateInvoice;
