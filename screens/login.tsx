import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import md5 from 'react-native-md5';
import BackgroundImage from '../components/backgroundImage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { apiUrl } from '../API config/config';

export interface Props {
  name: string;
}

export interface State {
  username: string,
  password: string
}

export default class Login extends React.Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  componentDidMount() {
    this.manageSession().done();
  }

  //managing session by logging out any user who isn't logged in
  manageSession = async () => {
    var val = await AsyncStorage.getItem('user');
    if (val != null) {
      this.props.navigation.navigate('Contacts');
    }
  }

  //check for validity of login credentials 
  checkLogin = () => {
    fetch(apiUrl + 'users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password.toUpperCase(),
      })
    })
      .then((response) => response.json())
      .then((res) => {
        //alert(res.message);
        if (res.success === true) {
          AsyncStorage.setItem('user', res.user);
          this.props.navigation.navigate('Contacts'); //logging the user in

        } else {
          AsyncStorage.setItem('user', '');
          alert(res.message)
        }
      })
      .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage />
        <TextInput
          autoCorrect={false}
          underlineColorAndroid='transparent'
          placeholder="User Name"
          placeholderTextColor='#b8a9a9'
          style={styles.input}
          onChangeText={(text) => this.setState({ username: text })}
        />
        <TextInput
          autoCorrect={false}
          underlineColorAndroid='transparent'
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor='#b8a9a9'
          style={styles.input}
          onChangeText={(text) => this.setState({ password: md5.hex_md5(text) })}
        />
        <TouchableOpacity
          onPress={this.checkLogin}
          style={styles.buttonContainer}>
          <Icon name="arrow-right" size={15} color='white'>
              <Text style={styles.buttonText}>  LOGIN</Text>
          </Icon>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    color: 'white',
    fontWeight: '300',
    fontSize: 15,
    marginBottom: 10,
    height: 40,
    width: 250,
    textAlign: 'center',
    borderColor: 'black',
    borderWidth: 0,
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#2980b9',
    paddingHorizontal: 95,
    paddingVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  }
});
