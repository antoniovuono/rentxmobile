import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import Logo from '../../assets/logo.svg';
import { Cars } from '../../components/Cars';
import { Load } from '../../components/Load';

import {
 Container,
 Header,
 HeaderContent,
 TotalCars,
 CarsList 
} from './styles';

export function Home(){
const [ cars, setCars ] = useState<CarDTO[]>([]);
const [ loading, setIsLoading ] = useState(true);

const navigation = useNavigation();

const carData ={
  brand: 'audi',
  name: 'RS 5 Coupé',
  rent: {
    period: 'Ao dia',
    price: 120
  },
  thumbnail: 'https://www.pngkey.com/png/full/383-3833840_rs-5-coup-price-from-audi-rs5-png.png'
}

function handleCarDetails() {
  navigation.navigate("CarDetails");
}

useEffect(() => {

  async function fetchCars() {
      try {
        const response = await api.get('/cars');

        setCars(response.data);

      } catch (error) {
        console.log(error);
        } finally {
          setIsLoading(false);
        }
  }
  
  fetchCars();

}, []);




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

    { loading ? <Load /> : 

    <CarsList

    data={cars}
    keyExtractor={item => item.id}
    renderItem={({item}) => <Cars data={item} onPress={handleCarDetails} />}
    
    /> 
    } 


  </Container>
  );
}