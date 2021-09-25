import React, { Component } from 'react'
import { Animated, Easing, View, Text } from 'react-native';

export default class ParalelFonksiyonuKullanimi extends Component {
    constructor() {
        super()
        this.animValue1 = new Animated.Value(0)
        this.animValue2 = new Animated.Value(0)
        this.animValue3 = new Animated.Value(0)
    }

    componentDidMount() {
        this.oynat()
    }
    oynat() {
        //öncelikle değerleri tekrar 0 yapıyorum
        this.animValue1.setValue(0)
        this.animValue2.setValue(0)
        this.animValue3.setValue(0)

        //farklı animasyonlar oluşturmak için
        const animasyonYap = function (value, duration, easing, delay = 0) {
            return Animated.timing(
                value, {
                toValue: 1,
                duration,
                easing,
                delay
            }
            ).start()
        }
        //şimdi paralel fonksiyonu ile birden fazla animasyonlar çalıştırılacak
        //easing hareketini hız biçimini falan değiştirmemizi sağlar.sabit bir hareket, yanıp sönmeli, yavaştan hızlıya gibi
        Animated.parallel([
            animasyonYap(this.animValue1, 4000, Easing.ease),
            animasyonYap(this.animValue2, 4000, Easing.ease),
            animasyonYap(this.animValue3, 4000, Easing.ease)
        ]).start()

    }

    render() {

        const scaleText = this.animValue1.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 2]
        })

        const spinText = this.animValue2.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

        const marginTop = this.animValue3.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 500]
        })


        return (
            <View style={{ flex: 1, alignItems: 'center',marginTop:10 }}>

                <Animated.View style={{
                    transform: [{ scale: scaleText }]
                }}>
                    <Text>Scale Text</Text>
                </Animated.View>

                <Animated.View style={{ marginTop: 30, transform: [{ rotate: spinText }] }}>
                    <Text style={{ fontSize: 20 }}>Spin Text</Text>
                </Animated.View>

                <Animated.View style={{
                    marginTop,
                    width: 100,
                    height: 30,
                    backgroundColor: 'skyblue'
                }}>
                    <Text style={{ fontSize: 20 }}>Scroll Text</Text>
                </Animated.View>
            </View>
        )
    }
}
