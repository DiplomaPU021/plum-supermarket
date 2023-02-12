import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles.module.scss";
import { useState } from "react";
import Image from "react-bootstrap/Image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper and modules styles
import "swiper/css";
import "swiper/css/pagination";

import { Navigation } from "swiper";
import ChevronRight from "@/components/icons/ChevronRight";
import ChevronLeft from "@/components/icons/ChevronLeft";
import { Container, Row, Col } from "react-bootstrap";

export default function MainSwiper({ product, setActive }) {
  const [activeImg, setActiveImg] = useState("");
  const router = useRouter();
  return (
    <Container fluid className={styles.swiper}>
      <Row className={styles.swiper__photoBox}>
        <Image
          className={styles.swiper__photoBox_image}
          src={activeImg || product.images[0].url}
          alt=""
        />
      </Row>
      <Row>
        <Col className={styles.swiper__line}></Col>
      </Row>
      <Row className={styles.swiper__simillarswiper}>
        <div
          className={`${styles.swiper__simillarswiper_col} swiper-button image-swiper-button-prev`}
        >
          <ChevronLeft fillColor="#5D8C52"   w="30px" h="30px"/>
        </div>
        <Col>
          <Swiper
            className={styles.swiper__simillarswiper_swip}
            slidesPerView={5}
            spaceBetween={30}
            navigation={{
              nextEl: ".image-swiper-button-next",
              prevEl: ".image-swiper-button-prev",
              disabledClass: "swiper-button-disabled",
            }}
            modules={[Navigation]}
          >
            {product.images.map((img, i) => (
              <SwiperSlide key={i}>
                <Image
                  className={styles.swiper__simillarswiper_image}
                  src={img.url}
                  alt=""
                  onClick={() => setActiveImg(img.url)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Col>
        <div
          className={`${styles.swiper__simillarswiper_col} swiper-button image-swiper-button-prev`}
        >
          <ChevronRight fillColor="#5D8C52"   w="30px" h="30px"/>
        </div>
      </Row>
      {product.discount ? (
        <div className={styles.swiper__discount}>-{product.discount}%</div>
      ) : (
        ""
      )}
      {product.colors[0] ? (
        <div className={styles.swiper__colors}>
          {product.colors.map((color, i) => (
            <span
              key={i}
              className={i == router.query.style ? styles.active : ""}
              onMouseOver={() =>
                setActiveImg(product.subProducts[i].images[0].url)
              }
              onMouseLeave={() => setActiveImg("")}
              onClick={() => setActive(i)}
            >
              <Link href={`/product/${product.slug}?style=${i}`}>
                <Image src={color.image} alt={color.image} key={i} />
              </Link>
            </span>
          ))}
        </div>
      ) : (
        ""
      )}
    </Container>
  );
}
