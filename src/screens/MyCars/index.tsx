import React,{ useState, useEffect } from 'react';
import { StatusBar, FlatList } from 'react-native';

import { BackButton } from '../../components/BackButton';
import { Cars } from '../../components/Cars';

import { useNavigation } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';
import { useTheme } from 'styled-components';

import {
 Container,
 Header,
 Title,
 SubTitle,
 Content,
 Appointments,
 AppointmentsTitle,
 AppointmentsQuantity,
} from './styles';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
}


export function MyCars(){
const[ cars, setCars] = useState<CarProps[]>([]);
const [loading, setLoading] = useState(true);

const navigation = useNavigation();
const theme = useTheme();

function handleGoBack() {
  navigation.goBack();
}


useEffect(() => {
  async function fetchCars() {
    try {

      const response = await api.get('schedules_byuser?user_id=2');

      setCars(response.data);

    } catch(error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  fetchCars();

}, []);

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
            Seus agendamentos, {`\n`}
            estão aqui. 
            </Title>

            <SubTitle>
              Conforto, segurança e praticidade
            </SubTitle>
        </Header>

      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>05</AppointmentsQuantity>
        </Appointments>

        <FlatList 
        
          data={cars}
          keyExtractor={ item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
               <Cars data={item.car} />
            )} 
        />
        
      </Content>

  </Container>
  );
}