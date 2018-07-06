import React from 'react';
import { Component } from 'react';
import {LoginScreen} from './navigation/navigate';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return <LoginScreen/>; //rendering the Stack navigator
  }
}



