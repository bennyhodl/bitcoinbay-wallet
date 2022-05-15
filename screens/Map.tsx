import React from "react"
import MapView, {Marker} from 'react-native-maps';
import { stores } from "../util/stores";
import { BitcoinBayParamList } from "./BitcoinBayNavParams"
import { Box } from "native-base";
import { Dimensions } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type MapsScreenProps = NativeStackScreenProps<BitcoinBayParamList, 'Maps'>;

const Map = () => {
    const navigation = useNavigation<MapsScreenProps>()

    return(
        <Box>
            <MapView
                style={{width: '100%', height: '100%'}}
                region={{
                latitude: 27.964157,
                longitude: -82.452606,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}>
                {stores.map(store => {
                return(
                    <Marker
                    key={store.id}
                    title={store.title}
                    description={store.description}
                    coordinate={{
                    latitude: store.latitude,
                    longitude: store.longitude
                    }}
                    pinColor="#ff581a"
                    />
                )
                })}
            </MapView>  
        </Box>
    )
}

export default Map