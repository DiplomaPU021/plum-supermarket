import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles.module.scss";
import { useState } from "react";
import Image from "react-bootstrap/Image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import ChevronRight from "@/components/icons/ChevronRight";
import ChevronLeft from "@/components/icons/ChevronLeft";
import { Container, Row, Col } from "react-bootstrap";
import StarIcon from "@/components/icons/StarIcon";
import Rating from "react-rating";
import LeaveFeedback from "../leaveFeedback";
import { useSession } from "next-auth/react";
import MyCabinet from "@/components/mycabinet";


export default function MainSwiper({ product, active, setActive, setProductReview }) {
  const { data: session } = useSession();
  const [activeImg, setActiveImg] = useState(active);
  const [feedback, setFeedback] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const router = useRouter();
  const handleFeedBack = () => {
    if (session) {
      setFeedback(true);
    } else {
      setLoginModalShow(true)
    }

  }
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
        {/* {product.rating ? ( */}
          <Col className={styles.swiper__reviews_stars}>
            <button
            onClick={handleFeedBack}
            >Відгуки</button>
            <Rating
              readonly
              start={0}
              stop={5}
              fractions={2}
              initialRating={product.rating}
              emptySymbol={<StarIcon fillColor="#70BF63"  borderColor="#70BF63"/>}
              fullSymbol={<StarIcon fillColor="#573C91" />}
            />
          </Col>
        {/* ) : (null)} */}
        {session ? (
          <LeaveFeedback show={feedback} onHide={() => setFeedback(false)} product={product} setProductReview={setProductReview}/>
        ) : (
          <MyCabinet show={loginModalShow} onHide={() => setLoginModalShow(false)} />
        )}

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
                href={`/product/${product.slug}?style=${i}&code=${0}`}
              >
                <Image src={product.color.image} alt={product.color.image} />
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
