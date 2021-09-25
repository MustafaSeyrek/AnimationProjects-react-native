import React, { Component } from 'react';
import { StyleSheet, Animated, View } from 'react-native';

const arr = []
for (var i = 0; i < 500; i++) {
    arr.push(i)
}

export default class StaggerKullanimi extends Component {
    constructor() {
        super()
        this.animValue = []
        arr.forEach((value) => {
            this.animValue[value] = new Animated.Value(0)
        })
    }

    componentDidMount() {
        this.anim()
    }

    anim() {
        const animations = arr.map((item) => {
            return Animated.timing(
                this.animValue[item], {
                toValue: 1,
                duration: 4000
            }
            )
        })
        Animated.stagger(10, animations).start() //sqquenceden farklı olarak delay değeri eklendi
    }

    render() {
        const animations = arr.map((a, i) => {
            return <Animated.View key={i} style={{ opacity: this.animValue[a], height: 20, width: 20, backgroundColor: 'green', marginLeft: 3, marginTop: 3 }} />
        })

        return (
           <View style ={{flex:1, flexDirection:'row',flexWrap:'wrap'}}>{animations}</View>
        )
    }
}
