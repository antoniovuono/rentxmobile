import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { Cars } from '../../components/Cars';

import {
 Container,
 Header,
 HeaderContent,
 TotalCars,
 CarsList 
} from './styles';

export function Home(){
const carData ={
  brand: 'audi',
  name: 'RS 5 Coupé',
  rent: {
    period: 'Ao dia',
    price: 120
  },
  thumbnail: 'https://www.pngkey.com/png/full/383-3833840_rs-5-coup-price-from-audi-rs5-png.png'
}


return (
  <Container> 
    <StatusBar
     barStyle="light-content"
     backgroundColor="transparent"
     translucent
     />

    <Header>
      <HeaderContent>
      <Logo 
      width={RFValue(108)} 
      height={RFValue(12)}
      />

      <TotalCars>
        Total de 12 carros
      </TotalCars>
      </HeaderContent>
    </Header>

    <CarsList

    data={[1,2,3,4,5,6,7,8]}
    keyExtractor={item => String(item)}
    renderItem={({item}) => <Cars data={carData}/>}
    
    />
    



  </Container>
  );
}