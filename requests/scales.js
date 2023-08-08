import axios from "axios";
export const getScales = async () => {
  try {
    const { data } = await axios.get(`/api/scales`);
    if (data && data.subCategories) {
      return data.subCategories;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};
