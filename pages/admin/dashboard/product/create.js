import styles from "../../../../styles/products.module.scss";
import Layout from "@/components/admin/layout";
import db from "../../../../utils/db";
import { useState, useEffect } from "react";
import Product from "../../../../models/Product";
import Category from "../../../../models/Category";
import axios from "axios";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import SingularSelect from "@/components/admin/select/SingularSelect";
import MultipleSelect from "@/components/admin/select/MultipleSelect";
import AdminInput from "@/components/inputs/adminInput";
import Images from "@/components/admin/createProduct/images";
import Colors from "@/components/admin/createProduct/colors";
import Sizes from "@/components/admin/createProduct/sizes";

const initialState = {
    name: "",
    description: "",
    brand: "",
    slug: "", ///???????
    category: "",
    subCategories: [],
    details: [
        {
            group: "",
            fields: [
                {
                    name: "",
                    value: "",
                    isMain: false,
                },
            ],
        },
    ],
    reviews: [],
    refundPolicy: "30 днів",
    rating: 0,
    numReviews: 0,
    parent: "",
    images: [],
    // description_images: [],
    color: {
        color: "",
        image: "",
    },
    sizes: [
        {
            size: "",
            qty: 1,
            price: 0,
            price_unit: "",
            code: "",
        },
    ],
    discount: 0,
    sold: 0,
    // subProducts: [
    //     {
    //         images: [],
    //         description_images: [],
    //         color: {
    //             color: "",
    //             image: "",
    //         },
    //         sizes: [
    //             {
    //                 size: "",
    //                 qty: 0,
    //                 price: 0,
    //                 price_unit: "",
    //                 code: "",
    //             },
    //         ],
    //         discount: 0,
    //         sold: 0,
    //     },
    // ],
};

export default function create({ parents, categories }) {
    const [product, setProduct] = useState(initialState);
    const [subs, setSubs] = useState([]);
    const [colorImage, setColorImage] = useState("");
    const [images, setImages] = useState([]);
    const [description_images, setDescription_images] = useState("");
    const [loading, setLoading] = useState(false);
    console.log(product);
    useEffect(() => {
        const getParentData = async () => {
            if (product.parent != "") {
                const { data } = await axios.get(`/api/product/${product.parent}`);
                console.log("data", data);
                if (data) {
                    setProduct({
                        ...product,
                        name: data.name,
                        description: data.description,
                        brand: data.brand,
                        slug: data.slug,
                        category: data.category_id,
                        subCategories: data.subCategories,
                        details: data.details,
                    });
                }
            }

        };
        getParentData();
    }, [product.parent]);

    useEffect(() => {
        const getSubs = async () => {
            const { data } = await axios.get(`/api/admin/subCategory`, {
                params: {
                    category: product.category,
                },
            });
            setSubs(data);
        };
        getSubs();
    }, [product.category]);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const validate = Yup.object({
        name: Yup.string()
            .required("Please add a name")
            .min(10, "Product name must be between 10 and 300 characters")
            .max(300, "Product name must be between 10 and 300 characters"),
        brand: Yup.string().required("Please add a brand"),
        category: Yup.string().required("Please select a category"),
        subCategories: Yup.string().required("Please select a subCategory"),
        slug: Yup.string().required("Please add a slug"),
        color: Yup.string().required("Please add a color"),
        description: Yup.string().required("Please add a description"),
    });
    const createProduct = async () => { };

    return (
        <Layout>
            <div className={styles.header}>Create Product</div>

            <Formik
                enableReinitialize
                initialValues={{
                    name: product.name,
                    brand: product.brand,
                    description: product.description,
                    category: product.category,
                    subCategories: product.subCategories,
                    parent: product.parent,
                    slug: product.slug,
                    discount: product.discount,
                    color: product.color,
                    imageInputFile: "",
                    styleInput: "",
                }}
                validationSchema={validate}
                onSubmit={() => {
                    createProduct();
                }}
            >
                {(formik) => (
                    <Form>
                        {/* <Images
              name="imagesInputFile"
              header="Product Carousel Images"
              text="Add images"
              images={images}
              setImages={setImages}
              setColorImage={setColorImage}
            /> */}
                        <div className={styles.flex}>
                            {product.color?.image && (
                                <img
                                    src={product.color?.image}
                                    className={styles.image_span}
                                    alt=""
                                />
                            )}
                            {product.color?.color && (
                                <span
                                    className={styles.color_span}
                                    style={{ background: `${product.color?.image}` }}
                                ></span>
                            )}
                        </div>
                        {/* <Colors
              name="color"
              product={product}
              setProduct={setProduct}
              colorImage={colorImage}
            /> */}
                        {/* <Style
              name="styleInput"
              product={product}
              setProduct={setProduct}
              colorImage={colorImage}
            /> */}
                        {/* TODO product to which one we want to add subProduct */}
                        <SingularSelect
                            name="parent"
                            value={product.parent}
                            label="parent"
                            data={parents}
                            header="Додати до існуючого продукту"
                            handleChange={handleChange}
                        />
                        {/* TODO selector for Category */}
                        <SingularSelect
                            name="category"
                            value={product.category}
                            label="Category"
                            data={categories}
                            header="Виберіть категорію"
                            handleChange={handleChange}
                            disabled={product.parent}
                        />

                        {
                            // TODO selector for Sub Category
                            // после того как выбрать категорию появиться селектор выбрать
                            // подкатегорию в нашем случае должно быть еще и группы
                            product.category && (
                                <MultipleSelect
                                    name="subCategories"
                                    value={product.subCategories}
                                    label="Sub category"
                                    data={subs}
                                    header="Виберіть субкатегорії"
                                    handleChange={handleChange}
                                    disabled={product.parent}
                                />
                            )
                        }
                        <div className={styles.header}>Basic Infos</div>
                        <AdminInput
                            type="text"
                            label="Name"
                            name="name"
                            placeholder="Name"
                            onChange={handleChange}
                        />
                        <AdminInput
                            type="text"
                            label="Description"
                            name="description"
                            placeholder="Description"
                            onChange={handleChange}
                        />
                        <AdminInput
                            type="text"
                            label="Brand"
                            name="brand"
                            placeholder="Brand"
                            onChange={handleChange}
                        />
                        <AdminInput
                            type="text"
                            label="Slug"
                            name="slug"
                            placeholder="Slug"
                            onChange={handleChange}
                        />
                        <AdminInput
                            type="text"
                            label="Discount"
                            name="discount"
                            placeholder="Discount"
                            onChange={handleChange}
                        />
                        {/* <Images
                            name="imageDescInputFile"
                            header="Product Description Images"
                            text="Add images"
                            images={description_images}
                            setImages={setDescriptionImages}
                            setColorImage={setColorImage} /> */}
                        {/* <Sizes
              sizes={product.subProducts.sizes}
              product={product}
              setProduct={setProduct}
            /> */}
                        {/* <Details
                            details={product.details}
                            product={product}
                           setProduct={setProduct} /> */}
                        <button className={styles.btn} type="submit">
                            Create Product
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
    console.log("REsults//////////////", results);
    const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
    await db.disconnectDb();
    return {
        props: {
            parents: JSON.parse(JSON.stringify(results)),
            categories: JSON.parse(JSON.stringify(categories)),
        },
    };
}
