import { Carousel } from "react-bootstrap"

export default function HomeCarousel() {
    return (
        <div>
            <Carousel fade>
                <Carousel.Item>
                    <img
                        src="../../../images/carousel/banner1.jpg"
                        alt="First slide"
                        className="d-block w-100"
                        height="320px"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        src="../../../images/carousel/banner2.jpg"
                        alt="Second slide"
                        className="d-block w-100"
                        height="320px"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        src="../../../images/carousel/banner3.jpg"
                        alt="Third slide"
                        className="d-block w-100"
                        height="320px"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}