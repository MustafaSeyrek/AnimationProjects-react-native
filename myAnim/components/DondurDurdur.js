import React, { Component } from 'react'
import { Animated, Image, Easing, View, Button } from 'react-native';

export default class DondurDurdur extends Component {

    constructor() {
        super()
        this.donusDegeri = new Animated.Value(0)
    }

    dondur() {
        this.donusDegeri.setValue(0)
        Animated.timing(
            this.donusDegeri, {
            toValue: 1,//gideceği yer mesela 0'dan 1'e 1 tur döner
            duration: 1500, // tur sayısını ne kadar sürede tamamlayacak
            easing: Easing.linear //animasyon biçimi
        }
        ).start()
    }

    durdur() {
        Animated.timing(
            this.donusDegeri
        ).stop()

    }

    render() {
        const don = this.donusDegeri.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Animated.Image
                    style={{
                        width: 182,
                        height: 162,
                        transform: [{ rotate: don }] //rotate ile dönme yönünü değiştirebilirim
                    }} source={{ uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png' }}
                >
                </Animated.Image>
                <View style={{ flexDirection: 'row', paddingTop: 30, justifyContent: 'space-between' }}>
                    <Button color='green' title='Döndür' onPress={() => { this.dondur() }}></Button>
                    <Button color='red' title='Durdur' onPress={() => { this.durdur() }}></Button>
                </View>


            </View>
        )
    }
}
