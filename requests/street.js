import axios from 'axios';
export const getStreets = async (city, street) => {
    try {
        if(city && street) {
            const { data } = await axios.get(`/api/cities/${city.object_name}/${street}`);
            return data.streets;
        }
        else return [];
       

    } catch (error) {
        return response.data.error.message;

    }
}

