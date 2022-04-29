import React from "react"
import {Center, Text} from "native-base"

type PaidProps = {
    paid: boolean
}
const Paid = (props: PaidProps) => {
    const {paid} = props
    return(
        <Center 
        _dark={{bg: 'primary.dark'}}
        _light={{bg: 'primary.light'}}
        flex={1}>
           {paid ? 
                <Text>Paid!</Text>
                :
                <Text>Failed.</Text>
            }
        </Center>
    )
}

export default Paid