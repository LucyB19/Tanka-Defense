import React from "react";
import { StyleSheet, Button, View, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";

const Controls = (props) => {
  const startPauseText = props.isTimerRunning ? "Pause" : "Start";
  return (
    <View style={style.controlContainer}>
      <View style={style.container}>
      <TouchableOpacity
        style={style.button}
        onPress={props.onStartPausePress}>
        <Text style={style.buttonText}>{startPauseText}</Text>
      </TouchableOpacity>
      </View>
      <View style={style.container}>
      <TouchableOpacity
        style={style.button}
        onPress={props.onResetPress}>
        <Text style={style.buttonText}>Reset</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

Controls.propTypes = {
  onStartPausePress: PropTypes.func.isRequired,
  onResetPress: PropTypes.func.isRequired,
};

const style = StyleSheet.create({
  controlContainer: {
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "space-around",
    padding: 5,
    //color: '#fff'
    // borderColor: "#fff",
    // borderWidth: 2,
    // borderRadius: 10,
  },
  container: {
    justifyContent: "center",
    //backgroundColor:"#fff",
    //borderColor: "#fff",
    //borderWidth: ,
    borderRadius: 10,
    //padding: 2,
    //marginTop: 5,
    margin: 7,

  },
  button: {
    margin: 5,
    padding: 5,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    
  },
  buttonText: {
    fontSize: 20,
    //marginTop: 10,
    color: '#fff',
  },
});

export default Controls;
