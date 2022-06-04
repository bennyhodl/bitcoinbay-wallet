import React, { useCallback, useEffect, useState } from "react"
import {observer} from "mobx-react"
import stores from "../stores"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BitcoinBayParamList } from "./BitcoinBayNavParams"
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Text, VStack } from "native-base";
import Loading from "../components/Loading";
import { RefreshControl, SafeAreaView, ScrollView } from "react-native";

type TransactionScreenProps =  NativeStackNavigationProp<
BitcoinBayParamList,
'Transactions'
>;

const Transactions = observer(() => {
    const navigation = useNavigation<TransactionScreenProps>()
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const {transactions, getUserTransactions} = stores.lnbitsStore
    const { loading, setLoading } = stores.appStore
    
    const fetchTransactions = async () => {
        await getUserTransactions()
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        fetchTransactions()
        setRefreshing(false)
      }, [])

    useEffect(() => {
        fetchTransactions()
    }, [])

    if (loading) {
        return <Loading />
    }

    return(
    <SafeAreaView style={{height: "100%", width: "100%", backgroundColor: '#fff6f2'}}>
      <ScrollView
        refreshControl={
          <RefreshControl 
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <Box 
        _dark={{bg: 'primary.dark'}}
        _light={{bg: 'primary.light'}}
        px={4}
        flex={1}
        >
            {transactions?.map(transaction => {
                return (
                    <HStack style={{justifyContent: "space-between", alignItems: "center"}} py={4} key={transaction.checking_id}>
                        <VStack>
                            <Text style={{fontSize: 15}} fontWeight="bold">{transaction.memo}</Text>
                        </VStack>
                        <Text color={transaction.amount < 0 ? "#FF0000": "#00FF00"} style={{fontWeight: "bold"}}>{(transaction.amount / 1000).toLocaleString()} sats</Text> 
                    </HStack>
                )
            })}
        </Box>
      </ScrollView>
    </SafeAreaView>
    )
})

export default Transactions