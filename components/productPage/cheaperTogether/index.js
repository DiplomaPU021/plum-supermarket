import ChevronLeft from "@/components/icons/ChevronLeft";
import ChevronRight from "@/components/icons/ChevronRight";
import CartIcon from "@/components/icons/CartIcon";
import ProductCard from "@/components/productCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Image, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import styles from "./styles.module.scss";

// import Swiper and modules styles
import "swiper/css";
import "swiper/css/pagination";

export default function CheaperTogether({ product, productsPlus }) {
  return (
    <Container fluid className={styles.cheapTwo}>
      <div className={styles.cheapTwo__title}>
        <span>Разом дешевше</span>
      </div>
      <div className={styles.cheapTwo__simillarswiper}>
        <div
          className={`${styles.chevronL}  swiper-button image-swiper-button-prev`}
        >
          <ChevronLeft fillColor="#70BF63" w="60px" h="60px" />
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={60}
          navigation={{
            nextEl: ".image-swiper-button-next",
            prevEl: ".image-swiper-button-prev",
            disabledClass: "swiper-button-disabled",
          }}
          modules={[Navigation]}
          style={{
            padding: "10px 0 10px 10px",
          }}
        >
          {productsPlus.map((prod, i) => (
            <SwiperSlide
              className={styles.cheapTwo__simillarswiper_slide}
              key={i}
            >
              <div  style={{maxWidth: "335px"}}>
                <ProductCard product={product} />
              </div>
              <Image
                className={styles.cheapTwo__signPlus}
                src="../../../icons/plusDark.png"
                alt=""
              />
              <div  style={{maxWidth: "335px"}}>
                <ProductCard product={prod} />
              </div>
              <Image
                className={styles.cheapTwo__signEqual}
                src="../../../icons/equalDark.png"
                alt=""
              />
              <div className={styles.shipping}>
                <span>Безкоштовна доставка</span>
              </div>
              <Col className={styles.cheapTwo__simillarswiper_summary}>
                <div className={styles.cheapTwo__simillarswiper_summary_price}>
                  {/* TODO calculate price below */}
                  <span>82034.88 ₴</span>
                </div>
                <div className={styles.cheapTwo__simillarswiper_summary_buy}>
                  {/* TODO add to cart*/}
                  <button
                  // onClick={() => {
                  //   addToCartHandler();
                  // }}
                  >
                    <CartIcon fillColor="#FAF8FF" />
                    <span>Купити комплект</span>
                  </button>
                </div>
                <div className={styles.cheapTwo__simillarswiper_summary_code}>
                  {/* TODO code*/}
                  <span>Код комплекту: 423424204802842-322</span>
                </div>
              </Col>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className={`${styles.chevronR}  swiper-button image-swiper-button-next`}
        >
          <ChevronRight fillColor="#70BF63" w="60px" h="60px" />
        </div>
      </div>
    </Container>
  );
}
