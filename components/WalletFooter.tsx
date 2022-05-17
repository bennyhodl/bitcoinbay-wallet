import React from 'react';
import {Box, Text, Center, HStack, Pressable} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons';

const WalletFooter = ({navigation}: any) => {
  return (
    <Box flex={1} bg="primary.900" shadow="5">
      <HStack height="100" bg="primary.900" alignItems="center">
        <Pressable
          py="2"
          flex={1}
          onPress={() => navigation.navigate('CreateInvoice')}>
          <Center>
            <Text
              letterSpacing="xl"
              fontSize="xl"
              fontWeight="extrabold"
              color="primary.100"
              mb="5">
              Receive
            </Text>
          </Center>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Camera')}>
          <Box
            rounded="full"
            bg="primary.900"
            height="75"
            width="75"
            mb="50"
            shadow="9"
            justifyContent="center">
            <Center>
              <FontAwesomeIcon icon={faCamera} size={30} color="#ffffff" />
            </Center>
          </Box>
        </Pressable>
        <Pressable py="2" flex={1} onPress={() => navigation.navigate('Send')}>
          <Center>
            <Text
              letterSpacing="xl"
              fontSize="xl"
              fontWeight="extrabold"
              color="primary.100"
              mb="5">
              Send
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  );
};

export default WalletFooter;
