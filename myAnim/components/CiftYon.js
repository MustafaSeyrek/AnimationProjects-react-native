import React, { Component } from 'react'
import { Animated, Image, Easing, View, Button, SafeAreaView } from 'react-native';

export default class CiftYon extends Component {
    constructor() {
        super()
        this.donusDegeri = new Animated.Value(0)
        this.state = {
            don: '0deg', //dönme işlemi için derece değeri tanımladım
        }
    }

    sagaDon() {
        //setState kullanarak don değerine interpolate değeri atama
        this.setState({
            don: this.donusDegeri.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'] //derece aralığı
            })
        })
        //timing fonksiyonu
        this.donusDegeri.setValue(0)
        Animated.timing(
            this.donusDegeri, {
            toValue: 1,
            duration: 4000,
            easing: Easing.linear
        }
        ).start()
    }

    solaDon() {
        this.setState({
            don: this.donusDegeri.interpolate({
                inputRange: [0, 1],
                outputRange: ['360deg', '0deg']
            })
        })
        this.donusDegeri.setValue(0)
        Animated.timing(
            this.donusDegeri, {
            toValue: 1,
            duration: 4000,
            easing: Easing.linear
        }
        ).start()
    }


    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Animated.Image style={{
                    width: 182,
                    height: 162,
                    transform: [{ rotate: this.state.don }]
                }}
                    source={{ uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png' }} >
                </Animated.Image>
                <View style={{ flexDirection: 'row', paddingTop: 50 }}>
                    <View >
                        <Button title='Sola Döndür' onPress={() => { this.solaDon() }}></Button>
                    </View>
                    <View style={{ paddingLeft: 15 }}>
                        <Button title='Sağa Döndür' onPress={() => { this.sagaDon() }} ></Button>
                    </View>

                </View>
            </View>


        )
    }
}
