import axios from "axios"
import { NextApiResponse, NextApiRequest } from "next";

const baseUrl = 'https://c8ad-187-19-91-113.ngrok.io';

type Restaurant = {
    id: string;
    name: string;
}

type GetRestaurantResponse = {
    restaurants: Restaurant[];
}

export default async function retrieveRestaurants (res: NextApiResponse, req: NextApiRequest) {
    try{
        const response = await axios.get(`${baseUrl}/restaurants/`);
        return res.json(response.data)
    }catch(err){
        console.log(err)
    }
}


// export async function geRestaurants(): Promise<GetRestaurantResponse> {
//     const {data, headers} = await axios.get(`${baseUrl}/restaurants`, {
//         params : {
            
//         }
//     })
// }