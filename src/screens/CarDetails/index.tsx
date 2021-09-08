import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

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
 Content,
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

function handleConfirmRental() {
  navigation.navigate("Scheduling");
}

function handleGoBack() {
  navigation.goBack();
}

return (
  <Container> 
    
    <Header>

      <BackButton onPress={handleGoBack} />

    </Header>

    <CarImages>
        <ImageSilder imagesUrl={car.photos} />
    </CarImages>

    <Content>
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

    </Content>

      <Footer>
      <Button title="Escolher período do aluguel"  onPress={handleConfirmRental} />
      </Footer>

  </Container>
  );
}