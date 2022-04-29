import React, {useState} from 'react';
import {Text, Button, VStack, Box, HStack, Input} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BitcoinBayParamList} from './BitcoinBayNavParams';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import Loading from '../components/Loading'
import Paid from "../components/Paid"
import {payBolt11} from "../lnbits/wallet"

type SendScreenProp = NativeStackNavigationProp<BitcoinBayParamList, 'Home'>;

type PaymentStatus = {
  paid: boolean,
  status: boolean
}

const Send = () => {
  const navigation = useNavigation<SendScreenProp>();
  const [amount, setAmount] = useState<string>('0');
  const [invoice, setInvoice] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)
  const [paid, setPaid] = useState<PaymentStatus>({paid: false, status: false})

  const sendPayment = async (invoice: string) => {
    setLoading(true)
    const status = await payBolt11(invoice)
    setLoading(false)
    setPaid({paid: true, status: status.data})

  }

  if (loading) {
    return <Loading />
  }

  if (paid.paid) {
    return <Paid paid={paid.status}/>
  }
  return (
    <Box
      _dark={{bg: 'primary.dark'}}
      _light={{bg: 'primary.light'}}
      px={4}
      flex={1}>
      {/* {loading ? 
        <Text>Loading...</Text>
        : */}
        <VStack space={5} mt={10} alignItems="center">
          <HStack alignItems="center">
            <Text
              fontSize="2xl"
              color="warmGray.600"
              fontWeight="extrabold"
              mr={1}>
              {amount}
            </Text>
            <Text fontSize="xl" fontWeight="extrabold" color="warmGray.600">
              sats
            </Text>
          </HStack>
          {/* Add Bitcoin price in USD */}
          <HStack>
            <Input
              variant="outline"
              placeholder="Invoice"
              width="75%"
              keyboardAppearance="dark"
              value={invoice}
              onChangeText={text => setInvoice(text)}
            />
            {/* Go to camera screen */}
            <Button ml={1} onPress={() => navigation.navigate("Camera")}>
              <FontAwesomeIcon icon={faCamera} color="#ffffff" />
            </Button>
          </HStack>
          <Button
            w="70%"
            mt={5}
            rounded="full"
            onPress={() => sendPayment("lnbc50n1p3xcdhrpp5t4fdtws9qf5sexncdhfpj20t30ush2l5k8zvsa2tvd9hjdk2m5qqdqqcqzzgxqyz5vqrzjqw8c7yfutqqy3kz8662fxutjvef7q2ujsxtt45csu0k688lkzu3ldmlstpw3vgjduyqqqqryqqqqthqqpysp5wqg658wu20hk2e4ahyg590h7ld9v0gjgvsgxr7l7spz5pvsxw0ps9qypqsqsadclhw30asasf8fdqc270hg6fwrssmm2n7dr4hyspq2pkegdx583n8mvjn56ymtt60s0kj8dayyxg46hn60ywlp8rczvg68gqxl8zgpj3xlms")}>
            Pay
          </Button>
        </VStack>
    {/* } */}

    </Box>
  );
};

export default Send;
