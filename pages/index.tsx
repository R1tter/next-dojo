import type { NextPage } from 'next'
import { ChangeEvent, useState } from 'react';
import { Flex, Input, Button, Stack } from '@chakra-ui/react'
import axios from 'axios';

const Home: NextPage = () => {
  const [name, setName] = useState('');

  const onChangeName = (e?: ChangeEvent<HTMLInputElement>) => {
    e?.preventDefault();
    setName(e?.target.value ?? "");    
  }

  const saveRestaurant = async () => {
    try {
      if (!name ) {
        alert('Por favor, informe o nome');
      }  else {

        const response = await axios.post("https://9407-189-76-133-124.ngrok.io/restaurants/", {name});
        alert(JSON.stringify(response.data))
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
    </Flex>
  )
}

export default Home
