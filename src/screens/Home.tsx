import React from 'react';
import {Text, Button, Center, VStack, HStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BitcoinBayParamList} from './BitcoinBayNavParams';

type HomeScreenProp = NativeStackNavigationProp<BitcoinBayParamList, 'Home'>;

const Home = () => {
  const navigation = useNavigation<HomeScreenProp>();
  return (
    <Center
      _dark={{bg: 'primary.dark'}}
      _light={{bg: 'primary.light'}}
      px={4}
      flex={1}>
      <VStack space={5} alignItems="center">
        <Text>Home Page</Text>
        <HStack>
          <Button w={20} mx={2} onPress={() => navigation.navigate('Receive')}>
            Receive
          </Button>
          <Button w={20} mx={2} onPress={() => navigation.navigate('Send')}>
            Send
          </Button>
        </HStack>
      </VStack>
    </Center>
  );
};

export default Home;
