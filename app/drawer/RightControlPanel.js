'use strict'
import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';
import { MKButton } from 'react-native-material-kit';
import { size, pixel, get } from '../common/util';
import serviceURL from '../common/services';

class LeftControlPanel extends Component {

    static propTypes = {
      closeDrawer: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    _listTopChange(topItem) {
      this.props.closeDrawer(topItem);
    }


    render() {
        let {closeDrawer} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>所有榜单</Text>
                <View style={styles.listBox}>
                    <MKButton style={styles.listItem} onPress={()=>{this._listTopChange('bmCinema')}}>
                        <Image  resizeMode ={'contain'} style={styles.buttonIcon} source={require('../../icon/icon_beimei.png')} />
                        <Text style={styles.itemName}>北美票房</Text>
                    </MKButton>
                    <MKButton style={styles.listItem} onPress={()=>{this._listTopChange('hotCinema')}}>
                        <Image  resizeMode ={'contain'} style={styles.buttonIcon} source={require('../../icon/icon_hotplay.png')} />
                        <Text style={styles.itemName}>正在热映</Text>
                    </MKButton>
                    <MKButton style={styles.listItem} onPress={()=>{this._listTopChange('soonCinema')}}>
                        <Image  resizeMode ={'contain'} style={styles.buttonIcon} source={require('../../icon/icon_soon.png')} />
                        <Text style={styles.itemName}>即将上映</Text>
                    </MKButton>
                    <MKButton style={styles.listItem} onPress={()=>{this._listTopChange('topCinema')}}>
                        <Image  resizeMode ={'contain'} style={styles.buttonIcon} source={require('../../icon/icon_top25.png')} />
                        <Text style={styles.itemName}>Top250 </Text>
                    </MKButton>
                </View>
            </View>
        );
    }  
}
//fd573b
const styles = StyleSheet.create({
  container: {
    height: size.height,
    width: size.width - 80,
    right: 0,
    top: 0,
    backgroundColor: '#1f1e1e',
  },
  title: {
    fontSize: 18,
    height: 45,
    paddingLeft: 20,
    marginBottom: 10,
    color: '#ffffff',
    backgroundColor: '#151414',
    textAlignVertical: 'center',
  },
  listBox: {
    marginHorizontal: 10,
  },
  listItem: {
    height: 40,
    paddingVertical: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    height: 26,
  },
  itemName: {
    fontSize: 16,
    color: '#c3c3c3',
  }
});

module.exports = LeftControlPanel;