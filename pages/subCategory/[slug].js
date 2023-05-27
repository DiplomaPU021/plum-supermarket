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
import { useRouter } from "next/router";
import ProductCard from "@/components/productCard";
import LoopIcon from "@/components/icons/LoopIcon";
import { getCountryData } from "@/utils/country";
import RangeSlider from "@/components/range";
import ViewedProducts from "@/components/viewedProducts";

export default function SubCategorySlug({
  country,
  category,
  brands,
  colors,
  sizes,
  products,
  minPrice,
  maxPrice,
  sideBlockData,
}) {
  const router = useRouter();
  const [localProducts, setLocalProducts] = useState(products);
  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  const [radioValue, setRadioValue] = useState(router.query.sub); // || category.subcategories[0].slug);
  const [valueSort, setValueSort] = useState("byRating");
  const [subCategoryName, setSubCategoryName] = useState(
    category.subcategories.find((sub) => sub.slug === router.query.sub)
      .name || category.subcategories[0].name
  );
  const [showSideBlock, setShowSideBlock] = useState(true);
  const [numCards, setNumCards] = useState(3);
  const [units, setUnits] = useState(10);

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
        sortedProducts = localProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "byNewest":
        sortedProducts = localProducts.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });
        break;
      case "byPriceLowest":
        sortedProducts = localProducts.sort((a, b) => {
          const aPrice = getLowestPrice(a);
          const bPrice = getLowestPrice(b);
          return aPrice - bPrice;
        });
        break;
      case "byPriceBiggest":
        sortedProducts = localProducts.sort((a, b) => {
          const aPrice = getBigestPrice(a);
          const bPrice = getBigestPrice(b);
          return bPrice - aPrice;
        });
        break;
      case "all":
        sortedProducts = localProducts;
        break;
      default:
        break;
    }
    setLocalProducts(sortedProducts);
  };

  //--------------------------------------------------------->>

  const [accordionKeys, setAccordionKeys] = useState([
    "brands",
    "prices",
    "colors",
    "sizes",
  ]);

  useEffect(() => {
    let keys = accordionKeys;
    sideBlockData.map((b) => {
      b.fields.map((f) => keys.push(f.name));
    });
    setAccordionKeys(keys);
  }, [sideBlockData, accordionKeys]);

  //--------------------------------------------------------->>

  const [valuePrice, setValuePrice] = useState({
    min: minPrice,
    max: maxPrice,
  });
  useEffect(() => {
    setValuePrice({
      min: minPrice,
      max: maxPrice,
    });
  }, [minPrice, maxPrice]);

  const [priceChecked, setPriceChecked] = useState(false);
  const [brandsChecked, setBrandsChecked] = useState([]);
  const [colorsChecked, setColorsChecked] = useState([]);
  const [sizesChecked, setSizesChecked] = useState([]);
  const [sideBarChecked, setSideBarChecked] = useState([]);

  function replaseSearchParamsQuery(searchArr, setArr, value) {
    if (searchArr.length > 0) {
      const valueCheck = searchArr.findIndex((el) => el == value);
      if (valueCheck !== -1) {
        setArr((prev) => prev.filter((v) => v !== value));
      } else {
        setArr((prev) => [...prev, value]);
      }
    } else {
      setArr((prev) => [...prev, value]);
    }
  }

  function replaseSideBarSearchParamsQuery(fName, value) {
    const existingObj = sideBarChecked.find((el) => el.fieldName === fName);

    if (existingObj) {
      const updatedValues = existingObj.values.includes(value)
        ? existingObj.values.filter((v) => v !== value)
        : [...existingObj.values, value];

      if (updatedValues.length === 0) {
        setSideBarChecked((prev) =>
          prev.filter((obj) => obj.fieldName !== fName)
        );
      } else {
        const updatedObj = Object.assign({}, existingObj, {
          values: updatedValues,
        });
        const objIndex = sideBarChecked.indexOf(existingObj);
        setSideBarChecked((prev) => [
          ...prev.slice(0, objIndex),
          updatedObj,
          ...prev.slice(objIndex + 1),
        ]);
      }
    } else {
      const newObj = { fieldName: fName, values: [value] };
      setSideBarChecked((prev) => [...prev, newObj]);
    }
  }

  //--------------------------------------------------------->>

  const clearFiltersHandler = () => {
    setLocalProducts(products);
    setPriceChecked(false);
    setBrandsChecked([]);
    setColorsChecked([]);
    setSizesChecked([]);
    setSideBarChecked([]);
  };

  //--------------------------------------------------------->>

  const handlerFilter = () => {
    let filteredProducts = products;
  
    if (sideBarChecked.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.details.some((detail) =>
          detail.fields.some((field) =>
            sideBarChecked.some(
              (el) =>
                el.fieldName === field.name && el.values.includes(field.value)
            )
          )
        )
      );
    }
  
    if (brandsChecked.length > 0) {
      filteredProducts = filteredProducts.filter((p) =>
        brandsChecked.includes(p.brand)
      );
    }
  
    if (colorsChecked.length > 0) {
      let newProducts = [];
  
      filteredProducts.forEach((product) => {
        let matchingSubProducts = product.subProducts.filter((subProduct) => {
          return colorsChecked.includes(subProduct.color?.color);
        });
  
        if (matchingSubProducts.length > 0) {
          matchingSubProducts.forEach((subProduct) => {
            let newProduct = { ...product };
            let style = product.subProducts.indexOf(subProduct);
            let sizeIndex = subProduct.sizes.findIndex(s => sizesChecked.includes(s.size));
            let mode = sizeIndex !== -1 ? sizeIndex : 0;
  
            newProduct.quantity = subProduct.sizes[mode].qty;
            newProduct.style = style;
            newProduct.mode = mode;
            newProduct.color = subProduct.color?.color ?? "";
            newProduct.size = subProduct.sizes[mode]?.size ?? "";
  
            newProducts.push(newProduct);
          });
        }
      });
  
      filteredProducts = newProducts;
    }
  
    if (sizesChecked.length > 0) {
      let newProducts = [];
  
      filteredProducts.forEach((product) => {
        let matchingSubProducts = product.subProducts.filter((subProduct) =>
          subProduct.sizes.some(
            (s) => sizesChecked.includes(s.size) && (colorsChecked.length === 0 || colorsChecked.includes(subProduct.color.color))
          )
        );
  
        if (matchingSubProducts.length > 0) {
          matchingSubProducts.forEach((subProduct) => {
            sizesChecked.forEach((size) => {
              let sizeIndex = subProduct.sizes.findIndex(s => s.size === size);
              if(sizeIndex >= 0){
                let newProduct = { ...product };
                let style = product.subProducts.indexOf(subProduct);
                let mode = sizeIndex !== -1 ? sizeIndex : 0;
      
                newProduct.quantity = subProduct.sizes[mode].qty;
                newProduct.style = style;
                newProduct.mode = mode;
                newProduct.color = subProduct.color?.color ?? "";
                newProduct.size = subProduct.sizes[mode]?.size ?? "";
      
                newProducts.push(newProduct);
              }
            })
          });
        }
      });
  
      filteredProducts = newProducts;
    }
  
    if (priceChecked) {
      filteredProducts = filteredProducts.filter((product) =>
        product.subProducts.some((p) =>
          p.sizes.some(
            (s) => s.price >= valuePrice.min && s.price <= valuePrice.max
          )
        )
      );
    }
  
    setLocalProducts(filteredProducts);
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
              onClick={() => {
                setRadioValue(sub.slug), setSubCategoryName(sub.name);
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
              {localProducts.length == 0 ? (
                <span>Співпадінь не знайдено</span>
              ) : (
                <></>
              )}
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
               style={{
                fontWeight: showSideBlock ? "500" : "800",
              }}
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
                    <button
                      className={styles.btn}
                      onClick={clearFiltersHandler}
                    >
                      Скинути всі фільтри
                    </button>
                  </div>
                  <Accordion
                    flush
                    alwaysOpen
                    defaultActiveKey={accordionKeys}
                    className={styles.accordion}
                  >
                    <Accordion.Item
                      eventKey={"brands"}
                      className={styles.accordion__item}
                    >
                      <Accordion.Header
                        className={styles.accordion__item_header}
                      >
                        <span>Бренд&nbsp;</span>
                        {brands.length > units ? (
                          <span style={{ color: "rgba(34, 15, 75, 0.6)" }}>
                            ({brands.length})
                          </span>
                        ) : (
                          <></>
                        )}
                      </Accordion.Header>
                      <Accordion.Body className={styles.accordion__item_body}>
                        {brands.length > units ? (
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
                          style={{
                            overflowY:
                              brands.length > units ? "scroll" : "hidden",
                          }}
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
                                onChange={() =>
                                  replaseSearchParamsQuery(
                                    brandsChecked,
                                    setBrandsChecked,
                                    brand
                                  )
                                }
                                checked={
                                  brandsChecked.findIndex(
                                    (el) => el == brand
                                  ) !== -1
                                    ? true
                                    : false
                                }
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
                      eventKey={"prices"}
                      className={styles.accordion__item}
                    >
                      <Accordion.Header
                        className={styles.accordion__item_header}
                      >
                        <span>Ціна</span>
                      </Accordion.Header>
                      <Accordion.Body className={styles.accordion__item_body}>
                        <RangeSlider
                          min={minPrice}
                          max={maxPrice}
                          step={1}
                          value={valuePrice}
                          onChange={setValuePrice}
                          setPriceChecked={setPriceChecked}
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
                            checked={priceChecked}
                            onChange={(e) => {
                              setPriceChecked(e.target.checked ? true : false);
                            }}
                          />
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                    {colors.length > 0 ? (
                      <Accordion.Item
                        eventKey={"colors"}
                        className={styles.accordion__item}
                      >
                        <Accordion.Header
                          className={styles.accordion__item_header}
                        >
                          <span>Колір&nbsp;</span>
                          {colors.length > units ? (
                            <span style={{ color: "rgba(34, 15, 75, 0.6)" }}>
                              ({colors.length})
                            </span>
                          ) : (
                            <></>
                          )}
                        </Accordion.Header>
                        <Accordion.Body className={styles.accordion__item_body}>
                          {colors.length > units ? (
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
                            style={{
                              overflowY:
                                colors.length > units ? "scroll" : "hidden",
                            }}
                            className={styles.group}
                          >
                            {colors.map((color, i) => (
                              <Form.Check
                                key={`color-${i}`}
                                type="checkbox"
                                className={styles.checkbox}
                              >
                                <Form.Check.Input
                                  className={styles.checkbox_box}
                                  type="checkbox"
                                  onChange={() =>
                                    replaseSearchParamsQuery(
                                      colorsChecked,
                                      setColorsChecked,
                                      color
                                    )
                                  }
                                  checked={
                                    colorsChecked.findIndex(
                                      (el) => el == color
                                    ) !== -1
                                      ? true
                                      : false
                                  }
                                />
                                <Form.Check.Label
                                  className={styles.checkbox_label}
                                >
                                  {color}
                                </Form.Check.Label>
                              </Form.Check>
                            ))}
                          </Form.Group>
                        </Accordion.Body>
                      </Accordion.Item>
                    ) : (
                      <></>
                    )}
                    {sizes.length > 0 ? (
                      <Accordion.Item
                        eventKey={"sizes"}
                        className={styles.accordion__item}
                      >
                        <Accordion.Header
                          className={styles.accordion__item_header}
                        >
                          <span>Бренд&nbsp;</span>
                          {brands.length > units ? (
                            <span style={{ color: "rgba(34, 15, 75, 0.6)" }}>
                              ({brands.length})
                            </span>
                          ) : (
                            <></>
                          )}
                        </Accordion.Header>
                        <Accordion.Body className={styles.accordion__item_body}>
                          {sizes.length > units ? (
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
                            style={{
                              overflowY:
                                sizes.length > units ? "scroll" : "hidden",
                            }}
                            className={styles.group}
                          >
                            {sizes.map((size, i) => (
                              <Form.Check
                                key={`size-${i}`}
                                type="checkbox"
                                className={styles.checkbox}
                              >
                                <Form.Check.Input
                                  className={styles.checkbox_box}
                                  type="checkbox"
                                  onChange={() =>
                                    replaseSearchParamsQuery(
                                      sizesChecked,
                                      setSizesChecked,
                                      size
                                    )
                                  }
                                  checked={
                                    sizesChecked.findIndex(
                                      (el) => el == size
                                    ) !== -1
                                      ? true
                                      : false
                                  }
                                />
                                <Form.Check.Label
                                  className={styles.checkbox_label}
                                >
                                  {size}
                                </Form.Check.Label>
                              </Form.Check>
                            ))}
                          </Form.Group>
                        </Accordion.Body>
                      </Accordion.Item>
                    ) : (
                      <></>
                    )}
                    {sideBlockData.map((d, i) =>
                      d.fields.map((field, j) => (
                        <Accordion.Item
                          eventKey={field.name}
                          key={field.name}
                          className={styles.accordion__item}
                        >
                          <Accordion.Header
                            className={styles.accordion__item_header}
                          >
                            <span>{field.name}&nbsp;</span>
                            {field.values.length > units ? (
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
                            {field.values.length > units ? (
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
                              style={{
                                overflowY:
                                  field.values.length > units
                                    ? "scroll"
                                    : "hidden",
                              }}
                              className={styles.group}
                            >
                              {field.values.map((value, j) => (
                                <Form.Check
                                  key={value}
                                  type="checkbox"
                                  className={styles.checkbox}
                                >
                                  <Form.Check.Input
                                    className={styles.checkbox_box}
                                    type="checkbox"
                                    onChange={() =>
                                      replaseSideBarSearchParamsQuery(
                                        field.name,
                                        value
                                      )
                                    }
                                    checked={
                                      sideBarChecked
                                        .find(
                                          (el) => el.fieldName === field.name
                                        )
                                        ?.values.includes(value)
                                        ? true
                                        : false
                                    }
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
                {localProducts.map((p, i) => (
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

  //--------------------------------------------------------->>

  let subcategoryIds = subcategories.map((subcategory) => subcategory._id);

  let brands = await Product.distinct("brand", {
    subCategories: {
      $in: subcategoryIds,
    },
  });

  let colors = await Product.distinct("subProducts.color.color", {
    subCategories: {
      $in: subcategoryIds,
    },
    "subProducts.color.color": { $ne: "" },
  });

  let sizes = await Product.distinct("subProducts.sizes.size", {
    subCategories: {
      $in: subcategoryIds,
    },
    "subProducts.sizes.size": { $ne: "" },
  });

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
    { $match: { "subCategories.slug": sub } },
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
  if (cheapestPrice === null) cheapestPrice = 0;
  if (mostExpensivePrice === null) mostExpensivePrice = 0;

  const categories = products.reduce((acc, product) => {
    product.details.forEach((detail) => {
      const groupName = detail.group;
      let fields = acc[groupName]?.fields || {};
      detail.fields.forEach((field) => {
        if (field.isMain) {
          if (!fields[field.name]) {
            fields[field.name] = [];
          }
          if (field.value) {
            fields[field.name].push(field.value);
          }
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

  //--------------------------------------------------------->>

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
      brands: JSON.parse(JSON.stringify(brands)),
      colors: JSON.parse(JSON.stringify(colors)),
      sizes: JSON.parse(JSON.stringify(sizes)),
      products: JSON.parse(JSON.stringify(newProducts)),
      minPrice: cheapestPrice,
      maxPrice: mostExpensivePrice,
      sideBlockData: JSON.parse(JSON.stringify(groupFields)),
    },
  };
}
