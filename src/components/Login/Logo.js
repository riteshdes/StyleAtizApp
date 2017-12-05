import React, {Component} from 'react';
import { AppRegistry, View, StyleSheet, TextInput,
  TouchableOpacity, TouchableHighlight,
  Text,
  KeyboardAvoidingView, StatusBar, AsyncStorage, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { withNavigation } from 'react-navigation';
// import Props from 'prop-types';
import Props from 'proptypes'
import StylistPage from './StylistPage';
import ConsumerPage from './ConsumerPage';

import FBSDK, { LoginManager } from 'react-native-fbsdk';

export default class Logo extends React.Component {

render() {
  return(

    <View style= {styles.logoContainer}>
      <Image style={styles.logo} source={require('../../images/logoatiztech.jpg')} />
      <Text style={styles.tagline}>Personal Stylist At Your Finger Tips!</Text>

    </View>
  )
}

}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#455a64'
    // paddingLeft: 40,
    // paddingRight: 40,
    // marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 60,
  },
  tagline: {
    marginVertical: 15,
    // marginTop: 10,
     width: 300,
    textAlign: 'center',
    // opacity: 0.9,
    fontSize: 15,
    // height: 32,
    // padding: 10,
    // marginTop: 10,
    // borderColor: '#fff',
    color: 'rgba(255, 255, 255, 0.7)',
  }
});
