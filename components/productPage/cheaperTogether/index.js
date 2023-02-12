import ChevronLeft from "@/components/icons/ChevronLeft";
import ChevronRight from "@/components/icons/ChevronRight";
import ProductCard from "@/components/productCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";

// import Swiper and modules styles
import "swiper/css";
import "swiper/css/pagination";

import { Navigation } from "swiper";

export default function CheaperTogether({ product, productsPlus }) {
  return (
    <Container className={styles.cheapTwo}>
      <Row className={styles.cheapTwo__simillarswiper}>
        <div
          className={`${styles.cheapTwo__simillarswiper_col} swiper-button image-swiper-button-prev`}
        >
          <ChevronLeft fillColor="#70BF63"  w="60px" h="60px"/>
        </div>
        
        <ProductCard product={product} />
        <Image
          className={styles.cheapTwo__signPlus}
          src="../../../icons/plusDark.png"
          alt=""
        />
        <Swiper
         //
          slidesPerView={1}
          //spaceBetween={30}
          navigation={{
            nextEl: ".image-swiper-button-next",
            prevEl: ".image-swiper-button-prev",
            disabledClass: "swiper-button-disabled",
          }}
          modules={[Navigation]}
        >
          {productsPlus.map((prod, i) => (
            <SwiperSlide key={i}>
              <ProductCard product={prod} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Image
          className={styles.cheapTwo__signEqual}
          src="../../../icons/equalDark.png"
          alt=""
        />
        
        <div
          className={`${styles.cheapTwo__simillarswiper_col} swiper-button image-swiper-button-prev`}
        >
          <ChevronRight fillColor="#70BF63" w="60px" h="60px"/>
        </div>
      </Row>
    </Container>
  );
}
