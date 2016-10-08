'use strict'
import React from 'react';
import { Dimensions, PixelRatio } from 'react-native';

var util = {
    pixel: 1 / PixelRatio.get(),

    size: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    get: function(url, successCallback, failCallback) {
        fetch(url).then((response) => response.text())
        .then((responseText) => {
            successCallback(JSON.parse(responseText));
        }).catch(function(err){
            failCallback(err);
        });
    }
}

module.exports = util;
