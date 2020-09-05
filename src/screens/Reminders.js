import React, {Component} from 'react';
import {
  View,
  AppState,
  ImageBackground,
  AsyncStorage,
  Text
} from 'react-native';
import PushController from '../PushController';
import { Switch, Snackbar} from 'react-native-paper';
import PushNotification from 'react-native-push-notification';
import DateTimePicker from '@react-native-community/datetimepicker';

let sleepTime

export default class Reminders extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    waterReminder: false,
    sleepReminder: false,
    Visible: false
  };

  componentDidMount() {
    this.getData('waterReminder').then(result =>
      this.setState({waterReminder: JSON.parse(result)}),
    );
    this.getData('sleepReminder').then(result =>
      this.setState({sleepReminder: JSON.parse(result)}),
    );
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  getData = key => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key)
        .then(res => {
          if (res !== null) {
            resolve(res);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    });
  };

  handleAppStateChange = appState => {
    if (appState === 'background') {

      this.state.waterReminder
        ? PushNotification.localNotificationSchedule({
            id: 1,
            message: 'Time to drink water now',
            date: new Date(Date.now() + 3600 * 1000),
            repeatType: 'hour'
          })
        : PushNotification.cancelLocalNotifications({id: '1'});

      this.state.sleepReminder
        ? PushNotification.localNotificationSchedule({
            id: 2,
            message: 'Time to go to bed now',
            date: sleepTime,
            repeatType: 'day',
          })
        : PushNotification.cancelLocalNotifications({id: '2'});
    }
  };

  setWaterReminder = () => {
    let {waterReminder, Visible} = this.state;
    this.state.showTimePicker = false

    AsyncStorage.setItem('waterReminder', JSON.stringify(!waterReminder)).then(
      () => {
        this.setState({waterReminder: !waterReminder, Visible: !waterReminder});
      },
    );
  };

  setSleepReminder = () => {
    let {sleepReminder} = this.state;
    
    this.state.showTimePicker = !sleepReminder

    AsyncStorage.setItem('sleepReminder', JSON.stringify(!sleepReminder)).then(
      () => this.setState({sleepReminder: !sleepReminder}),
    );
  };

  render() {
    let {waterReminder, sleepReminder, Visible} = this.state;
    return (
      <ImageBackground
        source={require('../Drawables/reminders.jpg')}
        imageStyle={{opacity: 0.3}}
        style={{height: '100%', width: '100%'}}>
        <View style={[styles.container]}>
          <View style={{flexDirection: 'row', margin:5, justifyContent:'space-between'}}>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: 'white',
                borderWidth: 1,
                padding: 5,
                marginHorizontal: 10,
              }}>
              <Text style={{fontSize: 20}}>
                {'Water Reminder'}
              </Text>
            </View>
            <Switch
              value={waterReminder}
              onValueChange={() => this.setWaterReminder()}
            />
          </View>
          {this.state.showTimePicker && <DateTimePicker value={new Date()}
            mode={"time"}
            is24Hour={true}
            display="default"
            onChange={(event, date)=> sleepTime = date } />}
          <View style={{flexDirection: 'row', margin:5, justifyContent:'space-between'}}>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: 'white',
                borderWidth: 1,
                padding: 5,
                marginHorizontal: 10,
              }}>
              <Text style={{fontSize: 20}}>{'Sleep Reminder'}</Text>
            </View>
            <Switch
              value={sleepReminder}
              onValueChange={() => this.setSleepReminder()}
            />
          </View>
          <PushController />
        </View>
        {this.state.waterReminder && <Snackbar visible={this.state.Visible} duration={2000} onDismiss={() => this.setState({ Visible: false })}>{'Water Reminder activated for every hour'}</Snackbar>}
      </ImageBackground>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    marginTop: 40,
    padding: 20,
  },
};
