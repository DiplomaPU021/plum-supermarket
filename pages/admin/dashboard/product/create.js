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
import { validateCreateProduct } from "../../../../utils/validation";
import { uploadImages } from "../../../../requests/upload";
import dataURItoBlob from "../../../../utils/dataURItoBlob";
import { useRouter } from "next/router";


const animatedComponents = makeAnimated();
const createUniqueCode = () => {
  const len = 8;
  let randStr = "";
  for (let i = 0; i < len; i += 1) {
    const ch = Math.floor(Math.random() * 10 + 1);
    randStr += ch;
  }
  return randStr;
};
const initialState = {
  name: "",
  description: "",
  brand: "",
  category: "",
  groupSubCategory: {
    name: "",
    _id: "",
    parent: "",
    slug: "",
  },
  subCategories: [],
  details: [],
  reviews: [],
  refundPolicy: "30 днів",
  rating: 0,
  numReviews: 0,
  parent: "",
  images: [],
  color: null,
  sizes: [
    {
      size: "",
      qty: 1,
      price: 0,
      price_unit: "₴",
      code: createUniqueCode(),
    },
  ],
  discount: 0,
  sold: 0,
};

export default function Create({ parents, categories }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [product, setProduct] = useState(initialState);
  const [subCategories, setSubs] = useState([]);
  const [groupSub, setGroupSub] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataOptions, setDataOptions] = useState([]);
  const [dataSelectedOptions, setDataSelectedOptions] = useState([]);


  const getParentData = async () => {
    setDataOptions([]);
    setDataSelectedOptions([]);
    if (product.parent != "") {
      setLoading(true);
      const { data } = await axios.get(`/api/product/${product.parent}`);
      if (data) {
        setProduct({
          ...product,
          name: data.name,
          description: data.description,
          brand: data.brand,
          category: data.category_id,
          subCategories: data.subCategories,
          details: data.details,
          groupSubCategory: data.groupSubCategory._id,
          color: null,
          sizes: data.sizes,
          discount: data.discount,
          images: data.images,
        });
      }
      getSubs();
    } else {
      setProduct(initialState);
    }
  };
  useEffect(() => {
    getParentData();
  }, [product.parent]);

  const getGroupSub = async () => {
    setLoading(true);
    const { data } = await axios.get(`/api/admin/groupSubCategory`, {
      params: {
        category: product.category,
      },
    });
    setGroupSub(data);
    setLoading(false);
  };
  const getSubs = async () => {
    setLoading(true);
    const { data } = await axios.get(`/api/admin/subCategory`, {
      params: {
        groupSubCategory: product.groupSubCategory,
      },
    });
    if (product.parent !== "") {
      setSubs(product.subCategories);
    } else {
      setSubs(data);
    }
    changeSelectedOptions();
    setLoading(false);
  };
  useEffect(() => {
    getGroupSub();
    changeSelectedOptions();
  }, [product.category]);

  useEffect(() => {
    setLoading(true);
    getSubs();
    setLoading(false);
  }, [product.groupSubCategory]);

  const changeSelectedOptions = () => {
    if (product.parent !== "") {
      setDataSelectedOptions(
        subCategories.map((item) => {
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
      subCategories.map((item) => {
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
  useEffect(() => {
    setLoading(true);
    changeSelectedOptions();
    setLoading(false);
  }, [subCategories]);

  const handleChange = (e) => {
    if (typeof e !== "undefined") {
      const { value, name } = e.target;
      setProduct({ ...product, [name]: value });
    }
  };
  const handleChangeSubCategory = (value) => {
    setDataSelectedOptions(value);
    setProduct({ ...product, subCategories: value });
  };

  const validate = Yup.object({
    name: Yup.string()
      .required("Будь-ласка додайте ім'я")
      .min(10, "Назва продукта має бути між 10 та 300 символами")
      .max(300, "Назва продукта має бути між 10 та 300 символами"),
    brand: Yup.string().required("Будь-ласка додайте бренд"),
    category: Yup.string().required("Будь-ласка виберіть категорію"),
    dataSelectedOptions: Yup.array().min(
      1,
      "Будь-ласка виберіть хоча б одну підкатегорію"
    ),
    groupSubCategory: Yup.string()
      .transform((value) => {
        if (typeof value !== "string") {
          return "";
        }
        return value;
      })
      .required("Будь-ласка виберіть групу підкатегорій"),
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
    description: Yup.string().required("Будь-ласка додайте опис"),
  });

  const createProduct = async () => {
    let test = validateCreateProduct(product, images);
    if (test == "valid") {
      createProductHandler();
    } else {
      dispatch(
        showDialog({
          header: "Будь ласка дотримуйтесь інструкцій",
          show:true,
          msgs:test
        })
      );
    }
  };

  let uploaded_images = [];
  const createProductHandler = async () => {
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
      const { data } = await axios.post("/api/admin/product", {
        ...product,
        images: uploaded_images,
        color: product.color,
      });
      setLoading(false);
      toast.success(data.message);
      // router.push("/admin/dashboard/product/create");
      location.reload();
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout>
      {loading && <DotLoaderSpinner loading={loading} />}
      <div className={styles.header}>Створити продукт</div>
      <DialogModal />
      <Formik
        enableReinitialize
        initialValues={{
          name: product.name,
          brand: product.brand,
          description: product.description,
          category: product.category,
          subCategories: product.subCategories,
          groupSubCategory: product.groupSubCategory,
          parent: product.parent,
          discount: product.discount,
          color: product.color,
          images: product.images,
          details: product.details,
          imageInputFile: "",
          dataSelectedOptions,
        }}
        validationSchema={validate}
        onSubmit={() => {
          createProduct();
        }}
      >
        {(formik) => (
          <Form>
            <Images
              name="imagesInputFile"
              header="Фото продукту"
              text="Додати зображення"
              photos={images}
              setImages={setImages}
              viewImages={null}
            />
            <SingularSelect
              name="parent"
              value={product.parent}
              label="parent"
              data={parents}
              header="Додати до існуючого продукту"
              handleChange={handleChange}
            />
            <SingularSelect
              name="category"
              value={product.category}
              label="Category"
              data={categories}
              header="Виберіть категорію"
              handleChange={handleChange}
              disabled={product.parent != ""}
            />

            <SingularSelect
              name="groupSubCategory"
              value={product.groupSubCategory}
              label="GroupSubCategory"
              data={groupSub}
              header="Виберіть групу підкатегорій"
              handleChange={handleChange}
              disabled={product.parent != ""}
            />
            <div style={{ marginBottom: "1rem" }}>
              <Select
                isMulti
                name="dataSelectedOptions"
                value={dataSelectedOptions}
                disabled={product.parent != ""}
                onChange={handleChangeSubCategory}
                placeholder="Виберіть субкатегорії"
                components={animatedComponents}
                className={`${styles.select} ${formik.touched && formik.errors && styles.error_select
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
            <div className={styles.header}>Базова інформація по товару</div>
            <AdminInput
              type="text"
              label="Назва"
              name="name"
              placeholder="Введіть назву товару..."
              onChange={(e) => handleChange(e)}
              disabled={product.parent != ""}
            />
            <AdminInput
              type="textarea"
              rows="4"
              cols="50"
              label="Опис"
              name="description"
              placeholder="Напишіть опис товару, бажано в html"
              onChange={(e) => handleChange(e)}
              disabled={product.parent != ""}
            />
            <AdminInput
              type="text"
              label="Бренд"
              name="brand"
              placeholder="Введіть бренд..."
              onChange={(e) => handleChange(e)}
              disabled={product.parent != ""}
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
              product={product}
              setProduct={setProduct}
              color={product.color}
            />
            <Sizes
              name="sizes"
              sizes={product.sizes}
              product={product}
              setProduct={setProduct}
            />
            <Details
              name="details"
              details={product.details}
              product={product}
              setProduct={setProduct}
              disabled={product.parent != ""}
            />
            <button className={styles.btn} type="submit">
              Створити продукт
            </button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await db.connectDb();
  const results = await Product.find({}).select("name subProducts").lean();
  const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
  await db.disconnectDb();
  return {
    props: {
      parents: JSON.parse(JSON.stringify(results)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
