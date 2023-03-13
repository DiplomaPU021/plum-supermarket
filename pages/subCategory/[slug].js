import Header from "@/components/header";
import Footer from "@/components/footer";
import LightPlumIcon from "@/components/icons/LightPlumIcon";
import GreenChevronRight from "@/components/icons/ChevronRight";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { Container, Row, Col, Accordion, Card, Form } from "react-bootstrap";
import styles from "../../styles/subCategory.module.scss";
import db from "../../utils/db";
import Brands from "@/components/brands/indes";
import Category from "../../models/Category";
import SubCategory from "@/models/SubCategory";
import GroupSubCategory from "@/models/GroupSubCategory";
import Product from "@/models/Product";
import { useState } from "react";
import Popular from "@/components/popular";
import ProductCard from "@/components/productCard";
import LoopIcon from "@/components/icons/LoopIcon";
import ReactSlider from "react-slider";

export default function subCategory({ country, category, brands, products }) {
  const [radioValue, setRadioValue] = useState(category.subcategories[0].slug);
  const [subCategoryName, setSubCategoryName] = useState(
    category.subcategories[0].name
  );
  const [showSideBlok, setShowSideBlok] = useState(true);

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
              {console.log(
                `${styles.btn} ${radioValue === sub.slug ? "checked" : ""}`
              )}

              {sub.name}
            </button>
          ))}
        </Col>
      </Row>
      {/* TODO it receivs wrong data */}
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
          <button onClick={() => setShowSideBlok(showSideBlok ? false : true)}>
            Фільтр
          </button>
        </Col>
      </Row>
      <Row className={styles.subcategorypage__row}>
        {showSideBlok ? (
          <Col lg={5} className={styles.subcategorypage__row_sidebar}>
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
                    <div className={styles.slider}>
                      <ReactSlider
                        min={0}
                        max={100}
                        step={1}
                        defaultValue={[10, 20]}
                        orientation="horizontal"
                        withBars
                        className={styles.slider_horizontal}
                        pearling
                      />
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Col>
        ) : null}
        <Col className={styles.subcategorypage__row_cards}>
          <Row
            lg={showSideBlok ? 4 : 3}
            style={{ paddingLeft: showSideBlok ? "0" : "50px" }}
          >
            {products.map((p, i) => (
              <Col
                key={i}
                className={styles.col}
                style={{
                  width:
                    showSideBlok && window.innerWidth >= 1500
                      ? "25%"
                      : showSideBlok && window.innerWidth >= 1400
                      ? "33.33%"
                      : showSideBlok && window.innerWidth >= 1200
                      ? "50%"
                      : "",
                }}
              >
                <ProductCard product={p} />
              </Col>
            ))}
            {products.map((p, i) => (
              <Col
                key={i}
                className={styles.col}
                style={{
                  width:
                    showSideBlok && window.innerWidth >= 1500
                      ? "25%"
                      : showSideBlok && window.innerWidth >= 1400
                      ? "33.33%"
                      : showSideBlok && window.innerWidth >= 1200
                      ? "50%"
                      : "",
                }}
              >
                <ProductCard product={p} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Popular products={products} />
      <Footer country={country} />
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const slug = query.slug;

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

  //TODO brands, it works wrong !!!!!!!
  let brands = await Product.find({
    subCategory: group_subcategory._id,
  }).distinct("brand");

  //products that go together cheaper
  let productsPlus = await Product.find().sort({ createdAt: -1 }).lean();

  let data = {
    name: "Ukraine",
    flag: { emojitwo: "https://cdn.ipregistry.co/flags/emojitwo/ua.svg" },
    code: "UA",
  };
  /* Увага!!! замість обєкту можна використати сервіс ipregistry з наступним методом
        await axios
        .get('https://api.ipregistry.co/?key=aq50e9f94war7j9p')
        .then((res) => {      
          return res.data.location.country;
        })
        .catch((err)=> {
          console.log(err);      
        });*/
  //----------------
  await db.disconnectDb();
  return {
    props: {
      country: { name: data.name, flag: data.flag.emojitwo, code: data.code },
      category: JSON.parse(JSON.stringify(newCategory)),
      brands: JSON.parse(JSON.stringify(brands)),
      products: JSON.parse(JSON.stringify(productsPlus)),
    },
  };
}
