import SubCategory from "@/models/SubCategory";

const getOneById = async (id) => {
    const subCategory = await SubCategory.findById(id);
    return subCategory;
};
const getAll = async () => {
    const result = await SubCategory.find();
    return result;
}

const subCategoryService = {
    getOneById,
    getAll,
};

export default subCategoryService;