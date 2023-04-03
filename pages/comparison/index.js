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

export default function ComparisonPage({ products, country, subCategory_id }) {
  const [checked, setChecked] = useState(false);
  const [showTooltip, setShowTooltop] = useState(false);

  const tooltipShow = () => setShowTooltop(!showTooltip);
  const target = useRef(null);
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

  const subCategory = scaleList.scaleListItems.find(
    (item) => item.subCategory_id === subCategory_id
  );
  // const [groupedProducts, setGroupedProducts] = useState({});
  // const [detailNames, setDetailNames] = useState([]);
  
  // useEffect(() => {
  //   const groups = subCategory.items.reduce((acc, product) => {
  //     product.details.forEach(detail => {
  //       if (!acc[detail.name]) {
  //         acc[detail.name] = [];
  //       }
  //       acc[detail.name].push(product);
  //     });
  //     return acc;
  //   }, {});

  //   const names = Object.keys(groups);
  //   setGroupedProducts(groups);
  //   setDetailNames(names);
  // }, [subCategory.items]);
  // console.log("prods", detailNames);

  const deleteGroupHadler = (subCategory) => {
    dispatch(removeFromScaleList({ ...subCategory }));
  };

  return (
    <Container fluid className={styles.comparison}>
      <Header country={country} />
      <Row className={styles.comparison__title}>
        <Col className={styles.comparison__title_name}>
          <span>
            Порівнюємо {subCategory ? subCategory.subCategoryName : ""}
          </span>
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
              <Link href={"/"}>
                <img src="../icons/plus_green.png" alt="" />
              </Link>
            </button>
            <span>Додати до порівняння </span>
            <div className={styles.line}></div>
            <div>
              <span>Очистити все</span>
              <button
                className={styles.btnscales}
                onClick={() => deleteGroupHadler(subCategory)}
              >
                <DeleteIcon fillColor={"#220F4B"} />
              </button>
            </div>
          </Col>
        </Col>
        <Col
          style={{ display: subCategory ? "block" : "none" }}
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
          >
            {subCategory
              ? subCategory.items.map((p, i) => (
                  <SwiperSlide
                    key={i}
                    style={{ position: "absolute !important" }}
                  >
                    <Col className={styles.col}>
                      <ComparisonCard product={p} />
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
        defaultActiveKey="0"
        style={{ display: subCategory ? "block" : "none" }}
        className={styles.accordion}
      >
        <Accordion.Item eventKey="0" className={styles.accordion__item}>
          <Accordion.Header className={styles.accordion__item_header}>
            <span>First Name</span>
          </Accordion.Header>
          {/* {subCategory.items.slice(0, numCards).map(( p, i) => (
            <Accordion.Body key={i} className={styles.accordion__item_body}>
              {console.log(p)}
              <Info
                target={target}
                show={showTooltip}
                setShow={setShowTooltop}
                title={"title"}
                info={"info"}
              />
              <table>
                <tbody>
                  <tr>
                    <td>
                     fg
                      <img
                        src="../../icons/help_light.png"
                        alt=""
                        onMouseEnter={tooltipShow}
                      />
                    </td>
                    <td>Восьмиядерний Apple M1</td>
                    <td>Otto</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>
                      Jacob
                      <img
                        src="../../icons/help_light.png"
                        alt=""
                        ref={target}
                        onMouseEnter={tooltipShow}
                      />
                    </td>
                    <td>Thornton</td>
                    <td>
                      HD-камера FaceTime. 720p Технологія True
                      ToneSSD-накопичувач. PCIeTouch ID. Стереодинаміки. Широке
                      стерео. Підтримка відтворення контенту у форматі Dolby
                      Atmos. Система з трьох спрямованих мікрофонів. Клавіатура
                      Magic Keyboard з підсвіткою. Датчик зовнішньої
                      освітленості. Трекпад Force Touch
                    </td>
                    <td>trtrtr</td>
                  </tr>
                  <tr>
                    <td>
                      Larry the Bird
                      <img
                        src="../../icons/help_light.png"
                        alt=""
                        onMouseEnter={tooltipShow}
                      />
                    </td>
                    <td>Larry the Bird</td>
                    <td>Larry the Bird</td>
                    <td>
                      2 х USB 3.2 Type-C Gen 2 (Thunderbolt 4)/2 x USB 3.2 Gen
                      1/HDMI/комбінований аудіороз'єм для
                      навушників/мікрофона/кардридер MicroSD
                    </td>
                  </tr>
                </tbody>
              </table>
            </Accordion.Body>
          ))} */}
        </Accordion.Item>
        <Accordion.Item eventKey="1" className={styles.accordion__item}>
          <Accordion.Header className={styles.accordion__item_header}>
            <span>First Name</span>
          </Accordion.Header>
          <Accordion.Body className={styles.accordion__item_body}>
            <table>
              <tbody>
                <tr>
                  <td>
                    Mark
                    <img src="../../icons/help_light.png" alt="" />
                  </td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>
                    Jacob
                    <img src="../../icons/help_light.png" alt="" />
                  </td>
                  <td>Thornton</td>
                  <td>Thornton</td>
                  <td>trtrtr</td>
                </tr>
                <tr>
                  <td>
                    Larry the Bird
                    <img src="../../icons/help_light.png" alt="" />
                  </td>
                  <td>Larry the Bird</td>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </Accordion.Body>
        </Accordion.Item>
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
  const subCategory_id = query.subCategory;

  await db.connectDb();

  //TODO should be products for component "View more"
  let products = await Product.find().lean();

  await db.disconnectDb();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      country: countryData,
      subCategory_id: subCategory_id,
    },
  };
}
