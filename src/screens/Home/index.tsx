import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import Logo from '../../assets/logo.svg';
import { Cars } from '../../components/Cars';
import { LoadAnimation } from '../../components/LoadAnimation';

import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarsList,
} from './styles';

export function Home() {
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setIsLoading] = useState(true);

    const navigation = useNavigation();

    function handleCarDetails(car: CarDTO) {
        navigation.navigate('CarDetails', { car });
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/cars');

                setCars(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCars();
    }, []);

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />

            <Header>
                <HeaderContent>
                    <Logo width={RFValue(108)} height={RFValue(12)} />

                    {!loading && (
                        <TotalCars>Total de {cars.length} carros</TotalCars>
                    )}
                </HeaderContent>
            </Header>

            {loading ? (
                <LoadAnimation />
            ) : (
                <CarsList
                    data={cars}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Cars
                            data={item}
                            onPress={() => handleCarDetails(item)}
                        />
                    )}
                />
            )}
        </Container>
    );
}
