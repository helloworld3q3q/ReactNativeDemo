/* Gratefully copied from https://github.com/brentvatne/react-native-animated-demo-tinder */
'use strict';

import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Animated,
    PanResponder,
    Image
} from 'react-native';

import clamp from 'clamp';

import Defaults from './Defaults.js';

var SWIPE_THRESHOLD = 100;

// Base Styles. Use props to override these values
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    yup: {
        position: 'absolute',
        padding: 20,
        bottom: 20,
        borderRadius: 5,
        right: 20,
    },
    yupText: {
        fontSize: 16,
        color: 'green',
    },
    nope: {
        position: 'absolute',
        bottom: 20,
        padding: 20,
        left: 20,
    },
    nopeText: {
        fontSize: 16,
        color: 'red',
    }
});

class SwipeCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(0.5),
      card: this.props.cards ? this.props.cards[0] : null,
      direction: true, // next true， prev false
    }
  }

  _goToNextCard() {
     //direction next true， prev false

    let currentCardIdx = this.props.cards.indexOf(this.state.card);
    let newIdx;
    let len = this.props.cards.length - 1;    
    let prev = currentCardIdx - 1;

    this.state.direction ? newIdx = currentCardIdx + 1 : prev < 0 
      ? newIdx = len : newIdx = prev;

    // Checks to see if last card.
    // If props.loop=true, will start again from the first card.
    let card = newIdx > len
      ? this.props.loop ? this.props.cards[0] : null
      : this.props.cards[newIdx];

    this.setState({
      card: card
    });
  }

  componentDidMount() {
    this._animateEntrance();
  }

  _animateEntrance() {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 8 }
    ).start();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.cards && nextProps.cards.length > 0){
      this.setState({
        card: nextProps.cards[0]
      })
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {

        return gestureState.dx != 0 && gestureState.dy != 0;
      },
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {

        this.state.pan.flattenOffset();
        var velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {

          let indexOf = this.props.cards.indexOf(this.state.card);
          let len = this.props.cards.length - 1;

          this.state.pan.x._value > 0
            ? this.props.handleYup(this.state.card, indexOf + 1> len ? this.props.cards[0] : this.props.cards[indexOf + 1])
            : this.props.handleNope(this.state.card, indexOf - 1 < 0 ? this.props.cards[len] : this.props.cards[indexOf - 1])

          this.props.cardRemoved
            ? this.props.cardRemoved(indexOf)
            : null
          this.state.pan.x._value > 0 ? this.state.direction = true : this.state.direction = false;

          Animated.decay(this.state.pan, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.98
          }).start(this._resetState.bind(this, null))
        } else {
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start()
        }
      }
    });
  }

  _resetState() {
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(0);
    this._goToNextCard();
    this._animateEntrance();
  }

  _cardList() {

    if(this.state.card === undefined) return false;
    
    let list = [];
    let rank = this.state.card.rank;
    let len = this.props.cards.length - 1;
    let cardsView = [];
    console.log(this.state.direction);
    if(this.state.direction){
      for(let i = 0; i < 3; i++){
        let id = i + rank, card = [];
        if(id > len){
          rank = 0;
          id = rank + i
        }
        card = this.props.cards[id];
        card.CardPosition = true;
        card.CardTop = (i + 1)^3 * (i + 2) ;
        card.key = i;
        cardsView.unshift(this.renderCard(card));
      }

    } else {
      for(let i = 4; i > 0; i--){

        let card = [], id = 0;
        
        id = rank - i- 1;
        if(id < 0){
          id = id + len + 1;
        }
        card = this.props.cards[id];
        card.CardPosition = true;
        card.CardTop = (i + 1)^3 * (i + 2) ;
        card.key = i;
        
        cardsView.push(this.renderCard(card));
      }
    }
    
    return cardsView;

  }

  renderCardList() {

  }

  renderNoMoreCards() {
    if (this.props.renderNoMoreCards)
      return this.props.renderNoMoreCards();

    return (
      <Defaults.NoMoreCards />
    )
  }

  renderCard(cardData) {
    return this.props.renderCard(cardData)
  }

  render() {
    let { pan, enter, } = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
    let opacity = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]});
    let scale = enter;

    let animatedCardstyles = {transform: [{translateX}, {translateY}, {rotate}, {scale}], opacity};

    let yupOpacity = pan.x.interpolate({inputRange: [0, 150], outputRange: [0, 1]});
    let yupScale = pan.x.interpolate({inputRange: [0, 150], outputRange: [0.5, 1], extrapolate: 'clamp'});
    let animatedYupStyles = {transform: [{scale: yupScale}], opacity: yupOpacity}

    let nopeOpacity = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0]});
    let nopeScale = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0.5], extrapolate: 'clamp'});
    let animatedNopeStyles = {transform: [{scale: nopeScale}], opacity: nopeOpacity}

        return (
            <View style={this.props.containerStyle}>
                {
                  <View style={{position: 'absolute'}}>{this._cardList()}</View>
                }
                { this.state.card
                    ? (
                    <Animated.View style={[this.props.cardStyle, animatedCardstyles]} {...this._panResponder.panHandlers}>
                        {this.renderCard(this.state.card)}
                    </Animated.View>
                )
                  : this.renderNoMoreCards() }


                { this.props.renderNope
                  ? this.props.renderNope(pan)
                  : (
                      this.props.showNope
                      ? (
                        <Animated.View style={[this.props.nopeStyle, this.props.showNopeChange ? animatedNopeStyles : null]}>
                            {this.props.noView
                                ? this.props.noView
                                : <Text style={this.props.nopeTextStyle}>{this.props.noText ? this.props.noText : "Nope!"}</Text>
                            }
                        </Animated.View>
                        )
                      : null
                    )
                }
                { this.props.renderYup
                  ? this.props.renderYup(pan)
                  : (
                      this.props.showYup
                      ? (
                        <Animated.View style={[this.props.yupStyle, this.props.showYupChange ? animatedYupStyles : null]}>
                            {this.props.yupView
                                ? this.props.yupView
                                : <Text style={this.props.yupTextStyle}>{this.props.yupText ? this.props.yupText : "Yup!"}</Text>
                            }
                        </Animated.View>
                      )
                      : null
                    )
                }
            </View>
    );
  }
}
 //animatedYupStyles  animatedNopeStyles
SwipeCards.propTypes = {
    cards: React.PropTypes.array,
    renderCards: React.PropTypes.func,
    loop: React.PropTypes.bool,
    renderNoMoreCards: React.PropTypes.func,
    showYup: React.PropTypes.bool,
    showNope: React.PropTypes.bool,
    handleYup: React.PropTypes.func,
    handleNope: React.PropTypes.func,
    yupView: React.PropTypes.element,
    yupText: React.PropTypes.string,
    noView: React.PropTypes.element,
    noText: React.PropTypes.string,
    containerStyle: View.propTypes.style,
    cardStyle: View.propTypes.style,
    yupStyle: View.propTypes.style,
    yupTextStyle: Text.propTypes.style,
    nopeStyle: View.propTypes.style,
    nopeTextStyle: Text.propTypes.style
};

SwipeCards.defaultProps = {
    loop: false,
    showYup: true,
    showNope: true,
    containerStyle: styles.container,
    yupStyle: styles.yup,
    yupTextStyle: styles.yupText,
    nopeStyle: styles.nope,
    nopeTextStyle: styles.nopeText
};

export default SwipeCards
