import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSilder } from '../../components/ImageSilder';

import {
 Container,
 Header,
 CarImages
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

  </Container>
  );
}