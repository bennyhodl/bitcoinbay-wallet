import React, {useState} from 'react';
import {Share} from 'react-native';
import {Text, Box, VStack, HStack, Pressable, Button} from 'native-base';
import * as Clipboard from 'expo-clipboard';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BitcoinBayParamList} from './BitcoinBayNavParams';
import QRCode from 'react-native-qrcode-svg';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClipboard} from '@fortawesome/free-solid-svg-icons';

type ReceiveScreenProp = NativeStackNavigationProp<
  BitcoinBayParamList,
  'Receive'
>;

type InvoiceProps = {
  route: RouteProp<BitcoinBayParamList, 'Receive'>;
};

type CopyInvoiceProps = {
  invoice: string;
}

const CopyInvoice = (props: CopyInvoiceProps) => {
  return (
    <Pressable
      onPress={() => {
        Clipboard.setStringAsync(props.invoice)
        alert('Copied to clipboard.');
      }}>
      <Box
        borderWidth={1}
        borderColor="warmGray.600"
        rounded="3xl"
        py={2}
        w="75%">
        <HStack px={5} alignItems="center">
          <Text numberOfLines={1} pr={1}>
            {props.invoice}
          </Text>
          <FontAwesomeIcon icon={faClipboard} color="#57534e" />
        </HStack>
      </Box>
    </Pressable>
  );
};

const Receive = (props: InvoiceProps) => {
  const navigation = useNavigation<ReceiveScreenProp>();
  const [loading, setLoading] = useState<boolean>(false)

  const onShare = async () => {
    try {
      await Share.share({
        message: props.route.params.pay_req,
      });
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <Box
      _dark={{bg: 'primary.dark'}}
      _light={{bg: 'primary.light'}}
      px={4}
      flex={1}>
      <VStack space={5} mt={5} alignItems="center">
        <Text color="#555555" p={0} m={0} fontSize={20} fontWeight="bold">{props.route.params.amount} sats</Text>
        <Text color="#555555" p={0} m={0}>For: {props.route.params.description}</Text>
        <QRCode value={props.route.params.pay_req} logoSize={50} size={350} />
        <CopyInvoice invoice={props.route.params.pay_req} />
        <Button borderRadius="3xl" w={100} py={2} onPress={() => onShare()}>
          Share
        </Button>
      </VStack>
    </Box>
  );
};

export default Receive;
