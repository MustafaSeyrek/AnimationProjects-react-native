import React, { Component } from 'react';
import { Alert, TouchableOpacity, Animated, View, Text } from "react-native";

/*import Dondur from './components/Dondur';
import DondurDurdur from './components/DondurDurdur';//döndür ve durdur butonları var
import StateKullanimi from './components/StateKullanimi';//sayıyı artıp azaltan butonlar
import CiftYon from './components/CiftYon';//butonlara göre yönü değişen hareket
import TimingKullanimi2 from './components/TimingKullanimi2';//timing'in dönme haricindeki örnekleri
import SpringKullanimi from './components/SpringKullanimi'; //yay hareketi
import ParalelFonksiyonuKullanimi from './components/ParalelFonksiyonuKullanimi';//aynı anda farklı animasyonları çalıştırma durumu, süresi biten biter
import SequenceKullanimi from './components/SequenceKullanimi'; //sırayla çalışan animasyon örneği, biri bitmeden sonraki çalışmaz
import StaggerKullanimi from './components/StaggerKullanimi'; //ardışık gecikmeyle sırayla ve paralel olarak başlayan animasyon örneği

import MyView from './components/MyView';
import MyViewDetails from './components/MyViewDetails';
import Yeni from './components/Yeni';
import Colors from './components/son/Colors';
import Son from './components/son/Son';
import RootNavigator from './components/son/RootNavigator';
import Son2 from './components/Son2/Son2';*/

//import MyAnimatedCards from './components/Son2/MyAnimatedCards'
import DinamikDeneme from './components/Son2/DinamikDeneme';

const data = [
  { title: 'TITLE1', description: 'DESCRIPTION1' },
  { title: 'TITLE2', description: 'DESCRIPTION2' },
  { title: 'TITLE3', description: 'DESCRIPTION3' },
  { title: 'TITLE4', description: 'DESCRIPTION4' },
  { title: 'TITLE5', description: 'DESCRIPTION5' },
  { title: 'TITLE6', description: 'DESCRIPTION6' },
  
]
/*var cardDesign = -10;
var cardHeight = 30;
var cardWidth = 100;
var upHeight = 200;*/
export default class App extends Component {

  handleClick = () => {
    Alert.alert("Butona tıklandı!");
  }


  render() {
    var renk = '#686B63'
    const listViews = data.map((item, i) => {
      if (i % 2 == 1)
        renk = '#686B63'
      else
        renk = '#DDE1D6'
      return <View style={{
        width: 250,
        height: 50,
        backgroundColor: renk,
        alignItems: 'center',
        borderRadius: 12,

      }}>
        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{item.title}</Text>
      </View>

    })
    return (
      //<StateKullanimi />
      //<DondurDurdur />      
      //<CiftYon />
      // <TimingKullanimi2 />
      //<SpringKullanimi />
      //<ParalelFonksiyonuKullanimi />
      // <SequenceKullanimi />
      //<StaggerKullanimi />
      //<MyView />      
      //<Colors />
      //<Son />

      // <Yeni /> //animasyonlu
      //<RootNavigator /> //shared kullanılmış hali

      //<Son2 title="TITLE1" description="DESC1" />

      /* <MyAnimatedCards
         data={data}
         clickEvent={this.handleClick} ></MyAnimatedCards>
     );*/
      <DinamikDeneme
        renderItem={listViews}
      //cardDesign={cardDesign}
      //cardHeight={cardHeight}
      // cardWidth={cardWidth}
      //upHeight={upHeight}
      ></DinamikDeneme>
    );
  }



}


