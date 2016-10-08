'use strict'
import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Image } from 'react-native';
import util from '../common/util';

class Card extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let subject, posterImage, image; // 大图
        
        this.props.subject ? subject = this.props.subject : subject = this.props;

        posterImage = subject.images.large;

        if(posterImage != '' && posterImage != null) {
            image = <Image resizeMode="stretch" style={styles.posterImage}
                        source={{uri: posterImage}}/>;
        }else{
            image = <Text>{this.props.subject.title}</Text>;
        }
        return (
            <View style={[styles.cardBox, this.props.CardPosition ? {
                position: 'absolute',
                top: this.props.CardTop} : null
            ]}>
                <View style={styles.posterWrap}>
                    {image}
                    {this.props.new ?  <Text style={styles.newTop}>新上榜</Text> : null }
                    {this.props.rank ? <Text style={styles.topNumber}>Top {this.props.rank}</Text> : null}
                </View>
                <View style={styles.cinemaMsg}>
                    <View style={styles.cinemaMsgItem}>
                        <Text style={styles.title} numberOfLines={1} >{subject.title} 
                            { this.props.box ? <Text style={styles.cast}> {subject.casts[0].name}...</Text> : null}
                        </Text>
                        <Text style={styles.average}>评分:{subject.rating.average}</Text>
                    </View>
                    <View style={styles.cinemaMsgItem}>
                        <Text style={[styles.arrivedMsg, styles.flex2]} numberOfLines={1}>{subject.original_title} ({subject.year})</Text>
                        <Text style={styles.boxOffice} numberOfLines={1}>{ this.props.box ?  '票房：' + this.props.box/1000 :  subject.casts[0].name}</Text> 
                    </View>
                    <View style={styles.cinemaMsgItem}>
                        <Text style={styles.arrivedMsg}>类型:{subject.genres.join('\/')}</Text>
                        <Text style={styles.directors}>导演:{subject.directors[0].name}</Text>
                    </View>
                </View>
            </View>

        );
    }

}

const styles = StyleSheet.create({
    flex2: {
        overflow: 'hidden',
    },
    cardBox: {
        borderRadius: 5,
        borderWidth: 2,
        marginTop: 2,
        width: 310,
        marginHorizontal: (util.size.width - 310) / 2 ,
        borderColor: '#e1e2da',
        backgroundColor: '#ffffff',
    },
    posterWrap: {
        width: 310,
        borderColor: '#e1e2da',
    },
    posterImage: {
        height: 340,
        width: 310,
    },
    newTop: {
        position: 'absolute',
        top: 0,
        right: 0,
        fontSize: 12,
        color: '#ffffff',
        backgroundColor: 'rgba(230,69,51,0.65)',
        paddingVertical: 1,
        paddingHorizontal: 3,
    },
    topNumber: {
        position: 'absolute',
        top: 0,
        left: 0,
        fontSize: 12,
        color: '#ffffff',
        paddingVertical: 1,
        paddingHorizontal: 3,
        backgroundColor: 'rgba(255,164,51,0.7)',
    },
    cinemaMsg: {
        width: 300,
        padding: 2,
        flexDirection: 'column',
    },
    cinemaMsgItem: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    title: {
        flex: 2,
        fontSize: 15,
        color: '#1d1d1d',
        textAlign: 'left',
    },
    cast: {
        fontSize: 12,
    },
    average: {
        flex: 1,
        fontSize: 15,
        color: '#e64533',
        textAlign: 'right',
    },
    arrivedMsg: {
        fontSize: 13,
        textAlign: 'left',
    },
    boxOffice: {
        flex:1,
        fontSize: 12,
        color: '#e64533',
        textAlign: 'right',
    },
    directors: {
        fontSize: 12,
        textAlign: 'right',
        color: '#1d1d1d',
    },
});

module.exports = Card;
