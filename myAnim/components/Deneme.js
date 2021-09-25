import React, { Component } from 'react';
import { StyleSheet, Animated, View, Text } from 'react-native';

export default class Deneme extends Component {
    render() {
        const dene = <View><Text>DENEME</Text></View>
        return (
            <View style={{flex:1,justifyContent:'center'}}>
                {dene}
            </View>
        )
    }
}
