'use strict'
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { MKButton } from 'react-native-material-kit';

class Header extends Component {
    constructor(props) {
        super(props);
    }
    _title() {
        if(this.props.titleMsg.indexOf('-北京') > -1){
            return this.props.titleMsg.replace('-北京','');
        }else if(this.props.titleMsg.indexOf('豆瓣电影') > -1) {
            return this.props.titleMsg.replace('豆瓣电影','');
        }        
        return this.props.titleMsg;
    }

    _AppNavigator() {
       this.props.navigator.pop();
    }

    render() {
        return (
            <View style={[styles.header, styles.row]}>
                {
                    this.props.showBack ?
                    <MKButton style={styles.button} onPress={()=>{this._AppNavigator()}}>
                         <Image resizeMode ={'contain'} style={styles.buttonIcon} source={require('../../icon/icon_back.png')} />
                    </MKButton> :
                    <MKButton style={styles.button} onPress={()=>{
                        this.props.openPress()}
                    }>
                         <Image resizeMode ={'contain'} style={styles.buttonIcon} source={require('../../icon/menu.png')} />
                    </MKButton>
                }
                <View style={[styles.center, styles.title]}>
                    <Text style={styles.fontStyle}>{this._title()}</Text>
                </View>
                {
                    this.props.showBack ?
                    null :
                    <MKButton style={[styles.button, styles.buttonRight]} onPress={()=>{
                        this.props.openPress()}
                    }>
                         <Image resizeMode ={'contain'} style={styles.buttonIcon} source={require('../../icon/headlist.png')} />
                    </MKButton>
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    row:{
        flexDirection: 'row'
    },
    header:{
        height: 45,
        backgroundColor: '#d2462f',
    },
    title: {
        flex: 1,

    },
    center:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    fontStyle:{
        fontSize: 18,
        color: '#ffffff'
    },
    button:{
        height: 45,
        width: 45,
        backgroundColor: '#d2462f',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    buttonRight: {
        right: 0,
    },
    buttonIcon:{
        height: 25
    }

});


module.exports = Header;
