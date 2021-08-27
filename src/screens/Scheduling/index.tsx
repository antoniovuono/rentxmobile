import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';

import ArrorSvg from '../../assets/arrow.svg';

import {
 Container,
 Header,
 Title,
 RentalPeriod,
 DateInfo,
 DateTitle,
 DateValue,
 Content,
 Footer,
} from './styles';


export function Scheduling(){
const theme = useTheme();

return (
  <Container> 

        <Header>
            <StatusBar 
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />

            <BackButton
            onPress={({}) => {}} 
            color={theme.colors.shape}
            />

            <Title>
            Escolha uma {`\n`}
            data de início e {`\n`}
            fim do aluguel
            </Title>

            <RentalPeriod>
                <DateInfo>
                    <DateTitle>De</DateTitle>
                    <DateValue selected={false}></DateValue>
                </DateInfo>

                <ArrorSvg />

                <DateInfo>
                    <DateTitle>Até</DateTitle>
                    <DateValue selected={false}>18/06/2021</DateValue>
                </DateInfo>
            </RentalPeriod>            

        </Header>

        <Content>

        </Content>


        <Footer>
            <Button title="Confirmar" color="" />
        </Footer>


  </Container>
  );
}