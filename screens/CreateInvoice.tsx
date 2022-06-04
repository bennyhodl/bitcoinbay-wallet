import React, {useState} from 'react';
import { observer } from 'mobx-react';
import stores from "../stores"
import {Text, Input, Box, VStack, Button} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BitcoinBayParamList} from './BitcoinBayNavParams';
import Loading from '../components/Loading';

type CreateInvoiceScreenProp = NativeStackNavigationProp<
  BitcoinBayParamList,
  'CreateInvoice'
>;

const CreateInvoice = observer(() => {
  const navigation = useNavigation<CreateInvoiceScreenProp>();
  const {createInvoice} = stores.lnbitsStore
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { loading, setLoading } = stores.appStore 

  if (loading) return <Loading />

  return (
    <Box
      _dark={{bg: 'primary.dark'}}
      _light={{bg: 'primary.light'}}
      px={4}
      flex={1}>
      <VStack mt={10} alignItems="center">
          <Input
            variant="unstyled"
            textAlign="right"
            autoFocus={true}
            size="2xl"
            width="250px"
            placeholder="0"
            keyboardType="numeric"
            keyboardAppearance="dark"
            color="warmGray.600"
            fontWeight="extrabold"
            value={amount}
            onChangeText={text => setAmount(text)}
            style={{textAlign: "center"}}
          />
          <Text fontSize="xl" fontWeight="extrabold" color="warmGray.600" pb={8}>
            sats
          </Text>
        <Input
          variant="outline"
          placeholder="Description (optional)"
          width="75%"
          keyboardAppearance="dark"
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <Button
          w="75%"
          mt={5}
          rounded="full"
          onPress={async () => {
            setLoading(true)
            let invoice = await createInvoice({amount: Number(amount), memo: description})
            setLoading(false)
            navigation.navigate('Receive', {
              amount: Number(amount),
              description: description,
              pay_req: invoice.data.payment_request
            })
          }
          }>
          Create Invoice
        </Button>
      </VStack>
    </Box>
  );
});

export default CreateInvoice
