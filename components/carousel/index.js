import { Carousel } from "react-bootstrap"

export default function HomeCarousel() {
    return (
        <div>
            <Carousel fade>
                <Carousel.Item>
                    <img
                        src="../../../images/carousel/banner1.jpg"
                        alt="First slide"
                        width="1580px"
                        height="320px"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        src="../../../images/carousel/banner2.jpg"
                        alt="Second slide"
                        width="1580px"
                        height="320px"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        src="../../../images/carousel/banner3.jpg"
                        alt="Third slide"
                        width="1580px"
                        height="320px"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}