import axios from 'axios';
export const saveCart = async (cart, user_id) => {
    try {
        const { data } = await axios.post('/api/user/saveCart', {
            cart,
            user_id,
        });
        return data;

    } catch (error) {
        return response.data.error.message;

    }
}
export const getCart = async (user_id) => {
    try {
        const { data } = await axios.get(`/api/user/${user_id}/getcart`, {
            cart,
            user_id,
        });
        return data;

    } catch (error) {
        return response.data.error.message;

    }
}
export const saveAdress = async (address, user_id) => {
    try {
        const { data } = await axios.post('/api/user/saveAdress', {
            address,
            user_id,
        });
        return data;

    } catch (error) {
        return response.data.error.message;

    }
}

export const checkout = async (cart, user_id) => {
    try {
        const { data } = await axios.post('/api/user/checkout', {
            cart,
            user_id,
        });
        return data;

    } catch (error) {
        return response.data.error.message;

    }
}
