import React, {useState} from 'react';
import {Alert, Share} from 'react-native';
import {Text, Box, VStack, HStack, Pressable, Button} from 'native-base';
import Clipboard from '@react-native-community/clipboard';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BitcoinBayParamList} from './BitcoinBayNavParams';
import QRCode from 'react-native-qrcode-svg';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClipboard} from '@fortawesome/free-solid-svg-icons';
// import Logo from '../assets/logo.jpg';

type InvoiceScreenProp = NativeStackNavigationProp<
  BitcoinBayParamList,
  'Invoice'
>;

type InvoiceProps = {
  route: RouteProp<BitcoinBayParamList, 'Invoice'>;
};

interface InvoiceDialogProps {
  invoice: string;
}

const InvoiceDialog = (props: InvoiceDialogProps) => {
  return (
    <Pressable
      onPress={() => {
        Clipboard.setString(props.invoice);
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

const invoiceString: string =
  'lnbcrt10u1p3r0hztpp5gwdf0w2m9fpqfgr63mpypfdumhn3r34nlnwez7jaagmuhw08wfrqdqjgf5hgcm0d9hzqsnp0ycqzpgxqyz5vqsp50xapzkrhfgrds09v8q0pkqn7cyw9ae9pv9dc2qhtwzlks3lttnfq9qyyssqefgecv0g3wpspmelqf2lvpcnykdugzjxp0mxf0dp4czkc7hslwf5lege7r3esy3x95cm0jgx2ezxkfzrues0p593c3d0krtmu2j78gqp8c6s5c';

const Invoice = (props: InvoiceProps) => {
  const navigation = useNavigation<InvoiceScreenProp>();
  const [invoice, setInvoice] = useState<string>(invoiceString);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: invoice,
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
      <VStack space={5} mt={20} alignItems="center">
        <QRCode value={invoice} logoSize={50} size={350} />
        <InvoiceDialog invoice={invoice} />
        <Button borderRadius="3xl" w={100} py={2} onPress={() => onShare()}>
          Share
        </Button>
      </VStack>
    </Box>
  );
};

export default Invoice;
