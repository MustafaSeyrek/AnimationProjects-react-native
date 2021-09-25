import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Easing, PanResponder, SafeAreaView } from 'react-native';

const MARGIN_BOTTOM_RENK = -25;
const MARGIN_TOP_RENK = 10;
const ITEM_HEIGHT = 50;

//renklerin ayrıntılarının tanımlanması
const greenDetails = ['green', 'darkgreen', 'lawngreen', 'forestgreen', 'palegreen', 'seagreen'];
const blueDetails = ['blue', 'cadetblue', 'darkblue', 'skyblue', 'midnightblue', 'royalblue'];
const redDetails = ['red', 'darkred', 'indianred', '#F62217', '#F70D1A', '#F62817'];
const orangeDetails = ['orange', 'darkorange', '#E56717', '#FF6700', '#FF5F1F', '#F88017'];
const yellowDetails = ['yellow', '#E2F516', '#F9DB24', '#FFEF00', '#F5E216', '#FFDF00'];
const purpleDetails = ['purple', 'rebeccapurple', '#550A35', '#810541', '#7D0541', '#7E354D']
var temp = [] //gelen değere göre renk ayrıntısı ataması yapılacak dizi
var colorDetails;
var yalanci;

export default class Son extends Component {
    constructor() {
        super()
        this.animValue = new Animated.Value(0)
        this.panResponder;
        this.state = {
            colors: [
                { renk: 'green', margin_bottom_renk: MARGIN_BOTTOM_RENK, margin_top_renk: MARGIN_TOP_RENK, item_height: ITEM_HEIGHT },
                { renk: 'blue', margin_bottom_renk: MARGIN_BOTTOM_RENK, margin_top_renk: MARGIN_TOP_RENK, item_height: ITEM_HEIGHT },
                { renk: 'red', margin_bottom_renk: MARGIN_BOTTOM_RENK, margin_top_renk: MARGIN_TOP_RENK, item_height: ITEM_HEIGHT },
                { renk: 'orange', margin_bottom_renk: MARGIN_BOTTOM_RENK, margin_top_renk: MARGIN_TOP_RENK, item_height: ITEM_HEIGHT },
                { renk: 'yellow', margin_bottom_renk: MARGIN_BOTTOM_RENK, margin_top_renk: MARGIN_TOP_RENK, item_height: ITEM_HEIGHT },
                { renk: 'purple', margin_bottom_renk: MARGIN_BOTTOM_RENK, margin_top_renk: MARGIN_TOP_RENK, item_height: ITEM_HEIGHT },
            ],
            silinen: [{ renk: '', margin_bottom_renk: 0, margin_top_renk: 0, item_height: 0 }],
            locationX: 0,
            locationY: 0,
            pageY: 0,
        }
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
             onMoveShouldSetPanResponder: (evt, gestureState) => false,            
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,           
            onPanResponderGrant: (evt, gestureState) => false,
            onPanResponderMove: (evt, gestureState) => false,
            onPanResponderRelease: (evt, gestureState) => {
                this.setState({
                    locationX: evt.nativeEvent.locationX.toFixed(2),
                    locationY: evt.nativeEvent.locationY.toFixed(2),
                    pageY: evt.nativeEvent.pageY.toFixed(2),
                });
            }
        });
    }

    hareket() {
        this.animValue.setValue(0)
        Animated.timing(
            this.animValue,
            {
                toValue: 1,
                duration: 1000, //hareket süresi
                easing: Easing.linear,
            }
        ).start()
    }

    tiklanma(index) {
        this.myScroll.scrollTo({ x: 0, y: 0, animated: true }); //yatay scroll poziyon sıfırlama
        var colors = [...this.state.colors];
        colors[index].item_height = 0;
        for (var i = 0; i < colors.length; i++) {
            if (i != index) {
                colors[i].item_height = 50;
            }
        }
        this.setState({ colors });
        var silinen = [...this.state.silinen];

        silinen[0].renk = colors[index].renk;
        silinen[0].margin_top_renk = colors[index].margin_top_renk;
        silinen[0].margin_bottom_renk = colors[index].margin_bottom_renk;
        silinen[0].item_height = colors[index].item_height;
        this.setState({ silinen });

        //yalanci viewın margin ve opacity değerleri
        const marginTop = this.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [200, 95]
        })
        const opacity = this.animValue.interpolate({
            inputRange: [0, 0.1, 0.9, 1],
            outputRange: [1, 1, 0.9, 0]
        })
        //hareket eden view
        yalanci = <Animated.View style={{
            marginTop,
            opacity,
            height: 50,
            width: 250,
            backgroundColor: this.state.silinen[0].renk,
            position: 'absolute',
            borderRadius: 12
        }} />
    }

    //yatay scroll'da görünen elemanlar
    goster() {
        var silinen = [...this.state.silinen]
        var colors = [...this.state.colors]
        if (silinen[0].renk == 'green') {
            temp = greenDetails;
        }
        else if (silinen[0].renk == 'blue') {
            temp = blueDetails;
        }
        else if (silinen[0].renk == 'red') {
            temp = redDetails;
        }
        else if (silinen[0].renk == 'orange') {
            temp = orangeDetails;
        }
        else if (silinen[0].renk == 'yellow') {
            temp = yellowDetails;
        }
        else if (silinen[0].renk == 'purple') {
            temp = purpleDetails;
        }

        //yatay scroll view's
        const opacity = this.animValue.interpolate({
            inputRange: [0, 0.7, 0.8, 0.9, 1],
            outputRange: [0, 0.02, 0.07, 0.09, 1]
        })
        colorDetails = temp.map((item, i) => {
            return <Animated.View
                key={i} style={{
                    opacity,
                    width: 250,
                    height: 100,
                    backgroundColor: item,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                    marginTop: 15,
                    marginBottom: 5 * (colors.length), //colors'un uzunluğu ile çarptım, detay renkleri colors ile kesişmesin diye                   
                    marginLeft: 23
                }}>
            </Animated.View>
        })
    }

    render() {
        //dikey scroll tüm rankler view's
        const listViews = this.state.colors.map((item, i) => {
            return <Animated.View key={i} >
                <TouchableOpacity  
                    onPress={() => {
                        this.tiklanma(i), this.hareket(), this.goster()
                    }} style={{
                        width: 250,
                        height: item.item_height,
                        backgroundColor: item.renk,
                        //alignItems: 'center',
                        //justifyContent: 'center',
                        borderRadius: 12,
                        marginTop: item.margin_top_renk,
                        marginBottom: item.margin_bottom_renk,
                        
                    }}>
                </TouchableOpacity>
            </Animated.View>


        })
        return (

            <Animated.View style={styles.container} {...this.panResponder.panHandlers}>
                <Animated.ScrollView
                    ref={(ref) => this.myScroll = ref}
                    horizontal
                    showsHorizontalScrollIndicator={false}>
                    {colorDetails}
                </Animated.ScrollView>
                <Animated.ScrollView showsVerticalScrollIndicator={false} >
                    {listViews}
                </Animated.ScrollView>
                {yalanci}
                <Text>y:{this.state.pageY}</Text>
            </Animated.View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEE4E2',
        width: 300,
        marginHorizontal: 50,
        marginTop: 225,
        marginBottom: 190,
        alignItems: 'center',
        borderRadius: 12, position: 'relative'
    }
})

