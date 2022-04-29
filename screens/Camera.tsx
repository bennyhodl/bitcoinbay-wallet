import React, {useEffect, useState} from 'react';
import {Text, Button, Center, VStack, Box, ZStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BitcoinBayParamList} from './BitcoinBayNavParams';
import {Camera} from "expo-camera"
import Svg, {Path, Circle, Rect} from "react-native-svg"
type CameraScreenProp = NativeStackNavigationProp<
  BitcoinBayParamList,
  'Camera'
>;

const CameraScreen = () => {
  const navigation = useNavigation<CameraScreenProp>();
  const [permissions, setPermissions] = useState(false)

  useEffect(() => {
    permisionFunction()
  }, [])

  const permisionFunction = async () => {
    const cameraPermission = await Camera.requestPermissionsAsync();

    setPermissions(cameraPermission.status === 'granted');

    if (
      cameraPermission.status !== 'granted'
    ) {
      alert('Permission for camera access needed.');
    }
  };

  if (permissions == false) {
    return (
      <Center>
        <Text>Fail</Text>
      </Center>
    )
  }
  return (
    <Center
      _dark={{bg: 'primary.dark'}}
      _light={{bg: 'primary.light'}}
      flex={1}>
          <Camera
            style={{flex: 1,width:"100%", height:"100%", margin: 0}}
            type="front"
          />
          {/* <Svg viewBox="0 0 100 100" width={50} style={{position: "absolute"}}>
            <Path d="M25,2 L2,2 L2,25" fill="none" stroke="#000000" stroke-width="3" />
            <Path d="M2,75 L2,98 L25,98" fill="none" stroke="#000000" stroke-width="3" />
            <Path d="M75,98 L98,98 L98,75" fill="none" stroke="#000000" stroke-width="3" />
            <Path d="M98,25 L98,2 L75,2" fill="none" stroke="#000000" stroke-width="3" />
          </Svg>  */}
    </Center>
  );
};

export default CameraScreen
