import React, { Component } from 'react'
import { Button, View, Text } from 'react-native'

export default class StateKullanimi extends Component {

    constructor() {
        super()
        this.state = {
            count: 0,
        }
    }

    render() {
        const { count } = this.state
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'skyblue' }}>
                <Text>{this.state.count}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Button onPress={() => { this.setState({ count: count + 1 }) }} title='Artır'></Button>
                    <Button onPress={() => { this.setState({ count: count - 1 }) }} title='Azalt' />
                </View>
            </View>
        )
    }
}
