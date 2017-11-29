

import React, {Component} from 'react';
import { View, StyleSheet, TextInput,
  TouchableOpacity, TouchableHighlight,
  Text,
  KeyboardAvoidingView, StatusBar, AsyncStorage, List, ListView} from 'react-native';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Props from 'proptypes';
import LoginForm from '../Login/LoginForm';
const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 != row2});


export default class Register extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      userType: '',
      errors: [],


    }
  }

  onRegisterPressed = () => {

      fetch('http://192.168.29.201:3001/register', {
           method: 'POST',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             name: this.state.name,
             email: this.state.email,
             password: this.state.password,
             password_confirmation: this.state.password_confirmation,
             userType: this.state.userType,
           })
         })


         .then((response) => response.json())
         .then((res) => {


           if (res.success === true) {
              console.log("Res Success is: " + res);
              this.props.navigation.navigate('LoginForm');
            } else {
              errors = res;
              throw errors;
            }

          })
         .done();

      }



  render() {

    return (
  <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <StatusBar hidden/>
          <Text style={styles.text}> Welcome to Registration Area </Text>

          <TextInput autoCapitalize="none"
          autoCorrect={false} onChangeText={(text) => this.setState({email: text})}
            style={styles.txtInput} placeholder='Email'/>
          <TextInput  autoCapitalize="none"
          autoCorrect={false} onChangeText={(text) => this.setState({name: text})}
              style={styles.txtInput} placeholder='Name'/>
          <TextInput autoCapitalize="none"
          autoCorrect={false} secureTextEntry onChangeText={(text) => this.setState({password: text})}
                style={styles.txtInput} placeholder='password'/>
          <TextInput autoCapitalize="none"
          autoCorrect={false} secureTextEntry onChangeText={(text) => this.setState({password_confirmation: text})}
                  style={styles.txtInput} placeholder='repeat password'/>
          <TextInput autoCapitalize="none"
          autoCorrect={false} onChangeText={(text) => this.setState({userType: text})}
                    style={styles.txtInput} placeholder='userType'/>

          <TouchableHighlight style={styles.button} onPress={this.onRegisterPressed.bind(this)}>
            <Text style={styles.buttonText}>
              Register
            </Text>

          </TouchableHighlight>
</View>
      </View>
    </KeyboardAvoidingView>
    );
  }

  // onRegisterPressed = () => {
  //   this.props.navigation.navigate('Register');
  // }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2896d3',
    paddingLeft: 40,
    paddingRight: 40,

},
buttonText: {
  textAlign: 'center',
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '700'
},
  txtInput: {
    fontSize: 16,
    height: 40,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  text: {
    color: '#fff'
  },
  rowStyles: {
    borderWidth: 2,
    alignItems: 'center',
    marginTop:5,
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
  },
  inputContainer: {
    margin: 20,
    marginBottom: 0,
    padding: 20,
    paddingBottom: 10,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  }
});
