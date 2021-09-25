import React, { Component } from 'react'
import { Animated, Image, Easing, View, Button, SafeAreaView } from 'react-native';

export default class SpringKullanimi extends Component {
    constructor() {
        super()
        this.springValue = new Animated.Value(0)
    }

    componentDidMount() {
        this.springOynat()
    }

    springOynat() {
        this.springValue.setValue(0)
        Animated.spring(
            this.springValue, {
            toValue: 1,
            friction: 1 //salınım sayısı değişiyor yükseldikçe azalıyor
        }
        ).start() //sonsuz döngü için burayı değiştir
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Animated.Image style={{
                    width: 182,
                    height: 162,
                    transform: [{ scale: this.springValue }]
                }} source={{ uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png' }}>

                </Animated.Image>
            </View>
        )
    }
}
