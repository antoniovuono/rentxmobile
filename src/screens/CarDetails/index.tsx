import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSilder } from '../../components/ImageSilder';

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
 About
} from './styles';

export function CarDetails(){
return (
  <Container> 
    
    <Header>

      <BackButton onPress={({}) => {}} />

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


        <About>
        Este é automóvel desportivo. Surgiu do lendário touro de lide indultado
         na praça Real Maestranza de Sevilla.
         É um belíssimo carro para quem gosta de acelerar.
        </About>

    </Content>

  </Container>
  );
}