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
  category,
  brands,
  products,
  minPrice,
  maxPrice,
  sideBlockData,
}) {
  const [radioValue, setRadioValue] = useState(category.subcategories[0].slug);
  const [valueSort, setValueSort] = useState("");
  const [subCategoryName, setSubCategoryName] = useState(
    category.subcategories[0].name
  );
  const [showSideBlock, setShowSideBlock] = useState(true);
  const [valuePrice, setValuePrice] = useState({
    min: 10,
    max: maxPrice - minPrice,
  });
  const [numCards, setNumCards] = useState(3);
  const [unints, setUnits] = useState(10);

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

  function getLowestPrice(product) {
    let lowestPrice = Number.MAX_VALUE;
    for (const subProduct of product.subProducts) {
      for (const size of subProduct.sizes) {
        if (size.price < lowestPrice) {
          lowestPrice = size.price;
        }
      }
    }
    return lowestPrice;
  }

  function getBigestPrice(product) {
    let biggestPrice = -Number.MAX_VALUE;
    for (const subProduct of product.subProducts) {
      for (const size of subProduct.sizes) {
        if (size.price > biggestPrice) {
          biggestPrice = size.price;
        }
      }
    }
    return biggestPrice;
  }

  const handlerSortChanged = (data) => {
    let sortedProducts = [];
    switch (data) {
      case "byRating":
        sortedProducts = products.sort((a, b) => b.rating - a.rating);
        break;
      case "byNewest":
        // TODO do not have this field in data base
        sortedProducts = products.sort((a, b) => b.created_at - a.created_at);
        break;
      case "byPriceLowest":
        sortedProducts = products.sort((a, b) => {
          const aPrice = getLowestPrice(a);
          const bPrice = getLowestPrice(b);
          return aPrice - bPrice;
        });
        break;
      case "byPriceBiggest":
        sortedProducts = products.sort((a, b) => {
          const aPrice = getBigestPrice(a);
          const bPrice = getBigestPrice(b);
          return bPrice - aPrice;
        });
        break;
      default:
        break;
    }
    products = sortedProducts;
  };

  const handlerFilter = () => {
    //TODO !!!!!!!!!!
  };

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
            <Link
              href={`${category.group_subcategory.slug}?sub=${sub.slug}`}
              className={styles.link}
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
            </Link>
          ))}
        </Col>
      </Row>
      <Brands brands={brands} />
      {products.length ? (
        <>
          <Row className={styles.subcategorypage__settings}>
            <Col className={styles.subcategorypage__settings_col}>
              <button
                style={{
                  fontWeight: valueSort === `${"byRating"}` ? "800" : "500",
                }}
                className={styles.link}
                onClick={() => {
                  handlerSortChanged("byRating"), setValueSort("byRating");
                }}
              >
                За рейтингом
              </button>
              <button
                className={styles.link}
                style={{
                  fontWeight: valueSort === `${"byNewest"}` ? "800" : "500",
                }}
                onClick={() => {
                  handlerSortChanged("byNewest"), setValueSort("byNewest");
                }}
              >
                Новинки
              </button>
              <select
                style={{
                  fontWeight:
                    valueSort === `${"all"}` ||
                    valueSort === `${"byPriceLowest"}` ||
                    valueSort === `${"byPriceBiggest"}`
                      ? "800"
                      : "500",
                }}
                onChange={(e) => {
                  handlerSortChanged(e.target.value),
                    setValueSort(e.target.value);
                }}
              >
                <option value="all">Сортування за ціною</option>
                <option value="byPriceLowest">Від дешевих до дорогих</option>
                <option value="byPriceBiggest">Від дорогих до дешевих</option>
              </select>
              <button
                //TODO filter !!!
                onClick={() => {
                  handlerFilter(),
                  setShowSideBlock(showSideBlock ? false : true);
                }}
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
                    <Accordion.Item
                      eventKey={"brands"}
                      className={styles.accordion__item}
                    >
                      <Accordion.Header
                        className={styles.accordion__item_header}
                      >
                        <span>Бренд&nbsp;</span>
                        {brands.length > unints ? (
                          <span style={{ color: "rgba(34, 15, 75, 0.6)" }}>
                            ({brands.length})
                          </span>
                        ) : (
                          <></>
                        )}
                      </Accordion.Header>
                      <Accordion.Body className={styles.accordion__item_body}>
                        {brands.length > unints ? (
                          <div className={styles.search_field}>
                            <input type="text" placeholder="Пошук" />
                            <button>
                              <LoopIcon fillColor="#FAF8FF" />
                            </button>
                          </div>
                        ) : (
                          <></>
                        )}
                        <Form.Group
                          controlId="formBasicCheckbox"
                          // style={{
                          //   overflowY: brands.length > unints ? "scroll" : "hidden",
                          // }}
                          className={styles.group}
                        >
                          {brands.map((brand, i) => (
                            <Form.Check
                              key={`brand-${i}`}
                              type="checkbox"
                              className={styles.checkbox}
                            >
                              <Form.Check.Input
                                className={styles.checkbox_box}
                                type="checkbox"
                              />
                              <Form.Check.Label
                                className={styles.checkbox_label}
                              >
                                {brand}
                              </Form.Check.Label>
                            </Form.Check>
                          ))}
                        </Form.Group>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                      eventKey={"price"}
                      className={styles.accordion__item}
                    >
                      <Accordion.Header
                        className={styles.accordion__item_header}
                      >
                        <span>Ціна</span>
                      </Accordion.Header>
                      <Accordion.Body className={styles.accordion__item_body}>
                        <RangeSlider
                          min={0}
                          max={maxPrice}
                          step={1}
                          value={valuePrice}
                          onChange={setValuePrice}
                        />
                        <div className={styles.prices}>
                          <div>
                            Від <span>{valuePrice.min}</span> &#8372;
                          </div>
                          <span
                            style={{ color: "#220F4B", fontWeight: "bold" }}
                          >
                            &#8211;
                          </span>
                          <div>
                            До <span>{valuePrice.max}</span> &#8372;
                          </div>
                          <Form.Check.Input
                            className={styles.checkbox_box}
                            type="checkbox"
                          />
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                    {sideBlockData.map((d, i) =>
                      d.fields.map((field, j) => (
                        <Accordion.Item
                          eventKey={`${i}-${j}`}
                          key={`accordion-${i}-${j}`}
                          className={styles.accordion__item}
                        >
                          <Accordion.Header
                            className={styles.accordion__item_header}
                          >
                            <span>{field.name}&nbsp;</span>
                            {field.values.length > unints ? (
                              <span style={{ color: "rgba(34, 15, 75, 0.6)" }}>
                                ({field.values.length})
                              </span>
                            ) : (
                              <></>
                            )}
                          </Accordion.Header>
                          <Accordion.Body
                            className={styles.accordion__item_body}
                          >
                            {field.values.length > unints ? (
                              <div className={styles.search_field}>
                                <input type="text" placeholder="Пошук" />
                                <button>
                                  <LoopIcon fillColor="#FAF8FF" />
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}
                            <Form.Group
                              controlId="formBasicCheckbox"
                              // style={{
                              //   overflowY:
                              //     field.values.length > units
                              //       ? "scroll"
                              //       : "hidden",
                              // }}
                              className={styles.group}
                            >
                              {field.values.map((value, j) => (
                                <Form.Check
                                  key={j}
                                  type="checkbox"
                                  className={styles.checkbox}
                                >
                                  <Form.Check.Input
                                    className={styles.checkbox_box}
                                    type="checkbox"
                                  />
                                  <Form.Check.Label
                                    className={styles.checkbox_label}
                                  >
                                    {value}
                                  </Form.Check.Label>
                                </Form.Check>
                              ))}
                            </Form.Group>
                          </Accordion.Body>
                        </Accordion.Item>
                      ))
                    )}
                  </Accordion>
                </Col>
              </Col>
            ) : (
              <></>
            )}
            <Col style={{ padding: "0" }}>
              <Row
                className={styles.subcategorypage__row_cards}
                lg={showSideBlock ? numCards : numCards + 1}
                style={{ paddingLeft: showSideBlock ? "0" : "50px" }}
              >
                {products.map((p, i) => (
                  <Col key={i} className={styles.col}>
                    <ProductCard product={p} style={p.style} mode={p.mode} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </>
      ) : (
        <></>
      )}
      <ViewedProducts />
      <Footer country={country} />
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const slug = query.slug;
  const sub = query.sub;
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
    { $match: { "subCategories.slug": sub } },
    { $group: { _id: "$brand" } },
    { $group: { _id: null, brands: { $addToSet: "$_id" } } },
    { $project: { _id: 0, brands: 1 } },
    { $limit: 10 },
  ]);
  let brandNames = brands.length > 0 ? brands[0].brands : [];

  let products = await Product.aggregate([
    {
      $lookup: {
        from: "subcategories",
        localField: "subCategories",
        foreignField: "_id",
        as: "subCategories",
      },
    },
    { $unwind: "$subCategories" },
    { $match: { "subCategories.slug" : sub} },
  ]);

  let cheapestPrice = null;
  let mostExpensivePrice = null;

  for (const product of products) {
    for (const subProduct of product.subProducts) {
      for (const size of subProduct.sizes) {
        if (cheapestPrice === null || size.price < cheapestPrice) {
          cheapestPrice = size.price;
        }

        if (mostExpensivePrice === null || size.price > mostExpensivePrice) {
          mostExpensivePrice = size.price;
        }
      }
    }
  }

  const categories = products.reduce((acc, product) => {
    product.details.forEach((detail) => {
      const groupName = detail.group;
      let fields = acc[groupName]?.fields || {};
      detail.fields.forEach((field) => {
        if (!fields[field.name]) {
          fields[field.name] = [];
        }
        if (field.value) {
          fields[field.name].push(field.value);
        }
      });
      acc[groupName] = { group: groupName, fields };
    });
    return acc;
  }, {});

  const groupFields = Object.entries(categories).map(([group, data]) => {
    const fields = Object.keys(data.fields).map((fieldName) => {
      const values = data.fields[fieldName];
      const uniqueValues = Array.from(new Set(values));
      return { name: fieldName, values: uniqueValues };
    });
    return { group, fields };
  });

  const colorSet = new Set();
  const sizeSet = new Set();

  products.forEach((product) => {
    product.subProducts.forEach((p, i) => {
      if (p.color && !colorSet.has(p.color.color)) {
        const colorField = groupFields[0].fields.find(
          (f) => f.name === "Колір"
        );
        if (!colorField) {
          groupFields[0].fields.push({
            name: "Колір",
            values: [p.color.color],
          });
        } else {
          colorField.values.push(p.color.color);
        }
        colorSet.add(p.color.color);
      }

      p.sizes.forEach((s, j) => {
        if (s.size && !sizeSet.has(s.size)) {
          const sizeField = groupFields[0].fields.find(
            (f) => f.name === "Розмір"
          );
          if (!sizeField) {
            groupFields[0].fields.push({
              name: "Розмір",
              values: [s.size],
            });
          } else {
            sizeField.values.push(s.size);
          }
          sizeSet.add(s.size);
        }
      });
    });
  });

  let newProducts = products.map((product) => {
    let style = -1;
    let mode = -1;
    // знайдемо індекс першого підпродукту з ненульовим залишком
    for (let i = 0; i < product.subProducts.length; i++) {
      let subProduct = product.subProducts[i];
      for (let j = 0; j < subProduct.sizes.length; j++) {
        if (subProduct.sizes[j].qty > 0) {
          style = i;
          mode = j;
          break;
        }
      }
      if (style !== -1) {
        break;
      }
    }

    let color = product.subProducts[style]
      ? product.subProducts[style].color?.color
      : "";
    let size = product.subProducts[style].sizes[mode].size;

    return {
      ...product,
      style,
      mode,
      color,
      size,
    };
  });

  await db.disconnectDb();
  return {
    props: {
      country: countryData,
      category: JSON.parse(JSON.stringify(newCategory)),
      brands: JSON.parse(JSON.stringify(brandNames)),
      products: JSON.parse(JSON.stringify(newProducts)),
      minPrice: cheapestPrice,
      maxPrice: mostExpensivePrice,
      sideBlockData: JSON.parse(JSON.stringify(groupFields)),
    },
  };
}
