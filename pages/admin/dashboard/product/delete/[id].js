import styles from "@/styles/products.module.scss";
import Layout from "@/components/admin/layout";
import db from "@/utils/db";
import { useState, useEffect } from "react";
import Product from "@/models/Product";
import Category from "@/models/Category";
import axios from "axios";
import { ErrorMessage, Form, Formik } from "formik";
import { toast } from "react-toastify";
import SingularSelect from "@/components/admin/select/SingularSelect";
import AdminInput from "@/components/inputs/adminInput";
import Colors from "@/components/admin/createProduct/colors";
import Sizes from "@/components/admin/createProduct/sizes";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import DotLoaderSpinner from "@/components/loaders/dotLoader";
import DialogModal from "@/components/dialogModal";
import { useDispatch } from "react-redux";
import Details from "@/components/admin/createProduct/details";
import GroupSubCategory from "@/models/GroupSubCategory";
import SubCategory from "@/models/SubCategory";
import { useRouter } from "next/router";

const animatedComponents = makeAnimated();

export default function DeleteProduct({
  product,
  style,
  categories,
  subCategories,
  groupSubCategories,
  subCategoriesProduct,
  groupSubCategoryProduct,
  categoryProduct,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
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
  const [loading, setLoading] = useState(false);
  const [dataOptions, setDataOptions] = useState([]);
  const [dataSelectedOptions, setDataSelectedOptions] = useState([]);

  const getGroupSub = async () => {
    setLoading(true);
    setGroupSub(
      groupSubCategories.filter((c) => c.parent == productToEdit.category)
    );
    setLoading(false);
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
    getGroupSub();
    changeSelectedOptions();
  }, [productToEdit.category]);

  useEffect(() => {
    setLoading(true);
    getSubs();
    setLoading(false);
  }, [productToEdit.groupSubCategory]);

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
  useEffect(() => {
    setLoading(true);
    changeSelectedOptions();
    setLoading(false);
  }, [subs]);

  const deleteProductHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete("/api/admin/product", {
        data: {
          id: product._id,
          style,
        },
      });

      setLoading(false);
      setTimeout(() => {
        toast.success(data.message);
      }, 1000);

      router.push("/admin/dashboard/product/all");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout>
      {loading && <DotLoaderSpinner loading={loading} />}
      <div className={styles.header}>Видалити продукт</div>
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
        onSubmit={() => deleteProductHandler()}
      >
        {(formik) => (
          <Form>
            <SingularSelect
              name="category"
              value={productToEdit.category}
              label="Category"
              data={categories}
              header="Виберіть категорію"
              disabled={true}
            />

            <SingularSelect
              name="groupSubCategory"
              value={productToEdit.groupSubCategory}
              label="GroupSubCategory"
              data={groupSub}
              header="Виберіть групу субкатегорій"
              disabled={true}
            />
            <div style={{ marginBottom: "1rem" }}>
              <Select
                isMulti
                name="dataSelectedOptions"
                value={dataSelectedOptions}
                disabled={true}
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
            <div className={styles.header}>Базова інформація</div>
            <AdminInput
              type="text"
              label="Назва"
              name="name"
              placeholder="Назва"
              disabled
            />
            <AdminInput
              type="textarea"
              rows="4"
              cols="50"
              label="Опис"
              name="description"
              placeholder="Опис"
              disabled
            />
            <AdminInput
              type="text"
              label="Бренд"
              name="brand"
              placeholder="Бренд"
              disabled
            />
            <AdminInput
              type="text"
              label="Знижка"
              name="discount"
              placeholder="Знижка"
              disabled
            />
            <AdminInput
              type="text"
              label="Політика повернення"
              name="refundPolicy"
              placeholder="Політика повернення"
              disabled
            />
            <Colors
              name="color"
              product={productToEdit}
              setProduct={setProduct}
              color={productToEdit.color}
              disabled
            />
            <Sizes
              name="sizes"
              sizes={productToEdit.sizes}
              product={productToEdit}
              setProduct={setProduct}
              disabled={true}
            />
            <Details
              name="details"
              details={productToEdit.details}
              product={productToEdit}
              setProduct={setProduct}
              disabled
            />
            <button className={styles.btn} type="submit">
              Видалити субпродукт
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