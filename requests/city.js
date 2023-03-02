import axios from 'axios';
export const getCity = async (city) => {
    try {
        const { data } = await axios.get(`/api/cities/${city}`);
      
        // console.log("dataGetCity_>>>>>>>>>>>>>>>>>>>>>>",data.cities);
        return data.cities;

    } catch (error) {
        return response.data.error.message;

    }
}