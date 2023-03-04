import styles from "./styles.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import ChevronRight from "@/components/icons/ChevronRight";
import StarIcon from "@/components/icons/StarIcon";
import DisLikeIcon from "@/components/icons/DisLikeIcon";
import LikeIcon from "@/components/icons/LikeIkon";
import ReplyToFeedback from "../replyToFeedback";
import { useState } from "react";
import LeaveFeedback from "../leaveFeedback";

export default function Reviews({ reviews }) {
  const [answer, setAnswer] = useState(false);
  const [feedback, setFeedback] = useState(false);
  return (
    <Container fluid className={styles.reviews}>
      <Row className={styles.reviews__title}>
        <span>Найпопулярніші відгуки</span>
        <button
          onClick={() => setFeedback(true)}
         className={styles.reviews__title_btnReview}>
          Залишити відгук
        </button>
        <LeaveFeedback
                  show={feedback}
                  onHide={() => setFeedback(false)}
                />
      </Row>
      <div className={styles.reviews__row} scrolable="true">
        <Col className={styles.reviews__row_col}>
          <Col className={styles.reviews__scrollFrame}>
            <Row className={styles.reviews__scrollFrame_review}>
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
                <button onClick={() => setAnswer(true)}>
                  Відповісти{" "}
                  <ChevronRight fillColor="#70BF63" w="30px" h="30px" />
                </button>
                <ReplyToFeedback
                  show={answer}
                  onHide={() => setAnswer(false)}
                />
              </Col>
              <Col className={styles.line}></Col>
              <Col className={styles.starsLikes}>
                <div className={styles.starsLikes_stars}>
                  <StarIcon fillColor="#220F4B" />
                  <StarIcon fillColor="#220F4B" />
                  <StarIcon fillColor="#220F4B" />
                  <StarIcon fillColor="#220F4B" />
                  <StarIcon fillColor="#220F4B" />
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
            <Row className={styles.reviews__scrollFrame_review}>
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
                {/* TODO more answer */}
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
            </Row>
            <Row className={styles.reviews__scrollFrame_review}>
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
                {/* TODO more answer */}
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
                  <StarIcon fillColor=" #70BF63" />
                  <StarIcon fillColor=" #70BF63" />
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
          </Col>
        </Col>
      </div>
    </Container>
  );
}
