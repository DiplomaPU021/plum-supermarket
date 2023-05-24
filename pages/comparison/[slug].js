import styles from "../../styles/comparison.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getCountryData } from "@/utils/country";
import db from "@/utils/db";
import Product from "@/models/Product";
import { useEffect, useRef, useState } from "react";
import Popular from "@/components/popular";
import ComparisonCard from "@/components/comparisonCard";
import DeleteIcon from "@/components/icons/DeleteIcon";
import Info from "./Info";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import ChevronLeft from "@/components/icons/ChevronLeft";
import ChevronRight from "@/components/icons/ChevronRight";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { removeFromScaleList } from "@/store/scaleListSlice";
import SubCategory from "@/models/SubCategory";
import GroupSubCategory from "@/models/GroupSubCategory";
import Category from "@/models/Category";

export default function ComparisonPage({
  products,
  country,
  subCategory,
  group_subcategory_slug,
}) {
  const [checked, setChecked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState(null);
  const targetRef = useRef(null);

  const handleMouseEnter = (data) => {
    setTooltipData({
      ...data,
    });
    setShowTooltip(true);
  };

  const dispatch = useDispatch();

  const [numCards, setNumCards] = useState(3);
  const [widthEmptyCard, setWidthEmptyCard] = useState(3);
  const [widthCards, setWidthCards] = useState(9);

  const scaleList = useSelector((state) => state.scaleList);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let newNumCards, newWidthEmptyCard, newWidthCards;
      if (screenWidth >= 1600) {
        newNumCards = 4;
        newWidthEmptyCard = 3;
        newWidthCards = 9;
      } else if (screenWidth >= 1400) {
        newNumCards = 3;
        newWidthEmptyCard = 3;
        newWidthCards = 9;
      } else {
        newNumCards = 2;
        newWidthEmptyCard = 4;
        newWidthCards = 8;
      }
      setNumCards(newNumCards);
      setWidthEmptyCard(newWidthEmptyCard);
      setWidthCards(newWidthCards);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [activeIndex, setActiveIdnex] = useState(0);
  const subCateg = scaleList.scaleListItems.find(
    (item) => item.subCategory_id === subCategory._id
  );

  const [groups, setGroups] = useState([]);
  const [groupsUniques, setGroupsUniques] = useState([]);

  useEffect(() => {
    if (subCateg && subCateg.items) {
      const categories = subCateg.items.reduce((acc, product) => {
        product.details.forEach((detail) => {
          const groupName = detail.group;
          let fields = acc[groupName]?.fields || {};

          detail.fields.forEach((field) => {
            fields[field.name] = fields[field.name] || [];
          });
          acc[groupName] = { group: groupName, fields };
        });
        return acc;
      }, {});

      const groupFields = Object.entries(categories)
        .map(([group, data]) => {
          const fields = Object.keys(data.fields).map((fieldName) => {
            const values = data.fields[fieldName];
            const uniqueValues = Array.from(new Set(values));
            return { name: fieldName, values: uniqueValues };
          });
          return { group, fields };
        })
        .map(({ group, fields }) => {
          const uniqueFields = Array.from(new Set(fields.map((f) => f.name)));
          const newFields = uniqueFields.map((name) => {
            const values = subCateg.items.map((item) => {
              const detail = item.details.find(
                (detail) => detail.group === group
              );
              if (!detail) {
                return "-";
              }
              const field = detail.fields.find((f) => f.name === name);
              if (!field) {
                return "-";
              }
              return field.value || "-";
            });
            return { name, values };
          });
          return { group, fields: newFields };
        });

      subCateg.items.forEach((product) => {
        if (product.color) {
          const colorField = groupFields[0].fields.find(
            (f) => f.name === "Колір"
          );
          if (!colorField) {
            groupFields[0].fields.push({
              name: "Колір",
              values: [product.color.color],
            });
          } else {
            colorField.values.push(product.color.color);
          }
        }
        if (product.size) {
          const sizeField = groupFields[0].fields.find(
            (f) => f.name === "Розмір"
          );
          if (!sizeField) {
            groupFields[0].fields.push({
              name: "Розмір",
              values: [product.size],
            });
          } else {
            sizeField.values.push(product.size);
          }
        }
      });

      const uniquesGroups = JSON.parse(JSON.stringify(groupFields));
      for (let i = uniquesGroups.length - 1; i >= 0; i--) {
        const fields = uniquesGroups[i].fields;
        let allSame = true;
        for (let j = 1; j < fields.length; j++) {
          const values1 = fields[j - 1].values;
          const values2 = fields[j].values;
          if (values1.length !== values2.length) {
            allSame = false;
            break;
          }
          for (let k = 0; k < values1.length; k++) {
            if (
              values1[k].trim().toLowerCase() !==
              values2[k].trim().toLowerCase()
            ) {
              allSame = false;
              break;
            }
          }
          if (!allSame) {
            break;
          }
        }
        if (allSame) {
          uniquesGroups.splice(i, 1);
        } else {
          for (let j = fields.length - 1; j >= 0; j--) {
            const values = fields[j].values;
            let allSame = true;
            for (let k = 1; k < values.length; k++) {
              if (
                values[k].trim().toLowerCase() !==
                values[0].trim().toLowerCase()
              ) {
                allSame = false;
                break;
              }
            }
            if (allSame) {
              if (fields.length === 1) {
                uniquesGroups.splice(i, 1);
              } else {
                fields.splice(j, 1);
              }
            }
          }
        }
      }

      setGroupsUniques(uniquesGroups);
      setGroups(groupFields);
    }
  }, [subCateg && subCateg.items]);

  const deleteGroupHadler = (subCateg) => {
    dispatch(removeFromScaleList({ ...subCateg }));
  };

  return (
    <Container fluid className={styles.comparison}>
      <Info
        showTooltip={showTooltip}
        setShowTooltip={setShowTooltip}
        tooltipData={tooltipData}
      />
      <Header country={country} />
      <Row className={styles.comparison__title}>
        <Col className={styles.comparison__title_name}>
          <span>Порівнюємо {subCateg ? subCateg.subCategoryName : ""}</span>
        </Col>
      </Row>
      <Row className={styles.comparison__parameters}>
        <span>Всі параметри</span>
        <Col className={styles.comparison__parameters_colbtns}>
          <button
            style={{ fontWeight: checked ? "800" : "500" }}
            id={`check-1`}
            type="checkbox"
            value={checked}
            checked={checked}
            onClick={() => setChecked(checked ? false : true)}
          >
            Тільки відмінності
          </button>
        </Col>
      </Row>
      <Row className={styles.comparison__cards}>
        <Col lg={widthEmptyCard} className={styles.colEmpty}>
          <Col className={styles.colEmpty__empty}>
            <button className={styles.btnscales}>
              <Link
                href={`/subCategory/${group_subcategory_slug}?sub=${subCategory.slug}`}
              >
                <img src="../icons/plus_green.png" alt="" />
              </Link>
            </button>
            <span>Додати до порівняння </span>
            <div className={styles.line}></div>
            <div>
              <span>Очистити все</span>
              <button
                className={styles.btnscales}
                onClick={() => deleteGroupHadler(subCateg)}
              >
                <DeleteIcon fillColor={"#220F4B"} />
              </button>
            </div>
          </Col>
        </Col>
        <Col
          style={{ display: subCateg ? "block" : "none" }}
          lg={widthCards}
          className={styles.row}
        >
          <button
            className={`${styles.btnl} swiper-button image-swiper-button-prev`}
          >
            <ChevronLeft fillColor="#220F4B" w="24" h="24" />
          </button>
          <Swiper
            slidesPerView={numCards}
            spaceBetween={0}
            navigation={{
              prevEl: ".image-swiper-button-prev",
              nextEl: ".image-swiper-button-next",
              disabledClass: "swiper-button-disabled",
            }}
            modules={[Navigation]}
            onActiveIndexChange={(swiper) => setActiveIdnex(swiper.activeIndex)}
          >
            {subCateg
              ? subCateg.items.map((p, i) => (
                  <SwiperSlide
                    key={i}
                    style={{ position: "absolute !important" }}
                  >
                    <Col className={styles.col}>
                      <ComparisonCard product={p} style={p.style} mode={p.mode} />
                    </Col>
                  </SwiperSlide>
                ))
              : null}
          </Swiper>
          <button
            className={`${styles.btnr} swiper-button image-swiper-button-next`}
          >
            <ChevronRight fillColor="#220F4B" w="24" h="24" />
          </button>
        </Col>
      </Row>
      <Accordion
        flush
        alwaysOpen
        defaultActiveKey={0}
        style={{ display: subCateg ? "block" : "none" }}
        className={styles.accordion}
      >
        {(checked ? groupsUniques : groups).map((p, i) => (
          <Accordion.Item
            eventKey={i}
            key={i}
            className={styles.accordion__item}
          >
            <Accordion.Header className={styles.accordion__item_header}>
              <span>{p.group || "Загальні характеристики"}</span>
            </Accordion.Header>
            <Accordion.Body className={styles.accordion__item_body}>
              <table>
                <tbody>
                  {p.fields.map((f, j) => (
                    <tr key={j}>
                      <td style={{ width: `${100 / (numCards + 1)}%` }}>
                        {f.name}
                        <img
                          data-tooltip-id="info-tooltip"
                          ref={targetRef}
                          src="../../icons/help_light.png"
                          alt=""
                          onClick={() => {
                            handleMouseEnter({
                              title: f.name,
                              info: "info",
                            });
                          }}
                        />
                      </td>
                      {f.values
                        .slice(
                          activeIndex,
                          numCards + activeIndex || f.values.length
                        )
                        .map((v, k) => (
                          <td
                            key={k}
                            // style={{ width: `${100 / (numCards + 1)}%` }}
                            style={{
                              width:
                                k + 1 === f.values.length &&
                                f.values.length < numCards + 1
                                  ? f.values.length === 1
                                    ? "80%"
                                    : `${100 / (f.values.length - 1)}%`
                                  : `${100 / (numCards + 1)}%`,
                            }}
                          >
                            {v}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      <Row className={styles.comparison__tables}></Row>
      <Popular title={"Подивіться ще"} products={products} />
      <Footer country={country} />
    </Container>
  );
}

export async function getServerSideProps(context) {
  const countryData = await getCountryData();
  const { query } = context;
  const slug = query.slug;
  
  const pageSize =  query.pageSize || 8;

  await db.connectDb();

  let subCategory = await SubCategory.findOne({ slug }).lean();
  let id = subCategory._id;
  let group_subcategory = await GroupSubCategory.findOne({
    _id: subCategory.parent,
  }).lean();
  let group_slug = group_subcategory.slug;

  //products for component "View more"
  let category = await SubCategory.findById(id)
    .populate({ path: "top_parent", model: Category })
    .populate({ path: "parent", model: GroupSubCategory })
    .lean();
    
  //Should be with mark "popular"
  let onlyFromCategory = await Product.find({
    category: category.top_parent._id,
  })
  .limit(pageSize)
  .lean();
  let newFromCategory = onlyFromCategory.map((product) => {
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
    let sold = product.subProducts[style].sold;
    let priceAfter = (
      ((100 - product.subProducts[style].discount) *
        product.subProducts[style].sizes[mode].price) /
      100
    ).toFixed();
    return {
      ...product,
      style,
      mode,
      color,
      size,
      sold,
      priceAfter,
    };
  });
  let popularFromCategory = [...newFromCategory].sort(
    (a, b) => b.sold - a.sold
  );

  await db.disconnectDb();

  return {
    props: {
      products: JSON.parse(JSON.stringify(popularFromCategory)),
      country: countryData,
      subCategory: JSON.parse(JSON.stringify(subCategory)),
      group_subcategory_slug: group_slug,
    },
  };
}
