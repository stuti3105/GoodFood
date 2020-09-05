import React from 'react';
import {View, StyleSheet, ImageBackground, AsyncStorage} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, TextInput} from 'react-native-paper';
import * as EmailValidator from 'email-validator';

export default class SignUp extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    phone_number: '',
  };
  onChangeText = (key, val) => {
    this.setState({[key]: val});
  };
  signUp = () => {
    let {username, password, email, phone_number} = this.state;
    if (!username || !password || !email || !phone_number)
      return alert('Please fill all the details');

    if (!EmailValidator.validate(email)) {
      return alert('Enter a valid Email');
    }

    AsyncStorage.setItem(email, JSON.stringify(this.state)).then(() => {
      alert('Successfully signed up');
      this.props.navigation.navigate('SignIn');
    });
  };

  render() {
    return (
      <ImageBackground
        source={require('./Drawables/login.jpg')}
        style={{height: '100%', width: '100%'}}
        imageStyle={{opacity: 0.3}}>
        <ScrollView>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              value={this.state.username}
              label="Username"
              theme={{colors: {primary: '#128ef2'}}}
              mode={'outlined'}
              autoCapitalize="none"
              placeholderTextColor="white"
              onChangeText={val => this.onChangeText('username', val)}
            />
            <TextInput
              style={styles.input}
              value={this.state.password}
              label="Password"
              theme={{colors: {primary: '#128ef2'}}}
              mode={'outlined'}
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={val => this.onChangeText('password', val)}
            />
            <TextInput
              style={styles.input}
              value={this.state.email}
              label="Email"
              theme={{colors: {primary: '#128ef2'}}}
              mode={'outlined'}
              autoCapitalize="none"
              onChangeText={val => this.onChangeText('email', val)}
            />
            <TextInput
              style={styles.input}
              value={this.state.phone_number}
              label="Phone Number"
              theme={{colors: {primary: '#128ef2'}}}
              mode={'outlined'}
              autoCapitalize="none"
              onChangeText={val => this.onChangeText('phone_number', val)}
            />
            <Button
              mode="outlined"
              color="#128ef2"
              style={{
                borderRadius: 50,
                borderColor: '#128ef2',
                borderWidth: 1,
                backgroundColor: '#fff',
                marginBottom: 5,
              }}
              onPress={this.signUp}>
              {'Sign Up'}
            </Button>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: '90%',
    height: 55,
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 14,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
