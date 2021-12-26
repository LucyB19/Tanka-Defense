import { useRoute } from '@react-navigation/core';
import React, { useCallback, useContext } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native'
import { Channel, ChannelAvatar, MessageInput, MessageList, useChannelContext,} from 'stream-chat-expo';
import Geolocation from '@react-native-community/geolocation';
import AuthContext from '../contexts/Authentication';
import { FontAwesome } from '@expo/vector-icons';
import { nachos } from './Home';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import usePermissions from '../utilities/usePermissions';

//import CreateLocation, {latitude, longitude} from "../components/CreateLocation";

const MAPS_API_KEY = 'AIzaSyCM7vKfqtHGOH8ZfaXgeqLjd4PDplxCq1g';

if (MAPS_API_KEY) {
  Location.setGoogleApiKey(MAPS_API_KEY);
}

//Geolocation.setRNConfiguration({skipPermissionRequests: true});



// Given the location coordinates, this function generates url for google map,
// and opens this Url using Linking module of react-native.
// Please check documentation of `Linking` module from react-native, for details:
// https://reactnative.dev/docs/linking
//
// Generally this url will be opened in google maps application.
// https://developers.google.com/maps/documentation/urls/get-started
const goToGoogleMaps = (lat, long) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`;

  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log(`Don't know how to open URI: ${url}`);
    }
  });
};

// Generates static map url for given location coordinates.
// For reference, please check - https://developers.google.com/maps/documentation/maps-static/overview
const prepareStaticMapUrl = (lat, long) => {
  let baseURL = 'https://maps.googleapis.com/maps/api/staticmap?';
  let url = new URL(baseURL);
  let params = url.searchParams;
  params.append('center', `${lat},${long}`);
  params.append('zoom', '15');
  params.append('size', '600x300');
  params.append('maptype', 'roadmap');
  params.append('key', MAPS_API_KEY);
  params.append('markers', `color:red|${lat},${long}`);

  return url.toString();
};

const sendCurrentLocation = (channel) => {
  const handlePress = useCallback(async (channel) => {
    // Open the custom settings if the app has one
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });
    const { latitude, longitude } = location.coords;
    
    //this.setState({ location: { latitude, longitude } });
    let geocode = await Location.reverseGeocodeAsync({latitude, longitude});
    const city = geocode[0].city;
    const street = geocode[0].street;
    const name = geocode[0].name;
    //{geocode ? `${geocode[0].city}, ${geocode[0].isoCountryCode}` : ''}
    console.log(city);
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    const mapApi = prepareStaticMapUrl(latitude, longitude);
    channel?.sendMessage({
      text: 'I do not feel safe right now, and I need help. My location is '+(name)+', '+(city)+' '+(url),
      image: '../assets/images/onlydog.png',
      attachments: [
        {
          type: 'location',
          latitude: latitude,
          longitude: longitude,
        },
      ],
      
    });
  }, []);
    handlePress(channel);

  
};

// UI Component for rendering `location` type attachment
const LocationCard = ({type, latitude, longitude}) => {
  if (type === 'location') {
    const mapApi = prepareStaticMapUrl(latitude, longitude);
    console.log(mapApi);
    return (
      <TouchableOpacity onPress={() => goToGoogleMaps(latitude, longitude)}>
        <Image source={{uri: mapApi}} style={{height: 200, width: 300}} />
      </TouchableOpacity>
    );
  }
};

const ChannelScreen = () => {


  
  const route = useRoute();

  const channel= route.params?.channel;
  
  if (!channel) {
    return <Text>Channel Not Found</Text>
  }


  usePermissions(Location.requestForegroundPermissionsAsync);


  const [useGoogleMaps, setGoogleMaps] = React.useState(false);

  if (nachos==0){
    console.log('not an emergency')
  }
  if (nachos==1){
    console.log('well it is a bloody fucking emergency');
    sendCurrentLocation(channel);
    //sendCurrentLocation(channel);
    
    /*channel?.sendMessage({
      text:'this is my location',
    })*/

  }
  
  return(
    <Channel 
      channel={channel}>
      <View style={styles.header}>
        <ChannelAvatar channel={channel} />
      </View>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

export default ChannelScreen

const styles = StyleSheet.create({
  header:{
    //marginTop: 50,
    padding: 20,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  headertext:{
    alignItems: "center",
    justifyContent: 'center',
  },
})


