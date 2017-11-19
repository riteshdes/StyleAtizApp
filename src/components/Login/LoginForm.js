import React, {Component} from 'react';
import { AppRegistry, View, StyleSheet, TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView, StatusBar, AsyncStorage, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { withNavigation } from 'react-navigation';
// import Props from 'prop-types';
import Props from 'proptypes'
import StylistPage from './StylistPage';
import ConsumerPage from './ConsumerPage';

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
    } else {
      this.props.navigation.navigate('StylistPage');
    }
  }

  render() {

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../../images/logoatiztech.jpg')}
            />
            <Text style={styles.tagline}>Personal Stylist At Your Finger Tips!</Text>
          </View>

          <View style={styles.container}>
              <TextInput
                    name="username"
                    type="text"
                    placeholder='username or email'
                      value={this.state.username} onChangeText={ (text) => this.setState({username: text}) }
                      placeholderTextColor="#f0f"
                      returnKeyType="next"
                      onSubmitEditing={() => this.passwordInput.focus()}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={styles.textInput}
                    />

                    <TextInput placeholder='password'
                      name="password"
                      type="text"
                    value={this.state.password} onChangeText={ (text) => this.setState({password: text}) }
                     placeholderTextColor="#f0f"
                       returnKeyType="go"
                      secureTextEntry
                    onSubmitEditing={this.login}
                       style={styles.textInput}
                      // ref={(input) => this.passwordInput = input}
                    />

                   <TouchableOpacity style={styles.btn} onPress={this.login.bind(this)}>
                       <Text style={styles.buttonText}>LOGIN</Text>
                     </TouchableOpacity>

          </View>

      </KeyboardAvoidingView>
    );
  }

   login = () => {
    try{
  //  alert("Test");

// alert('Inside Login Function: ' + username + " " + password);


      fetch('http://192.168.29.201:3001/users', {
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
              var value = await AsyncStorage.getItem('user');
              if (value === "C") {
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
  padding: 20,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#2896d3',
  paddingLeft: 40,
  paddingRight: 40,

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
  padding: 20,
  alignItems: 'center',
},
wrapper: {
  flex: 1,
},
input: {
  height: 40,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  marginBottom: 10,
  color: '#FFFFFF',
  paddingHorizontal: 10
},
buttonContainer: {
  backgroundColor: '#2980b9',
  paddingVertical: 15

},
buttonText: {
  textAlign: 'center',
  color: '#FFFFFF',
  fontWeight: '700'
},
logoContainer: {
  alignItems: 'center',
  flexGrow: 1,
  justifyContent: 'center',
  backgroundColor: '#2896d3',
  paddingLeft: 40,
  paddingRight: 40,
},
logo: {
  width: 100,
  height: 100
},
tagline: {
  color:'#ecf0f1',
  marginTop: 10,
  width: 140,
  textAlign: 'center',
  opacity: 0.9
}

});
