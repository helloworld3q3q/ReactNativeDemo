'use strict'
import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { MKButton } from 'react-native-material-kit';
import { get, size } from '../common/util';
import serviceURL from '../common/services';
import Header from '../common/Header';
import CardView from './cardView';

const times = 0;
class Main extends Component {
    static contextTypes = {
        drawer: PropTypes.object.isRequired,
    };
    
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            dataCinema: '',
            topItem: this.props.topItem,
        }
    }

    componentWillMount() {
        this._getData(serviceURL.bmCinema);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.topItem !== null && this.props.topItem !== nextProps.topItem) {
           this._getData(serviceURL[nextProps.topItem]);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        times++;
        if(times < 3) return true
        return this.state.title !== nextState.title;
    }

    _getData(url) {
        let _that = this;
        get(url, function(data){
            _that.setState({
                title: data.title,
                date: data.date,
                dataCinema: JSON.stringify(data.subjects),
            });
        });
    }

    _AppNavigator() {
       this.props.navigator.push({
            ident: 'detail',
        });
    }

    render() {
        return (
            <View style={styles.box}>
                <Header titleMsg={this.state.title}
                    openPress={this.context.drawer.toggle}/>
                
                <Text style={styles.date}>{this.state.date ? this.state.date : null}</Text>

                <CardView dataCinema={this.state.dataCinema}/>

                <MKButton style={[styles.details, styles.btn]} onPress={()=>{this._AppNavigator()}}>
                         <Image resizeMode ={'contain'} 
                                style={styles.detailsIcon} source={require('../../icon/details.png')}/>
                </MKButton>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    box:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    date:{
        height: 23,
        paddingTop: 5,
        textAlign: 'center',

    },
    btn: {
        borderColor: 'rgba(231, 231, 231, 0.9)',
        position: 'absolute',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    details: {
        height: 48,
        width: 48,
        bottom: 22,
        left: size.width/2 - 24,
        borderRadius: 24,
    },
    detailsIcon: {
        width: 48,
    }
});

module.exports = Main;
