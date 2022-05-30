import React, { useEffect, useState } from "react"
import {observer} from "mobx-react"
import stores from "../stores"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BitcoinBayParamList } from "./BitcoinBayNavParams"
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Text, VStack } from "native-base";
import {getUserTransactions} from "../lnbits/wallet"
import { Transaction } from "../types/wallet";
import Loading from "../components/Loading";

type TransactionScreenProps =  NativeStackNavigationProp<
BitcoinBayParamList,
'Transactions'
>;

const Transactions = observer(() => {
    const navigation = useNavigation<TransactionScreenProps>()
    const {transactions, getUserTransactions} = stores.lnbitsStore
    const [loading, setLoading] = useState<boolean>(false)
    
    const fetchTransactions = async () => {
        setLoading(true)
        await getUserTransactions()
        setLoading(false)
    }

    useEffect(() => {
        fetchTransactions()
    }, [])

    if (loading) {
        return <Loading />
    }

    return(
        <Box 
          _dark={{bg: 'primary.dark'}}
          _light={{bg: 'primary.light'}}
          px={4}
          flex={1}
        >
            {transactions?.map(transaction => {
                return (
                    <HStack style={{justifyContent: "space-between", alignItems: "center"}} py={4} key={Date.now()}>
                        <VStack>
                            <Text style={{fontSize: 15}} fontWeight="bold">{transaction.memo}</Text>
                            {/* <Text style={{fontSize: 15}}>{date.toISOString()}</Text> */}
                        </VStack>
                        <Text color={transaction.amount < 0 ? "#FF0000": "#00FF00"} style={{fontWeight: "bold"}}>{transaction.amount.toLocaleString()} sats</Text> 
                    </HStack>
                )
            })}
        </Box>
    )
})

export default Transactions