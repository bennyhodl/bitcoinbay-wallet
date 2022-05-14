import React from "react"
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import { Box, Pressable } from "native-base";
import { useNavigation } from "@react-navigation/native";

const DrawerButton = () => {
    const navigation = useNavigation<any>();
    return(
        <Box zIndex={999} position="absolute" top={12} left={5}>
            <Pressable onPress={() => navigation.openDrawer()}>
                <FontAwesomeIcon icon={faBars} color="#ff581a" size={25}/>
            </Pressable>
        </Box>
    )
}

export default DrawerButton