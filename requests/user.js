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

export const saveWishList = async ({productId, size, image, color, code, style, mode}) => {
    try {
        // console.log("apiusersavewish",productId, size, image, color, code);
        const { data } = await axios.post('/api/user/wishlist', {
            productId, size, image, color, code, style, mode
        });
        return data;

    } catch (error) {
        return error.response.data.message;

    }
}

export const updateOneInWishList = async ({productId, size, image, color, code}) => {
    try {
        // console.log("apiuserupdatewish",productId);
        const { data } = await axios.put('/api/user/wishlist', {
            productId, size, image, color, code,
        });
        return data;

    } catch (error) {
        return error.response.data.message;

    }
}
export const deleteOneFromWishList = async ({productId, code}) => {
    try {
        //   console.log("apiuserdeletewish",productId, code);
        const { data } = await axios.put('/api/user/wishlist', {
            productId,
            code
        });
        return data;

    } catch (error) {
        return error.response.data.message;

    }
}
// export const updateProductReview = async(product_id, review) =>{
//     try {
//         console.log("UpdateProductReviewUser", product_id, JSON.parse(JSON.stringify(review)));
//         const { data } = await axios.post('/api/user/updateProductReview', {
//          product_id, review,
//         });
//         return data;

//     } catch (error) {
//         return error.response.data.message;

//     }
// }
