import styles from "../../../../styles/products.module.scss";
import Layout from "../../../../components/admin/layout";
import db from "../../../../utils/db";
import { useState, useEffect } from "react";
import Product from "../../../../models/Product";
import Category from "../../../../models/Category";
import axios from "axios";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import SingularSelect from "../../../../components/admin/select/SingularSelect";
import SizesTable from "../../../../components/productPage/sizesTable";
import AdminInput from "../../../../components/inputs/adminInput";
import Images from "../../../../components/admin/createProduct/images";
import Colors from "../../../../components/admin/createProduct/colors";
import Sizes from "../../../../components/admin/createProduct/sizes";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import DotLoaderSpinner from "../../../../components/loaders/dotLoader";
import DialogModal from "../../../../components/dialogModal";
import { useDispatch, useSelector } from "react-redux";
import { showDialog, hideDialog } from "../../../../store/DialogSlice";
import Details from "../../../../components/admin/createProduct/details";
import { validateEditProduct } from "../../../../utils/validation";
import { uploadImages } from "../../../../requests/upload";
import dataURItoBlob from "../../../../utils/dataURItoBlob";
import GroupSubCategory from "../../../../models/GroupSubCategory";
import SubCategory from "../../../../models/SubCategory";
import { useRouter } from "next/router";

const animatedComponents = makeAnimated();

export default function EditProduct({
  product,
  style,
  categories,
  subCategories,
  groupSubCategories,
  subCategoriesProduct,
  groupSubCategoryProduct,
  categoryProduct,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [productToEdit, setProduct] = useState({
    name: product.name,
    description: product.description,
    brand: product.brand,
    category: categoryProduct._id,
    subCategories: subCategoriesProduct,
    groupSubCategory: groupSubCategoryProduct._id,
    details: product.details,
    reviews: product.reviews,
    refundPolicy: product.refundPolicy,
    rating: product.rating,
    numReviews: product.numReviews,
    images: product.images,
    color: product.subProducts[style].color,
    sizes: product.subProducts[style].sizes,
    discount: product.subProducts[style].discount,
    sold: product.subProducts[style].sold,
  });

  const [subs, setSubs] = useState(subCategoriesProduct);
  const [groupSub, setGroupSub] = useState(groupSubCategories);
  const [images, setImages] = useState([]);
  const [viewImages, setViewImages] = useState(
    product.subProducts[style].images.map((img) => img.url).slice(0, 5)
  );
  const [loading, setLoading] = useState(false);
  const [dataOptions, setDataOptions] = useState([]);
  const [dataSelectedOptions, setDataSelectedOptions] = useState([]);

  const changeSelectedOptions = () => {
    if (product.category._id == productToEdit.category) {
      setDataSelectedOptions(
        subCategoriesProduct.map((item) => {
          let label = `${item.name}`;
          let value = `${item._id}`;
          return {
            ...item,
            label,
            value,
            isFixed: false,
          };
        })
      );
    } else {
      setDataSelectedOptions([]);
    }
    setDataOptions(
      subs.map((item) => {
        let label = `${item.name}`;
        let value = `${item._id}`;
        return {
          ...item,
          label,
          value,
          isFixed: false,
        };
      })
    );
  };
  const getSubs = async () => {
    setLoading(true);
    setSubs(
      subCategories.filter((c) => c.parent == productToEdit.groupSubCategory)
    );
    changeSelectedOptions();
    setLoading(false);
  };
  useEffect(() => {
    const getGroupSub = async () => {
      setLoading(true);
      setGroupSub(
        groupSubCategories.filter((c) => c.parent == productToEdit.category)
      );
      setLoading(false);
    };
    getGroupSub();
    changeSelectedOptions();
  }, [productToEdit.category, changeSelectedOptions, groupSubCategories]);

  useEffect(() => {
    setLoading(true);
    getSubs();
    setLoading(false);
  }, [productToEdit.groupSubCategory, getSubs]);

  useEffect(() => {
    setLoading(true);
    changeSelectedOptions();
    setLoading(false);
  }, [subs, changeSelectedOptions]);

  const handleChange = (e) => {
    if (typeof e !== "undefined") {
      const { value, name } = e.target;
      setProduct({ ...productToEdit, [name]: value });
    }
  };
  const handleChangeSubCategory = (value) => {
    setDataSelectedOptions(value);
    setProduct({ ...productToEdit, subCategories: value });
  };

  const validate = Yup.object({
    name: Yup.string()
      .required("Please add a name")
      .min(10, "Product name must be between 10 and 300 characters")
      .max(300, "Product name must be between 10 and 300 characters"),
    brand: Yup.string().required("Please add a brand"),
    category: Yup.string().required("Please select a category"),
    description: Yup.string().required("Please write the description"),
    dataSelectedOptions: Yup.array().min(
      1,
      "Please select at least 1 subCategory"
    ),
    groupSubCategory: Yup.string()
      .transform((value) => {
        if (typeof value !== "string") {
          return "";
        }
        return value;
      })
      .required("Please select a group of subCategories"),
    color: Yup.object()
      .nullable()
      .transform((value) => {
        if (typeof value !== "object") {
          return null;
        }
        return value;
      })
      .required("Please add a color"),
    details: Yup.array()
      .of(
        Yup.object().shape({
          group: Yup.string(),
          fields: Yup.array()
            .min(1, "please add at least one field")
            .of(
              Yup.object()
                .shape({
                  name: Yup.string().required(),
                  value: Yup.string().required(),
                  isMain: Yup.boolean(),
                })
                .nullable()
            )
            .min(1, "Please add at least one field"),
        })
      )
      .min(1, "Please add at least one detail")
      .required("Please add details"),
  });

  const editProduct = async () => {
    let test = validateEditProduct(productToEdit, images);
    if (test == "valid") {
      editProductHandler();
    } else {
      dispatch(
        showDialog({
          header: "Будь ласка дотримуйтесь інструкцій",
          show: true,
          msgs: test,
        })
      );
    }
  };

  let uploaded_images = [];
  const editProductHandler = async () => {
    setLoading(true);
    if (images.length > 0) {
      let temp = images.map((img) => {
        return dataURItoBlob(img);
      });
      const path = "product images";
      let formData = new FormData();
      formData.append("path", path);
      temp.forEach((img) => {
        formData.append("file", img);
      });
      uploaded_images = await uploadImages(formData);
    }

    try {
      const { data } = await axios.put("/api/admin/product", {
        id: product._id,
        name: productToEdit.name,
        brand: productToEdit.brand,
        description: productToEdit.description,
        category: productToEdit.category,
        subCategories: productToEdit.subCategories.map((sb) => sb._id),
        details: productToEdit.details,
        refundPolicy: productToEdit.refundPolicy,
        images: uploaded_images,
        color: productToEdit.color,
        sizes: productToEdit.sizes,
        discount: productToEdit.discount,
        style,
      });
      setLoading(false);
      setTimeout(() => {
        toast.success(data.message);
      }, 1000);
      router.push("/admin/dashboard/product/all");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      router.push("/admin/dashboard/product/all");
    }
  };

  return (
    <Layout>
      {loading && <DotLoaderSpinner loading={loading} />}
      <div className={styles.header}>Редагувати продукт</div>
      <DialogModal />
      <Formik
        enableReinitialize
        initialValues={{
          name: productToEdit.name,
          brand: productToEdit.brand,
          description: productToEdit.description,
          category: productToEdit.category,
          groupSubCategory: productToEdit.groupSubCategory,
          discount: productToEdit.discount,
          color: productToEdit.color,
          images: productToEdit.images,
          details: productToEdit.details,
          imageInputFile: "",
          dataSelectedOptions,
          refundPolicy: productToEdit.refundPolicy,
        }}
        validationSchema={validate}
        onSubmit={() => {
          editProduct();
        }}
      >
        {(formik) => (
          <Form>
            <Images
              name="imagesInputFile"
              header="Фото продукту"
              text="Додати фото"
              photos={images}
              setImages={setImages}
              viewImages={viewImages}
            />
            <SingularSelect
              name="category"
              value={productToEdit.category}
              label="Category"
              data={categories}
              header="Виберіть категорію"
              handleChange={handleChange}
            />
            <SingularSelect
              name="groupSubCategory"
              value={productToEdit.groupSubCategory}
              label="GroupSubCategory"
              data={groupSub}
              header="Виберіть групу субкатегорій"
              handleChange={handleChange}
            />
            <div style={{ marginBottom: "1rem" }}>
              <Select
                isMulti
                name="dataSelectedOptions"
                value={dataSelectedOptions}
                onChange={handleChangeSubCategory}
                placeholder="Виберіть субкатегорії"
                components={animatedComponents}
                className={`${styles.select} ${
                  formik.touched && formik.errors && styles.error_select
                }`}
                classNamePrefix="Виберіть субкатегорії"
                options={dataOptions}
                isClearable={true}
              ></Select>
              {formik.touched && formik.errors && (
                <p className={styles.error_msg}>
                  <ErrorMessage name="dataSelectedOptions" />
                </p>
              )}
            </div>
            <div className={styles.header}>Базова інформація</div>
            <AdminInput
              type="text"
              label="Назва"
              name="name"
              placeholder="Введіть назву товару..."
              onChange={(e) => handleChange(e)}
            />
            <AdminInput
              type="textarea"
              rows="4"
              cols="50"
              label="Опис"
              name="description"
              placeholder="Напишіть опис товару, бажано в html"
              onChange={(e) => handleChange(e)}
            />
            <AdminInput
              type="text"
              label="Бренд"
              name="brand"
              placeholder="Введіть бренд..."
              onChange={(e) => handleChange(e)}
            />
            <AdminInput
              type="text"
              label="Знижка"
              name="discount"
              placeholder="Введіть розмір знижки..."
              onChange={(e) => handleChange(e)}
            />
            <Colors
              name="color"
              product={productToEdit}
              setProduct={setProduct}
              color={productToEdit.color}
            />
            <Sizes
              name="sizes"
              sizes={productToEdit.sizes}
              product={productToEdit}
              setProduct={setProduct}
            />
            <Details
              name="details"
              details={productToEdit.details}
              product={productToEdit}
              setProduct={setProduct}
            />
            <button className={styles.btn} type="submit">
              Edit Product
            </button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await db.connectDb();
  const { query, req } = context;
  const id = query.id;
  const style = query.style;
  const product = await Product.findById(id)
    .populate({ path: "category", model: Category })
    .populate({
      path: "subCategories",
      model: SubCategory,
      populate: { path: "parent", model: GroupSubCategory },
    })
    .lean();
  let groupSubCategoryProduct = await GroupSubCategory.findById(
    product.subCategories[0].parent
  )
    .select("name parent")
    .lean();
  let categoryProduct = await Category.findById(product.category)
    .select("name")
    .lean();
  let subCategoriesProduct = product.subCategories.map(({ _id, name }) => ({
    _id,
    name,
  }));

  const categories = await Category.find({})
    .select("name")
    .sort({ name: 1 })
    .lean();
  const groupSubCategories = await GroupSubCategory.find({})
    .select("name parent")
    .sort({ name: 1 })
    .lean();
  const subCategories = await SubCategory.find({})
    .select("name parent")
    .sort({ name: 1 })
    .lean();

  await db.disconnectDb();
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      categoryProduct: JSON.parse(JSON.stringify(categoryProduct)),
      groupSubCategoryProduct: JSON.parse(
        JSON.stringify(groupSubCategoryProduct)
      ),
      subCategoriesProduct: JSON.parse(JSON.stringify(subCategoriesProduct)),
      categories: JSON.parse(JSON.stringify(categories)),
      groupSubCategories: JSON.parse(JSON.stringify(groupSubCategories)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      style: style,
    },
  };
}
