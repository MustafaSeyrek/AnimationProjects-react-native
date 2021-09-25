import React, { Component } from 'react';
import { StyleSheet, Animated, TouchableOpacity, Easing, Dimensions } from 'react-native';

const WIDTH_SCREEN = Dimensions.get('window').width;
const HEIGHT_SCREEN = Dimensions.get('window').height;
var horizontalView; //yataydaki view
var temp = [] //tiklanan viewdan 3 tane tutulan dizi
var movingView; //hareket eden view
//hareket eden view'ın animasyonda kullanılacak değişkenleri
var opacityMovingView;
var marginTopMovingView;
var heightMovingView;

export default class DinamikDeneme extends Component {
    constructor() {
        super()
        this.animValue = new Animated.Value(0)
        this.state = {
            renderItems: [], //gelen view'lar burada tutuluyor            
            viewHeight: 0, //view height değerleri
            viewHeightHorizontal: 0,
            y: 0, //tıklanınca kordinat atanan değişken
            clickedElement: [],
            heights: [],
            heightsTemp: [],
            widths: [],
            widthsTemp: [],
            opacities: [],
            bottomValue: 40,
            flag: true,
        }
    }

    verticalClick(index, itemSize) {
        this.myScroll.scrollTo({ x: 0, y: 0, animated: true }); //yatay scroll poziyon sıfırlama
        var bottomValue = this.state.bottomValue;
        this.setState({ bottomValue: bottomValue / 2 })
        this.setState({ flag: false })
        //tıklananı sıfırlama
        var heights = [...this.state.heights]
        var heightsTemp = [...this.state.heightsTemp]
        var widths = [...this.state.widths]
        var widthsTemp = [...this.state.widthsTemp]
        var opacities = [...this.state.opacities]
        widths[index] = 0;
        opacities[index] = 0;
        for (var i = 0; i < heights.length; i++) {
            if (i != index) {
                heights[i] = heightsTemp[i];
                widths[i] = widthsTemp[i];
                opacities[i] = 1
            }
        }
        this.setState({ heights })
        this.setState({ widths })
        this.setState({ opacities })
        //tiklanan elamanı aldık
        var clickedElement = [...this.state.clickedElement];
        clickedElement[0] = this.props.renderItem[index];
        //temp içerisinin doldurulması
        temp[0] = this.props.renderItem[index];
        temp[1] = this.props.renderItem[index];
        temp[2] = this.props.renderItem[index];
        this.setState({ clickedElement });
        //hareket eden view
        marginTopMovingView = this.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [(this.state.y / 2), 50]
        })
        heightMovingView = this.animValue.interpolate({
            inputRange: [0, 0.3, 0.9, 1],
            outputRange: [this.state.viewHeight, this.state.viewHeight, this.state.viewHeight, 0]
        })
        opacityMovingView = this.animValue.interpolate({
            inputRange: [0, 0.3, 0.9, 1],
            outputRange: [1, 1, 1, 0]
        })
        movingView = <Animated.View style={{
            marginTop: marginTopMovingView,
            position: 'absolute',
            height: heightMovingView,
            opacity: opacityMovingView
        }}>
            {clickedElement[0]}
        </Animated.View>
    }

    horizontalClick(itemSize) {
        this.myScroll.scrollTo({ x: 0, y: 0, animated: true });
        var bottomValue = this.state.bottomValue;
        this.setState({ bottomValue: bottomValue * 2 })
        this.setState({ flag: true })
        var heights = [...this.state.heights]
        var heightsTemp = [...this.state.heightsTemp]
        var widths = [...this.state.widths]
        var opacities = [...this.state.opacities]
        var widthsTemp = [...this.state.widthsTemp]
        for (var i = 0; i < heights.length; i++) {
            heights[i] = heightsTemp[i];
            widths[i] = widthsTemp[i];
            opacities[i] = 1
        }
        this.setState({ heights });
        this.setState({ widths })
        this.setState({ opacities })
        //hareket eden view
        marginTopMovingView = this.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [50, (this.state.y / 2) - 15]
        })
        heightMovingView = this.animValue.interpolate({
            inputRange: [0, 0.3, 0.9, 1],
            outputRange: [itemSize, itemSize, itemSize, 0]
        })
        opacityMovingView = this.animValue.interpolate({
            inputRange: [0, 0.3, 0.9, 1],
            outputRange: [1, 1, 1, 0]
        })
        movingView = <Animated.View style={{
            marginTop: marginTopMovingView,
            position: 'absolute',
            height: heightMovingView,
            opacity: opacityMovingView
        }}>
            {this.state.clickedElement[0]}
        </Animated.View>
        this.setState(clickedElement = [])
        temp = []
    }

    componentWillMount() {
        var renderItems = [...this.state.renderItems]
        var heights = [...this.state.heights]
        var heightsTemp = [...this.state.heightsTemp]
        var widths = [...this.state.widths]
        var widthsTemp = [...this.state.widthsTemp]
        var opacities = [...this.state.opacities]
        for (var i = 0; i < this.props.renderItem.length; i++) {
            renderItems[i] = this.props.renderItem[i];
            heights[i] = this.props.renderItem[i].height;
            heightsTemp[i] = this.props.renderItem[i].height;
            widths[i] = this.props.renderItem[i].width;
            widthsTemp[i] = this.props.renderItem[i].width;
            opacities[i] = 1
        }
        this.setState({ heights })
        this.setState({ heightsTemp })
        this.setState({ widths })
        this.setState({ widthsTemp })
        this.setState({ renderItems })
        this.setState({ opacities })
    }
    move() {
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
    render() {
        //dikey scroll 
        const verticalView = this.props.renderItem.map((item, i) => {
            return <TouchableOpacity key={i} onPress={() => {
                if (this.state.flag == true) { this.verticalClick(i, this.state.viewHeight), this.move() }
                else { this.horizontalClick(this.state.viewHeightHorizontal), this.move() }
            }}>
                <Animated.View onTouchStart={(e) => { this.setState({ y: e.nativeEvent.pageY }) }}
                    onLayout={(event) => {
                        this.setState({ viewHeight: event.nativeEvent.layout.height })
                    }} style={{
                        height: this.state.heights[i], width: this.state.widths[i],
                        opacity: this.state.opacities[i],
                        marginBottom: this.state.bottomValue - this.state.viewHeight,
                    }}>
                    {item}
                </Animated.View>
            </TouchableOpacity>
        })
        //yatay scroll view's opacity değeri
        const opacity = this.animValue.interpolate({
            inputRange: [0, 0.7, 0.8, 0.9, 1],
            outputRange: [0, 0, 0, 0, 1]
        })
        //yatay scrollda görünecek elemanlar
        horizontalView = temp.map((item, i) => {
            return <TouchableOpacity key={i} activeOpacity={0.8}
                onPress={() => { this.horizontalClick(this.state.viewHeightHorizontal), this.move() }}>
                <Animated.View
                    onLayout={(event) => {
                        this.setState({ viewHeightHorizontal: event.nativeEvent.layout.height })
                    }}
                    style={{
                        marginHorizontal: 24,
                        marginBottom: (this.state.viewHeightHorizontal * 3) + (this.state.viewHeight * 3) + (this.state.renderItems.length * this.state.renderItems.length),//(this.state.renderItems.length)*(this.state.renderItems.length),
                        opacity,
                        marginTop: 50,
                    }}>
                    {item}
                </Animated.View>
            </TouchableOpacity>
        })
        return (
            <Animated.View style={styles.container} >
                <Animated.ScrollView ref={(ref) => this.myScroll = ref} horizontal showsHorizontalScrollIndicator={false}>
                    {horizontalView}
                </Animated.ScrollView>
                <Animated.ScrollView showsVerticalScrollIndicator={false}>
                    {verticalView}
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
        width: '72.9166666666%',
        marginHorizontal: '12.1527777777%',
        marginTop: HEIGHT_SCREEN * 27.4199145250 / 100,
        marginBottom: HEIGHT_SCREEN * 23.1545944878 / 100,
        alignItems: 'center',
        borderRadius: 12
    }
})