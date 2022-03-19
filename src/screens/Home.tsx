import React from 'react';
import {Text, Box, Center, VStack, HStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BitcoinBayParamList} from './BitcoinBayNavParams';
import WalletFooter from '../components/WalletFooter';

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
      justifyContent="space-between"
      safeAreaTop>
      <Text>Bitcoin Bay</Text>
      <HStack>
        <WalletFooter navigation={navigation} />
      </HStack>
    </Box>
  );
};

export default Home;
