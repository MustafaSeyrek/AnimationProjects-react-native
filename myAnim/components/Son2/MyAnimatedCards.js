import React, { Component } from 'react';
import { StyleSheet, Animated, TouchableOpacity, Easing } from 'react-native';

var MARGIN_BOTTOM_RENK = -25;
var MARGIN_TOP_RENK = 10;
var ITEM_HEIGHT = 50;
var ITEM_WIDTH = 250;
var TITLE_SIZE = 15;

var temp = [] //gelen değere göre renk ayrıntısı ataması yapılacak dizi
var colorDetails;
//hareket eden view değişkenleri
var movingView;
var fontSizeTitle;
var fontSizeDesc;
var buttonHeight;
var heightMovingView;
var marginTopMovingView;

export default class MyAnimatedCards extends Component {
    constructor() {
        super()
        this.animValue = new Animated.Value(0)
        this.state = {
            colors: [],
            silinen: [{ title: '', description: '', renk: '', margin_bottom_renk: 0, margin_top_renk: 0, item_height: 0, item_width: 0 }],
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
        silinen[0].title = colors[index].title;
        silinen[0].description = colors[index].description;
        this.setState({ silinen });
        colors[index].item_height = 0;
        colors[index].item_width = 0;
        for (var i = 0; i < colors.length; i++) {
            if (i != index) {
                colors[i].item_height = 30;
                colors[i].item_width = 200;
            }
        }
        TITLE_SIZE = 8;
        this.setState({ colors });
        //hareket eden view özelliklerini çağırma fonksiyonu
        this.movingViewProperties((this.state.y / 2), 15);
        //hareket eden view
        movingView = <Animated.View style={{
            marginTop: marginTopMovingView,
            height: heightMovingView,
            width: 250,
            backgroundColor: this.state.silinen[0].renk,
            position: 'absolute',
            borderRadius: 12,
            alignItems: 'center',
        }} >
            <Animated.Text style={{ fontSize: fontSizeTitle, fontWeight: 'bold' }}>{this.state.silinen[0].title}</Animated.Text>
            <Animated.Text style={{ fontSize: fontSizeDesc }}>{this.state.silinen[0].description}</Animated.Text>
            <TouchableOpacity style={{ height: buttonHeight, backgroundColor: '#E3432A' }}><Animated.Text style={{ fontSize: fontSizeDesc }}>Press Me</Animated.Text></TouchableOpacity>
        </Animated.View>
    }

    //hareket eden view bazı özellikleri
    movingViewProperties(beginValue, endValue) {
        //movingView margin ve height değerleri
        marginTopMovingView = this.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [beginValue, endValue]
        })
        heightMovingView = this.animValue.interpolate({
            inputRange: [0, 0.3, 0.9, 1],
            outputRange: [200, 200, 200, 0]
        })
        //movingView title size
        fontSizeTitle = this.animValue.interpolate({
            inputRange: [0, 0.9, 1],
            outputRange: [50, 50, 0]
        })
        //movingView desc size
        fontSizeDesc = this.animValue.interpolate({
            inputRange: [0, 0.9, 1],
            outputRange: [20, 20, 0]
        })
        //movingView buton height
        buttonHeight = this.animValue.interpolate({
            inputRange: [0, 0.9, 1],
            outputRange: [30, 30, 0]
        })
    }

    //yatay scroll'da görünen elemanların temp içine atanması
    fillingTemp() {
        var silinen = [...this.state.silinen]
        temp.push({ silinen }, { silinen }, { silinen });
    }

    yatayTiklama() {
        var colors = [...this.state.colors];
        for (var i = 0; i < colors.length; i++) {
            colors[i].item_height = ITEM_HEIGHT;
            colors[i].item_width = ITEM_WIDTH;
        }
        //hareket eden view özellikleri fonksiyonu çağırma
        this.movingViewProperties(15, (this.state.y / 2) - 15);
        //hareket eden view
        movingView = <Animated.View style={{
            marginTop: marginTopMovingView,
            height: heightMovingView,
            width: 250,
            backgroundColor: this.state.silinen[0].renk,
            position: 'absolute',
            borderRadius: 12,
            alignItems: 'center',
        }}>
            <Animated.Text style={{ fontSize: fontSizeTitle, fontWeight: 'bold' }}>{this.state.silinen[0].title}</Animated.Text>
            <Animated.Text style={{ fontSize: fontSizeDesc }}>{this.state.silinen[0].description}</Animated.Text>
            <TouchableOpacity style={{ height: buttonHeight, backgroundColor: '#E3432A' }}><Animated.Text style={{ fontSize: fontSizeDesc }}>Press Me</Animated.Text></TouchableOpacity>
        </Animated.View>
        TITLE_SIZE = 15;
        temp = []
        this.setState({ colors, yatay_width: 0, yatay_height: 0 });
    }

    //gelen verilerin alınması
    componentWillMount() {
        var colors = [...this.state.colors]
        var renk = '#DDE1D6'
        if (this.props.data.length == 0) {
            colors.push({ title: 'NO DATA!', description: 'No data received!', renk: 'white', margin_bottom_renk: MARGIN_BOTTOM_RENK, margin_top_renk: MARGIN_TOP_RENK, item_height: ITEM_HEIGHT, item_width: ITEM_WIDTH })
        }
        else {
            for (var i = 0; i < this.props.data.length; i++) {
                if (i % 2 == 1)
                    renk = '#686B63'
                else
                    renk = '#DDE1D6'
                colors.push({ title: this.props.data[i].title, description: this.props.data[i].description, renk: renk, margin_bottom_renk: MARGIN_BOTTOM_RENK, margin_top_renk: MARGIN_TOP_RENK, item_height: ITEM_HEIGHT, item_width: ITEM_WIDTH })
            }
        }
        this.setState({ colors });
    }

    clickEvent() {
        this.props.clickEvent()
    }   

    render() {
        var colors = [...this.state.colors]
        //dikey scroll tüm renkler view's
        const listViews = this.state.colors.map((item, i) => {
            return <TouchableOpacity key={i}
                ref={ref => this.view = ref}
                onPress={() => {
                    this.tiklanma(i), this.hareket(), this.fillingTemp()
                }}>
                <Animated.View onTouchStart={(e) => { this.setState({ y: e.nativeEvent.pageY }) }} style={{
                    width: item.item_width,
                    height: item.item_height,
                    backgroundColor: item.renk,
                    alignItems: 'center',
                    borderRadius: 12,
                    marginTop: item.margin_top_renk,
                    marginBottom: item.margin_bottom_renk,
                }}>
                    <Animated.Text style={{ fontSize: TITLE_SIZE, fontWeight: 'bold' }}>{item.title}</Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        })

        //yatay scroll view's opacity değeri
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
                        backgroundColor: this.state.silinen[0].renk,
                        alignItems: 'center',
                        borderRadius: 12,
                        marginTop: 15,
                        marginBottom: 8 * (colors.length), //colors'un uzunluğu ile çarptım, detay renkleri colors ile kesişmesin diye
                        marginLeft: 23
                    }}>
                    <Animated.Text style={{ fontSize: 50, fontWeight: 'bold' }}>{this.state.silinen[0].title}</Animated.Text>
                    <Animated.Text style={{ fontSize: 20 }}>{this.state.silinen[0].description}</Animated.Text>
                    <TouchableOpacity onPress={() => { this.clickEvent() }} style={{ height: 30, backgroundColor: '#E3432A' }}><Animated.Text style={{ fontSize: 20 }}>Press Me</Animated.Text></TouchableOpacity>
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
                {movingView}
            </Animated.View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A3D357',
        width: 300,
        marginHorizontal: 50,
        marginTop: 225,
        marginBottom: 190,
        alignItems: 'center',
        borderRadius: 12
    }
})

