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
import { Rating } from "react-simple-star-rating";
import LeaveFeedback from "../leaveFeedback";
import Star from "@/components/icons/Star";

export default function MainSwiper({ product, active, setActive }) {
  const [activeImg, setActiveImg] = useState(active);
  const [feedback, setFeedback] = useState(false);
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
      <Col className={styles.swiper__line}></Col>
      <Row className={styles.swiper__simillarswiper}>
        <Col
          lg={1}
          className={`${styles.swiper__simillarswiper_chevron} swiper-button image-swiper-button-prev`}
        >
          <ChevronLeft fillColor="#5D8C52" w="30px" h="30px" />
        </Col>
        <Col lg={10}>
          <Swiper
            slidesPerView={4}
            spaceBetween={12}
            navigation={{
              prevEl: ".image-swiper-button-prev",
              nextEl: ".image-swiper-button-next",
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
        <Col
          lg={1}
          className={`${styles.swiper__simillarswiper_chevron} swiper-button image-swiper-button-next`}
        >
          <ChevronRight fillColor="#5D8C52" w="30px" h="30px" />
        </Col>
      </Row>
      {product.discount ? (
        <div className={styles.swiper__discount}>-{product.discount}%</div>
      ) : (
        ""
      )}
      <Row className={styles.swiper__reviews}>
        {product.rating ? (
          <Col className={styles.swiper__reviews_stars}>
            <button onClick={() => setFeedback(true)}>Відгуки</button>
            <Rating
              readonly={true}
              size={30}
              allowFraction={2}
              initialValue={product.rating}
              ratingValue
              emptyIcon={
                <Star
                  fillColor="transparent"
                  height={24}
                  width={24}
                  stroke="#70BF63"
                />
              }
              fillIcon={
                <Star
                  fillColor="#220F4B"
                  height={24}
                  width={24}
                  stroke="#220F4B"
                />
              }
            />
          </Col>
        ) : null}
        <LeaveFeedback show={feedback} onHide={() => setFeedback(false)} />
      </Row>
      {product.color ? (
        <div className={styles.swiper__colors}>
          {product.subProducts.map((el, i) => (
            <span
              key={i}
              className={i == router.query.style ? styles.active : ""}
              onMouseOver={() => setActiveImg(el.images[i].url)}
              onMouseLeave={() => setActiveImg("")}
              onClick={() => setActive(i)}
              style={{ background: el.color.image }}
            >
              <Link
                href={`/product/${product.slug}?style=${i}&code=${product.code}`}
              ></Link>
            </span>
          ))}
        </div>
      ) : (
        ""
      )}
    </Container>
  );
}
