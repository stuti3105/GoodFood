import React from 'react';
import { createAppContainer } from 'react-navigation';
import { Platform, StatusBar } from "react-native";
import { createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import SignUp from './SignUp'
import SignIn from './SignIn'
import Home from './screens/Home'
import Nom from './screens/Nom'
import Profile from './screens/Profile'
import Reminder from './screens/Reminders'

const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  };
  

const SignedOut = createStackNavigator(
    {
        SignIn:{
            screen:SignIn
        },
        SignUp:{
            screen:SignUp
        }
    },
    {
        initialRouteName:'SignIn'
    }
);

const SignedIn = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <Icon name="home" size={25} color={tintColor} />
        ),
      },
    },
    Nom: {
      screen: Nom,
      navigationOptions: {
        tabBarLabel: 'Nom Journal',
        tabBarIcon: ({tintColor}) => (
          <Icon name="book" size={25} color={tintColor} />
        ),
      },
    },
    Reminder: {
      screen: Reminder,
      navigationOptions: {
        tabBarLabel: 'Reminders',
        tabBarIcon: ({tintColor}) => (
          <Icon name="clock-o" size={25} color={tintColor} />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor}) => (
          <Icon name="smile-o" size={25} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      inactiveTintColor: '#363636',
      activeTintColor: '#FFFF',
      style: {
        backgroundColor: '#e89000',
      },
    },
  },
);


 let rootNavigator = (signedIn = false) => {
   return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
     {
       


      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};



export const createRootNavigator = signedIn => createAppContainer(rootNavigator(signedIn));

 