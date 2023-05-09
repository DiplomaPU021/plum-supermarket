import axios from 'axios';
export const getStreets = async (city, street) => {
    try {
        if (city && street) {
            const { data } = await axios.get(`/api/cities/${city.object_name}/${street}`);
            if (data && data.streets) {
                return data.streets;
            } else {
                return [];
            }
        }
    } catch (error) {
        return error.message;

    }
}

