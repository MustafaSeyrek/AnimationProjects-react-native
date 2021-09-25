import React, { Component, createRef } from 'react';
import { StyleSheet, Animated, View, TouchableOpacity, ScrollView, Text, Easing, UIManager, findNodeHandle } from 'react-native';

var MARGIN_BOTTOM_RENK = -25;
var MARGIN_TOP_RENK = 10;
var ITEM_HEIGHT = 50;
var ITEM_WIDTH = 250;

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


export default class Yeni extends Component {
    constructor() {
        super()
        this.animValue = new Animated.Value(0)
        this.state = {
            colors: [
                { renk: 'green', margin_bottom_renk: MARGIN_BOTTOM_RENK, margin_top_renk: MARGIN_TOP_RENK, item_height: ITEM_HEIGHT, item_width: ITEM_WIDTH },
                { renk: 'blue', margin_bottom_renk: MARGIN_BOTTOM_RENK, margin_top_renk: MARGIN_TOP_RENK, item_height: ITEM_HEIGHT, item_width: ITEM_WIDTH },
                { renk: 'red', margin_bottom_renk: MARGIN_BOTTOM_RENK, margin_top_renk: MARGIN_TOP_RENK, item_height: ITEM_HEIGHT, item_width: ITEM_WIDTH },
                { renk: 'orange', margin_bottom_renk: MARGIN_BOTTOM_RENK, margin_top_renk: MARGIN_TOP_RENK, item_height: ITEM_HEIGHT, item_width: ITEM_WIDTH },
                { renk: 'yellow', margin_bottom_renk: MARGIN_BOTTOM_RENK, margin_top_renk: MARGIN_TOP_RENK, item_height: ITEM_HEIGHT, item_width: ITEM_WIDTH },
                { renk: 'purple', margin_bottom_renk: MARGIN_BOTTOM_RENK, margin_top_renk: MARGIN_TOP_RENK, item_height: ITEM_HEIGHT, item_width: ITEM_WIDTH },
                { renk: 'green', margin_bottom_renk: MARGIN_BOTTOM_RENK, margin_top_renk: MARGIN_TOP_RENK, item_height: ITEM_HEIGHT, item_width: ITEM_WIDTH },
                { renk: 'blue', margin_bottom_renk: MARGIN_BOTTOM_RENK, margin_top_renk: MARGIN_TOP_RENK, item_height: ITEM_HEIGHT, item_width: ITEM_WIDTH },
                { renk: 'red', margin_bottom_renk: MARGIN_BOTTOM_RENK, margin_top_renk: MARGIN_TOP_RENK, item_height: ITEM_HEIGHT, item_width: ITEM_WIDTH },
                { renk: 'orange', margin_bottom_renk: MARGIN_BOTTOM_RENK, margin_top_renk: MARGIN_TOP_RENK, item_height: ITEM_HEIGHT, item_width: ITEM_WIDTH },
                { renk: 'yellow', margin_bottom_renk: MARGIN_BOTTOM_RENK, margin_top_renk: MARGIN_TOP_RENK, item_height: ITEM_HEIGHT, item_width: ITEM_WIDTH },
                { renk: 'purple', margin_bottom_renk: MARGIN_BOTTOM_RENK, margin_top_renk: MARGIN_TOP_RENK, item_height: ITEM_HEIGHT, item_width: ITEM_WIDTH },

            ],
            silinen: [{ renk: '', margin_bottom_renk: 0, margin_top_renk: 0, item_height: 0, item_width: 0 }],
            x: 0,
            y: 0,
            yatay_height: 200,
            yatay_width: 250,

        }
    }

    hareket() {
        this.animValue.setValue(0)
        Animated.timing(
            this.animValue,
            {
                toValue: 1,
                duration: 300,
                easing: Easing.linear,
            }
        ).start()
    }

    tiklanma(index) {
        this.myScroll.scrollTo({ x: 0, y: 0, animated: true }); //yatay scroll poziyon sıfırlama
        var colors = [...this.state.colors];
        var yatay_height = this.state.yatay_height;
        var yatay_width = this.state.yatay_width;
        yatay_height = 200;
        yatay_width = 250;
        this.setState({ yatay_height });
        this.setState({ yatay_width })
        var silinen = [...this.state.silinen];
        silinen[0].renk = colors[index].renk;
        silinen[0].margin_top_renk = colors[index].margin_top_renk;
        silinen[0].margin_bottom_renk = colors[index].margin_bottom_renk;
        silinen[0].item_height = colors[index].item_height;
        silinen[0].item_width = colors[index].item_width;
        this.setState({ silinen });

        colors[index].item_height = 0;
        colors[index].item_width = 0;
        for (var i = 0; i < colors.length; i++) {
            if (i != index) {
                colors[i].item_height = 30;
                colors[i].item_width = 200;
            }
        }

        this.setState({ colors });

        //yalanci viewın margin ve height değerleri
        const marginTop = this.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [(this.state.y / 2), 15]
        })

        const height = this.animValue.interpolate({
            inputRange: [0, 0.3, 0.9, 1],
            outputRange: [200, 200, 200, 0]
        })
        //hareket eden view
        yalanci = <Animated.View style={{
            marginTop,
            height,
            width: 250,
            backgroundColor: this.state.silinen[0].renk,
            position: 'absolute',
            borderRadius: 12
        }} />
    }

    //yatay scroll'da görünen elemanların temp içine atanması
    goster() {
        var silinen = [...this.state.silinen]
        //var colors = [...this.state.colors]
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
    }

    yatayTiklama() {
        var colors = [...this.state.colors];
        for (var i = 0; i < colors.length; i++) {
            colors[i].item_height = ITEM_HEIGHT;
            colors[i].item_width = ITEM_WIDTH;
        }

        //yalanci viewın margin ve height değerleri
        const marginTop = this.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [15, (this.state.y / 2)-15]
        })

        const height = this.animValue.interpolate({
            inputRange: [0, 0.3, 0.9, 1],
            outputRange: [200, 200, 100, 0]
        })
        //hareket eden view
        yalanci = <Animated.View style={{
            marginTop,
            height,
            width: 250,
            backgroundColor: this.state.silinen[0].renk,
            position: 'absolute',
            borderRadius: 12
        }} />

        this.setState({ colors, yatay_width: 0, yatay_height: 0 });
    }


    render() {
        //dikey scroll tüm renkler view's
        const listViews = this.state.colors.map((item, i) => {
            return <TouchableOpacity key={i}
                ref={ref => this.view = ref}
                onPress={() => {
                    this.tiklanma(i), this.hareket(), this.goster()
                }}>
                <Animated.View onTouchStart={(e) => { this.setState({ y: e.nativeEvent.pageY }) }} style={{
                    width: item.item_width,
                    height: item.item_height,
                    backgroundColor: item.renk,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                    marginTop: item.margin_top_renk,
                    marginBottom: item.margin_bottom_renk,
                }}>

                </Animated.View>
            </TouchableOpacity>
        })

        var colors = [...this.state.colors]
        //yatay scroll view's
        const opacity = this.animValue.interpolate({
            inputRange: [0, 0.7, 0.8, 0.9, 1],
            outputRange: [0, 0.02, 0.04, 0.05, 1]
        })
        //yatay
        colorDetails = temp.map((item, i) => {
            return <TouchableOpacity key={i} activeOpacity={0.8}
                onPress={() => { this.yatayTiklama(), this.hareket() }}>
                <Animated.View
                    key={i} style={{
                        opacity,
                        width: this.state.yatay_width,
                        height: this.state.yatay_height,
                        backgroundColor: item,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 12,
                        marginTop: 15,
                        marginBottom: 8 * (colors.length), //colors'un uzunluğu ile çarptım, detay renkleri colors ile kesişmesin diye
                        marginLeft: 23
                    }}>
                </Animated.View>
            </TouchableOpacity>
        })

        return (
            <Animated.View style={styles.container} >
                <Animated.ScrollView
                    ref={(ref) => this.myScroll = ref}
                    horizontal
                    showsHorizontalScrollIndicator={false} >
                    {colorDetails}
                </Animated.ScrollView>

                <Animated.ScrollView showsVerticalScrollIndicator={false}>
                    {listViews}
                </Animated.ScrollView>
                {yalanci}
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
        borderRadius: 12
    }
})

