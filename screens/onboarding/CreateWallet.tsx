import React, {useState} from "react"
import { Center, Text, Input, Button } from "native-base"
import { createWallet } from "../../lnbits/wallet"
import Loading from "../../components/Loading"
import { storeAdminKey, storeInvoiceKey, storeUserId, storeWalletId } from "../../lnbits/storage"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { BitcoinBayParamList } from "../BitcoinBayNavParams"
import stores from "../../stores/Stores"
import { inject, observer } from "mobx-react"

type CreateWalletScreenProp = NativeStackNavigationProp<
  BitcoinBayParamList,
  'CreateWallet'
>;

const CreateWallet = observer(() => {
    const navigation = useNavigation<CreateWalletScreenProp>();
    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const {user, addUser} = stores.userStore

    const newWallet = async () => {
        setLoading(true)
        const newUser = await createWallet(name, email)
        const wallet = newUser.wallets[0]
        storeUserId(newUser.id)
        storeWalletId(wallet.id)
        storeInvoiceKey(wallet.inkey)
        storeAdminKey(wallet.adminkey)
        setLoading(false)
        await AsyncStorage.setItem('init', "false")
        addUser(wallet.name)
    }

    if (loading) {
        return <Loading />
    }
    return(
        <Center h="100%">
            <Text fontSize={20} fontWeight="bold">Create a wallet {user}</Text>
            <Input
                variant="outline"
                placeholder="Wallet name"
                width="75%"
                keyboardAppearance="dark"
                mt={5}
                value={name}
                onChangeText={text => setName(text)}
            />
            <Input
                variant="outline"
                placeholder="Email (optional)"
                width="75%"
                keyboardAppearance="dark"
                mt={5}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Button onPress={() => newWallet()} mt={5}>Create Wallet</Button>
        </Center>
    )
})

export default CreateWallet