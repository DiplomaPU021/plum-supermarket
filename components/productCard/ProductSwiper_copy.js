import styles from "./styles.module.scss";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay } from "swiper";

export default function ProductSwiper({ images }) {
  const swiperRef = useRef(null);
  useEffect(() => {
    swiperRef.current.swiper.autoplay.stop();
  }, [swiperRef]);

  return (
    <div
      className={styles.swiper}
      onMouseEnter={() => {
        swiperRef.current.swiper.autoplay.start();
      }}
      onMouseLeave={() => {
        swiperRef.current.swiper.autoplay.stop();
        swiperRef.current.swiper.slideTo(0);
      }}
    >
      <Swiper
        ref={swiperRef}
        centeredSlides={true}
        autoplay={{ delay: 500, stopOnLastSlide: false }}
        speed={500}
        modules={[Autoplay]}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img.url} alt={img.url} key={i}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
