import React from 'react';
import {Text, Button, Center, VStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BitcoinBayParamList} from './BitcoinBayNavParams';

type CameraScreenProp = NativeStackNavigationProp<
  BitcoinBayParamList,
  'Camera'
>;

const Receive = () => {
  const navigation = useNavigation<CameraScreenProp>();
  return (
    <Center
      _dark={{bg: 'primary.dark'}}
      _light={{bg: 'primary.light'}}
      px={4}
      flex={1}>
      <VStack space={5} alignItems="center">
        <Text>Camera</Text>
        <Button onPress={() => navigation.navigate('Home')}>Home</Button>
      </VStack>
    </Center>
  );
};

export default Receive;
