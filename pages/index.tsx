import type { NextPage } from 'next'
import React, { ChangeEvent, useState, useEffect } from 'react';
import { Flex, Input, Button, Stack, List, Text } from '@chakra-ui/react'
import axios from 'axios';

const baseUrl = 'https://c8ad-187-19-91-113.ngrok.io';

interface IRestaurant {
  id: number; 
  name: string; 
}

interface IRestaurantProp {
  restaurants: IRestaurant[];
}
 


const Home: NextPage<IRestaurantProp> = ({restaurants}) => {
  const [name, setName] = useState('');
  const [restaurantsList, setRestaurants] = useState<IRestaurant[]>([]); 

  const onChangeName = (e?: ChangeEvent<HTMLInputElement>) => {
    e?.preventDefault();
    setName(e?.target.value ?? "");    
  }

  const saveRestaurant = async () => {
    try {
      if (!name ) {
        alert('Por favor, informe o nome');
      }  else {

        const response = await axios.post(baseUrl + "/restaurants/"
        , {name});
        setRestaurants(response.data)
      }
    } catch (e) {
      alert(e)
    }
  }

  return (
    <Flex justify="center" align="center" h="100vh">
      <Stack spacing="4">
        <Input placeholder="Name" value={name} onChange={onChangeName} />
        <Button onClick={saveRestaurant}>
          Save
        </Button>
      </Stack>
      <Flex>
        <List>
          { restaurantsList.map(restaurant => (
            <Text key={restaurant.id}> 
              {restaurant.name}
            </Text>
          )) }
        </List>
      </Flex>
    </Flex>
  )
}

export async function getStaticProps() {
  const response = await axios.get("/api/restaurants");
  return {
    props: {
      restaurants: response
    }
  }
}

export default Home;
