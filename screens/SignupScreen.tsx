import React, {useContext, useState} from 'react'
import { Image, StyleSheet, Text, View, Pressable, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform  } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import {useChatContext} from 'stream-chat-expo'
import AuthContext from '../contexts/Authentication'
import { Title } from 'react-native-paper';

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');

  const {setUserId} = useContext(AuthContext);
  
  const {client} = useChatContext();

  const connectUser = async (username: string, fullName: string) => {
    await client.connectUser(
      {
        id: username,
        name: fullName,
        //image: 'https://i.imgur.com/fR9Jz14.png',
      }, 
      client.devToken(username),
    );
    

    //create a channel
   // const channel = client.channel("messaging","public", {name: 'Public'},
   //   );
   // await channel.watch();
    //switch to create if it stops working (watch wasn't working for him so he switched to create... but mine is working)
    
    setUserId(username);
  };


  const signUp = () => {
    //sign user with custom backend and recieve token back
    connectUser(username, fullName);
    
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.root}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
      <View style={styles.container}>
      <Image
              source={require('../assets/images/tankalogoblack.png')}
              style={{ width: 150, height: 150 }}
            />
        </View>
          <View style={styles.inputContainer}>
            <TextInput 
              value={username} 
              onChangeText={setUsername}
              placeholder="Username" 
              placeholderTextColor= "gray"
              style = {styles.input} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput 
              value={fullName} 
              onChangeText={setFullName} 
              placeholder="Full Name" 
              placeholderTextColor= "gray"
              style = {styles.input} />
          </View>

          <Pressable onPress={signUp} style={styles.button}>
            <Text> Sign Up</Text>
          </Pressable>
          </View>
      </TouchableWithoutFeedback>    
    </KeyboardAvoidingView>
    
  )
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //backgroundColor: '#f5f5f5',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  overlay: {
    backgroundColor: '#00000070',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
  },
  input: {
    
  },
  root: {
    flex: 1,
    //alignItems: 'center',
    margin: 10,
    marginTop: 200,
  },
  button: {
    backgroundColor: 'grey',
    padding: 15,
    alignItems: "center",
    marginVertical: 10,
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
    alignContent: "center",
  },
})

export default SignupScreen

