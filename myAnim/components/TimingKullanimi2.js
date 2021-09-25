import React, { Component } from 'react';

import { Animated, Easing, View, Text } from 'react-native';

export default class TimingKullanimi2 extends Component {
    constructor() {
        super()
        this.animValue = new Animated.Value(0)
    }

    //render edildikten sonra hareket fonskiyonu çağrılıyor
    componentDidMount() {
        this.hareket()
    }

    hareket() {
        this.animValue.setValue(0)
        Animated.timing(
            this.animValue,
            {
                toValue: 1,
                duration: 4000, //hareket süresi
                easing: Easing.linear
            }
        ).start(() => this.hareket()) //buradaki callback ile sonsuz döngüye alınıyor. İçerisindeki hareket fonk. kaldırırsam 1 defa oynatılır.
    }
    render() {

        const marginLeft = this.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 300] //hareket soldan sağa
        })

        const opacity = this.animValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 0, 1] //yanık, sönük, yanık olarak ekranda görünüyor.
        })

        const movingMargin = this.animValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 300, 0] //aşağıda marginleft'e atadım, yani 0'dan 300'e git sonra 0'a geri gel.
        })

        const textSize = this.animValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [20, 30, 20] //yazının boyutu bu değerleri alacak.
        })

        const rotateX = this.animValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['0deg', '180deg', '0deg'] //derecelerin değerleri
        })


        return (
            <View style={{ flex: 1, paddingTop: 150 }}>

                <Animated.View style={{
                    marginLeft,
                    height: 50,
                    width: 50,
                    backgroundColor: 'red'
                }} />

                <Animated.View style={{
                    opacity,
                    height: 50,
                    width: 50,
                    backgroundColor: 'blue',
                    marginTop: 20
                }} />

                <Animated.View style={{
                    marginLeft: movingMargin,
                    height: 50,
                    width: 50,
                    backgroundColor: 'orange',
                    marginTop: 20
                }} />

                <Animated.Text style={{
                    fontSize: textSize,
                    marginTop: 20,
                    color: 'green'
                }} >Animated Text!</Animated.Text>

                <Animated.View style={{
                    //içerisine rotateX ve diğer yönler eklenebilir. ikili hali: "transform: [{ rotateX},{rotateY:rotateX}],"
                    transform: [{ rotateX }],
                    marginTop: 75,
                    height: 20,
                    width: 100,
                    backgroundColor: 'black'
                }}>
                    <Text style={{ color: 'white' }}>Transform X!</Text>

                </Animated.View>

            </View>
        )
    }
}
