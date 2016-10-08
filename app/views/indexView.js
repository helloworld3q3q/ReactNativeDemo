'use strict'
import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Navigator, ScrollView } from 'react-native';
import Drawer from 'react-native-drawer';
import { size } from '../common/util';
import Main from './Main';
import LeftControlPanel from '../drawer/LeftControlPanel';
import RightControlPanel from '../drawer/RightControlPanel'; 

class indexView extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            topItem: null,
        }
    }

    closeDrawer = () => {
        this._drawer.close();
    }

    openDrawer = () => {
        this._drawer.open();
    }

    closeDrawer2 = (topItem) =>{
        this._drawer2.close();
        this.setState({
            topItem: topItem,
        });
    }

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="static"
                content={
                  <LeftControlPanel closeDrawer={this.closeDrawer}/>
                }
                styles={{main: {shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 15}}}
                captureGestures={true}
                acceptTap={true}
                acceptPan={true}
                negotiatePan={false}
                useInteractionManager={false}
                tweenDuration={100}
                panThreshold={0.08}
                panOpenMask={0.03}
                panCloseMask={0}
                disabled={this.state.drawerDisabled}
                openDrawerOffset={(viewport) => {
                    return 80
                }}
                panOpenMaskY={50}
                side="left"
                tweenHandler={Drawer.tweenPresets.parallax}
            >
                <Drawer
                    type="static"
                    ref={(ref) => this._drawer2 = ref}
                    content={
                        <RightControlPanel closeDrawer={this.closeDrawer2} />
                    }
                    captureGestures={true}
                    acceptTap={true}
                    acceptPan={true}
                    negotiatePan={false}
                    useInteractionManager={false}
                    tweenDuration={100}
                    panThreshold={0.08}
                    panOpenMask={0.03}
                    panCloseMask={0}
                    openDrawerOffset={(viewport) => {
                        return 80
                    }}
                    side="right"
                    tweenHandler={Drawer.tweenPresets.parallax}
                  >
                    <Main  topItem={this.state.topItem} navigator={this.props.navigator}/>
                </Drawer>
            </Drawer>
        );
    }

}

module.exports = indexView;
