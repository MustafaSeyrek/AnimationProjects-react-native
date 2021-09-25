import React, { Component } from 'react'
import { View, Text, Animated, StyleSheet } from 'react-native'


//görünümle ilgili sayısal değerler
const MARGIN_VERTICAL = 45;
const MARGIN_HORIZONTAL = 30;
const ITEM_WIDTH = 300;
const ITEM_HEIGHT = 150;
const SCROLL_VALUE = (2 * MARGIN_HORIZONTAL) + ITEM_WIDTH;

//renklerin ayrıntılarının tanımlanması
const greenDetails = ['darkgreen', 'lawngreen', 'forestgreen', 'palegreen', 'seagreen'];
const blueDetails = ['cadetblue', 'darkblue', 'skyblue', 'midnightblue', 'royalblue'];
const redDetails = ['darkred', 'indianred', '#F62217', '#F70D1A', '#F62817'];
const orangeDetails = ['darkorange', '#E56717', '#FF6700', '#FF5F1F', '#F88017'];
const yellowDetails = ['#E2F516', '#F9DB24', '#FFEF00', '#F5E216', '#FFDF00'];
const purpleDetails = ['rebeccapurple', '#550A35', '#810541', '#7D0541', '#7E354D']

var temp = [] //gelen değere göre renk ayrıntısı ataması yapılacak dizi


export default class MyViewDetails extends Component {
    constructor() {
        super()
        this.animValue = new Animated.Value(0)
    }

    static navigationOptions = {
        title: 'Color Details',
        headerTitleStyle: {
            textAlign: 'center'
        }
    }

    render() {
        //önceki sayfadan veri alma kısmı
        const { navigation } = this.props;
        const color = navigation.getParam('sentColor', 'renk gelmedi');

        //geçici diziye gelen veriye göre renk atama kısmı
        if (color == 'green') {
            temp = greenDetails;
        }
        else if (color == 'blue') {
            temp = blueDetails;
        }
        else if (color == 'red') {
            temp = redDetails;
        }
        else if (color == 'orange') {
            temp = orangeDetails;
        }
        else if (color == 'yellow') {
            temp = yellowDetails;
        }
        else if (color == 'purple') {
            temp = purpleDetails;
        }

        const colorDetails = temp.map((item, i) => {

            //i = 0 dan başlar
            const inputRange = [SCROLL_VALUE * (i - 1), SCROLL_VALUE * i, SCROLL_VALUE * (i + 1)]
            //i=1 için tani 2.sayfadaki eleman: 0,360,720 olur input. Öncesi, kendi ve bir sonraki.
            //Bir öncekinde 0.25 ol, kendine gelince 1 ol, bir sonrakine geçince tekrar 0.25 ol.
            const opacityInputRange = [SCROLL_VALUE * (i - 1), SCROLL_VALUE * i, SCROLL_VALUE * (i + 0.5)]
            const scale = this.animValue.interpolate({
                inputRange,
                outputRange: [0, 1, 0]
            })
            const opacity = this.animValue.interpolate({
                inputRange: opacityInputRange,
                outputRange: [0.5, 1, 0.5]
            })
            // - ve + dönüş yönleri farklı demek
            const rotateY = this.animValue.interpolate({
                inputRange: opacityInputRange,
                outputRange: ['-80deg', '0deg', '80deg']
            })


            return <Animated.View key={i} style={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                backgroundColor: item,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 12,
                marginHorizontal: MARGIN_HORIZONTAL,
                marginVertical: MARGIN_VERTICAL,
                transform: [{ perspective: 450 }, { scale }, { rotateY }],
                opacity
            }}>
                <Text style={{ color: 'white' }}>{item}</Text>

            </Animated.View>
        })
        return (
            <Animated.View style={styles.container}>
                <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event([{
                        nativeEvent: { contentOffset: { x: this.animValue } } //burada yatayda olduğu için x değeri ayarlandı
                    }],
                        { useNativeDriver: true })}>
                    {colorDetails}
                </Animated.ScrollView>
            </Animated.View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEE4E2',
        width: 350,
        marginHorizontal: 30,
        marginTop: 250,
        marginBottom: 250,
        alignItems: 'center',
        borderRadius: 12,
    }
})