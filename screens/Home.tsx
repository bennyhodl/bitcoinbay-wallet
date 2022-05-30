import React, {useEffect, useState} from 'react';
import { observer } from 'mobx-react';
import stores from "../stores"
import {Text, Box, HStack, Center, Button} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BitcoinBayParamList} from './BitcoinBayNavParams';
import DrawerButton from '../components/DrawerButton';
import Loading from '../components/Loading';

type HomeScreenProp = NativeStackNavigationProp<BitcoinBayParamList, 'Home'>;

const Home = observer(() => {
  const navigation = useNavigation<HomeScreenProp>();
  const [loading, setLoading] = useState(false)
  const {walletDetails, getWalletDetails} = stores.lnbitsStore

  const callWalletDetails = async () => {
    setLoading(true)
    await getWalletDetails()
    setLoading(false)
  }

  useEffect(() => {
    callWalletDetails()
  }, [])
  
  if (loading) {
    return <Loading />
  }

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
            fontSize="3xl"
            color="warmGray.600"
            fontWeight="extrabold"
            mb={10}>
              Hello, {walletDetails.name}
          </Text>
          <Text 
            fontSize="2xl"
            color="warmGray.600"
            fontWeight="extrabold"
            mb={10}>
              {(walletDetails.balance / 1000).toLocaleString()} sats
          </Text>
          <HStack space={5}>
            <Button borderRadius="3xl" w={125} h="40px" onPress={() => navigation.navigate('CreateInvoice')}>Receive</Button>
            <Button borderRadius="3xl" w={125} h="40px" onPress={() => navigation.navigate('Camera')}>Send</Button>
          </HStack>
        </Center>
    </Box>
  );
});

export default Home;
