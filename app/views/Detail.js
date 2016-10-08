'use strict'
import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, AsyncStorage} from 'react-native';
import util, { size , pixel} from '../common/util';
import serviceURL from '../common/services';
import Header from '../common/Header';
import CardView from './cardView';


class Detail extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          data:{},
        }
    }

    componentWillMount() {
        let _that = this;
        AsyncStorage.getItem('panId', function(error,result){
            _that._getData(serviceURL.detailCinema + result + '.json');
        });
    }


    _getData(url) {
        let _that = this;
        util.get(url, function(data){
            _that.setState({
                data: data,
            });
        });
    }

    _getStar(num) {
        let start = '★', halfStart = '☆', startAry = [];
        let val = num/10;
        let value = parseInt(val);

        for(let i =0; i < value; i++){
            startAry.push(start);
        }
        if(value !== val){
            startAry.push(halfStart);
        }
        return startAry;
    }

    _getMember(data) {
        let list = [];
        for(let i = 0, item; item = data[i++];){
            list.push(
                <View key={i}>
                    <Image resizeMode="cover"  style={styles.posterImage}
                                         source={{uri: item.avatars.large}}/>
                    <Text style={styles.memberName}>{item.name}</Text>
                </View>
            );
        }
        return list;
    }

    render() {
        let Data = this.state.data;
        return (
            <View style={styles.box}>
                {
                    Data.title ? 
                    <View>
                        <Header showBack={true} titleMsg={`电影详情`}  navigator={this.props.navigator} />
                        <ScrollView style={styles.scrollView }>
                                <Text style={styles.subTitle}>{Data.title}</Text>
                                <View>
                                    <Image resizeMode="cover"  style={styles.posterImage}
                                         source={{uri: Data.images.large}}/>
                                    <View style={styles.row}>
                                        <Text style={styles.rowItem}>
                                            <Text style={styles.rowItemName}>制片国家/地区: </Text>
                                            {Data.countries}
                                        </Text>
                                        <Text style={styles.rowItem}>
                                            <Text style={styles.rowItemName}>类型：</Text>
                                            {Data.genres.join('、')}
                                        </Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={[styles.rowItem]} >
                                            <Text style={styles.rowItemName}>电影原名: </Text>
                                            {Data.original_title}
                                        </Text>
                                        <Text style={[styles.rowItem]}>
                                            <Text style={styles.rowItemName}>年代: </Text>
                                            {Data.year}
                                        </Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={[styles.rowItem, styles.rating]} >
                                            <Text style={styles.rowItemName}>评分: </Text>
                                            {Data.rating.average}
                                            <Text style={styles.rowItemName}>&nbsp;&nbsp;&nbsp;评分人数: </Text>
                                            {Data.ratings_count}
                                        </Text>
                                        <Text style={[styles.rowItem, styles.rating]} >
                                            <Text style={styles.rowItemName}>评星: </Text>
                                            {this._getStar(Data.rating.stars)}
                                        </Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={[styles.rowItem]} >
                                            <Text style={styles.rowItemName}>短评数: </Text>
                                            {Data.comments_count}
                                        </Text>
                                        <Text style={[styles.rowItem]} >
                                            <Text style={styles.rowItemName}>影评数: </Text>
                                            {Data.reviews_count}
                                        </Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={[styles.rowItem]} >
                                            <Text style={styles.rowItemName}>看过人数: </Text>
                                            {Data.collect_count}
                                        </Text>
                                        <Text style={[styles.rowItem]} >
                                            <Text style={styles.rowItemName}>想看人数: </Text>
                                            {Data.wish_count}
                                        </Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={[styles.rowItem, {flex: 1}]} >
                                            <Text style={styles.rowItemName}>又名: </Text>
                                            {Data.aka.join('、')}
                                        </Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={[styles.rowItem, {flex: 1}]} >
                                            <Text style={styles.rowItemName}>剧情简介: </Text>
                                            {Data.summary}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.itemScroll}>
                                    <Text style={styles.itemTitle}>导演：</Text>
                                    {this._getMember(Data.directors)}
                                </View>
                                <View style={styles.itemScroll}>
                                    <Text style={styles.itemTitle}>主演：</Text>
                                    {this._getMember(Data.casts)}
                                </View>
                        </ScrollView>
                    </View>
                    :
                    <Text> 等待</Text> 
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        backgroundColor: '#ececec',
    },
    subTitle: {
        fontSize: 16,
        paddingVertical: 4,
        color: '#272525',
        textAlign: 'center',
    },
    scrollView: {
        height: size.height - 80,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
    },
    posterImage: {
        height: 400,
    },
    row: {
        paddingVertical: 2,
        paddingHorizontal: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowItem: {
        fontSize: 12,
        lineHeight: 18,
        color: '#272525',
        flexWrap: 'nowrap',
    },
    rowItemName: {
        color: '#666666',
    },
    rating: {
        color: '#d34530',
    },
    itemScroll: {
        marginTop: 8,
    },
    itemTitle: {
        fontSize: 16,
        paddingBottom: 8,
        paddingLeft: 6,
        color: '#000',
    },
    memberName: {
        paddingTop: 3,
        paddingBottom: 8,
        textAlign: 'center',
        color: '#272525',
    }
});

module.exports = Detail;
