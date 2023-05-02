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
import { useEffect, useRef, useState } from "react";
import CityModal from "@/components/checkoutorder/citymodal";
import PaymentForm from "@/components/paymentForm";
import { getStreets } from "@/requests/street";
import useDeepCompareEffect from "use-deep-compare-effect";
import { saveAddress } from "@/requests/user";

export default function Profile({ country, ...props }) {
  const [isInEdit, setIsInEdit] = useState(false);
  const [showAddress, setShowAddress] = useState("none");
  const [showCard, setShowCard] = useState("none");
  const [showAddCard, setShowAddCard] = useState(false);
  const [showAddAddressBlock, setShowAddAddressBlock] = useState("none");
  const [profileCityModalShow, setProfileCityModalShow] = useState(false);

  const [admiration, setAdmiration] = useState([]);
  const selectRef = useRef();
  const cityRef = useRef();
  const postmanRef = useRef();
  const [selectedCity, setSelectedCity] = useState();
  const [userAddresses, setUserAddresses] = useState(props.user?.address || []);
  const [activeAddress, setActiveAddress] = useState(
    userAddresses?.find((address) => address.active === true) || null);
  const [filteredStreets, setFilteredStreets] = useState([]);
  const [searchStreet, setSearchStreet] = useState("");
  const [selectedStreet, setSelectedStreet] = useState({});
  const [addressValues, setAddressValues] = useState({
    street: "",
    building: "",
    flat: "",
    ground: "",
    elevator: "Відсутній",
  });
  const [selectedAddress, setSelectedAddress] = useState(
    `${activeAddress.cityType} ${activeAddress.city}, ${activeAddress.address}`
  );
  const [isSavedAddress, setIsSavedAddress] = useState(false);
  //   useEffect(async()=>{
  //     const result = await axios.get('/api/user/admiration');
  //     console.log("data",result);
  // // setAdmiration((prev)=>{...prev,
  //   // fishing,
  //   // hunting,
  //   // gardening,
  //   // fitness,
  //   // yoga,
  //   // running,
  //   // bicycle,
  //   // music,
  //   // tourism,
  //   // cybersport,
  //   // handmade})
  //   },[])

  const [userCreditCards, setUserCreditCards] = useState(props.user?.creditCards || []);
  const [selectedCard, setSelectedCard] = useState(userCreditCards?.find(creditCard => creditCard.isDefault === true || null));
// const [isPaid, setIsPaid] = useState(false);

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
      .required("Введіть номер телефону")
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
    reset
  } = useForm({
    defaultValues: {
      firstName: props.user?.firstName || "",
      lastName: props.user?.lastName || "",
      phoneNumber: props.user?.phoneNumber || "",
      email: props.user?.email || "",
      gender: props.user?.gender || "Стать",
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
  const handleCancelCredencialsEdit = () => {
    setIsInEdit(false);
    reset({
      firstName: props.user?.firstName || "",
      lastName: props.user?.lastName || "",
      phoneNumber: props.user?.phoneNumber || "",
      email: props.user?.email || "",
      gender: props.user?.gender || "Стать",
      birthday: props.user?.birthday || "1990-01-01",
    }, {
      keepErrors: false,
      keepDirty: true,
    });
  }

  useEffect(() => {
    if (selectedAddress && selectedAddress != "") {
      const selectedOption = userAddresses.find(
        (item) =>
          `${item.cityType} ${item.city}, ${item.address}` == selectedAddress
      );
      if (selectedOption) {
        setActiveAddress(selectedOption);
      }
    }
  }, [selectedAddress]);

  const handleSearchCity = (e) => {
    e.preventDefault();
    // cityRef.current.focus();
    setProfileCityModalShow(true);

  };

  const handleCityModalClose = (selectedCity) => {
    if (selectedCity) {
      setUserAddresses(props.user?.address || []);
      setSelectedCity(selectedCity);
      setActiveAddress((prevState) => ({
        ...prevState,
        address: "",
        streetType: "",
        street: "",
        building: "",
        flat: "",
        ground: "",
        elevator: "",
        cityType: selectedCity.object_category,
        country: "Україна",
        city: selectedCity.object_name,
        region: selectedCity.region,
        zipCode: selectedCity.object_code,
        active: true,
      }));
    }
    setProfileCityModalShow(false);
  }
  useEffect(() => {
    if (selectedCity && searchStreet) {
      setAddressValues({
        ...addressValues,
        street: searchStreet,
      });
      let streets = [];
      setTimeout(async () => {
        streets = await getStreets(selectedCity, searchStreet);
        if (streets && streets.length > 0) {
          setFilteredStreets(streets);
        } else {
          setFilteredStreets([]);
        }
      }, 1000);
    }
  }, [searchStreet])
 
  const handleSelectStreet = (street) => {
    selectRef.current.focus();
    setSelectedStreet(street);
    setSearchStreet(`${street.street_type} ${street.name}`);
  };
  const handleStreetChange = (e) => {
    setSearchStreet(e.target.value);
  };
  const handleChangeAdress = (e) => {
    setAddressValues({
      ...addressValues,
      [e.target.name]: e.target.value,
    });
  };


  const handleAddAdress = () => {
    if (selectedCity) {
      const addressString =
        selectedStreet?.street_type +
        " " +
        selectedStreet?.name +
        ", буд. " +
        addressValues.building +
        ", кв. " +
        addressValues.flat;
      let newAddress = {
        firstName: watch("firstName") || "",
        lastName: watch("lastName") || "",
        phoneNumber: watch("phoneNumber") || "",
        address: addressString,
        streetType: selectedStreet?.street_type,
        street: selectedStreet?.name,
        building: addressValues.building,
        flat: addressValues.flat,
        ground: addressValues.ground,
        elevator: addressValues.elevator,
        cityType: selectedCity.object_category,
        country: "Україна",
        city: selectedCity.object_name,
        region: selectedCity.region,
        zipCode: selectedCity.object_code,
        active: true,
      };
      if (newAddress) {
        setActiveAddress(newAddress);
        let addresses = [];
        for (let i = 0; i < userAddresses.length; i++) {
          let temp_address = {};
          temp_address = { ...userAddresses[i], active: false };
          addresses.push(temp_address);
        }
        addresses.push(newAddress);
        setUserAddresses(addresses);
        setSelectedAddress( `${newAddress.cityType} ${newAddress.city}, ${newAddress.address}`);
      }
      setShowAddress("none");
      setShowAddAddressBlock("none");
      setAddressValues({
        ...addressValues,
        street: "",
        building: "",
        flat: "",
      });

      setSearchStreet("");
    }
  };


  // const handleChangeGround = (e) => {
  //   setAddressValues({
  //     ...addressValues,
  //     ground: e.target.value,
  //   });
  // };
  // const handleSelectElevator = (e) => {
  //   const options = e.target.options;
  //   if (options[0].selected) {
  //     options[0].disabled = true;
  //   }
  //   setAddressValues({
  //     ...addressValues,
  //     elevator: e.target.value,
  //   });
  // };
  const handleCancelAddAdress = () => {
    if (userAddresses.length > 0) {
      setShowAddAddressBlock("none");
      setShowAddress("none");
      setAddressValues({
        street: "",
        building: "",
        flat: "",
        ground: "",
        elevator: "Відсутній",
      });
      setSearchStreet("");
    } else {
      setSearchStreet("");
      setAddressValues({
        street: "",
        building: "",
        flat: "",
        ground: "",
        elevator: "Відсутній",
      });
    }
  };
  const handleSelectPostman = (e) => {
    postmanRef.current.focus();
    if (selectedAddress) {
      // змінюємо властивість active для вибраного елемента
      const updatedAddresses = userAddresses.map((item) =>
      `${item.cityType} ${item.city}, ${item.address}` == e.target.value
          ? { ...item, active: true }
          : { ...item, active: false }
      );
      setUserAddresses(updatedAddresses);
    }
    setSelectedAddress(e.target.value);
  };
 const handleSaveAdress =async ()=>{
  if (activeAddress != null) {
    await saveAddress(activeAddress);
    setIsSavedAddress(true);
}
 }

  const handleChangeCardNumber = (e) => {
    //implement handler

  };
  const handleChangeTerm = (e) => {
    //implement handler

  };
  const handleChangeCVV = (e) => {
    //implement handler

  };
  // const handleAddCard = (e) => {
  //   //implement handler

  // };
  const handleCancelAddCard = (e) => {
    //implement handler

  };

  const handleAddCard = () => {
    setShowAddCard(true);
    setShowCard(false)
  }

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
                <Form.Group
                  as={Col}
                  controlId="groupGender"
                  className={styles.sex}
                >
                  <Form.Select
                    {...register("gender")}
                    disabled={!isInEdit}
                    name="gender"
                    className={`${styles.form_input} ${errors.gender ? "is-invalid" : ""
                      }`}
                  >
                    <option value="Стать" disabled={true}>
                      Стать
                    </option>
                    <option>Жінка</option>
                    <option>Чоловік</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.gender?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className={styles.cont_btn}>
              {isInEdit ? (
                <Form.Group
                  as={Row}
                  controlId="groupButtons"
                  className={styles.save}
                >
                  <Button
                    type="cancel"
                    onClick={handleCancelCredencialsEdit}
                    className={styles.light_button}
                  >
                    Скасувати
                  </Button>
                  <Button type="submit" className={styles.dark_button}>
                    Зберегти
                  </Button>
                </Form.Group>
              ) : (
                <Button
                  className={styles.edit_btn}
                  onClick={() => setIsInEdit(true)}
                >
                  Редагувати{" "}
                  <img
                    src="../../../icons/circle_edit.png"
                    width="24px"
                    height="24px"
                    alt=""
                  />
                </Button>
              )}
            </Row>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
      <div>userAddresses</div>
      {JSON.stringify(userAddresses)}
      <div>activeAddresses</div>
      {JSON.stringify(activeAddress)}
      <Accordion.Item eventKey="1" className={styles.accordion__item}>
        <Accordion.Header className={styles.accordion__item_header}>
          <span>Мої адреси</span>
        </Accordion.Header>
        <Accordion.Body className={styles.accordion__item_body}>
          <Row >
          <div className={styles.flex_row}>
            <Form.Select
              className={styles.form_address}
              name="selectPostmanDelivery"
              id="selectPostmanDelivery"
              onChange={(e) => handleSelectPostman(e)}
              ref={postmanRef}
              defaultValue={selectedAddress}
            >
              {/* <option key ="addressOPt0" value="Вибрати адресу доставки..." disabled={true}>Вибрати адресу доставки...</option>  */}
              {userAddresses != null &&
                userAddresses.filter(
                  (c) => c.address !=""
                )
                ? userAddresses.map((item, index) => (
                  <option
                    key={`${item.address}-${index}`}
                    value={`${item.cityType} ${item.city}, ${item.address}`}
                  >
                    {item.cityType} {item.city}, {item.address}
                  </option>
                ))
                : null}
            </Form.Select>
            <button onClick={handleSaveAdress} id="btnSaveAddress" disabled={isSavedAddress}>
                  Зберегти
                </button>
            </div>
          </Row>
          <Row className={styles.contacts}>
            <button
              style={{ display: showAddress !== "block" ? "block" : "none" }}
              className={styles.profilebtn}
              onClick={() => setShowAddress("block")}
            >
              + Додати адресу
            </button>
          </Row>
          <Row style={{ display: showAddress }}>
            <Col className={styles.ordertable}>
              <Form.Label className={styles.form_label} htmlFor="city-name">
                Ваше місто
              </Form.Label>
              <Form.Control
                className={styles.form_input}
                placeholder="Оберіть місто..."
                value={selectedCity ? selectedCity.value : ""}
                name="city"
                onClick={handleSearchCity}
                readOnly={true}
                id="city-name"
                ref={cityRef}
              />
              <CityModal
                show={profileCityModalShow}
                onClose={handleCityModalClose}
              />
              <Form.Group>
                <Form.Label className={styles.form_label} htmlFor="street">
                  Вулиця
                </Form.Label>
                <Form.Control
                  className={styles.form_floor}
                  type="text"
                  value={searchStreet}
                  name="street"
                  id="street"
                  onChange={(e) => handleStreetChange(e)}
                  ref={selectRef}
                />
                {filteredStreets.length > 0 && (
                  <ul className={styles.city_list} id="ulStreetSelect">
                    {filteredStreets.map((street) => (
                      <li
                        key={street._id}
                        id={street._id}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSelectStreet(street)}
                      >
                        {`${street.street_type} ${street.name}`}
                      </li>
                    ))}
                  </ul>
                )}
              </Form.Group>
              <div className={styles.flex_row}>
                <Form.Group controlId="buildingGroup">
                  <Form.Label className={styles.form_label}>Будинок</Form.Label>
                  <Form.Control
                    className={styles.form_floor}
                    name="building"
                    value={addressValues.building}
                    onChange={(e) => handleChangeAdress(e)}
                  />
                </Form.Group>
                <Form.Group controlId="flatGroup">
                  <Form.Label className={styles.form_label}>
                    Квартира
                  </Form.Label>
                  <Form.Control
                    className={styles.form_floor}
                    name="flat"
                    value={addressValues.flat}
                    onChange={(e) => handleChangeAdress(e)}
                  />
                </Form.Group>
                <button onClick={handleAddAdress} id="btnAddAddress">
                  Додати
                </button>
                <button
                  onClick={handleCancelAddAdress}
                  id="btnCancelAddAddress"
                >
                  Скасувати
                </button>
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
          <Row className={styles.mark_border}>
            {showCard ? (
              <Col className={styles.mark_border}>
                <Form.Select
                  name="creditselect"
                  className={styles.form_input_card}
                >
                  <option
                    value="Вибрати карту"
                    disabled={true}
                    id="optcred1"
                    key="optcred1"
                  >
                    Вибрати карту...
                  </option>
                  {userCreditCards.map((cc) => (
                    <option
                      key={`${cc._id}`}
                      value={cc.id}
                    >{`**** **** **** ${cc.number.slice(-4)}`}</option>
                  ))}
                </Form.Select>
                <Row className={styles.flex_row_card}>
                  <button
                    className={styles.dark_button}
                    onClick={handleAddCard}
                  >
                    + Додати карту
                  </button>
                </Row>
              </Col>
            ) : (
              <PaymentForm
                key={`${props.user.id}-form`}
                total={null}
                setIsPaid={null}
                userCreditCards={userCreditCards}
                setUserCreditCards={setUserCreditCards}
                setShowAddCard={setShowAddCard}
                setShowCard={setShowCard}
                setSelectedCard={setSelectedCard}
              />
            )}
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
          <button
            className={styles.profilebtn}
            onClick={() => setIsInEdit(true)}
          >
            Підтвердити
          </button>
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
            <button
              className={styles.edit_btn2}
              onClick={() => setIsInEdit(true)}
            >
              Підтвердити
            </button>
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
            <button
              className={styles.edit_btn2}
              onClick={() => setIsInEdit(true)}
            >
              Підтвердити
            </button>
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
  "Рукоділля",
];
const animals = ["Собачка", "Пташка", "Котик", "Плазун", "Рибки", "Гризун"];
