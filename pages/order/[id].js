
//import styles from "../../styles/category.module.scss";
import styles from '../../styles/order.module.scss'
import Header from '@/components/header'
import Order from '@/models/Order';
import "bootstrap/dist/css/bootstrap.min.css";
import LightPlumIcon from "@/components/icons/LightPlumIcon";
import GreenChevronRight from "@/components/icons/ChevronRight";
import Link from "next/link";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { getSession } from 'next-auth/react';
import { getCountryData } from '@/utils/country';
import { useState } from 'react';
import MyCabinet from '@/components/mycabinet';
import db from '@/utils/db';
import orderService from '@/utils/services/order.service';
// import User from '@/models/User';



export default function order({ country, orderData, user }) {
    const [showMyCabinet, setShowMyCabinet] = useState(false);
    const handlerMyOrders = () => {
        console.log("loggg", orderData);
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

        // <>
        //     <Container fluid className={styles.categorypage}>
        //         <Header />
        //         <Row style={{ paddingLeft: "60px", margin: "0" }}>
        //             <Col>
        //                 <Link href="/">
        //                     <LightPlumIcon />
        //                     <GreenChevronRight fillColor="#70BF63" w="30px" h="30px" />
        //                 </Link>
        //                 <Link href="/orders" className={styles.categorypage__link}>
        //                     <span>Замовлення</span>
        //                 </Link>
        //                 <Link href="/">
        //                     <GreenChevronRight fillColor="#70BF63" w="30px" h="30px" />
        //                 </Link>
        //                 <Link href="/" className={styles.categorypage__link}>
        //                     <span>ID={orderData._id}</span>
        //                 </Link>
        //             </Col>
        //         </Row>
        //         <Row>

        //         </Row>

        //         <Row >
        //             <Col className={styles.categorypage__banner_col1}>
        //                 <h1>Замовлення успішне!</h1>
        //                 <Table striped bordered hover>
        //                     <thead>
        //                         <tr>
        //                             <th>#</th>
        //                             <th></th>
        //                             <th>Товар</th>
        //                             <th>Ціна</th>
        //                             <th>Кількість</th>
        //                             <th>Сума</th>
        //                         </tr>
        //                     </thead>
        //                     <tbody>
        //                         {orderData.products.map((p, i) => (
        //                             <tr key={i}>
        //                                 <td>{i + 1}</td>
        //                                 <td> <img src={p.image} width='110px' alt="picture" /></td>
        //                                 <td>{p.name}</td>
        //                                 {
        //                                     p.discount > 0 ? (
        //                                         <td>
        //                                             <span>{p.price.toLocaleString('uk-UA')} </span>
        //                                             <span>{p.priceAfter.toLocaleString('uk-UA')}</span>
        //                                         </td>
        //                                     ) : (<td>{p.priceAfter.toLocaleString('uk-UA')}</td>)
        //                                 }
        //                                 <td>{p.qty}</td>
        //                                 <td>{(p.priceAfter * p.qty).toLocaleString('uk-UA')}</td>
        //                             </tr>
        //                         ))}
        //                     </tbody>
        //                 </Table>
        //             </Col>
        //             <Col style={{paddingLeft:"200px", paddingTop:"100px"}}>
        //                 <Row>Доставка в {orderData.shippingAddress.cityType} {orderData.shippingAddress.city}
        //                 </Row>
        //                 <Row>
        //                     {orderData.deliveryMethod.deliveryType}
        //                 </Row>
        //                 <Row>
        //                     {orderData.deliveryMethod.deliveryId === "postmanDelivery" ? (
        //                         <Col>{orderData.shippingAddress.address}</Col>
        //                     ) : orderData.deliveryMethod.deliveryId === "selfPickup" ? (
        //                         <Col>Адреса магазину: {orderData.deliveryMethod.deliveryAddress}</Col>
        //                     ) : orderData.deliveryMethod.deliveryId === "novaPoshta" ? (
        //                         <Col>Відділення:{orderData.deliveryMethod.deliveryAddress}</Col>
        //                     ) : <></>}
        //                 </Row>
        //                 <Row>
        //                     Отримувач: {orderData.shippingAddress.firstName} {orderData.shippingAddress.lastName}
        //                 </Row>
        //                 <Row>
        //                     Оплата: {orderData.paymentMethod}
        //                 </Row>
        //                 <Row>
        //                     {orderData.totalQty} товари на суму {orderData.totalPrice.toLocaleString('uk-UA')}  ₴
        //                 </Row>
        //                 <Row>
        //                     Вартість доставки{orderData.deliveryMethod.deliveryId !== "postmanDelivery"?
        //                     (<span>{orderData.deliveryMethod.deliveryCost}</span>
        //                     ) : <span>{orderData.deliveryMethod.deliveryCost} ₴</span>}
        //                 </Row>
        //                 {orderData.discount > 0 ? (
        //                     <Row>
        //                         <Row>Застосовано промокод {orderData.promocode}</Row>
        //                         <Row>Знижка {orderData.discount}%</Row>
        //                     </Row>
        //                 ) : <></>}
        //                 <Row>
        //                     До сплати {orderData.costAfterDiscount.toLocaleString('uk-UA')} ₴
        //                 </Row>
        //             </Col>
        //         </Row>
        //         <Row>
        //             <Col>
        //                 <Button>Мої замовлення</Button>
        //             </Col>
        //             <Col>
        //                 <Link href="/">Продовжити покупки</Link>
        //             </Col>
        //         </Row>

        //         {/* <Footer country={country} /> */}
        //     </Container>

        // </>

    )

}

export async function getServerSideProps(context) {
    const countryData = await getCountryData();
    const { query, req } = context;
    const id = query.id;
    const session = await getSession({ req });
    let orderData = {};
    let orders = [];
     if (session) {
        orders = await orderService.findByUserId(session.user.id);
        await db.connectDb();
        orderData = await Order.findById(id).populate('user').lean();
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
            user: JSON.parse(JSON.stringify(orderData.user)),
            orderData: JSON.parse(JSON.stringify(orders)),
        },
    };
}