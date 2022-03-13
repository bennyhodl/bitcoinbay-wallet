import React from 'react';
import {Text, Button, Center, VStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BitcoinBayParamList} from './BitcoinBayNavParams';

type ReceiveScreenProp = NativeStackNavigationProp<
  BitcoinBayParamList,
  'Receive'
>;

const Receive = () => {
  const navigation = useNavigation<ReceiveScreenProp>();
  return (
    <Center
      _dark={{bg: 'primary.dark'}}
      _light={{bg: 'primary.light'}}
      px={4}
      flex={1}>
      <VStack space={5} alignItems="center">
        <Text>Receive</Text>
        <Button onPress={() => navigation.navigate('Home')}>Home</Button>
      </VStack>
    </Center>
  );
};

export default Receive;
