'use strict'
import React, { Component } from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import AppNavigator from './app/common/AppNavigator';

// http://www.liaohuqiu.net/cn/posts/react-native-android-package/
// https://api.douban.com/v2/movie/us_box
//https://github.com/xinthink/react-native-material-kit

class react1 extends Component {

  render() {
    this._setStatusBar();
    return (
        <AppNavigator 
          initialRoute={{ident: 'indexView'}}/>
    );
  }
  _setStatusBar() {
    StatusBar.setBackgroundColor('#af3329', true);
  }
}


AppRegistry.registerComponent('react1', () => react1);