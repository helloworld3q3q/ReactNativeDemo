'use strict'
import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Image, TouchableOpacity } from 'react-native';
import { size } from '../common/util';

class LeftControlPanel extends Component {

    static propTypes = {
      closeDrawer: PropTypes.func.isRequired
    };
    
    constructor(props) {
        super(props);
        this.state={
            bgUrl: '',
        }
    }

    componentDidUpdate() {
        let _that = this;
        AsyncStorage.getItem('LeftPanel', function(err, result){
            _that.setState({
                bgUrl: JSON.parse(result).image,
            });
        });
    }

    render() {
        let {closeDrawer} = this.props;
        return (
            <View>
                { this.state.bgUrl ? <Image style={styles.bgImage} resizeMode ={'cover'} source={{uri: this.state.bgUrl}}/> : null }
                <View style={styles.listBox}>
                      <View style={[styles.Item, styles.center]}>
                          <View style={[styles.typeImageBox]}>
                              <Image style={styles.typeImage} resizeMode ={'cover'} source={require('../../icon/icon_db.png')}/>
                          </View>
                      </View>
                      <View style={[styles.Item, styles.center,styles.titleBox]}>
                          <Text style={styles.Title}>豆瓣</Text>
                      </View>
                      <TouchableOpacity style={styles.Item} onPress={closeDrawer}>
                          <Image style={styles.ItemImage} resizeMode ={'cover'} source={require('../../icon/icon_db.png')}/>
                          <Text style={styles.ItemTitle}>豆瓣</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.Item} onPress={closeDrawer}>
                          <Image style={styles.ItemImage} resizeMode ={'cover'} source={require('../../icon/icon_about.png')}/>
                          <Text style={styles.ItemTitle}>关于</Text>
                      </TouchableOpacity>
                </View>
            </View>
        );
    }  
}

const styles = StyleSheet.create({
  bgImage: {
    height: size.height,
    opacity: 0.9,
  },
  listBox: {
    height: size.height,
    width: size.width - 80,
    left: 0,
    top: 0,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.78)',
  },
  Item: {
    marginTop: 20,
    flexDirection: 'row',
    paddingHorizontal: 50,
  },
  ItemImage: {
    height: 24,
    width: 24,
    marginRight: 20,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ItemTitle: {
    fontSize: 18,
    color: '#ffffff',
  },
  typeImageBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    marginTop: 40,
  },
  Title: {
    fontSize: 16,
    color: '#ffffff',
  },
  titleBox: {
    marginBottom: 30,
  },
  controlText: {
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  }
});

module.exports = LeftControlPanel;