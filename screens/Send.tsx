import React, {useState} from 'react';
import {observer} from "mobx-react"
import stores from "../stores"
import {Text, Button, VStack, Box, HStack, Input} from 'native-base';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BitcoinBayParamList} from './BitcoinBayNavParams';
import Loading from '../components/Loading'
import Paid from "../components/Paid"

type SendScreenProp = NativeStackNavigationProp<BitcoinBayParamList, 'Home'>;

type PaymentStatus = {
  paid: boolean,
  status: boolean
}

type InvoiceProps = {
  route: RouteProp<BitcoinBayParamList, 'Send'>
}

const Send = observer((props: InvoiceProps) => {
  const navigation = useNavigation<SendScreenProp>();
  const {payBolt11} = stores.lnbitsStore
  const {amount, description, pay_req} = props.route.params
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
          <Text>{description}</Text>
          <Button
            w="70%"
            mt={5}
            rounded="full"
            onPress={() => sendPayment(pay_req)}>
            Pay
          </Button>
        </VStack>
    </Box>
  );
});

export default Send;
