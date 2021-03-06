import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import { format } from 'date-fns';
import Toast from 'react-native-toast-message';
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { getPlatformDate } from '../../utils/getPlataformDate';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSilder } from '../../components/ImageSilder';
import { Button } from '../../components/Button';

import { getAccesoryIcon } from '../../utils/getAccesoryIcon';

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
    Accessories,
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

interface Params {
    car: CarDTO;
    dates: string[];
}

interface RentalsPeriod {
    start: string;
    end: string;
}

export function SchedulingDetails() {
    const [loading, setLoading] = useState(false);
    const [rentalPeriod, setRentalPeriod] = useState<RentalsPeriod>(
        {} as RentalPeriod,
    );

    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const { car, dates } = route.params as Params;

    const rentalTotal = Number(dates.length * car.price);

    function handleGoBack() {
        navigation.goBack();
    }

    async function handleConfirmRental() {
        setLoading(true);

        const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

        const unavailable_dates = [
            ...schedulesByCar.data.unavailable_dates,
            ...dates,
        ];

        await api.post('schedules_byuser', {
            user_id: 1,
            car,
            startDate: format(
                getPlatformDate(new Date(dates[0])),
                'dd/MM/yyyy',
            ),
            endDate: format(
                getPlatformDate(new Date(dates[dates.length - 1])),
                'dd/MM/yyyy',
            ),
        });

        await api
            .put(`/schedules_bycars/${car.id}`, {
                id: car.id,
                unavailable_dates,
            })
            .then(() => {
                navigation.navigate('Confirmation', {
                    nextScreenRoute: 'Home',
                    title: 'Carro alugado!',
                    message: `Agora voc?? s?? precisa ir\nat?? a concession??ria da RENTX\npegar o seu autom??vel.`,
                });
            })
            .catch(() => {
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao agendar',
                    text2: 'N??o foi poss??vel confirmar o agendamento!',
                });
                setLoading(false);
            });
    }

    useEffect(() => {
        setRentalPeriod({
            start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            end: format(
                getPlatformDate(new Date(dates[dates.length - 1])),
                'dd/MM/yyyy',
            ),
        });
    }, []);

    return (
        <Container>
            <Header>
                <BackButton
                    onPress={handleGoBack}
                    hitSlop={{
                        left: 20,
                        top: 20,
                        bottom: 20,
                        right: 20,
                    }}
                />
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
                        <Period>{car.period}</Period>
                        <Price>R$ {car.price}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {car.accessories.map(accessory => (
                        <Accessory
                            key={accessory.type}
                            name={accessory.name}
                            icon={getAccesoryIcon(accessory.type)}
                        />
                    ))}
                </Accessories>

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
                        <DateValue>{rentalPeriod.start}</DateValue>
                    </DateInfo>

                    <Feather
                        name="chevron-right"
                        size={RFValue(10)}
                        color={theme.colors.text}
                    />

                    <DateInfo>
                        <DateTitle>AT??</DateTitle>
                        <DateValue>{rentalPeriod.end}</DateValue>
                    </DateInfo>
                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>Total</RentalPriceLabel>

                    <RentalPriceDetails>
                        <RentalPriceQuota>
                            R$ {car.price} x{dates.length} di??rias
                        </RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentalTotal}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>

            <Footer>
                <Button
                    title="Alugar agora"
                    color={theme.colors.success}
                    onPress={handleConfirmRental}
                    enabled={!loading}
                    loading={loading}
                />
            </Footer>
        </Container>
    );
}
