import axios from 'axios';
export const saveCart = async (cart) => {
    try {
        const { data } = await axios.post('/api/user/saveCart', {
            cart,
        });
        return data;

    } catch (error) {
        return error.response.data.message;

    }
}
export const getCart = async () => {
    try {
        const { data } = await axios.get(`/api/user/getcart`);
        return data;

    } catch (error) {
        return error.response.data.message;

    }
}
export const  saveAddress = async (address) => {
    try {
        const { data } = await axios.post('/api/user/manageAddress', {
            address
        });
        return data;

    } catch (error) {
        return error.response.data.message;

    }
}
export const changeActiveAddress = async (id) => {
    try {
        const { data } = await axios.put('/api/user/manageAddress', {
            id
        });
        return data;

    } catch (error) {
        return error.response.data.message;

    }
}

export const deleteAddress = async (id) => {
    try {
        const { data } = await axios.delete('/api/user/manageAddress', {
            date: { id },
        });
        return data;

    } catch (error) {
        return error.response.data.error.message;

    }
}
export const applyPromocode = async (promocode) => {
    try {
        const { data } = await axios.post('/api/user/applyPromocode', {
            promocode,
        });
        return data;
    } catch (error) {
        return error.response.data.message;;
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
        return error.response.data.message;

    }
}

export const saveWishList = async (wishList) => {
    try {
        const { data } = await axios.post('/api/user/saveWishList', {
            wishList,
        });
        return data;

    } catch (error) {
        return error.response.data.message;

    }
}
