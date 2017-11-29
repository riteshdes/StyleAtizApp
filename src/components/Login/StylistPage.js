import React, {Component} from 'react';
import { View, StyleSheet, TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView, StatusBar, AsyncStorage, List, ListView} from 'react-native';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Props from 'proptypes';
import LoginForm from './LoginForm';
import ConsumerPage from './ConsumerPage';

const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 != row2});


export default class StylistPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows( [
        {
        name: "Ritesh- Stylist Desai",
        number: "123-345-567",
        email: "riteshdes@gmail.com",
        address: "123 Easy Street"
      },
      {
        name: "Subhag Stylist Oak",
        number: "123-345-567",
        email: "riteshdes@gmail.com",
        address: "123 Easy Street"
      },
      {
        name: "Swati  Stylist Angolkar",
        number: "123-345-567",
        email: "riteshdes@gmail.com",
        address: "123 Easy Street"
      },
      {
        name: "Raj Stylist Angolkar",
        number: "123-345-567",
        email: "riteshdes@gmail.com",
        address: "123 Easy Street"
      },

    ])
    }
  }

 renderRow(rowData) {
   return (
     <View style={styles.rowStyles}>
       <Text>{rowData.name}</Text>
       <Text>{rowData.number}</Text>
       <Text>{rowData.email}</Text>
       <Text>{rowData.address}</Text>

     </View>

   );
 }
  render() {
    return (

      <View style={styles.container}>
        <StatusBar hidden/>
          <Text style={styles.text}> Welcome to Stylist Area </Text>
        <ListView
          dataSource= {this.state.dataSource}
          renderRow= {this.renderRow} />

          <TouchableOpacity style={styles.buttonContainer} onPress={this.back.bind(this)}>
              <Text style={styles.buttonText}>Go Back To Login Page</Text>
            </TouchableOpacity>


      </View>
    );
  }
  back = () => {
    this.props.navigation.navigate('Home');
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
  },
  rowStyles: {
    borderWidth: 2,
    alignItems: 'center',
    marginTop:5,
    justifyContent: 'center',
  }
});
