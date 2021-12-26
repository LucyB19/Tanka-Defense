import React, {useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Button,
  Linking
} from 'react-native';
import navigation from '../navigation'
import { RootTabScreenProps } from '../types'
//import Geolocation from '@react-native-community/geolocation';
import AuthContext from '../contexts/Authentication';
import { useChannelContext } from 'stream-chat-expo';
import {StreamChat} from "stream-chat";
import { ChannelList } from 'stream-chat-expo';
import { NavigationHelpersContext } from '@react-navigation/core';

const API_KEY= "s4b956z5yey9";
const client = StreamChat.getInstance(API_KEY);
const MAPS_API_KEY = 'AIzaSyBY_UODXBj13Opl2HTEAS4myaQvSOvLF7Q';

var nachos=0;



  {/*const filters = {
   members: {
     $in: [userId],
   },
   
  };*/};
const InputButtons = async() => {
  //const {userId}: any ="Warren";
  {/*const {channel: currentChannel} = useChannelContext();

  return (
    <TouchableOpacity
      onPress={() => sendCurrentLocation(currentChannel)}
      style={{marginRight: 10}}>
       <TabBarIcon name="clock-o" color="black" />
    </TouchableOpacity>
  );*/}

  console.log("button been pushed");
};

export default function Home({ navigation }: RootTabScreenProps<'TabZero'>) {

  const {userId} = React.useContext(AuthContext);

  const onChannelPressed = async() => {
    
    const channel = client.channel("livestream", "notjustdev", {
      name: "NotJustDev",
      /*members:  {
        $in: [userId],
      },*/
    });
    await channel.watch();
    nachos = 1;
    navigation.navigate("Channel", {channel});
   }

   const resetemergency = async() => {
     nachos=0;
   }

  return (
    <ImageBackground 
      source={require('../assets/images/mountainlake.jpg')}
      //blurRadius={5}
      style={styles.container}>
        <View style={styles.overlay}>
          <TouchableOpacity
            onPress={onChannelPressed}>
            <Image
              source={require('../assets/images/onlydog.png')}
              style={{ width: 200, height: 220 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={resetemergency}>
              <Text style={styles.buttonText}>Unassuming Button</Text>
          </TouchableOpacity>
        </View>

    </ImageBackground>
  )
}

export {nachos};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: '#00000070',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 20,
    padding: 7,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    
  },
  buttonText: {
    fontSize: 20,
    //marginTop: 10,
    color: '#fff',
  },
})

