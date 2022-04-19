import React, {useState} from 'react';
import {Text, Button, Center, VStack, Box, HStack, Input} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BitcoinBayParamList} from './BitcoinBayNavParams';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons';

type SendScreenProp = NativeStackNavigationProp<BitcoinBayParamList, 'Home'>;

const Send = () => {
  const navigation = useNavigation<SendScreenProp>();
  const [amount, setAmount] = useState<string>('0');
  const [description, setDescription] = useState<string>('');
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
        <HStack>
          <Input
            variant="outline"
            placeholder="Invoice"
            width="75%"
            keyboardAppearance="dark"
            value={description}
            onChangeText={text => setDescription(text)}
          />
          {/* Go to camera screen */}
          <Button ml={1} onPress={() => alert('Scan')}>
            <FontAwesomeIcon icon={faCamera} color="#ffffff" />
          </Button>
        </HStack>
        <Button
          w="70%"
          mt={5}
          rounded="full"
          onPress={() => navigation.navigate('PayInvoice')}>
          Pay
        </Button>
      </VStack>
    </Box>
  );
};

export default Send;
