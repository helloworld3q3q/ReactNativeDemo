'use strict'
import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Image, Animated } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import { MKButton } from 'react-native-material-kit';
import { size } from '../common/util';
import Card from './Card';
import AppNavigator from '../common/AppNavigator';

class cardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
        }
    }

    componentWillReceiveProps(nextProps) {
       /* if(this.props.dataCinema !== '' && this.props.dataCinema !== null && this.state.cards.length === 0){
            this.setState({
                cards: JSON.parse(this.props.dataCinema),
            });
        }else if(nextProps.dataCinema !==  this.props.dataCinema && this.state.cards.length !== 0){
            this.state['cards'] = JSON.parse(nextProps.dataCinema);
            this.forceUpdate();
        }*/
    }
    
    componentDidUpdate() {
        SwipeCards.defaultProps.yupStyle = styles.yupStyle;
        SwipeCards.defaultProps.containerStyle = styles.containerStyle;
        SwipeCards.defaultProps.nopeStyle = styles.nopeStyle;
    }

    handleYup(card, next) {
        next.CardPosition = false;
        let imageUrl = (next.subject ? next.subject.images.large : next.images.large);
        let LeftPanel = {
            image: imageUrl,
        }
        AsyncStorage.setItem('LeftPanel', JSON.stringify(LeftPanel));
    }

    handleNope(card, prev) {
        prev.CardPosition = false;
        let imageUrl = (prev.subject ? prev.subject.images.large : prev.images.large);
        let LeftPanel = {
            image: imageUrl,
        }
        AsyncStorage.setItem('LeftPanel', JSON.stringify(LeftPanel));
    }

    renderYup(pan, fn) {
        let yupOpacity = pan.x.interpolate({inputRange: [0, 150], outputRange: [ 1, 0.5]});
        let yupScale = pan.x.interpolate({inputRange: [0, 150], outputRange: [1, 0.8], extrapolate: 'clamp'});
        let translateX = pan.x.interpolate({inputRange: [-150, 0, 150], outputRange: [-2, 0, 2]});

        let animatedYupStyles = {transform: [{translateX}, {scale: yupScale}], opacity: yupOpacity};

        let NextButton = <Animated.View style={[styles.btn, styles.yupStyle, animatedYupStyles]}> 
                        <MKButton  onPress={() => fn('right')}> 
                            <Image resizeMode ={'contain'} 
                                style={styles.buttonIcon} source={require('../../icon/nextBtn.png')}/>
                        </MKButton>
                        </Animated.View>;

        return  NextButton;
    }
    
    renderNope(pan, fn) {
        let nopeOpacity = pan.x.interpolate({inputRange: [-150, 0], outputRange: [0.5, 1]});
        let nopeScale = pan.x.interpolate({inputRange: [-150, 0], outputRange: [0.8, 1], extrapolate: 'clamp'});
        let translateX = pan.x.interpolate({inputRange: [-150, 0, 150], outputRange: [-2, 0, 2]});

        let animatedNopeStyles = {transform: [{translateX}, {scale: nopeScale}], opacity: nopeOpacity};

        let PrevButton = <Animated.View style={[styles.btn, styles.nopeStyle, animatedNopeStyles]}> 
                            <MKButton onPress={() => fn('left')}> 
                                <Image resizeMode ={'contain'} 
                                    style={styles.buttonIcon} source={require('../../icon/prevBtn.png')}/>
                            </MKButton>
                        </Animated.View>;

        return PrevButton;
    }

    render() {
        
        let data = (this.props.dataCinema ? JSON.parse(this.props.dataCinema) : null);

        return (
                <View style={styles.box}>
                    { data ? 
                        <SwipeCards cards={data} style={styles.swipeCards}
                            loop={true}
                            renderCard={(cardData) => <Card {...cardData} />}
                            handleYup={this.handleYup}  renderNope={this.renderNope} renderYup={this.renderYup}
                            handleNope={this.handleNope} 
                            cardRemoved={this.cardRemoved}/>
                        : null
                    }
                </View>
        );
    }

}

const styles = StyleSheet.create({
    box: {
        flex:1, 
    },
    cardList: {
        position: 'absolute',
    },
    noMoreCards: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerStyle: {
        flex: 1
    },
    yupStyle: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 0,
        right: 40,
        bottom: 15,
    },
    nopeStyle: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 0,
        left: 40,
        bottom: 15,
    },
    btn: {
        borderColor: 'rgba(231, 231, 231, 0.9)',
        position: 'absolute',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonIcon: {
        width: 56,
    },
});

module.exports = cardView;
