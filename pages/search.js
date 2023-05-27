import styles from "../styles/subCategory.module.scss";
import Header from "@/components/header";
import ViewedProducts from "@/components/viewedProducts";
import "bootstrap/dist/css/bootstrap.min.css";
import { getCountryData } from "@/utils/country";
import { useEffect, useState } from "react";
import Footer from "@/components/footer";
import LightPlumIcon from "@/components/icons/LightPlumIcon";
import GreenChevronRight from "@/components/icons/ChevronRight";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { Container, Row, Col, Accordion, Form } from "react-bootstrap";
import db from "../utils/db";
import Brands from "@/components/brands/indes";
import Product from "@/models/Product";
import ProductCard from "@/components/productCard";
import LoopIcon from "@/components/icons/LoopIcon";
import RangeSlider from "@/components/range";
import { useRouter } from "next/router";

export default function Search({
  country,
  searchText,
  brands,
  colors,
  sizes,
  products,
  minPrice,
  maxPrice,
}) {
  const MAX_BRANDS = 10;
  const brandsToDisplay =
    brands.length > MAX_BRANDS ? brands.slice(0, MAX_BRANDS) : brands;

  const router = useRouter();

  const filter = ({ text, brand, color, size, price }) => {
    const path = router.pathname;
    const { query } = router;
    if (text) query.text = text;
    if (brand) query.brand = brand;
    if (color) query.color = color;
    if (size) query.size = size;
    if (price) query.price = price;
    router.push({
      pathname: path,
      query: query,
    });
  };

  const priceQuery = router.query.price?.split("_") || "";
  const [valuePrice, setValuePrice] = useState({
    min: Number(priceQuery[0]) || minPrice,
    max: Number(priceQuery[1]) || maxPrice,
  });
  const [priceChacked, setPriceChecked] = useState(false);

  const priceHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let newPrice = "";
    if (e.target.checked) {
      let min = valuePrice.min;
      let max = valuePrice.max;
      newPrice = `${min}_${max}`;
    } else {
      router.query.price ? (router.query.price = "") : null;
    }
    filter({ price: newPrice });
  };

  const brandHandler = (brand) => {
    filter({ brand });
  };

  const sizeHandler = (size) => {
    filter({ size });
  };

  const colorHandler = (color) => {
    filter({ color });
  };

  function replaseQuery(queryName, value) {
    const existedQuery = router.query[queryName];
    const valueCheck = existedQuery?.search(value);
    const _check = existedQuery?.search(`_${value}`);
    let result = "";

    if (existedQuery) {
      if (existedQuery == value) {
        result = {};
      } else {
        if (valueCheck !== -1) {
          if (_check !== -1) {
            result = existedQuery?.replace(`_${value}`, "");
          } else if (valueCheck == 0) {
            result = existedQuery?.replace(`${value}_`, "");
          } else {
            result = existedQuery?.replace(value, "");
          }
        } else {
          result = `${existedQuery}_${value}`;
        }
      }
    } else {
      result = value;
    }
    return {
      result,
      active: existedQuery && valueCheck !== -1 ? true : false,
    };
  }

  const clearSearchHandler = () => {
    router.push(`/search?text=${searchText}`);
  };

  //--------------------------------------------------------->>

  const [searchBrand, setSearchBrand] = useState("");
  const [searchColor, setSearchColor] = useState("");
  const [searchSize, setSearchSize] = useState("");

  const searchBrandHandler = () => {
    setLocalBrands(searchByParam(brands, searchBrand));
  };
  const searchColorHandler = () => {
    setLocalColors(searchByParam(colors, searchColor));
  };
  const searchSizeHandler = () => {
    setLocalSizes(searchByParam(sizes, searchSize));
  };

  function searchByParam(arr, searchWord) {
    const sorted = arr.sort((a, b) => {
      if (a.includes(searchWord) && !b.includes(searchWord)) {
        return -1;
      } else if (!a.includes(searchWord) && b.includes(searchWord)) {
        return 1;
      } else if (a.includes(searchWord) && b.includes(searchWord)) {
        return a.localeCompare(b);
      } else {
        return 0;
      }
    });
    return (arr = [...sorted]);
  }

  //--------------------------------------------------------->>

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

  const [valueSort, setValueSort] = useState("byRating");
  const [showSideBlock, setShowSideBlock] = useState(true);
  const [numCards, setNumCards] = useState(3);
  const [units, setUnits] = useState(10);

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
        sortedProducts = products.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });
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

  //--------------------------------------------------------->>

  return (
    <Container fluid className={styles.subcategorypage}>
      <Header country={country} />
      <Row className={styles.subcategorypage__links}>
        <Col style={{ padding: "0" }}>
          <Link href="/">
            <LightPlumIcon />
            <GreenChevronRight fillColor="#70BF63" w="30px" h="30px" />
          </Link>
          <span className={styles.subcategorypage__links_link}>Пошук</span>
        </Col>
      </Row>
      <Row className={styles.subcategorypage__title}>
        <span>
          {searchText.length == 0
            ? "Всі товари"
            : products.length > 0
            ? searchText.substring(0, 25)
            : "Співпадінь не знайдено"}
        </span>
      </Row>
      <Brands brands={brandsToDisplay} />
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
                valueSort === `${"byPriceLowest"}` ||
                valueSort === `${"byPriceBiggest"}`
                  ? "800"
                  : "500",
            }}
            onChange={(e) => {
              handlerSortChanged(e.target.value), setValueSort(e.target.value);
            }}
          >
            <option>Сортування за ціною</option>
            <option value="byPriceLowest">Від дешевих до дорогих</option>
            <option value="byPriceBiggest">Від дорогих до дешевих</option>
          </select>
          <button
            //TODO filter !!!
            onClick={() => {
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
                <button className={styles.btn} onClick={clearSearchHandler}>
                  Скинути всі фільтри
                </button>
              </div>
              <Accordion
                flush
                alwaysOpen
                defaultActiveKey={["brands", "prices", "colors", "sizes"]}
                className={styles.accordion}
              >
                {brands.length ? (
                  <Accordion.Item
                    eventKey={"brands"}
                    className={styles.accordion__item}
                  >
                    <Accordion.Header className={styles.accordion__item_header}>
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
                          <input
                            type="text"
                            placeholder="Пошук"
                            value={searchBrand}
                            onChange={(e) => {
                              setSearchBrand(e.target.value);
                              searchByParam(brands, searchBrand);
                            }}
                          />
                          <button onClick={() => searchBrandHandler()}>
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
                        {brands.map((brand, i) => {
                          const checkb = replaseQuery("brand", brand);
                          return (
                            <Form.Check
                              key={`brand-${i}`}
                              type="checkbox"
                              className={styles.checkbox}
                            >
                              <Form.Check.Input
                                className={styles.checkbox_box}
                                type="checkbox"
                                checked={checkb.active}
                                onChange={() => brandHandler(checkb.result)}
                              />
                              <Form.Check.Label
                                className={styles.checkbox_label}
                              >
                                {brand}
                              </Form.Check.Label>
                            </Form.Check>
                          );
                        })}
                      </Form.Group>
                    </Accordion.Body>
                  </Accordion.Item>
                ) : (
                  <></>
                )}
                <Accordion.Item
                  eventKey={"prices"}
                  className={styles.accordion__item}
                >
                  <Accordion.Header className={styles.accordion__item_header}>
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
                        Від{" "}
                        <span>
                          {Number(valuePrice.min).toLocaleString("uk-UA")}
                        </span>{" "}
                        &#8372;
                      </div>
                      <span style={{ color: "#220F4B", fontWeight: "bold" }}>
                        &#8211;
                      </span>
                      <div>
                        До{" "}
                        <span>
                          {Number(valuePrice.max).toLocaleString("uk-UA")}
                        </span>{" "}
                        &#8372;
                      </div>
                      <Form.Check.Input
                        className={styles.checkbox_box}
                        type="checkbox"
                        checked={priceChacked}
                        onChange={(e) => {
                          e.preventDefault();
                          setPriceChecked(e.target.checked ? true : false),
                          // priceHandler(e.target.checked);
                          priceHandler(e);
                        }}
                      />
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                {colors.length ? (
                  <Accordion.Item
                    eventKey={"colors"}
                    className={styles.accordion__item}
                  >
                    <Accordion.Header className={styles.accordion__item_header}>
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
                          <input
                            type="text"
                            value={searchColor}
                            placeholder="Пошук"
                            onChange={(e) => {
                              setSearchColor(e.target.value),
                                searchByParam(colors, searchColor);
                            }}
                          />
                          <button onClick={() => searchColorHandler()}>
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
                        {colors.map((color, i) => {
                          const checkc = replaseQuery("color", color);
                          return (
                            <Form.Check
                              key={`color-${i}`}
                              type="checkbox"
                              className={styles.checkbox}
                            >
                              <Form.Check.Input
                                className={styles.checkbox_box}
                                type="checkbox"
                                checked={checkc.active}
                                onChange={() => colorHandler(checkc.result)}
                              />
                              <Form.Check.Label
                                className={styles.checkbox_label}
                              >
                                {color}
                              </Form.Check.Label>
                            </Form.Check>
                          );
                        })}
                      </Form.Group>
                    </Accordion.Body>
                  </Accordion.Item>
                ) : (
                  <></>
                )}
                {sizes.length ? (
                  <Accordion.Item
                    eventKey={"sizes"}
                    className={styles.accordion__item}
                  >
                    <Accordion.Header className={styles.accordion__item_header}>
                      <span>Розмір&nbsp;</span>
                      {sizes.length > units ? (
                        <span style={{ color: "rgba(34, 15, 75, 0.6)" }}>
                          ({sizes.length})
                        </span>
                      ) : (
                        <></>
                      )}
                    </Accordion.Header>
                    <Accordion.Body className={styles.accordion__item_body}>
                      {sizes.length > units ? (
                        <div className={styles.search_field}>
                          <input
                            type="text"
                            value={searchSize}
                            placeholder="Пошук"
                            onChange={(e) => {
                              setSearchSize(e.target.value),
                                searchByParam(sizes, searchSize);
                            }}
                          />
                          <button onClick={() => searchSizeHandler()}>
                            <LoopIcon fillColor="#FAF8FF" />
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                      <Form.Group
                        controlId="formBasicCheckbox"
                        style={{
                          overflowY: sizes.length > units ? "scroll" : "hidden",
                        }}
                        className={styles.group}
                      >
                        {sizes.map((size, i) => {
                          const checks = replaseQuery("size", size);
                          return (
                            <Form.Check
                              key={`size-${i}`}
                              type="checkbox"
                              className={styles.checkbox}
                            >
                              <Form.Check.Input
                                className={styles.checkbox_box}
                                type="checkbox"
                                checked={checks.active}
                                onChange={() => sizeHandler(checks.result)}
                              />
                              <Form.Check.Label
                                className={styles.checkbox_label}
                              >
                                {size}
                              </Form.Check.Label>
                            </Form.Check>
                          );
                        })}
                      </Form.Group>
                    </Accordion.Body>
                  </Accordion.Item>
                ) : (
                  <></>
                )}
              </Accordion>
            </Col>
          </Col>
        ) : (
          <></>
        )}
        <Col>
          <Row
            className={styles.subcategorypage__row_cards}
            lg={showSideBlock ? numCards : numCards + 1}
            style={{ paddingLeft: showSideBlock ? "0" : "50px" }}
          >
            {products.map((p, i) => (
              <Col key={i} className={styles.colp}>
                <ProductCard product={p} style={p.style} mode={p.mode} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <ViewedProducts />
      <Footer country={country} />
    </Container>
  );
}

export async function getServerSideProps({ query }) {
  const countryData = await getCountryData();
  let searchQuery = query.text || "";
  const priceQuery = query.price?.split("_") || "";

  const brandQuery = query.brand?.split("_") || "";
  const brandRegex = `^${brandQuery[0]}`;
  const brandSearchRegex = createRegex(brandQuery, brandRegex);

  const sizeQuery = query.size?.split("_") || "";
  const sizeRegex = `^${sizeQuery[0]}`;
  const sizeSearchRegex = createRegex(sizeQuery, sizeRegex);

  const colorQuery = query.color?.split("_") || "";
  const colorRegex = `^${colorQuery[0]}`;
  const colorSearchRegex = createRegex(colorQuery, colorRegex);

  const search =
    searchQuery && searchQuery !== ""
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};

  const brand =
    brandQuery && brandQuery !== ""
      ? {
          brand: {
            $regex: brandSearchRegex,
            $options: "i",
          },
        }
      : {};

  const size =
    sizeQuery && sizeQuery !== ""
      ? {
          "subProducts.sizes.size": {
            $regex: sizeSearchRegex,
            $options: "i",
          },
        }
      : {};

  const color =
    colorQuery && colorQuery !== ""
      ? {
          "subProducts.color.color": {
            $regex: colorSearchRegex,
            $options: "i",
          },
        }
      : {};

  const price =
    priceQuery && priceQuery !== ""
      ? {
          "subProducts.sizes.price": {
            $gte: Number(priceQuery[0]) || 0,
            $lte: Number(priceQuery[1]) || Infinity,
          },
        }
      : {};

  //--------------------------------------------------------->>

  function createRegex(data, styleRegex) {
    if (data.length > 1) {
      for (var i = 1; i < data.length; i++) {
        styleRegex += `|^${data[i]}`;
      }
    }
    return styleRegex;
  }

  //--------------------------------------------------------->>

  await db.connectDb();

  let products = await Product.find({
    ...search,
    ...brand,
    ...size,
    ...color,
    ...price,
  }).lean();

  let brands = await Product.distinct("brand", {
    name: {
      $regex: searchQuery,
      $options: "i",
    },
  });

  let colors = await Product.distinct("subProducts.color.color", {
    name: {
      $regex: searchQuery,
      $options: "i",
    },
  });

  let sizes = await Product.distinct("subProducts.sizes.size", {
    name: {
      $regex: searchQuery,
      $options: "i",
    },
    "subProducts.sizes.size": { $ne: "" },
  });

  const prodsForPrices = await Product.find().lean();
  let minPrice = prodsForPrices[0].subProducts[0].sizes[0].price;
  let maxPrice = 0;
  prodsForPrices.forEach((product) => {
    product.subProducts.forEach((subProduct) => {
      subProduct.sizes.forEach((size) => {
        if (size.price <= minPrice) {
          minPrice = size.price;
        }
        if (size.price >= maxPrice) {
          maxPrice = size.price;
        }
      });
    });
  });

  let newProducts = []
  if(colorQuery.length  > 0 || sizeQuery.length > 0){
    if (colorQuery.length > 0) {
      let filteredProducts = [];
  
      products.forEach((product) => {
        let matchingSubProducts = product.subProducts.filter((subProduct) => {
          return colorQuery.includes(subProduct.color?.color);
        });
  
        if (matchingSubProducts.length > 0) {
          matchingSubProducts.forEach((subProduct) => {
            let newProduct = { ...product };
            let style = product.subProducts.indexOf(subProduct);
            let sizeIndex = subProduct.sizes.findIndex(s => sizeQuery.includes(s.size));
            let mode = sizeIndex !== -1 ? sizeIndex : 0;
  
            newProduct.quantity = subProduct.sizes[mode].qty;
            newProduct.style = style;
            newProduct.mode = mode;
            newProduct.color = subProduct.color?.color ?? "";
            newProduct.size = subProduct.sizes[mode]?.size ?? "";
  
            filteredProducts.push(newProduct);
          });
        }
      });
  
      newProducts = filteredProducts;
    }
  
    if (sizeQuery.length > 0) {
      let filteredProducts = [];
  
      products.forEach((product) => {
        let matchingSubProducts = product.subProducts.filter((subProduct) =>
          subProduct.sizes.some(
            (s) => sizeQuery.includes(s.size) && (colorQuery.length === 0 
              || colorQuery.includes(subProduct.color.color))
          )
        );
  
        if (matchingSubProducts.length > 0) {
          matchingSubProducts.forEach((subProduct) => {
            sizeQuery.forEach((size) =>{
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
      
                filteredProducts.push(newProduct);
              }
            })
          });
        }
      });
  
      newProducts = filteredProducts;
    }
  }else{
    newProducts = products.map((product) => {
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
  }


  await db.disconnectDb();
  return {
    props: {
      country: countryData,
      searchText: searchQuery,
      brands: JSON.parse(JSON.stringify(brands)),
      colors: JSON.parse(JSON.stringify(colors)),
      sizes: JSON.parse(JSON.stringify(sizes)),
      products: JSON.parse(JSON.stringify(newProducts)),
      minPrice: minPrice,
      maxPrice: maxPrice,
    },
  };
}
