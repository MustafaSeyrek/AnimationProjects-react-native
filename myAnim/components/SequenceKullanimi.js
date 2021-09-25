import React, { Component } from 'react';
import { StyleSheet, Animated, View } from 'react-native';


//dizi tanımlama kısmı
const arr = []
//diziyi doldurma kısmı
for (var i = 0; i < 500; i++) {
    arr.push(i)
}

export default class SequenceKullanimi extends Component {
    constructor() {
        super()
        this.animValue = [] //bu değeri de dizi olarak tanımladık çünkü bir dizi değer çalışacak

        arr.forEach((value) => {
            this.animValue[value] = new Animated.Value(0) //diziyi başlangıç değeri olan 0 ile dolduruyoruz
        })
    }

    componentDidMount() {
        this.anim()
    }

    anim() {
        const animations = arr.map((item) => { //map, dizi içindeki elemalara erişmeyi sağlar
            return Animated.timing(
                this.animValue[item], {
                toValue: 1,
                duration: 50
            }
            )
        })
        Animated.sequence(animations).start() //dizideki değerleri sırayla alıp sırayla çalıştırıyor
    }



    render() {
        const animations = arr.map((a, i) => {
            return <Animated.View key={i} style={{ opacity: this.animValue[a], height: 20, width: 20, backgroundColor: 'green', marginLeft: 3, marginTop: 3 }} />
        })
        return (
            <View style={styles.container}>
                {animations}

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap' //genişliğin aşıldğı zamanlarda alt satıra geçmesini sağlar
    }
})
