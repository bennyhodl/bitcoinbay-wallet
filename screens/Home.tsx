import React, {useState} from 'react';
import {Text, Box, VStack, HStack, Center, Button} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BitcoinBayParamList} from './BitcoinBayNavParams';
import WalletFooter from '../components/WalletFooter';
import DrawerButton from '../components/DrawerButton';

type HomeScreenProp = NativeStackNavigationProp<BitcoinBayParamList, 'Home'>;

const Home = () => {
  const navigation = useNavigation<HomeScreenProp>();
 
  return (
    <Box
      _dark={{bg: 'primary.dark'}}
      _light={{bg: 'primary.light'}}
      height="100%"
      flex={1}   
      flexDirection="column"
      justifyContent="space-between">
      <DrawerButton />
        <Center h="95%">
          <Text 
            fontSize="2xl"
            color="warmGray.600"
            fontWeight="extrabold"
            mb={10}>
              345634 sats
          </Text>
          <HStack space={5}>
            <Button borderRadius="3xl" w={125} h="40px" onPress={() => navigation.navigate('CreateInvoice')}>Receive</Button>
            <Button borderRadius="3xl" w={125} h="40px" onPress={() => navigation.navigate('Camera')}>Send</Button>
          </HStack>
        </Center>
    </Box>
  );
};

export default Home;
