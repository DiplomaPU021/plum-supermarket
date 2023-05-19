
import styles from '../../styles/order.module.scss'
import Header from '@/components/header'
//import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { Container, Row, Col, Image } from "react-bootstrap";
import { getSession } from 'next-auth/react';
import { getCountryData } from '@/utils/country';
import { useState } from 'react';
import MyCabinet from '@/components/mycabinet';
import db from '@/utils/db';
import orderService from '@/utils/services/order.service';
import userService from '@/utils/services/user.service';



export default function Order({ country, orderData, user }) {
    const [showMyCabinet, setShowMyCabinet] = useState(false);
    const handlerMyOrders = () => {
        setShowMyCabinet(true);
    }
    return (
        <Container fluid className={styles.cont}>
            <Header country={country} />
            <Row className={styles.row}>
                <Col className={styles.group}>
                    <Image src='../../../images/order_done.png' width="339px" height="310px" />
                    <h5>Замовлення успішно оформлене!</h5>
                </Col>
            </Row>
            <Row className={styles.row}>
                <div className={styles.repete}>
                    <Link type="button" href="/" className={styles.light_button}>Продовжити покупки</Link>
                    {/* TODO перехід на мої замовлення профіль*/}
                    <MyCabinet show={showMyCabinet} onHide={() => setShowMyCabinet(false)}
                        user={user}
                        orders={orderData}
                        country={country}
                    />
                    <button className={styles.dark_button} onClick={handlerMyOrders}>Мої замовлення</button>
                </div>
            </Row>
        </Container>
    )
}

export async function getServerSideProps(context) {
    const countryData = await getCountryData();
    const { query, req } = context;
    const id = query.id;
    const session = await getSession({ req });
    // // const token = await getToken({req});
    // console.log("token" , token);
    // let orderData = {};
    let orders = [];
    let user={};
     if (session) {
         await db.connectDb();
        orders = await orderService.findByUserId(session.user.id);
        user = await userService.getOneById(session.user.id);
        await db.disconnectDb();
    } else {
        return {
            redirect: {
                destination: "/",
            }
        }
    }
    return {
        props: {
            country: countryData,
            user: JSON.parse(JSON.stringify(user)),
            orderData: JSON.parse(JSON.stringify(orders)),
        },
    };
}