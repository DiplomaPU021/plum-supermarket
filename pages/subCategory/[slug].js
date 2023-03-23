import Header from "@/components/header";
import Footer from "@/components/footer";
import LightPlumIcon from "@/components/icons/LightPlumIcon";
import GreenChevronRight from "@/components/icons/ChevronRight";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { Container, Row, Col, Accordion, Form } from "react-bootstrap";
import styles from "../../styles/subCategory.module.scss";
import db from "../../utils/db";
import Brands from "@/components/brands/indes";
import Category from "../../models/Category";
import SubCategory from "@/models/SubCategory";
import GroupSubCategory from "@/models/GroupSubCategory";
import Product from "@/models/Product";
import { useEffect, useState } from "react";
import ProductCard from "@/components/productCard";
import LoopIcon from "@/components/icons/LoopIcon";
import { getCountryData } from "@/utils/country";
import RangeSlider from "./RangeSlider";
import ViewedProducts from "@/components/viewedProducts";

export default function subCategory({
  country,
  viewedProducts,
  category,
  brands,
  products,
}) {
  const [radioValue, setRadioValue] = useState(category.subcategories[0].slug);
  const [subCategoryName, setSubCategoryName] = useState(
    category.subcategories[0].name
  );
  const [showSideBlock, setShowSideBlock] = useState(true);

  const [value, setValue] = useState({ min: 10, max: 70 });

  const [numCards, setNumCards] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let newNumCards;
      if (screenWidth >= 1600) {
        newNumCards = 4;
      } else if (screenWidth >= 1400) {
        newNumCards = 3;
      } else {
        newNumCards = 2;
      }
      setNumCards(newNumCards);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container fluid className={styles.subcategorypage}>
      <Header country={country} />
      <Row className={styles.subcategorypage__links}>
        <Col style={{ padding: "0" }}>
          <Link href="/">
            <LightPlumIcon />
            <GreenChevronRight fillColor="#70BF63" w="30px" h="30px" />
          </Link>
          <Link
            href={`/category/${category.slug}`}
            className={styles.subcategorypage__links_link}
          >
            <span>{category.name}</span>
            <GreenChevronRight fillColor="#70BF63" w="30px" h="30px" />
          </Link>
          <span className={styles.subcategorypage__links_link}>
            {subCategoryName}
          </span>
        </Col>
      </Row>
      <Row className={styles.subcategorypage__title}>
        <span>{category.name}</span>
        <Col className={styles.subcategorypage__title_colbtns}>
          {category.subcategories.map((sub, i) => (
            <button
              style={{ fontWeight: radioValue === sub.slug ? "800" : "500" }}
              key={i}
              id={`radio-${i}`}
              type="radio"
              name="radio"
              value={sub.slug}
              checked={radioValue === sub.slug}
              onClick={(e) => {
                setRadioValue(e.currentTarget.value);
                setSubCategoryName(sub.name);
              }}
            >
              {sub.name}
            </button>
          ))}
        </Col>
      </Row>
      <Brands brands={brands} />
      <Row className={styles.subcategorypage__settings}>
        <Col className={styles.subcategorypage__settings_col}>
          {/* TODO buttons & select below */}
          <button>За рейтингом</button>
          <button>Новинки</button>
          <select>
            <option value="">Сортування за ціною</option>
            <option value="option1">Від дешевих до дорогих</option>
            <option value="option2">Від дорогих до дешевих</option>
          </select>
          <button
            onClick={() => setShowSideBlock(showSideBlock ? false : true)}
          >
            Фільтр
          </button>
        </Col>
      </Row>
      <Row className={styles.subcategorypage__row}>
        {showSideBlock ? (
          <Col lg={4} className={styles.subcategorypage__row_sidebar}>
            <Col className={styles.col}>
              <div className={styles.search}>
                <div className={styles.search_field}>
                  <input type="text" placeholder="Пошук параметрів" />
                  <button>
                    <LoopIcon fillColor="#FAF8FF" />
                  </button>
                </div>
              </div>
              <Accordion flush alwaysOpen className={styles.accordion}>
                <Accordion.Item eventKey="0" className={styles.accordion__item}>
                  <Accordion.Header className={styles.accordion__item_header}>
                    <span>Бренд&nbsp;</span>
                    {/*TODO if more than 10 units, add code below*/}
                    <span style={{ color: "rgba(34, 15, 75, 0.6)" }}>
                      (125)
                    </span>
                  </Accordion.Header>
                  <Accordion.Body className={styles.accordion__item_body}>
                    {/*TODO if more than 10 units, add component below */}
                    <div className={styles.search_field}>
                      <input type="text" placeholder="Пошук" />
                      <button>
                        <LoopIcon fillColor="#FAF8FF" />
                      </button>
                    </div>
                    <Form.Group
                      controlId="formBasicCheckbox"
                      //TODO if more than 10 units, add style below
                      //style={{ overflowY: units ? 'scroll' : 'hidden'}}
                      className={styles.group}
                    >
                      <Form.Check type="checkbox" className={styles.checkbox}>
                        <Form.Check.Input
                          className={styles.checkbox_box}
                          type="checkbox"
                        />
                        <Form.Check.Label className={styles.checkbox_label}>
                          Label
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check type="checkbox" className={styles.checkbox}>
                        <Form.Check.Input
                          className={styles.checkbox_box}
                          type="checkbox"
                        />
                        <Form.Check.Label className={styles.checkbox_label}>
                          Label
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check type="checkbox" className={styles.checkbox}>
                        <Form.Check.Input
                          className={styles.checkbox_box}
                          type="checkbox"
                        />
                        <Form.Check.Label className={styles.checkbox_label}>
                          Label
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check type="checkbox" className={styles.checkbox}>
                        <Form.Check.Input
                          className={styles.checkbox_box}
                          type="checkbox"
                        />
                        <Form.Check.Label className={styles.checkbox_label}>
                          Label
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check type="checkbox" className={styles.checkbox}>
                        <Form.Check.Input
                          className={styles.checkbox_box}
                          type="checkbox"
                        />
                        <Form.Check.Label className={styles.checkbox_label}>
                          Label
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check type="checkbox" className={styles.checkbox}>
                        <Form.Check.Input
                          className={styles.checkbox_box}
                          type="checkbox"
                        />
                        <Form.Check.Label className={styles.checkbox_label}>
                          Label
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check type="checkbox" className={styles.checkbox}>
                        <Form.Check.Input
                          className={styles.checkbox_box}
                          type="checkbox"
                        />
                        <Form.Check.Label className={styles.checkbox_label}>
                          Label
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check type="checkbox" className={styles.checkbox}>
                        <Form.Check.Input
                          className={styles.checkbox_box}
                          type="checkbox"
                        />
                        <Form.Check.Label className={styles.checkbox_label}>
                          Label
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check type="checkbox" className={styles.checkbox}>
                        <Form.Check.Input
                          className={styles.checkbox_box}
                          type="checkbox"
                        />
                        <Form.Check.Label className={styles.checkbox_label}>
                          Label
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check type="checkbox" className={styles.checkbox}>
                        <Form.Check.Input
                          className={styles.checkbox_box}
                          type="checkbox"
                        />
                        <Form.Check.Label className={styles.checkbox_label}>
                          Label
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check type="checkbox" className={styles.checkbox}>
                        <Form.Check.Input
                          className={styles.checkbox_box}
                          type="checkbox"
                        />
                        <Form.Check.Label className={styles.checkbox_label}>
                          Label
                        </Form.Check.Label>
                      </Form.Check>
                    </Form.Group>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className={styles.accordion__item}>
                  <Accordion.Header className={styles.accordion__item_header}>
                    <span>Ціна</span>
                  </Accordion.Header>
                  <Accordion.Body className={styles.accordion__item_body}>
                    <RangeSlider
                      //TODO max & min should be prices from data base
                      min={0}
                      max={100}
                      step={1}
                      value={value}
                      onChange={setValue}
                    />
                    <div className={styles.prices}>
                      <div>
                        Від <span>{value.min}</span> &#8372;
                      </div>
                      <span style={{ color: "#220F4B", fontWeight: "bold" }}>
                        &#8211;
                      </span>
                      <div>
                        До <span>{value.max}</span> &#8372;
                      </div>
                      <Form.Check.Input
                        className={styles.checkbox_box}
                        type="checkbox"
                      />
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Col>
        ) : null}
        <Col style={{padding: "0"}}>
          <Row
            className={styles.subcategorypage__row_cards}
            lg={showSideBlock ? numCards : numCards + 1}
            style={{ paddingLeft: showSideBlock ? "0" : "50px" }}
          >
            {products.map((p, i) => (
              <Col key={i} className={styles.col}>
                <ProductCard product={p} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <ViewedProducts viewedProducts={viewedProducts}/>
      <Footer country={country} />
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const slug = query.slug;
  const countryData = await getCountryData();
  await db.connectDb();

  let group_subcategory = await GroupSubCategory.findOne({ slug }).lean();

  let category = await Category.findOne({
    _id: group_subcategory.parent,
  }).lean();

  let subcategories = await SubCategory.find({
    parent: group_subcategory._id,
  }).lean();

  let newCategory = {
    ...category,
    group_subcategory: group_subcategory,
    subcategories: subcategories,
  };

  let brands = await Product.aggregate([
    {
      $lookup: {
        from: "subcategories",
        localField: "subCategories",
        foreignField: "_id",
        as: "subCategories",
      },
    },
    { $unwind: "$subCategories" },
    { $match: { "subCategories.parent": group_subcategory._id } },
    { $group: { _id: "$brand" } },
    { $group: { _id: null, brands: { $addToSet: "$_id" } } },
    { $project: { _id: 0, brands: 1 } },
    { $limit: 10 },
  ]);
  let brandNames = brands.length > 0 ? brands[0].brands : [];

  // group of products from same subgroup of subCategories
  let products = await Product.aggregate([
    {
      $lookup: {
        from: "subcategories",
        localField: "subCategories",
        foreignField: "_id",
        as: "subCategories",
      },
    },
    { $match: { subCategories: { $in: subcategories } } },
  ]);

  //TODO Should be with mark "viewed products"
  let viewedProducts = await Product.find()
    .sort({ createdAt: -1 })
    .lean();

  await db.disconnectDb();
  return {
    props: {
      country: countryData,
      category: JSON.parse(JSON.stringify(newCategory)),
      brands: JSON.parse(JSON.stringify(brandNames)),
      products: JSON.parse(JSON.stringify(products)),
      viewedProducts: JSON.parse(JSON.stringify(viewedProducts)),
    },
  };
}
