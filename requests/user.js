import axios from 'axios';
export const saveCart = async (cart) => {
    try {
        const { data } = await axios.post('/api/user/saveCart', {
            cart,
        });
        return data;

    } catch (error) {
        return response.data.error.message;

    }
}
export const getCart = async () => {
    try {
        const { data } = await axios.get(`/api/user/getcart`);
        return data;

    } catch (error) {
        return response.data.error.message;

    }
}
export const saveAddress = async (address) => {
    try {
        console.log("------------address", address);
        const { data } = await axios.post('/api/user/manageAddress', {
            address
        });
        console.log("------------data30", data);
        return data;

    } catch (error) {
        return response.data.error.message;

    }
}
export const changeActiveAddress = async (id) => {
    try {
        console.log("------------id", address);
        const { data } = await axios.put('/api/user/manageAddress', {
            id
        });
        console.log("------------data44", data);
        return data;

    } catch (error) {
        return response.data.error.message;

    }
}

export const deleteAddress = async (id) => {
    try {
        console.log("------------deleteid", address);
        const { data } = await axios.delete('/api/user/manageAddress', {
            date: { id },
        });
        console.log("------------deletedata59", data);
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
