/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
} from 'react-native';
import Splash from './Splash';
import Login from './src/components/Login/Login';
import LoginForm from './src/components/Login/LoginForm';
import { StackNavigator } from 'react-navigation';
import ConsumerPage from './src/components/Login/ConsumerPage';
import StylistPage from './src/components/Login/StylistPage';
// import Props from 'prop-types';
import Props from 'proptypes';

//import Expo from 'expo';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


const NavigationApp = StackNavigator({
Home: { screen: LoginForm },
ConsumerPage: { screen: ConsumerPage },
StylistPage: {screen: StylistPage }
}, {
  navigationOptions: {
    header: false,
  }
//Profile: {screen: ProfileScreen },

});

export default class App extends Component   {


  render() {
    return (
    <NavigationApp/>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    width: null,
    padding: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
