

import React, {Component} from 'react';
import { View, StyleSheet, TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView, StatusBar, AsyncStorage} from 'react-native';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Props from 'proptypes';

export default class ConsumerPage extends Component {


  render() {
    return (

      <View style={styles.container}>
        <Text style={styles.text}> Welcome to Consumer Area </Text>


      </View>
    );
  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff'
  }

});
