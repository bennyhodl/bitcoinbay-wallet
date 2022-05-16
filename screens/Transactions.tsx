import React, { useEffect, useState } from "react"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BitcoinBayParamList } from "./BitcoinBayNavParams"
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Text, VStack } from "native-base";
import {getUserTransactions} from "../lnbits/wallet"
import Loading from "../components/Loading";

type TransactionScreenProps =  NativeStackNavigationProp<
BitcoinBayParamList,
'Transactions'
>;

type Transaction = {
    memo: string,
    date: string,
    amount: number
}
const example: Transaction = {
    memo: "This is a test",
    date: "January 9, 2009",
    amount: 50000
}

const Transactions = () => {
    const navigation = useNavigation<TransactionScreenProps>()
    const [loading, setLoading] = useState<boolean>(false)
    const [transactions, setTransactions] = useState<Transaction>()
    
    const fetchTransactions = async () => {
        setLoading(false)
        const userTx = await getUserTransactions()
        if (userTx.status === 200) {
            setLoading(false)
            setTransactions(userTx.data)
        }
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
            <HStack style={{justifyContent: "space-between", alignItems: "center"}} py={4}>
                <VStack>
                    <Text style={{fontSize: 15}}>{example.memo}</Text>
                    <Text style={{fontSize: 15}}>{example.date}</Text>
                </VStack>
                <Text style={{fontWeight: "bold"}}>{example.amount} sats</Text> 
            </HStack>
            <HStack style={{justifyContent: "space-between", alignItems: "center"}}>
                <VStack>
                    <Text style={{fontSize: 15}}>{example.memo}</Text>
                    <Text style={{fontSize: 10}}>{example.date}</Text>
                </VStack>
                <Text style={{fontWeight: "bold"}}>{example.amount} sats</Text> 
            </HStack>
        </Box>
    )
}

export default Transactions