import React, { useCallback, useEffect, useState } from 'react'
import { RefreshControl, SafeAreaView, ScrollView } from 'react-native'
import { observer } from 'mobx-react'
import stores from '../stores'
import { Text, HStack, Button } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BitcoinBayParamList } from './BitcoinBayNavParams'
import DrawerButton from '../components/DrawerButton'
import Loading from '../components/Loading'

type HomeScreenProp = NativeStackNavigationProp<BitcoinBayParamList, 'Home'>

const Home = observer(() => {
  const navigation = useNavigation<HomeScreenProp>()
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const { loading, setLoading } = stores.appStore
  const { walletDetails, getWalletDetails, reset } = stores.lnbitsStore
  const {balanceInUsd, convertSatsToUsd} = stores.bitcoinStore

  const callWalletDetails = async () => {
    setLoading(true)
    await getWalletDetails()
    setLoading(false)
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    callWalletDetails()
    convertSatsToUsd(Number(walletDetails.balance))
    setRefreshing(false)
  }, [])

  useEffect(() => {
    callWalletDetails()
    convertSatsToUsd(Number(walletDetails.balance))
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <SafeAreaView
      style={{ height: '100%', width: '100%', backgroundColor: '#fff6f2' }}
    >
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <DrawerButton />
        <Text fontSize="3xl" color="warmGray.600" fontWeight="extrabold" mb={2}>
          Hello, {walletDetails.name}
        </Text>
        <Text
          fontSize="2xl"
          color="warmGray.600"
          fontWeight="extrabold"
        >
          {(walletDetails.balance / 1000).toLocaleString()} sats
        </Text>
        <Text color="warmGray.400" mb={10}>~${balanceInUsd.toFixed(2)}</Text>
        <HStack space={5}>
          <Button
            borderRadius="3xl"
            w={125}
            h="40px"
            onPress={() => navigation.navigate('CreateInvoice')}
          >
            Receive
          </Button>
          <Button
            borderRadius="3xl"
            w={125}
            h="40px"
            onPress={() => navigation.navigate('Camera')}
          >
            Send
          </Button>
        </HStack>
        {/* <Button borderRadius="3xl" w={125} h="40px" onPress={() => reset()}>Reset</Button> */}
      </ScrollView>
    </SafeAreaView>
  )
})

export default Home
