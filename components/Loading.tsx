import React from "react"
import {Center} from "native-base"
import {ActivityIndicator} from "react-native"

const Loading = () => {
    return (
        <Center 
        // _dark={{bg: 'primary.dark'}}
        // _light={{bg: 'primary.light'}}
        flex={1}>
            <ActivityIndicator size="large" color="#ff581a" />
        </Center>
    )
}

export default Loading