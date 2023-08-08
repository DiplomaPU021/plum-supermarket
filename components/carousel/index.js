import Image from "next/image";
import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";

export default function HomeCarousel() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      <Carousel fade>
        <Carousel.Item>
          <Image
            src="/images/carousel/banner1.jpg"
            alt="First slide"
            // className="d-block w-100"
            width={windowWidth}
            height={320}
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            src="/images/carousel/banner2.jpg"
            alt="Second slide"
            // className="d-block w-100"
            width={windowWidth}
            height={320}
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            src="/images/carousel/banner3.jpg"
            alt="Third slide"
            // className="d-block w-100"
            width={windowWidth}
            height={320}
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
