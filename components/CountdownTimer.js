import React from 'react';
import { Linking } from 'react-native';
import vibrate from '../utilities/vibrate';
import ClockView from './Clockview';
import {StreamChat} from "stream-chat";
import { RootTabScreenProps } from '../types';
import AuthContext from '../contexts/Authentication';



class CountdownTimer extends React.Component {
  constructor(props) {
    super(props);
    const fullTime = this.getCountdownTime({
      minutes: props.time.minutes,
      seconds: props.time.seconds,
    });
    this.state = {
      time: fullTime,
      type: props.time.type,
      timeOverCallback: props.onCountdownComplete,
    };
  }
  

  updateTimer = (timeObject) => {
    const fullTime = this.getCountdownTime({
      minutes: timeObject.minutes,
      seconds: timeObject.seconds,
    });
    this.setState({
      time: fullTime,
      type: timeObject.type,
    });
  };

  getCountdownTime = (object) => {
    return this.minutesToSeconds(object.minutes) + object.seconds;
  };

  minutesToSeconds = (minutes) => {
    return minutes * 60;
  };

  secondsToMinutes = (seconds) => {
    return Math.floor(seconds / 60);
  };

  secondsToTimeObject = (seconds) => {
    const minutes = this.secondsToMinutes(seconds);
    const convertedSeconds = seconds - this.minutesToSeconds(minutes);

    return {
      minutes: minutes,
      seconds: convertedSeconds,
      type: this.state.type,
    };
  };

  startCountdown = () => {
    this.timer = setInterval(this.decreaseCount, 1000);
  };

  stopCountdown = () => {
    clearInterval(this.timer);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  decreaseCount = (minutes, seconds) => {
    if (this.state.time === 0) {
      console.log('time is up');
      this.setState(() =>({time: 15 }));
    
    } else {
      this.setState((prevState) => ({ time: prevState.time - 1 }));
      if (this.state.time === 0) {
        vibrate();
        alert('Remember to Text Warren');
        minutes = 0;
        seconds = 10;
        console.log(seconds);  
      }
    }
    return {
      minutes: minutes,
      seconds: seconds,
      type: this.state.type,
    }
  };

  render() {
    return <ClockView time={this.secondsToTimeObject(this.state.time)} />;
  }
}

export default CountdownTimer;
