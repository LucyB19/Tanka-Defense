import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {StreamChat} from 'stream-chat';
import {
  OverlayProvider, 
  Chat, 
  ChannelList, 
  Channel, 
  MessageList,
  MessageInput,
} from 'stream-chat-expo';
// probably only want to wrap one screen with the chat. Or maybe not

import AuthContext from './contexts/Authentication';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const API_KEY= "s4b956z5yey9";
const client = StreamChat.getInstance(API_KEY);
//this makes sure that it initializes the client once, and you won't create multiple clients

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [userId, setUserId] = useState("");

  const [selectedChannel, setSelectedChannel] = useState<any>(null);

  useEffect(()=> {

    return () => client.disconnectUser();
    //when you close application, you disconnect the user
  }, [])
  

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext.Provider value={{userId, setUserId}}>
        <OverlayProvider>
          <Chat client={client}>
          <Navigation colorScheme="light" />
          </Chat>
    {     /* <Chat client={client}>
            {selectedChannel ? (
              <Channel channel={selectedChannel}>
                <MessageList />
                <MessageInput />
              <Text  
                style = {{marginTop: 20,
                marginBottom: 20}}
                onPress ={()=> setSelectedChannel(null)}>Go Back</Text>
              </Channel>
            ): (
            <ChannelList onSelect={onChannelPressed} />
            )}
            </Chat> */}
        </OverlayProvider>
        <StatusBar />
        </AuthContext.Provider>
      </SafeAreaProvider>
    );
  }
}
