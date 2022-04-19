import React, {useState} from 'react';
import {Text, Input, Box, VStack, HStack, Button} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BitcoinBayParamList} from './BitcoinBayNavParams';

type ReceiveScreenProp = NativeStackNavigationProp<
  BitcoinBayParamList,
  'Receive'
>;

const Receive = () => {
  const navigation = useNavigation<ReceiveScreenProp>();
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  return (
    <Box
      _dark={{bg: 'primary.dark'}}
      _light={{bg: 'primary.light'}}
      px={4}
      flex={1}>
      <VStack space={5} mt={10} alignItems="center">
        <HStack alignItems="center">
          <Input
            variant="unstyled"
            autoFocus={true}
            size="2xl"
            placeholder="0"
            keyboardType="numeric"
            keyboardAppearance="dark"
            color="warmGray.600"
            fontWeight="extrabold"
            value={amount}
            onChangeText={text => setAmount(text)}
          />
          <Text fontSize="xl" fontWeight="extrabold" color="warmGray.600">
            sats
          </Text>
        </HStack>
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
          onPress={() =>
            navigation.navigate('Invoice', {
              amount: Number(amount),
              description: description,
            })
          }>
          Create Invoice
        </Button>
      </VStack>
    </Box>
  );
};

export default Receive;
