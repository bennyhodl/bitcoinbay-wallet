import React from "react"
import {Center, Text} from "native-base"
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleCheck, faCircleExclamation} from '@fortawesome/free-solid-svg-icons';

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
                <>
                    <FontAwesomeIcon icon={faCircleCheck} size={100} color="#ff581a" />
                    <Text fontSize={20} fontWeight="bold" pt={5}>Payment sent!</Text>
                </>
                :
                <>
                    <FontAwesomeIcon icon={faCircleExclamation} size={100} color="#ff0000" />
                    <Text fontSize={20} fontWeight="bold" pt={5}>Failed.</Text>
                </>
            }
        </Center>
    )
}

export default Paid