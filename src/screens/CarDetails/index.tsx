import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Acessory } from '../../components/Acessory';
import { BackButton } from '../../components/BackButton';
import { ImageSilder } from '../../components/ImageSilder';
import { Button } from '../../components/Button';

import  speedSvg  from '../../assets/speed.svg';
import  acelerationSvg  from '../../assets/acceleration.svg';
import  forceSvg  from '../../assets/force.svg';
import  gasolineSvg  from '../../assets/gasoline.svg';
import  exchangeSvg  from '../../assets/exchange.svg';
import  peopleSvg  from '../../assets/people.svg';


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
 Acessories,
 Footer
} from './styles';



export function CarDetails(){
const navigation = useNavigation();

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
        <ImageSilder imagesUrl={['https://res.cloudinary.com/didxdzbfe/image/upload/v1629899280/5a20dabd2a58c6.5157496215121025891735_jnwd6d.png']} />
    </CarImages>

    <Content>
        <Details>
            <Description>
                <Brand>Lamborghini</Brand>
                <Name>Huracan</Name>
            </Description>

            <Rent>
              <Period>Ao dia</Period>
              <Price>R$ 580</Price>
            </Rent>
        </Details>

        <Acessories>
          <Acessory name="380Km/h" icon={speedSvg} />
          <Acessory name="3.2s" icon={acelerationSvg} />
          <Acessory name="800 HP" icon={forceSvg} />
          <Acessory name="Gasolina" icon={gasolineSvg} />
          <Acessory name="Auto" icon={exchangeSvg} />
          <Acessory name="2 Pessoas" icon={peopleSvg} />

        </Acessories>


        <About>
        Este é automóvel desportivo. Surgiu do lendário touro de lide indultado
         na praça Real Maestranza de Sevilla.
         É um belíssimo carro para quem gosta de acelerar.
        </About>

    </Content>

      <Footer>
      <Button title="Escolher período do aluguel"  onPress={handleConfirmRental} />
      </Footer>

  </Container>
  );
}