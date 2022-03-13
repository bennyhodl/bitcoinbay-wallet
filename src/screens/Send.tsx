import React from 'react';
import {Text, Button, Center, VStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BitcoinBayParamList} from './BitcoinBayNavParams';

type SendScreenProp = NativeStackNavigationProp<BitcoinBayParamList, 'Home'>;

const Send = () => {
  const navigation = useNavigation<SendScreenProp>();
  return (
    <Center
      _dark={{bg: 'primary.dark'}}
      _light={{bg: 'primary.light'}}
      px={4}
      flex={1}>
      <VStack space={5} alignItems="center">
        <Text>Send Page</Text>
        <Button onPress={() => navigation.navigate('Receive')}>Receive</Button>
      </VStack>
    </Center>
  );
};

export default Send;
