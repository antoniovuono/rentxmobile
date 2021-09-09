import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

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
const navigation = useNavigation();

function handleGoBack() {
    navigation.goBack();
}

function handleConfirmRental() {
    navigation.navigate("SchedulingDetails");
}

return (
  <Container> 

        <Header>
            <StatusBar 
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />

            <BackButton
            onPress={handleGoBack} 
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

            <Calendar />

        </Content>


        <Footer>
            <Button title="Confirmar" onPress={handleConfirmRental}/>
        </Footer>


  </Container>
  );
}