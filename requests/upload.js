import axios from "axios";


export const uploadImages = asunc(formData) => {
    const { data } = await axios.post("/api/cloudinary", formData, {
        headers: {
            "content-type": "multipart/form-data",
        },
    });
    return data;
}