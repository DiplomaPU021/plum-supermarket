import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import ChevronRight from "../../../components/icons/ChevronRight";
import ChevronLeft from "../../../components/icons/ChevronLeft";
import { Container, Row, Col } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import Star from "../../../components/icons/Star";
import { useSelector, useDispatch } from "react-redux";
import { addToViewedList } from "../../../store/viewedListSlice";

export default function MainSwiper({
  product,
  active,
  setActive,
  setProductReview,
}) {
  const [activeImg, setActiveImg] = useState(product.images[0].url);
  const reviewRating = useSelector((state) => state.reviewRating);
  const viewedList = useSelector((state) => state.viewedList);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    setActiveImg(product.images[0].url);
  }, [product.slug, product.images]);

  const addToViewedHandler = async () => {
    const { data } = await axios.get(
      `/api/product/${product._id}?style=${product.style}&code=${product.mode}`
    );

    if (viewedList.viewedListItems) {
      const existItem = viewedList.viewedListItems.find(
        (item) =>
          item._id == data._id &&
          item.style == data.style &&
          item.mod == data.mod
      );
      
      if (!existItem) {
        dispatch(addToViewedList({ ...data }));
      }
    }
  };
  return (
    <Container fluid className={styles.swiper}>
      <Row className={styles.swiper__photoBox}>
        <Image
          className={styles.swiper__photoBox_image}
          src={activeImg || product.images[0].url}
          alt={product.name}
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
                  alt={product.name}
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
        <Col className={styles.swiper__reviews_stars}>
          {/* <button ><a href="#anchor_feedback">Відгуки</a></button> */}
          <Link className={styles.link} href="#anchor_feedback">
            Відгуки
          </Link>
          <Rating
            readonly={true}
            size={30}
            allowFraction={2}
            initialValue={(reviewRating?.reviewRatingValue).toFixed()}
            ratingValue
            emptyIcon={
              <Star
                fillColor="transparent"
                height={24}
                width={24}
                stroke="#220F4B"
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
      </Row>
      {product.color ? (
        <div className={styles.swiper__colors}>
          {product.subProducts.map((el, i) => (
            <Link
              key={i}
              onClick={addToViewedHandler}
              href={`/product/${product.slug}?style=${i}&code=${0}`}
            >
              <span
                className={i == router.query.style ? styles.active : ""}
                onMouseOver={() => setActiveImg(el.images[0].url)}
                onMouseLeave={() => setActiveImg("")}
                onClick={() =>
                  setActive((prevState) => ({
                    ...prevState,
                    style: i,
                  }))
                }
                style={{ background: el.color.image }}
              >
                <div
                  style={{
                    display:
                      product.sizes[product.mode].qty < 1 &&
                      product.color == el.color.color
                        ? ""
                        : "none",
                  }}
                  className={styles.swiper__colors_crossline}
                ></div>
              </span>
            </Link>
          ))}
        </div>
      ) : (
        ""
      )}
    </Container>
  );
}
