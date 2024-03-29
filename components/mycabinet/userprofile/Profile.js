import styles from "./styles.module.scss";
import { Accordion, Row, Col, Form, Button } from "react-bootstrap";
import * as yup from "yup";
import "yup-phone";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import CityModal from "../../../components/checkoutorder/citymodal";
import PaymentForm from "../../../components/paymentForm";
import { getStreets } from "../../../requests/street";
import { saveAddress } from "../../../requests/user";
import { toast } from "react-toastify";
import DotLoaderSpinner from "../../../components/loaders/dotLoader";

export default function Profile({ country, ...props }) {
  const [isInEdit, setIsInEdit] = useState(false);
  const [showAddressSelector, setShowAddressSelector] = useState(
    props.user?.address?.length > 0 ? "block" : "none",
  );
  const [showAddress, setShowAddress] = useState("none");
  const [showCard, setShowCard] = useState("none");
  const [showAddCard, setShowAddCard] = useState(false);
  const [showAddAddressBlock, setShowAddAddressBlock] = useState("none");
  const [profileCityModalShow, setProfileCityModalShow] = useState(false);

  const [admiration, setAdmiration] = useState(props.user?.admiration || {});
  const [additionalInfo, setAdditionalInfo] = useState(
    props.user?.additionalInfo || {},
  );
  const [pets, setPets] = useState(props.user?.pets || {});
  const selectRef = useRef();
  const cityRef = useRef();
  const postmanRef = useRef();
  const [selectedCity, setSelectedCity] = useState();
  const [userAddresses, setUserAddresses] = useState(props.user?.address || []);
  const [activeAddress, setActiveAddress] = useState(
    userAddresses?.find((address) => address.active === true) || null,
  );
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
    `${activeAddress?.cityType} ${activeAddress?.city}, ${activeAddress?.address}`,
  );
  const [isSavedAddress, setIsSavedAddress] = useState(false);
  const [userCreditCards, setUserCreditCards] = useState(
    props.user?.creditCards || [],
  );
  const [selectedCard, setSelectedCard] = useState(
    userCreditCards && userCreditCards.length > 0
      ? userCreditCards.find((creditCard) => creditCard.isDefault === true)._id
      : "",
  );
  const today = new Date();
  const cutoffYear = today.getFullYear() - 12;
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .min(3, "Ім'я має бути мінімум 3 символи")
      .max(20, "Ім'я має бути максимум 20 символів")
      .matches(
        /^[А-Яа-яЇїІі'-]*[^\s][А-Яа-яЇїІі' -]*$/,
        "Цифри та спец.символи заборонено",
      )
      .required("Ім'я обов'язково"),
    lastName: yup
      .string()
      .min(3, "Прізвище має бути мінімум 3 символи")
      .max(20, "Прізвище має бути максиFмум 20 символів")
      .matches(
        /^[А-Яа-яЇїІі'-]*[^\s][А-Яа-яЇїІі' -]*$/,
        "Цифри та спец.символи заборонено",
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
    birthday: yup
      .string()
      .matches(
        new RegExp(
          `^(19[89][0-9]|20[01][0-${cutoffYear % 100}]|${
            cutoffYear + 1
          })-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$`,
        ),
        "Користувач має бути старшим 12 років",
      ),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
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

  useEffect(() => {
    setSelectedCard(
      userCreditCards && userCreditCards.length > 0
        ? userCreditCards.find((creditCard) => creditCard.isDefault === true)
            ._id
        : "",
    );
  }, [userCreditCards]);

  const handleRegistration = async (data) => {
    const result = await axios.put("/api/user/manageProfile", {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      gender: data.gender,
      birthday: data.birthday,
    });
    setIsInEdit(false);
  };
  const handleCancelCredencialsEdit = () => {
    setIsInEdit(false);
    reset(
      {
        firstName: props.user?.firstName || "",
        lastName: props.user?.lastName || "",
        phoneNumber: props.user?.phoneNumber || "",
        email: props.user?.email || "",
        gender: props.user?.gender || "Стать",
        birthday: props.user?.birthday || "1990-01-01",
      },
      {
        keepErrors: false,
        keepDirty: true,
      },
    );
  };

  useEffect(() => {
    if (selectedAddress && selectedAddress != "") {
      const selectedOption = userAddresses.find(
        (item) =>
          `${item.cityType} ${item.city}, ${item.address}` == selectedAddress,
      );
      if (selectedOption) {
        setActiveAddress(selectedOption);
      }
    }
  }, [selectedAddress]);

  const handleSearchCity = (e) => {
    e.preventDefault();
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
  };
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
  }, [searchStreet]);

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
        setSelectedAddress(
          `${newAddress.cityType} ${newAddress.city}, ${newAddress.address}`,
        );
      }
      setShowAddressSelector("block");
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
      setShowAddAddressBlock("none");
      setShowAddress("none");
    }
  };
  const handleSelectPostman = (e) => {
    postmanRef.current.focus();
    if (selectedAddress) {
      const updatedAddresses = userAddresses.map((item) =>
        `${item.cityType} ${item.city}, ${item.address}` == e.target.value
          ? { ...item, active: true }
          : { ...item, active: false },
      );
      setUserAddresses(updatedAddresses);
    }
    setSelectedAddress(e.target.value);
  };
  const handleSaveAdress = async () => {
    if (activeAddress != null) {
      await saveAddress(activeAddress);
      setIsSavedAddress(true);
    }
  };
  const handleAddCard = () => {
    setShowAddCard(true);
    setShowCard(false);
  };
  const handleDeleteCard = async () => {
    let toastId = null;
    try {
      const { data } = await axios.put(
        "/api/user/saveCreditCard",
        {
          cardId: selectedCard,
        },
        {
          onUploadProgress: (p) => {
            const progress = p.loaded / p.total;
            setTimeout(() => {
              if (toastId === null) {
                toastId = toast("Видаляємо карту...", { progress });
              } else {
                toast.update(toastId, { progress });
              }
            }, 500);
          },
        },
      );
      setTimeout(() => {
        toast.update(toastId, {
          render: data?.message,
          type: toast.TYPE.SUCCESS,
        });
      }, 3000);
      setUserCreditCards(data.creditCards);
    } catch (error) {
      if (error.response?.data?.error) {
        console.log("368", error);
        toast.update(toastId, {
          render: error.response.data.error,
          type: toast.TYPE.ERROR,
        });
      }
    }
  };

  const additionalInfoHandler = async () => {
    const result = await axios.put("/api/user/additionalInfo", {
      additionalInfo,
    });
    setIsInEdit(false);
  };

  const petsHandler = async () => {
    const result = await axios.put("/api/user/pets", {
      pets,
    });
    setIsInEdit(false);
  };

  const admirationHandler = async () => {
    const result = await axios.put("/api/user/admiration", {
      admiration,
    });
    setIsInEdit(false);
  };

  return (
    <Accordion
      flush
      alwaysOpen
      defaultActiveKey={["0"]}
      className={styles.accordion}
    >
      {loading && <DotLoaderSpinner loading={loading} />}
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
                    className={`${styles.form_input} ${
                      errors.lastName ? "is-invalid" : ""
                    }`}
                    type="text"
                    name="lastName"
                    {...register("lastName")}
                    readOnly={!isInEdit}
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
                    className={`${styles.form_input} ${
                      errors.phoneNumber ? "is-invalid" : ""
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
                  <Form.Label className={styles.form_label}>
                    Ім&apos;я
                  </Form.Label>
                  <Form.Control
                    className={`${styles.form_input} ${
                      errors.firstName ? "is-invalid" : ""
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
                    className={`${styles.form_input} ${
                      errors.birthday ? "is-invalid" : ""
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
                    className={`${styles.form_input} ${
                      errors.gender ? "is-invalid" : ""
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
      <Accordion.Item eventKey="1" className={styles.accordion__item}>
        <Accordion.Header className={styles.accordion__item_header}>
          <span>Мої адреси</span>
        </Accordion.Header>
        <Accordion.Body className={styles.accordion__item_body}>
          <div
            className={styles.flex_row}
            style={{ display: showAddressSelector }}
          >
            <select
              className={styles.flex_selector}
              name="selectPostmanDelivery"
              id="selectPostmanDelivery"
              onChange={(e) => handleSelectPostman(e)}
              ref={postmanRef}
              value={selectedAddress}
            >
              {userAddresses != null &&
              userAddresses.filter((c) => c.address != "")
                ? userAddresses.map((item, index) => (
                    <option
                      key={`${item.address}-${index}`}
                      value={`${item.cityType} ${item.city}, ${item.address}`}
                    >
                      {item.cityType} {item.city}, {item.address}
                    </option>
                  ))
                : null}
            </select>
            <button
              onClick={handleSaveAdress}
              id="btnSaveAddress"
              disabled={isSavedAddress}
            >
              Зберегти
            </button>
          </div>

          <Row className={styles.flex_row}>
            <button
              className={styles.light_button}
              style={{ display: showAddress !== "block" ? "block" : "none" }}
              onClick={() => setShowAddress("block")}
            >
              + Додати адресу
            </button>
          </Row>
          <Row style={{ display: showAddress }}>
            <Col style={{ padding: "0" }} className={styles.ordertable}>
              <Form.Label className={styles.form_label} htmlFor="city-name">
                Ваше місто
              </Form.Label>
              <Form.Control
                className={styles.form_input}
                placeholder="Оберіть місто..."
                value={selectedCity ? selectedCity.value : ""}
                name="city"
                onClick={handleSearchCity}
                // onChange={()=>setSelectedCity(e.target.value)}
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
              <div>
                <div
                  style={{
                    display:
                      userCreditCards && userCreditCards.length > 0
                        ? "block"
                        : "none",
                  }}
                  className={styles.flex_row}
                >
                  <select
                    name="creditselect"
                    className={styles.flex_selector}
                    value={selectedCard}
                    onChange={(e) => setSelectedCard(e.target.value)}
                  >
                    <option
                      value="Вибрати карту"
                      disabled={true}
                      id="optcred1"
                      key="optcred1"
                    >
                      Вибрати карту...
                    </option>
                    {userCreditCards && userCreditCards.length > 0
                      ? userCreditCards.map((cc) => (
                          <option
                            key={`${cc._id}`}
                            value={cc._id}
                          >{`**** **** **** ${cc.number.slice(-4)}`}</option>
                        ))
                      : null}
                  </select>
                  <button onClick={handleDeleteCard}>Видалити карту</button>
                </div>
                <Row className={styles.flex_row}>
                  <button
                    className={styles.light_button}
                    onClick={handleAddCard}
                  >
                    + Додати карту
                  </button>
                </Row>
              </div>
            ) : (
              <PaymentForm
                key={`${props.user._id}-form`}
                total={null}
                setIsPaid={null}
                userCreditCards={userCreditCards}
                setUserCreditCards={setUserCreditCards}
                setShowAddCard={setShowAddCard}
                setShowCard={setShowCard}
                // setSelectedCard={setSelectedCard}
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
            <Form.Check.Input
              className={styles.checkbox_box}
              type="checkbox"
              checked={additionalInfo.children?.children}
              onChange={(e) => {
                setAdditionalInfo({
                  ...additionalInfo,
                  children: {
                    ...additionalInfo.children,
                    children: e.target.checked,
                  },
                });
              }}
            />
            <Form.Check.Label className={styles.checkbox_label}>
              У мене є дитина
            </Form.Check.Label>
          </Form.Check>

          <Form.Check type="checkbox" className={styles.checkbox}>
            <Form.Check.Input
              className={styles.checkbox_box}
              type="checkbox"
              checked={additionalInfo.vehicle?.vehicle}
              onChange={(e) => {
                setAdditionalInfo({
                  ...additionalInfo,
                  vehicle: {
                    ...additionalInfo.vehicle,
                    vehicle: e.target.checked,
                  },
                });
              }}
            />
            <Form.Check.Label className={styles.checkbox_label}>
              Я є власником автомобіля
            </Form.Check.Label>
          </Form.Check>

          <Form.Check type="checkbox" className={styles.checkbox}>
            <Form.Check.Input
              className={styles.checkbox_box}
              type="checkbox"
              checked={additionalInfo.motorcycle?.motorcycle}
              onChange={(e) => {
                setAdditionalInfo({
                  ...additionalInfo,
                  motorcycle: {
                    ...additionalInfo.motorcycle,
                    motorcycle: e.target.checked,
                  },
                }),
                  console.log(e.target.checked);
              }}
            />
            <Form.Check.Label className={styles.checkbox_label}>
              Я є власником іншого виду транспорту
            </Form.Check.Label>
          </Form.Check>
          <Form.Check type="checkbox" className={styles.checkbox}>
            <Form.Check.Input
              className={styles.checkbox_box}
              type="checkbox"
              checked={additionalInfo.business?.business}
              onChange={(e) => {
                setAdditionalInfo({
                  ...additionalInfo,
                  business: {
                    ...additionalInfo.business,
                    business: e.target.checked,
                  },
                });
              }}
            />
            <Form.Check.Label className={styles.checkbox_label}>
              Цей аккаунт використовується юридичною особою, представником
              компанії або приватним підприємцем
            </Form.Check.Label>
          </Form.Check>
          <button
            className={styles.profilebtn}
            onClick={() => {
              setIsInEdit(true), additionalInfoHandler();
            }}
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
            {Object.keys(admiration).map((hobby, index) => (
              <Col lg={4} key={index}>
                <Form.Check type="checkbox" className={styles.checkbox}>
                  <Form.Check.Input
                    className={styles.checkbox_box}
                    type="checkbox"
                    checked={admiration[hobby][hobby]}
                    onChange={(e) => {
                      setAdmiration({
                        ...admiration,
                        [hobby]: {
                          ...admiration[hobby],
                          [hobby]: e.target.checked,
                        },
                      });
                    }}
                  />
                  <Form.Check.Label className={styles.checkbox_label}>
                    {admiration[hobby].field}
                  </Form.Check.Label>
                </Form.Check>
              </Col>
            ))}
            <button
              className={styles.edit_btn2}
              onClick={() => {
                setIsInEdit(true), admirationHandler();
              }}
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
            {Object.keys(pets).map((pet, index) => (
              <Col lg={4} key={index}>
                <Form.Check type="checkbox" className={styles.checkbox}>
                  <Form.Check.Input
                    className={styles.checkbox_box}
                    type="checkbox"
                    checked={pets[pet][pet]}
                    onChange={(e) => {
                      setPets({
                        ...pets,
                        [pet]: {
                          ...pets[pet],
                          [pet]: e.target.checked,
                        },
                      });
                    }}
                  />
                  <Form.Check.Label className={styles.checkbox_label}>
                    {pets[pet].field}
                  </Form.Check.Label>
                </Form.Check>
              </Col>
            ))}
            <button
              className={styles.edit_btn2}
              onClick={() => {
                setIsInEdit(true), petsHandler();
              }}
            >
              Підтвердити
            </button>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
