
import React, { Component } from 'react';
import { Animated, Image, Easing, View,SafeAreaView } from 'react-native';

export default class Dondur extends Component {
    constructor() {
        super()
        this.donusDegeri = new Animated.Value(0)
    }
    componentDidMount() {
        this.dondur()
    }
    dondur() {
        this.donusDegeri.setValue(0)
        Animated.timing(
            this.donusDegeri, {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear,
        }
        ).start(() => this.dondur())
    }


    render() {
        const don = this.donusDegeri.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });
        return (
            <SafeAreaView style={{
                flex: 1,
                justifyContent: 'center',
                //alignItems: 'center'
            }}>
                <Animated.Image style={{
                    width: 182,
                    height: 162,
                    transform: [{ rotate: don }]
                }}
                    source={{ uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png' }}
                ></Animated.Image>
            </SafeAreaView>

        );
    }



}


