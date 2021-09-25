import React from 'react'
import {
    ScrollView, Text, View, TouchableOpacity, Image, Dimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SharedElement } from 'react-navigation-shared-element';

import { data } from './data';

const { width } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.9;



export default function Colors({ navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                {data.map(item => (
                    <TouchableOpacity key={item.id} activeOpacity={0.8}
                        onPress={() => navigation.navigate('ColorDetails', { item })}
                    >
                        <SharedElement id={`item.${item.id}.renk`}>
                            <View style={{
                                width: ITEM_WIDTH,
                                height: 100,
                                backgroundColor: item.renk,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 12,
                                marginTop: 10,
                                marginBottom: -30,
                            }}>
                            </View>
                        </SharedElement>
                    </TouchableOpacity>
                ))}
            </ScrollView>

        </View>
    )
}
