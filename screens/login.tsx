import React from 'react';
import { StyleSheet, Text, View,Button,TextInput,Image } from 'react-native';
import Icon from 'react-native-elements';

export default class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
       <BackgroundImage/>
        <TextInput autoCorrect={false} underlineColorAndroid='transparent'   placeholder="User Name" style={styles.input}
        onChangeText={(text) => this.setState({text})}/>
        <TextInput autoCorrect={false} underlineColorAndroid='transparent' secureTextEntry={true}   placeholder="Password" style={styles.input}
        onChangeText={(text) => this.setState({text})}/>
        <Button title="Login"  />

      </View>
    );
  }
}
class BackgroundImage extends React.Component {

    render() {
        return (
            <Image source={require('./fire.jpg')}
                  style={styles.backgroundImage}>

                  {this.props.children}

            </Image>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',

  },
  input:{
    color:'black',
    fontWeight:'300',
    fontSize:20,
    margin:5,
    height: 40,
    width:200,
    textAlign: 'center',
    borderColor: 'black', 
    borderWidth: 3,
    backgroundColor:'white'
  },
   backgroundImage: {
        flex: 1,
        resizeMode: 'stretch',
        position: 'absolute',
        width:'100%',
        height:'100%',
        justifyContent: 'center',
        
        
    },
    
});
