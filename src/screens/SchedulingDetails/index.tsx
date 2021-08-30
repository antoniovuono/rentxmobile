import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

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
 Acessories,
 Footer,
 RentalPeriod,
 CalendarIcon,
 DateInfo,
 DateTitle,
 DateValue,
 RentalPrice,
 RentalPriceLabel,
 RentalPriceDetails,
 RentalPriceQuota,
 RentalPriceTotal,

} from './styles';




export function SchedulingDetails(){
const theme = useTheme();
const navigation = useNavigation();

function handleConfirmRental() {
  navigation.navigate("SchedulingComplete");
}

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

        <Acessories>
          <Acessory name="380Km/h" icon={speedSvg} />
          <Acessory name="3.2s" icon={acelerationSvg} />
          <Acessory name="800 HP" icon={forceSvg} />
          <Acessory name="Gasolina" icon={gasolineSvg} />
          <Acessory name="Auto" icon={exchangeSvg} />
          <Acessory name="2 Pessoas" icon={peopleSvg} />
        </Acessories>

        <RentalPeriod>
          <CalendarIcon>
                    <Feather
                      name="calendar"
                      size={RFValue(24)}
                      color={theme.colors.shape}
                    />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>

            <Feather
                      name="chevron-right"
                      size={RFValue(10)}
                      color={theme.colors.text}
                    />

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>
        
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>

          <RentalPriceDetails>
             <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
             <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
    
    </Content>

      <Footer>
      <Button title="Alugar agora" color={theme.colors.success} onPress={handleConfirmRental} />
      </Footer>

  </Container>
  );
}