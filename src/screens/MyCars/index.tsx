import React,{ useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';
import { useTheme } from 'styled-components';

import {
 Container,
 Header,
 Title,
 SubTitle
} from './styles';

export function MyCars(){
const[ cars, setCars] = useState<CarDTO[]>([]);
const [loading, setLoading] = useState(true);

const navigation = useNavigation();
const theme = useTheme();

function handleGoBack() {
  navigation.goBack();
}


useEffect(() => {
  async function fetchCars() {
    try {

      const response = await api.get('schedules_byuser?user_id=1');
      console.log(response.data);

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

  </Container>
  );
}