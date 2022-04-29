import React from "react"
import {Center, Text} from "native-base"

const Loading = () => {
    return (
        <Center 
        _dark={{bg: 'primary.dark'}}
        _light={{bg: 'primary.light'}}
        flex={1}>
            <Text>Loading...</Text>
        </Center>
    )
}

export default Loading