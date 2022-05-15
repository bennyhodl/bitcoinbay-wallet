import React from "react"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BitcoinBayParamList } from "./BitcoinBayNavParams"
import { useNavigation } from "@react-navigation/native";
import { Box, Text } from "native-base";

type TransactionScreenProps =  NativeStackNavigationProp<
BitcoinBayParamList,
'Transactions'
>;

const Transactions = () => {
    const navigation = useNavigation<TransactionScreenProps>()
    return(
        <Box>
            <Text>Sup,dude</Text>
        </Box>
    )
}

export default Transactions