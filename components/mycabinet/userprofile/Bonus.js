import styles from "./styles.module.scss"
import { Container, Row, Col, Image } from 'react-bootstrap'
import { useRouter } from "next/router"

export default function Bonus(props) {
    const router = useRouter();

    return (
        <Container>
            <Row className={styles.bonushead}>
                <Col xs={3}><img width="137px" height="46px" src="../../../icons/logo_bonus.png"></img></Col>
                <Col xs> <span>Бонусний рахунок</span></Col>
                <Col xs={2}> <img width="100px" height="20px" src="../../../icons/info.png" onClick={() => setInfo2Show(true)}></img></Col>
            </Row>
            <Row >
                <Col className={styles.group}>
                    <Image src='../../../images/qws.png' width="202px" height="177px" />
                    <h5>Упс, здається, у Вас ще немає  бонусів</h5>
                    <div className={styles.line}></div>
                    <p>Але це ніколи не пізно виправити!</p>
                </Col>
            </Row>
        </Container>
    )
}