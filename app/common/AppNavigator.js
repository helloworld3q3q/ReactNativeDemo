'use strict'
import React, { Component } from 'react';
import { StyleSheet, Navigator } from 'react-native';
import ViewContainer from '../views/indexView';
import DetailContainer from '../views/Detail';

class AppNavigator extends Component {
    _renderScene(route, navigator) {
        let globalNavigatorProps = { navigator };
        switch(route.ident){
          case 'indexView':
            return(
              <ViewContainer {...globalNavigatorProps} />
            )
          case 'detail':
            return(
              <DetailContainer {...globalNavigatorProps}  />
            )
          default:
            return(
              <ViewContainer {...globalNavigatorProps} />
            )
        }
    }

    render() {
        return (
            <Navigator initialRoute={this.props.initialRoute}
              ref="AppNavigator"
              renderScene={this._renderScene}/>
        );
    }
}
module.exports = AppNavigator;