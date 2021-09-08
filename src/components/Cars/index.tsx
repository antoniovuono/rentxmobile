import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { CarDTO } from '../../dtos/CarDTO';

import GasolineSvg from "../../assets/gasoline.svg";

import { getAccesoryIcon } from '../../utils/getAccesoryIcon';

import {
 Container,
 Details,
 Brand,
 Name,
 About,
 Rent,
 Period,
 Price,
 Type,
 CarImage
} from './styles';



interface Props extends RectButtonProps {
   data: CarDTO;
}

export function Cars({ data, ...rest }: Props){
const MotorIcon = getAccesoryIcon(data.fuel_type);

return (
  <Container {...rest}> 

      <Details>

            <Brand>{data.brand}</Brand>
            <Name>{data.name}</Name>

            <About>
                <Rent>
                    <Period>{data.rent.period}</Period>
                    <Price>{`RS ${data.rent.price}`}</Price>
                </Rent>

                <Type>
                    <MotorIcon />
                </Type>
            </About>

      </Details>

      <CarImage 
      source={{ uri: data.thumbnail }}
      resizeMode="contain"
      />
  </Container>
  );
}