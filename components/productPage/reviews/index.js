import styles from "./styles.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import ChevronRight from "@/components/icons/ChevronRight";
import DisLikeIcon from "@/components/icons/DisLikeIcon";
import LikeIcon from "@/components/icons/LikeIkon";
import ReplyToFeedback from "../replyToFeedback";
import { useEffect, useState } from "react";
import LeaveFeedback from "../leaveFeedback";
import { useSession } from "next-auth/react";
import MyCabinet from "@/components/mycabinet";
import Star from "@/components/icons/Star";
import { useSelector } from "react-redux";

export default function Reviews({ product, productReview, setProductReview }) {
  const { data: session } = useSession();
  const [answer, setAnswer] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const reviewRating = useSelector((state) => state.reviewRating);

  useEffect(() => {
    setProductReview(product?.reviews?.reverse());
  }, [product.slug]);
  const handleFeedBack = () => {
    if (session) {
      setFeedback(true);
    } else {
      setLoginModalShow(true);
    }
  };
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
          <LeaveFeedback
            show={feedback}
            onHide={() => setFeedback(false)}
            product={product}
            setProductReview={setProductReview}
          />
        ) : (
          <MyCabinet
            show={loginModalShow}
            onHide={() => setLoginModalShow(false)}
          />
        )}
      </Row>
      <div className={styles.reviews__row} scrolable="true">
        <Col className={styles.reviews__row_col}>
          <Col 
           style={{
            overflowY: productReview?.length > 1 ? "scroll" : "hidden",
          }}
          className={styles.reviews__scrollFrame}>
            {productReview?.length > 0 ? (
              productReview.map((review, i) => (
                <Row className={styles.reviews__scrollFrame_review} key={i}>
                  <Col className={styles.text}>
                    <span>{review.reviewerName}</span>
                    <span>{review.review}</span>
                    <span>
                      <b>Досвід використання:</b> {review.experience}
                    </span>
                    <span>
                      <b>Переваги:</b> {review.advantages}
                    </span>
                    <span>
                      <b>Недоліки:</b> {review.disadvantages}
                    </span>
                    <div className={styles.imags}>
                      {review.images.map((img) => (
                        <span key={img.public_url}>
                          <Image
                            src={img.url}
                            alt=""
                            width="100%"
                            height="150px"
                            objectfit="cover"
                          />
                        </span>
                      ))}
                    </div>
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
                      {Array(5)
                        .fill()
                        .map((_, index) =>
                          index < review.rating ? (
                            <Star
                              key={index}
                              fillColor="#220F4B"
                              height={24}
                              width={24}
                              stroke="#220F4B"
                            />
                          ) : (
                            <Star
                              key={index}
                              fillColor="transparent"
                              height={24}
                              width={24}
                              stroke="#70BF63"
                            />
                          )
                        )}
                    </div>
                    <div className={styles.starsLikes_likes}>
                      <div className={styles.starsLikes_likes_like}>
                        {/* TODO */}
                        <span>0</span>
                        <button>
                          <DisLikeIcon fillColor="#220F4B" />
                        </button>
                      </div>
                      <div className={styles.starsLikes_likes_like}>
                        {/* TODO */}
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
              <Row>
                <Col style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <span>Тут ще немає відгуків. Ви можете бути першим.</span>
                </Col>
              </Row>
            )}
          </Col>
        </Col>
      </div>
    </Container>
  );
}
