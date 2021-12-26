import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground
} from "react-native";
import CountdownTimer from "../components/CountdownTimer";
import Controls from "../components/Controls";
import ConfigTimerInput from "../components/ConfigTimerInput";
import Constants from "expo-constants";
import { RootTabScreenProps } from "../types";

export default class Pomodoro extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      currentTimerIdx: 0,
      timers: [
        { minutes: 0, seconds: 10, type: "Travel" },
        
      ],
      isTimerRunning: false,
      isTimerPaused: false,
    };
  }

  onUpdateTimerConfig = (timerObject) => {
    timerObject = this.validateTimerObject(timerObject);
    const newTimers = this.state.timers.map((timer) => {
      if (timer.type === timerObject.type) {
        return timerObject;
      } else {
        return timer;
      }
    });
    this.setState({ timers: newTimers });
  };

  validateTimerObject = (timerObject) => {
    if (isNaN(parseInt(timerObject.seconds))) {
      timerObject.seconds = 0;
    } else if (timerObject.seconds > 59) {
      timerObject.seconds = 59;
    } else if (isNaN(parseInt(timerObject.minutes))) {
      timerObject.minutes = 0;
    }
    return timerObject;
  };

  onCountdownComplete = () => {
    this.setState(
      (previousState) => ({
        currentTimerIdx: previousState.currentTimerIdx + 1,
      }),
      () => {
        this._timer.updateTimer(
          this.state.timers[
            this.state.currentTimerIdx % this.state.timers.length
          ]
        );
      }
    );
  };

  startStopButtonPress = () => {
    if (this.state.isTimerPaused && !this.state.isTimerRunning) {
      this.startTimer();
    } else if (this.state.isTimerRunning) {
      this.stopTimer();
    } else {
      // fresh start
      this.resetTimer();
      this.startTimer();
    }
  };

  resetTimer = () => {
    if (this.state.isTimerRunning) {
      this.stopTimer();
      this.setState({ currentTimerIdx: 0, isTimerPaused: false });
    }
    this._timer.updateTimer(this.state.timers[0]);
  };

  startTimer = () => {
    this.setState({ isTimerRunning: true });
    this._timer.startCountdown();
  };

  stopTimer = () => {
    this.setState({ isTimerRunning: false, isTimerPaused: true });
    this._timer.stopCountdown();
  };

  render() {
    return (
      <>
      <ImageBackground
          source={require('../assets/images/starrrywintersky.jpg')}
          //blurRadius={1}
          style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <ScrollView contentContainerStyle={styles.scrollviewContentContainer}>
              <View style={styles.container}>
              {this.state.timers.map((e, idx) => {
                return (
                  <ConfigTimerInput
                    key={idx}
                    data={e}
                    onUpdate={this.onUpdateTimerConfig}
                  />
                );
              })}
            </View>
            <CountdownTimer
              time={this.state.timers[this.state.currentTimerIdx]}
              onCountdownComplete={this.onCountdownComplete}
              ref={(ref) => {
                this._timer = ref;
              }}
            />
            <Controls
              onStartPausePress={this.startStopButtonPress}
              onResetPress={this.resetTimer}
              isTimerRunning={this.state.isTimerRunning}
            />
        <Text style={styles.appHeaderText}></Text>
          </ScrollView>
        </SafeAreaView>
        </ImageBackground>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollviewContentContainer: {
    paddingTop: Constants.statusBarHeight,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  appHeaderText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 50,
  },
});
