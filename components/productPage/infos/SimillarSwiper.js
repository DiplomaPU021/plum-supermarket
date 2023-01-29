import { simillar_products } from "../../../models/Product/products";
import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/Link";

// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation } from "swiper";

export default function SimillarSwiper() {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={5}
      slidesPerGroup={3}
      navigation={true}
      modules={[Navigation]}
      className="swiper simillar_swiper"
      breakpoints={{
        640:{
          width: 640,
          slidesPerView: 5,
        }
      }}
    >
      {simillar_products.map((p, i) => (
        <SwiperSlide key={i}>
          <Link href="">
            <img src={p} alt="" />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
