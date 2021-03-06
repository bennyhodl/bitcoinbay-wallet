import React, {useState} from "react"
import { Center, Text, Input, Button } from "native-base"
import Loading from "../../components/Loading"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { BitcoinBayParamList } from "../BitcoinBayNavParams"
import stores from "../../stores"
import { observer } from "mobx-react"

type CreateWalletScreenProp = NativeStackNavigationProp<
  BitcoinBayParamList,
  'CreateWallet'
>;

const CreateWallet = observer(() => {
    const navigation = useNavigation<CreateWalletScreenProp>();
    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const {loading, setLoading} = stores.appStore
    const {login} = stores.appStore
    const {storeWalletId, storeInvoiceKey, storeAdminKey, createWallet} = stores.lnbitsStore

    const newWallet = async () => {
        alert("Creating wallet!")
        const newUser = await createWallet(name, email)
        const wallet = newUser.data.wallets[0]
        storeWalletId(wallet.id)
        storeInvoiceKey(wallet.inkey)
        storeAdminKey(wallet.adminkey)
        await login()
        navigation.navigate('Home')
    }

    if (loading) {
        return <Loading />
    }

    return(
        <Center h="100%">
            <Text fontSize={25} fontWeight="bold">Welcome to Bitcoin Bay!</Text>
            <Text fontSize={20}>Create your wallet</Text>
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
            <Button borderRadius="3xl" w={125} h="40px" onPress={() => newWallet()} mt={5}>Create Wallet</Button>
        </Center>
    )
})

export default CreateWallet