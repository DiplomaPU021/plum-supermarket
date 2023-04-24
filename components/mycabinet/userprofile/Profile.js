import styles from "./styles.module.scss";
import {
  Accordion,
  Nav,
  Container,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import * as yup from "yup";
import "yup-phone";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import CityModal from "@/components/checkoutorder/citymodal";

export default function Profile(props) {
  const [isInEdit, setIsInEdit] = useState(false)
  const [showAddress, setShowAddress] = useState("none")
  const [showCard, setShowCard] = useState("none")
  const [profileCityModalShow, setProfileCityModalShow] = useState(false);


  const today = new Date();
  // const minDate = new Date(today.getFullYear() - 12, today.getMonth(), today.getDate());
  const cutoffYear = today.getFullYear() - 12;

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .min(3, "Ім'я має бути мінімум 3 символи")
      .max(20, "Ім'я має бути максимум 20 символів")
      .matches(
        /^[А-Яа-яЇїІі'-]*[^\s][А-Яа-яЇїІі' -]*$/,
        "Цифри та спец.символи заборонено"
      )
      .required("Ім'я обов'язково"),
    lastName: yup
      .string()
      .min(3, "Прізвище має бути мінімум 3 символи")
      .max(20, "Прізвище має бути максиFмум 20 символів")
      .matches(
        /^[А-Яа-яЇїІі'-]*[^\s][А-Яа-яЇїІі' -]*$/,
        "Цифри та спец.символи заборонено"
      )
      .required("Прізвище обов'язково"),
    phoneNumber: yup
      .string()
      .test("phone", "Некоректний номер телефону", (value) => {
        if (!value) return true;
        return (
          yup.string().phone("UA").isValidSync(value) &&
          value.length >= 10 &&
          value[0] === "0"
        );
      }),
    //       birthday: yup.date().max(new Date(), 'Дата народження не може бути у майбутньому')
    //     .min(minDate, 'Дата народження має бути не менше, ніж 12 років тому від поточної дати').required(),
    // });
    birthday: yup
      .string()
      .matches(
        new RegExp(`^(19[89][0-9]|20[01][0-${cutoffYear % 100}]|${cutoffYear + 1})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$`),
        "Користувач має бути старшим 12 років"
      ),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: props.user?.firstName || "",
      lastName: props.user?.lastName || "",
      phoneNumber: props.user?.phoneNumber || "",
      email: props.user?.email || "",
      gender: props.user?.gender || "",
      birthday: props.user?.birthday || "1990-01-01",
    },
    resolver: yupResolver(validationSchema),
  });
  const handleRegistration = async (data) => {
    const result = await axios.put('/api/user/manageProfile', {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      gender: data.gender,
      birthday: data.birthday,
    });
    console.log("UserChanged", result);
    setIsInEdit(false);
  }

  console.log("watch", watch("gender"));

  const handleSearchCity = (e) => {
    e.preventDefault();
    // cityRef.current.focus();
    setProfileCityModalShow(true);

  };

  const handleCityModalClose = (selectedCity) => {
    setProfileCityModalShow(false);
  }

  const handleChangeAdress = (e) => {
    //implement handler

  };

  const handleAddAdress = (e) => {
    //implement handler

  };

  const handleCancelAddAdress = (e) => {
    //implement handler

  };

  const handleChangeCardNumber = (e) => {
    //implement handler

  };
  const handleChangeTerm = (e) => {
    //implement handler

  };
  const handleChangeCVV = (e) => {
    //implement handler

  };
  const handleAddCard = (e) => {
    //implement handler

  };
  const handleCancelAddCard = (e) => {
    //implement handler

  };

  return (
    <Accordion
      flush
      alwaysOpen
      defaultActiveKey={["0"]}
      className={styles.accordion}
    >
      <Accordion.Item eventKey="0" className={styles.accordion__item}>
        <Accordion.Header className={styles.accordion__item_header}>
          <span>Особисті данні</span>
        </Accordion.Header>
        <Accordion.Body className={styles.accordion__item_body}>
          <Form onSubmit={handleSubmit(handleRegistration)}>
            <Row className={styles.contacts}>
              <Col className={styles.col_contacts}>
                <Form.Group as={Col} controlId="groupSurname">
                  <Form.Label className={styles.form_label}>
                    Прізвище
                  </Form.Label>
                  <Form.Control
                    className={`${styles.form_input} ${errors.lastName ? "is-invalid" : ""
                      }`}
                    type="text"
                    name="lastName"
                    {...register("lastName")}
                    readOnly={!isInEdit}
                  // aria-invalid={errors.lastName ? "true" : "false"}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="groupPhone">
                  <Form.Label className={styles.form_label}>
                    Номер телефону
                  </Form.Label>
                  <Form.Control
                    className={`${styles.form_input} ${errors.phoneNumber ? "is-invalid" : ""
                      }`}
                    name="phoneNumber"
                    {...register("phoneNumber")}
                    readOnly={!isInEdit}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phoneNumber?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col className={styles.col_contacts}>
                <Form.Group as={Col} controlId="groupName">
                  <Form.Label className={styles.form_label}>Ім'я</Form.Label>
                  <Form.Control
                    className={`${styles.form_input} ${errors.firstName ? "is-invalid" : ""
                      }`}
                    type="text"
                    name="firstName"
                    {...register("firstName")}
                    readOnly={!isInEdit}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="groupEmail">
                  <Form.Label className={styles.form_label}>
                    Електронна пошта
                  </Form.Label>
                  <Form.Control
                    className={styles.form_input}
                    type="email"
                    name="email"
                    {...register("email")}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col className={styles.col_contacts}>
                <Form.Group as={Col} controlId="groupBday">
                  <Form.Label className={styles.form_label}>
                    Дата народження
                  </Form.Label>
                  <Form.Control
                    className={`${styles.form_input} ${errors.birthday ? "is-invalid" : ""
                      }`}
                    type="date"
                    name="birthday"
                    {...register("birthday")}
                    readOnly={!isInEdit}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.birthday?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="groupGender" className={styles.sex}>
                  <Form.Select
                    {...register("gender")}
                    disabled={!isInEdit}
                    name="gender"
                    className={`${styles.form_input} ${errors.gender ? "is-invalid" : ""}`}>
                    <option value="Стать" disabled={true}>Стать</option>
                    <option >Жінка</option>
                    <option >Чоловік</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.gender?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className={styles.cont_btn}>
              {isInEdit ? (
                <Form.Group as={Row} controlId="groupButtons" className={styles.save}>
                  <Button type="cancel" className={styles.light_button}>Скасувати</Button>
                  <Button type="submit" className={styles.dark_button}>Зберегти</Button>
                </Form.Group>
              ) : (
                <Button className={styles.edit_btn} onClick={() => setIsInEdit(true)}>Редагувати <img src="../../../icons/circle_edit.png" width="24px" height="24px" alt="" /></Button>
              )}
            </Row>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" className={styles.accordion__item}>
        <Accordion.Header className={styles.accordion__item_header}>
          <span>Мої адреси</span>
        </Accordion.Header>
        <Accordion.Body className={styles.accordion__item_body}>
          <Row className={styles.contacts}>
            <button className={styles.profilebtn} onClick={() => setShowAddress(showAddress === "none" ? "block" : "none")}>+ Додати адресу</button>
          </Row>
          <Row style={{ display: showAddress }}>
            <Col className={styles.ordertable}>
              <Form.Label className={styles.form_label} htmlFor="city-name">Ваше місто</Form.Label>
              <Form.Control className={styles.form_input} placeholder="Оберіть місто..."
                // value={selectedCity ? selectedCity.value : ""} name="city"
                onClick={handleSearchCity}
                readOnly={true}
                id="city-name"
              // ref={cityRef}
              />
              <CityModal show={profileCityModalShow} onClose={handleCityModalClose} />
              <Form.Group >
                <Form.Label className={styles.form_label} htmlFor="street">Вулиця</Form.Label>
                <Form.Control className={styles.form_floor}
                  type="text"
                  //  value={searchStreet}
                  name="street"
                  id="street"
                //  onChange={(e) => setSearchStreet(e.target.value)}
                //  ref={selectRef}
                />
                {/* {filteredStreets.length > 0 && (
                  <ul className={styles.city_list} id="ulStreetSelect">
                    {filteredStreets.map((street) => (
                      <li
                        key={street._id}
                        id={street._id}
                        onClick={() => handleSelectStreet(street)}
                      >
                        {`${street.street_type} ${street.name}`}
                      </li>
                    ))}
                  </ul>
                )} */}
              </Form.Group>
              <div className={styles.flex_row}>
                <Form.Group controlId="buildingGroup">
                  <Form.Label className={styles.form_label}>Будинок</Form.Label>
                  <Form.Control className={styles.form_floor} name="building" onChange={handleChangeAdress} />
                </Form.Group>
                <Form.Group controlId="flatGroup">
                  <Form.Label className={styles.form_label}>Квартира</Form.Label>
                  <Form.Control className={styles.form_floor} name="flat" onChange={handleChangeAdress} />
                </Form.Group>
                <button onClick={handleAddAdress} id="btnAddAddress">Додати</button>
                <button onClick={handleCancelAddAdress} id="btnCancelAddAddress">Скасувати</button>
              </div>
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" className={styles.accordion__item}>
        <Accordion.Header className={styles.accordion__item_header}>
          <span>Мої картки</span>
        </Accordion.Header>
        <Accordion.Body className={styles.accordion__item_body}>
          <Row className={styles.cardsbtns}>
            <button className={styles.profilebtn}>
              Mastercard із закінчкнням 5368
            </button>
            <button className={styles.profilebtn} onClick={() => setShowCard(showCard === "none" ? "block" : "none")}>+ Додати картку</button>
          </Row>
          <Row style={{ display: showCard }}>
            <Col className={styles.ordertable}>
              <Form.Group controlId="cardNumberGroup">
                <Form.Label className={styles.form_label}>Номер картки</Form.Label>
                <Form.Control className={styles.form_floor}
                  type="number"
                  name="card_number"
                  onChange={handleChangeCardNumber}>
                </Form.Control>
              </Form.Group>
              <div className={styles.flex_row}>
                <Form.Group controlId="cardTermGroup">
                  <Form.Label className={styles.form_label}>Термін дії</Form.Label>
                  <Form.Control className={styles.form_floor} name="card_term" onChange={handleChangeTerm} />
                </Form.Group>
                <Form.Group controlId="cardCvvGroup">
                  <Form.Label className={styles.form_label}>CVV</Form.Label>
                  <Form.Control className={styles.form_floor} name="card_cvv" type="number" onChange={handleChangeCVV} />
                </Form.Group>
                <button onClick={handleAddCard} id="btnAddAddress">Додати</button>
                <button onClick={handleCancelAddCard} id="btnCancelAddAddress">Скасувати</button>
              </div>
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3" className={styles.accordion__item}>
        <Accordion.Header className={styles.accordion__item_header}>
          <span>Додаткова інформація</span>
        </Accordion.Header>
        <Accordion.Body className={styles.accordion__item_body}>
          <Form.Check type="checkbox" className={styles.checkbox}>
            <Form.Check.Input className={styles.checkbox_box} type="checkbox" />
            <Form.Check.Label className={styles.checkbox_label}>
              У мене є дитина
            </Form.Check.Label>
          </Form.Check>

          <Form.Check type="checkbox" className={styles.checkbox}>
            <Form.Check.Input className={styles.checkbox_box} type="checkbox" />
            <Form.Check.Label className={styles.checkbox_label}>
              Я є власником автомобіля
            </Form.Check.Label>
          </Form.Check>

          <Form.Check type="checkbox" className={styles.checkbox}>
            <Form.Check.Input className={styles.checkbox_box} type="checkbox" />
            <Form.Check.Label className={styles.checkbox_label}>
              Я є власником іншого виду транспорту
            </Form.Check.Label>
          </Form.Check>
          <Form.Check type="checkbox" className={styles.checkbox}>
            <Form.Check.Input className={styles.checkbox_box} type="checkbox" />
            <Form.Check.Label className={styles.checkbox_label}>
              Цей аккаунт використовується юридичною особою, представником
              компанії або приватним підприємцем
            </Form.Check.Label>
          </Form.Check>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4" className={styles.accordion__item}>
        <Accordion.Header className={styles.accordion__item_header}>
          <span>Захоплення</span>
        </Accordion.Header>
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
        <Accordion.Header className={styles.accordion__item_header}>
          <span>Домашні улюбленці</span>
        </Accordion.Header>
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
  );
}

const hobbies = [
  "Рибальство",
  "Полювання",
  "Садівництво",
  "Фітнес",
  "Йога",
  "Біг",
  "Велосипед",
  "Музика",
  "Туризм",
  "Кіберстпорт",
  "Handmade",
];
const animals = ["Собачка", "Пташка", "Котик", "Плазун", "Рибки", "Гризун"];
