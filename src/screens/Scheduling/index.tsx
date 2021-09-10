import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar, Alert } from 'react-native';
import { useTheme } from 'styled-components';

import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlataformDate';
import { CarDTO } from '../../dtos/CarDTO';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar, DayProps, generateInterval, MarkedDateProps } from '../../components/Calendar';

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


interface RentalPeriod {
    startFormatted: string;
    endFormatted: string;
}

interface Params {
    car: CarDTO;
  }

export function Scheduling(){
const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
const [markedDate, setMarkedDate] = useState<MarkedDateProps>({} as MarkedDateProps);
const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

const theme = useTheme();
const navigation = useNavigation();
const route = useRoute();
const { car } = route.params as Params;

function handleGoBack() {
    navigation.goBack();
}

function handleConfirmRental() {

    if(!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
        Alert.alert('Selecione o período de aluguel', 'É preciso selecionar uma data para realizar um agendamento.');
    } else {
        navigation.navigate("SchedulingDetails", {
            car,
            dates: Object.keys(markedDate)
        });
    }
    
}

function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if(start.timestamp > end.timestamp) {
        start = end;
        end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDate(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
        startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
        endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    });
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
                    <DateValue selected={!!rentalPeriod.startFormatted}>
                        {rentalPeriod.startFormatted}
                    </DateValue>
                </DateInfo>

                <ArrorSvg />

                <DateInfo>
                    <DateTitle>Até</DateTitle>
                    <DateValue selected={!!rentalPeriod.endFormatted}>
                        {rentalPeriod.endFormatted}
                    </DateValue>
                </DateInfo>
            </RentalPeriod>            

        </Header>

        <Content>
            <Calendar 
            
                markedDates={markedDate}
                onDayPress={handleChangeDate}
            
            />

        </Content>


        <Footer>
            <Button title="Confirmar" onPress={handleConfirmRental}/>
        </Footer>


  </Container>
  );
}