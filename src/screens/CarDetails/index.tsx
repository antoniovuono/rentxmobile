import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSilder } from '../../components/ImageSilder';
import { Button } from '../../components/Button';

import { getAccesoryIcon } from '../../utils/getAccesoryIcon';

import { CarDTO } from '../../dtos/CarDTO';

import {
 Container,
 Header,
 CarImages,
 Details,
 Description,
 Brand,
 Name,
 Rent,
 Period,
 Price,
 About,
 Accessories,
 Footer
} from './styles';

interface Params {
  car: CarDTO;
}

export function CarDetails(){
const navigation = useNavigation();
const route = useRoute();
const { car } = route.params as Params;

const scrollY = useSharedValue(0);
const scrollHandler = useAnimatedScrollHandler(event => {
  scrollY.value = event.contentOffset.y;
  console.log(event.contentOffset.y);
});

const headerStyleAnimation = useAnimatedStyle(() => {
  return {
    height: interpolate(
      scrollY.value,
      [0,200],
      [200, 70],
      Extrapolate.CLAMP
    )
  }
});

function handleConfirmRental() {
  navigation.navigate("Scheduling", {
    car
  });
}

function handleGoBack() {
  navigation.goBack();
}

return (
  <Container> 
    <StatusBar
      barStyle="dark-content"
      translucent
      backgroundColor="transparent"
    />

    <Animated.View
      style={[headerStyleAnimation]}
    >
    <Header>
      <BackButton onPress={handleGoBack} />
    </Header>

    <CarImages>
        <ImageSilder imagesUrl={car.photos} />
    </CarImages>
    </Animated.View>

    <Animated.ScrollView
    contentContainerStyle={{
      paddingHorizontal: 24,
      paddingTop: getStatusBarHeight(),
    }}
    showsVerticalScrollIndicator={false}
    onScroll={scrollHandler}
    >

        <Details>
            <Description>
                <Brand>{car.brand}</Brand>
                <Name>{car.name}</Name>
            </Description>

            <Rent>
              <Period>{car.rent.period}</Period>
              <Price>R$ {car.rent.price}</Price>
            </Rent>
        </Details>

        <Accessories>
          {
            
            car.accessories.map(accessory => (
              <Accessory

              key={accessory.type}
              name={accessory.name}
              icon={getAccesoryIcon(accessory.type)}
              
              />
            ))
            
          }

        </Accessories>


        <About> {car.about} </About>

    </Animated.ScrollView>

      <Footer>
      <Button title="Escolher período do aluguel"  onPress={handleConfirmRental} />
      </Footer>

  </Container>
  );
}