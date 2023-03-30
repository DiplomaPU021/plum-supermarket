import styles from "./styles.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import ChevronRight from "@/components/icons/ChevronRight";
import StarIcon from "@/components/icons/StarIcon";
import DisLikeIcon from "@/components/icons/DisLikeIcon";
import LikeIcon from "@/components/icons/LikeIkon";
import ReplyToFeedback from "../replyToFeedback";
import { useState } from "react";
import LeaveFeedback from "../leaveFeedback";
import { useSession } from "next-auth/react";
import MyCabinet from "@/components/mycabinet";


export default function Reviews({ product, productReview, setProductReview }) {
  const { data: session } = useSession();
  const [answer, setAnswer] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);

  const handleFeedBack = () => {
    if (session) {
      setFeedback(true);
    } else {
      setLoginModalShow(true)
    }

  }


  return (
    <Container fluid className={styles.reviews}>
      <Row className={styles.reviews__title}>
        <span>Найпопулярніші відгуки</span>
        <button
          onClick={handleFeedBack}
          className={styles.reviews__title_btnReview}
        >
          Залишити відгук
        </button>
        {session ? (
          <LeaveFeedback show={feedback} onHide={() => setFeedback(false)} product={product} setProductReview={setProductReview} />
        ) : (
          <MyCabinet show={loginModalShow} onHide={() => setLoginModalShow(false)} />
        )}

      </Row>
      <div className={styles.reviews__row} scrolable="true">
        <Col className={styles.reviews__row_col}>
          <Col className={styles.reviews__scrollFrame}>
            {productReview?.length > 0 ? (
              productReview.map((review, i) => (
                <Row className={styles.reviews__scrollFrame_review} key={i}>
                  <Col className={styles.text}>
                    <span>{review.reviewerName}</span>
                    <span>{review.review}</span>
                    <span>{review.advantages}</span>
                    <span>{review.disadvantages}</span>
                    <span>{review.images.map((img)=>(                     
                      <Image key={img.public_url}
                      className={styles.swiper__simillarswiper_image}
                      src={img.url}
                      alt=""    
                      width="100px"  
                      height="100px"    
                    />
                    ))}</span>

                  </Col>
                  <Col className={styles.answer}>
                    <button onClick={() => setAnswer(true)}>
                      Відповісти{" "}
                      <ChevronRight fillColor="#70BF63" w="30px" h="30px" />
                    </button>
                    <ReplyToFeedback
                      show={answer}
                      onHide={() => setAnswer(false)}
                      review={review}
                    />
                  </Col>
                  <Col className={styles.line}></Col>
                  <Col className={styles.starsLikes}>
                    <div className={styles.starsLikes_stars}>
                      {/* {Array(review.rating).fill().map((_, index) => (
                        <StarIcon key={index} fillColor="#220F4B" />
                      ))} */}
                      {Array(5).fill().map((_, index) => (
                        index < review.rating ? (
                          <StarIcon key={index} fillColor="#220F4B" />
                        ) : (
                          <StarIcon key={index} fillColor="#70BF63" />
                        )
                      ))}
                    </div>
                    <div className={styles.starsLikes_likes}>
                      <div className={styles.starsLikes_likes_like}>
                        <span>0</span>
                        <button>
                          <DisLikeIcon fillColor="#220F4B" />
                        </button>
                      </div>
                      <div className={styles.starsLikes_likes_like}>
                        <span>12</span>
                        <button>
                          <LikeIcon fillColor="#220F4B" />
                        </button>
                      </div>
                    </div>
                  </Col>
                </Row>
              ))

            ) : (
              <></>
            )
            }


            {/* <Row className={styles.reviews__scrollFrame_review}>
              <Col className={styles.text}>
                <span>Василь Петрович</span>
                <span>
                  Перший макбук. Відчуття від роботи на ньому неймовірні. Довго
                  вагався при виборі у порівнянні з ультрабуками за таку ж ціну.
                  Після старенького ноутбуку який тримав від сили 2 години - 12
                  годин це просто чудо.
                </span>
                <span>
                  Переваги: Екосистема епл, екран, тач панель казкова, повсюду
                  метал що дуже приємно, нічого не гуде та шумить бо охолодження
                  пасивне, автономність дуже круто допомагає в періоди
                  відсутності електрики
                </span>
                <span>
                  Недоліки: Не знаю поки що тут писати. Є певні недоліки в осі,
                  але це терпимо. Також потрібен кишеньковий ССД якщо обираєте
                  мінімальну комплектацію, або підписка на хмару.
                </span>
              </Col>
              <Col className={styles.answer}>

                <button>
                  Відповісти{" "}
                  <ChevronRight fillColor="#70BF63" w="30px" h="30px" />
                </button>
              </Col>
              <Col className={styles.line}></Col>
              <Col className={styles.starsLikes}>
                <div className={styles.starsLikes_stars}>
                  <StarIcon fillColor="#220F4B" />
                  <StarIcon fillColor="#220F4B" />
                  <StarIcon fillColor="#220F4B" />
                  <StarIcon fillColor="#220F4B" />
                  <StarIcon fillColor="#70BF63" />
                </div>
                <div className={styles.starsLikes_likes}>
                  <div className={styles.starsLikes_likes_like}>
                    <span>0</span>
                    <button>
                      <DisLikeIcon fillColor="#220F4B" />
                    </button>
                  </div>
                  <div className={styles.starsLikes_likes_like}>
                    <span>12</span>
                    <button>
                      <LikeIcon fillColor="#220F4B" />
                    </button>
                  </div>
                </div>
              </Col>
            </Row> */}

          </Col>
        </Col>
      </div>
    </Container>
  );
}
