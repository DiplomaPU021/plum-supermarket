import styles from "./style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import ChevronLeft from "../icons/ChevronLeft";
import ChevronRight from "../icons/ChevronRight";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import ProductCard from "../productCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ViewedProducts() {
  const [numCards, setNumCards] = useState(3);
  const viewedList = useSelector((state) => state.viewedList);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let newNumCards;
      if (screenWidth >= 1600) {
        newNumCards = 5;
      } else if (screenWidth >= 1400) {
        newNumCards = 4;
      } else {
        newNumCards = 3;
      }
      setNumCards(newNumCards);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container fluid className={styles.viewed}>
      <Row className={styles.viewed__title}>
        <span>Переглянуті товари</span>
      </Row>
      <Row className={styles.viewed__simillarswiper}>
        <Col
          className={`${styles.viewed__simillarswiper_chevron} swiper-button image-swiper-button-prev`}
        >
          <ChevronLeft fillColor="#70BF63" w="50px" h="50px" />
        </Col>
        <Col lg={11} className={styles.viewed__simillarswiper_swiper}>
          <Swiper
            slidesPerView={numCards}
            spaceBetween={0}
            navigation={{
              prevEl: ".image-swiper-button-prev",
              nextEl: ".image-swiper-button-next",
              disabledClass: "swiper-button-disabled",
            }}
            loop={true}
            modules={[Navigation]}
          >
            {viewedList.viewedListItems.map((p, i) => (
              <SwiperSlide key={i}>
                <Col style={{ padding: "0", display: "flex" }}>
                  <ProductCard product={p} style={p.style} mode={p.mode}/>
                </Col>
              </SwiperSlide>
            ))}
          </Swiper>
        </Col>
        <Col
          className={`${styles.viewed__simillarswiper_chevron} swiper-button image-swiper-button-next`}
        >
          <ChevronRight fillColor="#70BF63" w="50px" h="50px" />
        </Col>
      </Row>
    </Container>
  );
}
