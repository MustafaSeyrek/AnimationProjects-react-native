import React, { Component } from 'react';
import { StyleSheet, Animated, View, TouchableOpacity, ScrollView, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MyViewDetails from './MyViewDetails';

//görünümle ilgili sayısal değerler
const MARGIN_VERTICAL = 15;
const ITEM_WIDTH = 250;
const ITEM_HEIGHT = 100;
const SCROLL_VALUE = (2 * MARGIN_VERTICAL) + ITEM_HEIGHT;

const colors = [
    'green',
    'blue',
    'red',
    'orange',
    'yellow',
    'purple'
]

class MyView extends Component {

    constructor() {
        super()
        this.animValue = new Animated.Value(0)
    }

    static navigationOptions = {
        title: 'Colors',
        headerTitleStyle: {
            textAlign: 'center'
        }
    }

    render() {
        const listViews = colors.map((item, i) => {

            const inputRange = [-1, 0, SCROLL_VALUE * i, SCROLL_VALUE * (i + 2)] //kendindeyken de output 1 ama daha index+2 olduğunda -1 olur output
            const opacityInputRange = [-1, 0, SCROLL_VALUE * i, SCROLL_VALUE * (i + 0.5)] //burada da index+0.5 olduğunda output 0 olur. Yani üsttekinden daha önce opacity devreye girer
            //-1 ve 0 da işlem yapılmıyor output 1 olarak kalır
            //index ile çarpılan değer öğe yüksekliği : 130 olan kısımdır
            //3.parametre animasyonun tetiklendiği kısım, yani öğe'nin size'ına eriştiğinde
            //son parametre ise animasyonun biteceği değerdir. Burada da ikinci öğe üstteki sınıra erişiyor
            //ilk değerin -1 ikincinin 0 olması soldan sağa bir doğrusal hareket olduğunu blirtmek içindir
            //extrapolate clamb değeri eklenebilir interpolate içerisine bu, değeri aşsa bile sabit kal demektir. input rangenin son değerini aşarsa outputun son değerinde sabit kal demektir.

            //bu listelerde sadece yukarı çıkarken animasyonumuz var, sebebi ekranda sadece 1 eleman görünmemesi
            //çünkü alttaki elemanlar saçma görünür 
            const scale = this.animValue.interpolate({
                inputRange,
                outputRange: [1, 1, 1, -1]
            })
            const opacity = this.animValue.interpolate({
                inputRange: opacityInputRange,
                outputRange: [1, 1, 1, 0]
            })
            const rotateX = this.animValue.interpolate({
                inputRange: opacityInputRange,
                outputRange: ['0deg', '0deg', '0deg', '85deg']
            })
            //sayfa geçişi ve değer gönderme
            return <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate("MyViewDetailsScreen", { sentColor: colors[i] })}>
                <Animated.View style={{
                    width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                    marginVertical: MARGIN_VERTICAL,
                    backgroundColor: item,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                    transform: [{ perspective: 450 }, { scale }, { rotateX }],
                    opacity,

                }}>
                    <Text style={{ color: 'white' }}>{item}</Text>
                </Animated.View>
            </TouchableOpacity>
        })
        return (
            <Animated.View style={styles.container}>

                <Animated.ScrollView showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.animValue } } }], //contentoffset ile kaydırma değeri başlangıcı ayarlanır, şu kadar alan gidince başlat demek yani
                        { useNativeDriver: true }
                    )}>
                    {listViews}
                </Animated.ScrollView>

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

//createStackNavigator sayesinde sayfalar stack içerisine alınır, yeni gidilen sayfa stack'a eklenir
const AppNavigator = createStackNavigator({
    MyViewScreen: {
        screen: MyView
    },
    MyViewDetailsScreen: {
        screen: MyViewDetails
    }
})
export default createAppContainer(AppNavigator);