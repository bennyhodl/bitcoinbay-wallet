import React from "react"
import { useNavigation } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { BitcoinBayParamList } from "./BitcoinBayNavParams"
import { Box, Text } from "native-base"

type DealsScreenProps = NativeStackScreenProps<BitcoinBayParamList, 'Deals'>

const Deals = () => {
    const navigation = useNavigation<DealsScreenProps>()
    return(
        <Box>
            <Text>Sup, delas.</Text>
        </Box>
    )
}

export default Deals