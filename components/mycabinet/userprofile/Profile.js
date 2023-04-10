import styles from "./styles.module.scss"
import { Accordion, Nav, Container, Row, Col, Form } from 'react-bootstrap'
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function Profile(props) {
    const router = useRouter();

    return (
        <Accordion flush alwaysOpen defaultActiveKey={['0']} className={styles.accordion}>
            <Accordion.Item eventKey="0" className={styles.accordion__item}>
                <Accordion.Header className={styles.accordion__item_header}><span>Особисті данні</span></Accordion.Header>
                <Accordion.Body className={styles.accordion__item_body}>
                    <Row className={styles.contacts}>
                        <Col className={styles.col_contacts}>
                            <Form.Group as={Col} controlId="groupSurname">
                                <Form.Label className={styles.form_label}>Прізвище</Form.Label>
                                <Form.Control className={styles.form_input}
                                    type="text"
                                    name="lastName"
                                    value="Stepanenko"
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="groupPhone">
                                <Form.Label className={styles.form_label}>Номер телефону</Form.Label>
                                <Form.Control className={styles.form_input}
                                    name="phoneNumber"
                                    value="+380954482321"
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                        <Col className={styles.col_contacts}>
                            <Form.Group as={Col} controlId="groupName">
                                <Form.Label className={styles.form_label}>Ім'я</Form.Label>
                                <Form.Control className={styles.form_input}
                                    type="text"
                                    name="firstName"
                                    value="Anna"
                                    readOnly
                                    onChange={(e) => { formik.handleChange(e); handleGetCredencials(e) }}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="groupEmail">
                                <Form.Label className={styles.form_label}>Електронна пошта</Form.Label>
                                <Form.Control className={styles.form_input}
                                    type="email" name="email" value="stepanenko@gmail.com" readOnly
                                />
                            </Form.Group>
                        </Col>
                        <Col className={styles.col_contacts}>
                            <Form.Group as={Col} controlId="groupBday">
                                <Form.Label className={styles.form_label}>Дата народження</Form.Label>
                                <Form.Control className={styles.form_input}
                                    type="text"
                                    name="birthday"
                                    value="25.08.1975"
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="groupSex">
                                <Form.Label className={styles.form_label}>Стать</Form.Label>
                                <Form.Control className={styles.form_input}
                                    type="text" name="sex" value="Femail" readOnly
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" className={styles.accordion__item}>
                <Accordion.Header className={styles.accordion__item_header}><span>Мої адреси</span></Accordion.Header>
                <Accordion.Body className={styles.accordion__item_body}>
                    <Row className={styles.contacts}>

                        <button className={styles.profilebtn}>+ Додати адресу</button>

                    </Row>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2" className={styles.accordion__item}>
                <Accordion.Header className={styles.accordion__item_header}><span>Мої картки</span></Accordion.Header>
                <Accordion.Body className={styles.accordion__item_body}>
                    <Row className={styles.cardsbtns}>

                        <button className={styles.profilebtn}>Mastercard із закінчкнням 5368</button>
                        <button className={styles.profilebtn}>+ Додати картку</button>

                    </Row>

                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3" className={styles.accordion__item}>
                <Accordion.Header className={styles.accordion__item_header}><span>Додаткова інформація</span></Accordion.Header>
                <Accordion.Body className={styles.accordion__item_body}>
                    <Form.Check type="checkbox" className={styles.checkbox}>
                        <Form.Check.Input
                            className={styles.checkbox_box}
                            type="checkbox"
                        />
                        <Form.Check.Label className={styles.checkbox_label}>
                            У мене є дитина
                        </Form.Check.Label>
                    </Form.Check>

                    <Form.Check type="checkbox" className={styles.checkbox}>
                        <Form.Check.Input
                            className={styles.checkbox_box}
                            type="checkbox"
                        />
                        <Form.Check.Label className={styles.checkbox_label}>
                            Я є власником автомобіля
                        </Form.Check.Label>
                    </Form.Check>

                    <Form.Check type="checkbox" className={styles.checkbox}>
                        <Form.Check.Input
                            className={styles.checkbox_box}
                            type="checkbox"
                        />
                        <Form.Check.Label className={styles.checkbox_label}>
                            Я є власником іншого виду транспорту
                        </Form.Check.Label>
                    </Form.Check>
                    <Form.Check type="checkbox" className={styles.checkbox}>
                        <Form.Check.Input
                            className={styles.checkbox_box}
                            type="checkbox"
                        />
                        <Form.Check.Label className={styles.checkbox_label}>
                            Цей аккаунт використовується юридичною особою, представником компанії або приватним підприємцем
                        </Form.Check.Label>
                    </Form.Check>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4" className={styles.accordion__item}>
                <Accordion.Header className={styles.accordion__item_header}><span>Захоплення</span></Accordion.Header>
                <Accordion.Body className={styles.accordion__item_hobby}>
                <Row>
                {hobbies.map((hobby, index) => (
                    <Col lg={4} key={index}>
                         <Form.Check type="checkbox" className={styles.checkbox}>
                         <Form.Check.Input
                             className={styles.checkbox_box}
                             type="checkbox"
                         />
                         <Form.Check.Label className={styles.checkbox_label}>
                             {hobby}
                         </Form.Check.Label>
                     </Form.Check>
                     </Col>
                    ))}
                    </Row>

                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5" className={styles.accordion__item}>
                <Accordion.Header className={styles.accordion__item_header}><span>Домашні улюбленці</span></Accordion.Header>
                <Accordion.Body className={styles.accordion__item_hobby}>
                <Row>
                {animals.map((hobby, index) => (
                    <Col lg={4} key={index}>
                         <Form.Check type="checkbox" className={styles.checkbox}>
                         <Form.Check.Input
                             className={styles.checkbox_box}
                             type="checkbox"
                         />
                         <Form.Check.Label className={styles.checkbox_label}>
                             {hobby}
                         </Form.Check.Label>
                     </Form.Check>
                     </Col>
                    ))}
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

const hobbies = ["Рибальство", "Полювання", "Садівництво", "Фітнес", "Йога", "Біг", "Велосипед", "Музика", "Туризм", "Кіберстпорт", "Handmade"]
const animals = ["Собачка", "Пташка", "Котик", "Плазун", "Рибки", "Гризун"]








