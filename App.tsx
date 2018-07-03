import React from 'react';
import { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Login from './screens/login' ;



type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        
        <Login></Login>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
