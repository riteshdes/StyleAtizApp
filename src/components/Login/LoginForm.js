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



export default class LoginForm extends React.Component {


  constructor(props) {
    super(props);
    AsyncStorage.setItem('user', '');
    this.state =  { username: '', password: '' , userType: ''};

  }
  //
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
    LoginManager.setLoginBehavior('native_only'); 
    LoginManager.logInWithReadPermissions(['public_profile']).then(function(result) {
      if (result.isCancelled) {
        console.log('Login was cancelled by user');
      }
      else {
        console.log('Login Successful: ' + result.grantedPermissions.toString());
      }
    }, function(error) {
      console.log('An Error Occurred ' + error );
    })
  };

  render() {

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>

          <View style={styles.container}>
            <Image source={require('../../images/backgroundimage.png')} style={styles.backgroundImage}/>
                <View style={styles.logoContainer}>
                  <Image
                    style={styles.logo}
                    source={require('../../images/logoatiztech.jpg')}
                  />
                  <Text style={styles.tagline}>Personal Stylist At Your Finger Tips!</Text>
                </View>
                <View style={styles.inputContainer}>
                <TouchableHighlight onPress={this.facebookLogin.bind(this)}>
                    <Text style={styles.welcome}>
                      Facebook Login
                    </Text>
                  </TouchableHighlight>
                  <Text style={styles.instructions}>
                    {this.state.result}
                  </Text>
                </View>
            <View style={styles.inputContainer}>

              <TextInput
                    name="username"
                    type="text"
                    placeholder='username or email'
                      value={this.state.username} onChangeText={ (text) => this.setState({username: text}) }
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
                     <TouchableOpacity style={styles.buttonContainer} onPress={this.register.bind(this)}>
                         <Text style={styles.buttonText}>REGISTER</Text>
                       </TouchableOpacity>

          </View>

      </KeyboardAvoidingView>
    );
  }
  register = () => {
    this.props.navigation.navigate('Register');
  }

   login = () => {
    try{
  //  alert("Test");

// alert('Inside Login Function: ' + username + " " + password);
//fetch('http://192.168.29.201:3001/users', {

      fetch('http://192.168.29.202:3001/users', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: this.state.username,
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
  backgroundColor: '#2896d3',
  paddingLeft: 40,
  paddingRight: 40,

},
backgroundImage: {
  flex: 1,
  alignSelf: 'stretch',
  width: null,
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
logoContainer: {
  alignItems: 'center',
  flexGrow: 1,
  justifyContent: 'center',
  backgroundColor: '#2896d3',
  paddingLeft: 40,
  paddingRight: 40,
  marginBottom: 10,
},
logo: {
  width: 100,
  height: 100,
},
tagline: {

  // marginTop: 10,
   width: 240,
  textAlign: 'center',
  // opacity: 0.9,
  fontSize: 12,
  height: 32,
  padding: 10,
  marginTop: 10,
  borderColor: '#fff',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
