import React,{ useState, useEffect } from 'react';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import {
 Container
} from './styles';

export function MyCars(){
const[ cars, setCars] = useState<CarDTO[]>([]);
const [loading, setLoading] = useState(true);


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

  </Container>
  );
}