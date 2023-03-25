import styles from "../../styles/comparison.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getCountryData } from "@/utils/country";
import db from "@/utils/db";
import Product from "@/models/Product";
import { useState } from "react";
import Popular from "@/components/popular";
import ComparisonCard from "@/components/comparisonCard";
import DeleteIcon from "@/components/icons/DeleteIcon";
import InfoModal from "./InfoModal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";

export default function ComparisonPage({ products, country }) {
  const [checked, setChecked] = useState(false);
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  return (
    <Container fluid className={styles.comparison}>
      <Header country={country} />
      <Row className={styles.comparison__title}>
        <Col className={styles.comparison__title_name}>
          <span>Порівнюємо ноутбуки</span>
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
        <Col
          style={{ padding: "0", display: "flex", border: "2px solid green" }}
        >
          <Col className={styles.comparison__cards_empty}>
            <button className={styles.btnscales}>
              <img src="../icons/plus_green.png" alt="" />
            </button>
            <span>Додати до порівняння </span>
            <div className={styles.line}></div>
            <div>
              <span>Очистити все</span>
              <button className={styles.btnscales}>
                <DeleteIcon fillColor={"#220F4B"} />
              </button>
            </div>
          </Col>
        </Col>
        <Swiper
          style={{ 
            padding: "0",
            display: "grid", 
            border: "2px solid blue",
           }}
          slidesPerView={3}
          spaceBetween={0}
          navigation={{
            prevEl: ".image-swiper-button-prev",
            nextEl: ".image-swiper-button-next",
            disabledClass: "swiper-button-disabled",
          }}
          loop={true}
          modules={[Navigation]}
        >
          {products.map((p, i) => (
            <SwiperSlide key={i}>
              <Col
                style={{
                  padding: "0",
                  display: "flex",
                }}
              >
                <ComparisonCard product={p} />
              </Col>
            </SwiperSlide>
          ))}
        </Swiper>
      </Row>
      <Accordion
        flush
        alwaysOpen
        defaultActiveKey="0"
        className={styles.accordion}
      >
        <Accordion.Item eventKey="0" className={styles.accordion__item}>
          <Accordion.Header className={styles.accordion__item_header}>
            <span>First Name</span>
          </Accordion.Header>
          <Accordion.Body className={styles.accordion__item_body}>
            <InfoModal
              show={show}
              onHide={toggleShow}
              title={"title"}
              info={"info"}
            />
            <table>
              <tbody>
                <tr>
                  <td>
                    Кількість слотів для оперативної пам'яті
                    <img src="../../icons/help_light.png" alt="" />
                  </td>
                  <td>Восьмиядерний Apple M1</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>
                    Jacob
                    <img
                      src="../../icons/help_light.png"
                      alt=""
                      onMouseEnter={toggleShow}
                    />
                  </td>
                  <td>Thornton</td>
                  <td>
                    HD-камера FaceTime. 720p Технологія True
                    ToneSSD-накопичувач. PCIeTouch ID. Стереодинаміки. Широке
                    стерео. Підтримка відтворення контенту у форматі Dolby
                    Atmos. Система з трьох спрямованих мікрофонів. Клавіатура
                    Magic Keyboard з підсвіткою. Датчик зовнішньої освітленості.
                    Трекпад Force Touch
                  </td>
                  <td>trtrtr</td>
                </tr>
                <tr>
                  <td>
                    Larry the Bird
                    <img src="../../icons/help_light.png" alt="" />
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

  await db.connectDb();

  //TODO should be products for comparison
  let products = await Product.find().lean();

  await db.disconnectDb();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      country: countryData,
    },
  };
}
