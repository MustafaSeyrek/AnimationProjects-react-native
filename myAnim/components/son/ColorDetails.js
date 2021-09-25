import React, { useRef } from 'react';
import {
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
const { width } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.95;
const ITEM_HEIGHT = ITEM_WIDTH / 2;


const greenDetails = ['green', 'darkgreen', 'lawngreen', 'forestgreen', 'palegreen', 'seagreen'];
const blueDetails = ['blue', 'cadetblue', 'darkblue', 'skyblue', 'midnightblue', 'royalblue'];
const redDetails = ['red', 'darkred', 'indianred', '#F62217', '#F70D1A', '#F62817'];
const orangeDetails = ['orange', 'darkorange', '#E56717', '#FF6700', '#FF5F1F', '#F88017'];
const yellowDetails = ['yellow', '#E2F516', '#F9DB24', '#FFEF00', '#F5E216', '#FFDF00'];
const purpleDetails = ['purple', 'rebeccapurple', '#550A35', '#810541', '#7D0541', '#7E354D']
var temp = []



const ColorDetails = ({ navigation, route }) => {

    const scrollRef = useRef(null);
    const { item } = route.params;
    if (item.renk == 'green') {
        temp = greenDetails;
    }
    else if (item.renk == 'blue') {
        temp = blueDetails;
    }
    else if (item.renk == 'red') {
        temp = redDetails;
    }
    else if (item.renk == 'orange') {
        temp = orangeDetails;
    }
    else if (item.renk == 'yellow') {
        temp = yellowDetails;
    }
    else if (item.renk == 'purple') {
        temp = purpleDetails;
    }


    return (
        <View style={{ flex: 1 }}>
            <SharedElement id={`item.${item.id}.renk`}>
                <ScrollView horizontal key={item.id}
                    ref={scrollRef} >
                    {temp.map(item2 => (
                        <TouchableOpacity activeOpacity={0.8}
                            onPress={() => {
                                setTimeout(() => {
                                    scrollRef.current.scrollTo({ x: 0, y: 0, animated: false });
                                }, 1); navigation.navigate('Colors')
                            }}>
                            <View style={{
                                width: ITEM_WIDTH,
                                height: 150,
                                backgroundColor: item2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 12,
                                marginTop: 10,
                                marginLeft: 10,
                            }}>
                            </View>
                        </TouchableOpacity>
                    ))}

                </ScrollView>
            </SharedElement>
        </View >
    )
}
ColorDetails.sharedElements = route => {
    const { item } = route.params;
    return [
        {
            id: `item.${item.id}.renk`,

        }
    ];
};
export default ColorDetails;
