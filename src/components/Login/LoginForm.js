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
import Logo from './Logo';
//import ValidationComponent from 'react-native-form-validator';

import FBSDK, { LoginManager } from 'react-native-fbsdk';



export default class LoginForm extends React.Component {


  constructor(props) {
    super(props);
    AsyncStorage.setItem('user', '');
    this.state =  {email: '', password: '' , userType: ''};
  }
  //

  // register() {
  //   const emailError = validate('email', this.state.email)
  //   const passwordError = validate('password', this.state.password)
  //
  //   this.setState({
  //     emailError: emailError,
  //     passwordError: passwordError
  //   })
  //
  //   if (!emailError && !passwordError) {
  //     alert('Details are valid!')
  //   }
  // }


  componentDidMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {

    var value = await AsyncStorage.getItem('user');
    //var value = null;
    if (value === 'C') {
       this.props.navigation.navigate('ConsumerPage');
    } else if (value === 'S'){
      this.props.navigation.navigate('StylistPage');
    }
  }

  facebookLogin() {
    LoginManager.setLoginBehavior('native');
    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']).then(function(result) {
      if (result.isCancelled) {
        console.log('Login was cancelled by user');
      }
      else {
        alert('Login Successful: ' + result.grantedPermissions.toString() );
        console.log(result.toString() );
        // this.props.navigation.navigate('ConsumerPage');
      }
    }, function(error) {
      console.log('An Error Occurred ' + error );
    })
  };

  render() {

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>

          <View style={styles.container}>
          <Logo/>

            <View style={styles.inputContainer}>

              <TextInput
                    name="email"
                    type="text"
                    placeholder='Email'
                      value={this.state.email} onChangeText={ (text) => this.setState({email: text}) }
                      returnKeyType="next"
                      onSubmitEditing={() => this.passwordInput.focus()}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={styles.txtInput}
                    />

                    <TextInput placeholder='password'
                      name="password"
                      type="text"
                    value={this.state.password} onChangeText={ (text) => this.setState({password: text}) }

                     returnKeyType="go"
                      secureTextEntry
                    onSubmitEditing={this.login}
                       style={styles.txtInput}
                      // ref={(input) => this.passwordInput = input}
                    />


                     </View>
                     <TouchableOpacity style={styles.buttonContainer} onPress={this.login.bind(this)}>
                         <Text style={styles.buttonText}>LOGIN</Text>
                       </TouchableOpacity>
                     <Text> -- OR --- </Text>
                     {/* <TouchableOpacity style={styles.buttonContainer} onPress={this.register.bind(this)}>
                         <Text style={styles.buttonText}>REGISTER</Text>
                       </TouchableOpacity> */}

                       <View style={styles.signUpTextCont}>
                         <Text style={styles.signupText}>Don't have an account yet?</Text>
                         <Text style={styles.signupButton} onPress={this.register.bind(this)}>SignUp</Text>
                       </View>
          </View>


      </KeyboardAvoidingView>

    );
  }
  register = () => {
    this.props.navigation.navigate('Register');
  }

   login = () => {
    //  this.validate({
    //   password: {minlength:3, maxlength:7, required: true},
    //   email: {email: true, required: true},
    //
    // });
    try{
  //  alert("Test");

// alert('Inside Login Function: ' + email + " " + password);
//fetch('http://192.168.29.201:3001/users', {

      fetch('http://192.168.29.202:3001/users', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.state.email,
              password: this.state.password,
              userType: this.state.userType,
            })
          })


          .then((response) => response.json())

          .then((res) => {

            if (res.success === true) {

              AsyncStorage.setItem('user', res.user);

              if (res.user === 'C') {
                this.props.navigation.navigate('ConsumerPage');
              } else {
                this.props.navigation.navigate('StylistPage');
              }
            }
            else {
              alert(res.message);
            }
          })
          .done();
        } catch (error) {
          this.setState({error: error});
          console.log("error: " + error);
        }
        }

}
// skip this line if using Create React Native App
// AppRegistry.registerComponent('AwesomeProject', () => LoginForm);
const styles = StyleSheet.create({

container: {
  flex: 1,
  padding: 20,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#455a64',
  paddingLeft: 40,
  paddingRight: 40,

},
backgroundImage: {
  flex: 1,
  alignSelf: 'stretch',
  justifyContent: 'center',
},
txtInput: {
  fontSize: 16,
  height: 40,
  padding: 10,
  marginBottom: 10,
  backgroundColor: 'rgba(255, 255, 255, 1)',
},
textInput: {
  alignSelf: 'stretch',
  padding: 16,
  marginBottom: 20,
  backgroundColor: '#fff',
},
header: {
  fontSize: 24,
  marginBottom: 60,
  color: '#fff',
  fontWeight: 'bold',
},
btn: {
  alignSelf: 'stretch',
  backgroundColor: '#013853',
  padding: 10,
  alignItems: 'center',
},
wrapper: {
  flex: 1,
},
input: {
  height: 40,
  backgroundColor: 'rgba(255, 255, 255, 1)',
  marginBottom: 10,
  color: '#FFFFFF',
  paddingHorizontal: 10
},
buttonContainer: {
  // backgroundColor: '#2980b9',
  margin: 20,
  marginBottom: 0,
  padding: 20,
  paddingBottom: 10,
  paddingVertical: 15,
  alignSelf: 'stretch',
  marginTop: 20,
  backgroundColor: 'blue',
  borderWidth: 1,
  borderColor: '#fff',
  backgroundColor: 'rgba(255, 255, 255, 0.5)'

},
buttonText: {
  textAlign: 'center',
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '700'
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
fblogo: {
  width: 150,
  height: 40,
},
signupTextCont: {
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical: 16,
  flexDirection: 'row'
},
signupText: {
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: 16
},
signupButton: {
  color:'#ffffff',
  fontWeight: '500',
  fontSize:16
},
inputContainer: {
  margin: 20,
  marginBottom: 0,
  padding: 20,
  paddingBottom: 10,
  alignSelf: 'stretch',
  borderWidth: 1,
  borderColor: '#fff',
  backgroundColor: '#455a64',
}

});
