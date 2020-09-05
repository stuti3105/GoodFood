import React from "react";
import { View, StyleSheet, ImageBackground, AsyncStorage} from 'react-native';
import { onSignIn } from "./auth";
import { TextInput, Button } from "react-native-paper"
export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: '',
    };
  }
  
  signUp = () =>{
    this.props.navigation.navigate('SignUp')
  }

  onLogin = () => {

    AsyncStorage.getItem(this.state.email)
      .then(res => {
        if (res !== null && this.state.password === JSON.parse(res).password) {
          onSignIn().then(() => this.props.navigation.navigate('SignedIn'));
        } else {
          alert('Invalid Credentials');
        }
      })
      .catch(err => alert('Email is not registered'));
  }

  render() {
    let navigation = this.props.navigation
    return (
      <ImageBackground
        source={require('./Drawables/login.jpg')}
        style={{height: '100%', width: '100%'}}
        imageStyle={{opacity: 0.3}}>
        <View style={styles.container}>
          <TextInput
            value={this.state.email}
            onChangeText={email => this.setState({email})}
            theme={{colors: {primary: '#128ef2'}}}
            mode={'outlined'}
            label={'email'}
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            value={this.state.password}
            onChangeText={password => this.setState({password})}
            theme={{colors: {primary: '#128ef2'}}}
            mode={'outlined'}
            label={'Password'}
            secureTextEntry={true}
            style={styles.input}
          />

          <Button
            color={'#128ef2'}
            mode="outlined"
            style={{
              borderRadius: 50,
              borderColor: '#128ef2',
              borderWidth: 1,
              backgroundColor: '#fff',
              marginBottom: 5,
            }}
            onPress={() => this.onLogin()}>
            {'Login'}
          </Button>
          <Button
            mode="text"
            color={'#128ef2'}
            style={{size: 20}}
            onPress={() => this.signUp()}>
            {"Don't have an account? Sign Up "}
          </Button>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '70%',
    height: 44,
    padding: 10,
    marginBottom: 10,
  },
});
