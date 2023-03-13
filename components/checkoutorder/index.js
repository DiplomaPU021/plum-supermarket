import styles from "./styles.module.scss"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useState, useEffect, useRef } from 'react'
import CartItem from "./cartItem"
import CartPage from '../cart'
import { useSelector, useDispatch } from "react-redux";
import { emptyCart } from "@/store/cartSlice"
import { signIn, useSession } from 'next-auth/react';
import { Formik } from 'formik';
import * as yup from 'yup';
import "yup-phone";
import { getStreets } from "@/requests/street"
import CityModal from "./citymodal";
import useDeepCompareEffect from "use-deep-compare-effect"
import { manageAddress } from "@/requests/user"
import PersonalDataPolicy from "./info/PersonalDataPolicy"
import UserConditions from "./info/UserConditions"



const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    city: "",
    zipCode: "",
    region: "",
    address: "",
    country: "",
}

export default function CheckoutOrder({
    cart,
    user,
    country,
    selectedAddresses,
    setSelectedAddresses
}) {

    //const cartInRedux = useSelector((state) => state.cart);
    // console.log("cartInChekoutOrder", cart);
    // console.log("userInChekoutOrder", user);
    const [payment, setPayment] = useState({ paymentType: "", another: "another" });
    const { paymentType } = payment;
    const [deliv, setDeliv] = useState({ deliveryType: "" });
    const { deliveryType } = deliv;
    const [showPromo, setShowPromo] = useState("none");
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [cartShow, setCartShow] = useState(false);
    // const { data: session } = useSession();
    const dispatch = useDispatch();

    const [shipping, setShipping] = useState(initialValues);
    const [cityModalShow, setCityModalShow] = useState(false);
    const [searchCity, setSearchCity] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    const [infoShow, setInfoShow] = useState(false);
    const [info2Show, setInfo2Show] = useState(false);


    const [showSelfPickup, setSelfPickup] = useState("none");
    const [showPostmanDeliveryAll, setShowPostmanDeliveryAll] = useState("none");
    const [showPostmanDelivery, setShowPostmanDelivery] = useState("block");

    const [showSelfPickupPointDel, setShowSelfPickupPointDel] = useState("none");
    const [showNovaPoshtaDelivery, setShowNovaPoshtaDelivery] = useState("none");

    const [showAddAddressBlock, setShowAddAddressBlock] = useState("none");
    const [userAdresses, setUserAdresses] = useState(user?.address || []);
    const [activeAddress, setActiveAddress] = useState(userAdresses?.find(address => address.active === true));
    const [filteredUserAdresses, setFilteredUserAdresses] = useState([]);

    // const usePrevious = value => {
    //     const ref = useRef();
    //     useEffect(() => {
    //       ref.current = value;
    //     });
    //     return ref.current;
    //   };
    //   const myPreviousState = usePrevious(apiOptions);
    // TODO: поміняти місями true false після того як вже будуть юзери з адресами
    const [visibleAddressField, setVisibleAddressField] = useState(filteredUserAdresses?.length > 0 ? true : false);

    const [addressValues, setAddressValues] = useState({
        street: '',
        building: '',
        flat: '',
        ground: '',
        elevator: ''
    });
    const [nameValues, setNameValues] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: ''
    });

    const [filteredStreets, setFilteredStreets] = useState([]);
    const [searchStreet, setSearchStreet] = useState("");
    const [selectedStreet, setSelectedStreet] = useState({});

    // TODO: замінити в коді adresssArray на userAdresses, як тільки в юзера з'являться адреси в базі
    const [addressArray, setAddressArray] = useState(
        [
            {
                _id: 1,
                address: "Володимира Великого вул., буд.1, кв.2",
                region: "Львівська обл.",
                city: "Львів",
                zipCode: "4610100000",
                country: "Україна",
                active: true,
            },
            {
                _id: 2,
                address: "Володимира Симоненка вул., буд.4, кв.3",
                region: "Львівська обл.",
                city: "Львів",
                zipCode: "4610100000",
                country: "Україна",
                active: false,
            },
        ]
    );


    const {
        firstName,
        lastName,
        phoneNumber,
        region,
        city,
        zipCode,
        address
    } = shipping;

    // const phoneSchema = yup.setLocale(number).string().phone('UA').test('len', 'Номер телефону має бути довжиною від 10 до 13 символів', val => {
    //     if (val) {
    //         const phone = val.replace(/[^0-9]/g, '');
    //         return phone.length >= 10 && phone.length <= 13 && phone[0] === '0';
    //     }
    //     return false;
    // });
    const validate = yup.object({
        firstName: yup.string()
            .min(3, "Ім'я має бути мінімум 3 символи")
            .max(20, "Ім'я має бути максимум 20 символів")
            .matches(/^[А-Яа-яЇїІі'-]*[^\s][А-Яа-яЇїІі' -]*$/, "Цифри та спец.символи заборонено")
            .required("Ім'я обов'язково"),
        lastName: yup.string()
            .min(3, "Прізвище має бути мінімум 3 символи")
            .max(20, "Прізвище має бути максиFмум 20 символів")
            .matches(/^[А-Яа-яЇїІі'-]*[^\s][А-Яа-яЇїІі' -]*$/, "Цифри та спец.символи заборонено")
            .required("Прізвище обов'язково"),
        // phoneNumber: yup.string().phone().required("Необхідний номер телефону"),
        phoneNumber: yup.string().test('phone', 'Некоректний номер телефону', value => {
            if (!value) return true;
            return yup.string().phone('UA').isValidSync(value) && value.length >= 10 && value[0] === '0';
        }),
        // cityRegion: yup.string()
        //     .required("Необхідно ввести область")
        //     .min(3, "Має бути мінімум 3 символи")
        //     .max(20, "Має бути максимум 20 символів"),
        city: yup.string()
            .required("Необхідно вибрати місто"),
        //zipcode виконує тут роль коду міста для пошуку в базі 
        zipCode: yup.string(),
        address: yup.string()
            .max(100, "Має бути максимум 100 символів")
        // country: yup.string()
    })

    const selectRef = useRef();
    const handleCityChange = (e) => {
        setSearchCity(e.target.value);
    };

    const handleGetCredencials = e => {
        const { name, value } = e.target;
        //  if(name === "defaultCity") {
        // setSelectedCity(e.target.value);
        // }
        setActiveAddress({ ...activeAddress, [name]: value });

        console.log("handleChange", name, value);
        setShipping({ ...shipping, [name]: value })

    }

    const handleChangePayment = e => {
        e.persist();
        // console.log("userAdresses", userAdresses);

        console.log("handlePayment: ", e.target.value);
        setPayment(prevState => ({
            ...prevState,
            paymentType: e.target.value
        }));
    };

    useEffect(() => {

        if (searchCity && searchStreet) {
            let streets = [];
            setTimeout(async () => {
                streets = await getStreets(searchCity, searchStreet);
                if (streets && streets.length > 0) {
                    setFilteredStreets(streets);
                } else {
                    setFilteredStreets([]);
                }
            }, 1000);
        }
    }, [searchStreet]);

    useDeepCompareEffect(() => {
        // activeAddress && selectedCity ?
        //     activeAddress.city.zipcode === selectedCity.object_code ?
        //         setVisibleAddressField(true)
        //         : setVisibleAddressField(false)
        //     : setVisibleAddressField(false);

        // if(!selectedCity&& activeAddress) {
        //     console.log("190");
        //     setVisibleAddressField(true)
        // }
        // else if(!selectedCity&& !activeAddress) {
        //     console.log("194");
        //     setVisibleAddressField(false)
        // } else if (selectedCity&& activeAddress){
        //     console.log("197", activeAddress);
        //     if( activeAddress.zipCode === selectedCity.object_code){
        //         console.log("199");
        //         setVisibleAddressField(true) 
        //     }
        //     else {
        //         console.log("203");
        //         setVisibleAddressField(false)
        //     }
        if (selectedCity) {

            setFilteredUserAdresses(userAdresses?.filter(address => address.zipCode === selectedCity.object_code));
            console.log("filteredaddresses", filteredUserAdresses);
            console.log("filteredaddressesLength", filteredUserAdresses.length);
            if (filteredUserAdresses.length > 0) {
                setVisibleAddressField(true);
            } else {
                setVisibleAddressField(false);
            }
        }
    }, [selectedCity, filteredUserAdresses, userAdresses]);


    // useEffect(() => {

    //     setActiveAddress(userAdresses.find(address => address.active === true));

    // }, [activeAddress, userAdresses]);



    const handleSelectStreet = (street) => {
        selectRef.current.focus();
        setSelectedStreet(street);
        setSearchStreet(`${street.street_type} ${street.name}`);

    }

    const handleChangeDelivery = e => {
        e.persist();
        console.log("handleDeliveryValue", e.target.value);
        console.log("handleDeliveryName", e.target.name);

        if (e.target.name === "selfPickupRadio") {
            setSelfPickup("block")
        } else {
            setSelfPickup("none")
        }
        if (e.target.name === "postmanRadio") {
            setShowPostmanDeliveryAll("block")
            // setShowPostmanDelivery("block")
        } else {
            setShowPostmanDeliveryAll("none")
        }
        if (e.target.name === "selfPickupPointRadio") {
            setShowSelfPickupPointDel("block")
        } else {
            setShowSelfPickupPointDel("none")
        }
        if (e.target.name === "novaPoshtaRadio") {
            setShowNovaPoshtaDelivery("block")
        } else {
            setShowNovaPoshtaDelivery("none")
        }

        setDeliv(prevState => ({
            ...prevState,
            deliveryType: e.target.value
        }));
        console.log("deliv", deliv);

    };


    const handleSelectPickup = (e) => {
        e.persist();
        const options = e.target.options;
        if (options[0].selected) {
            options[0].disabled = true;
        }
        console.log("handleSelectPickup", e.target.value);

    };
    const handleSelectPostman = (e) => {
        //  e.persist();
        // const options = e.target.options;
        // if (options[0].selected) {
        //     options[0].disabled = true;
        // }
        // console.log("element.value", filteredUserAdresses[e.target.selectedIndex].address);
        setActiveAddress(filteredUserAdresses[e.target.selectedIndex]);

    }
    const handleChangeAdress = (e) => {
        e.persist();

        setAddressValues({
            ...addressValues,
            [e.target.name]: e.target.value
        });

    }
    const handleAddAdress = () => {
        // const addressString = Object.values(addressValues).join(', ');

        if (searchCity) {
            // const addressString = selectedStreet.street_type + " " + selectedStreet.name + ", буд." + addressValues.building + ", кв." + addressValues.flat + ", пов." + addressValues.ground + ", ліфт: " + addressValues.elevator;
            const addressString = selectedStreet.street_type + " " + selectedStreet.name + ", буд. " + addressValues.building + ", кв. " + addressValues.flat;
            let newAddress = {
                firstName: activeAddress.firstName,
                lastName: activeAddress.lastName,
                phoneNumber: activeAddress.phoneNumber,
                address: addressString,
                streetType: selectedStreet.street_type,
                street: selectedStreet.name,
                building: addressValues.building,
                flat: addressValues.flat,
                ground: addressValues.ground,
                elevator: addressValues.elevator,
                cityType: selectedCity.object_category,
                country: country.name,
                city: selectedCity.object_name,
                region: selectedCity.region,
                zipCode: selectedCity.object_code,
                active: true,
            };
            if (newAddress) {
                console.log("341NewAddress", newAddress);
                setUserAdresses([...userAdresses, newAddress]);
                setActiveAddress(newAddress);
                // saveAddress(newAddress);
            }
            console.log("333filteredUserAdresses", filteredUserAdresses);

            setShowAddAddressBlock("none")
            setShowPostmanDelivery("block");
            document.getElementById("buildingGroup").value = "";
            document.getElementById("flatGroup").value = "";
            document.getElementById("groundGroup").value = "";
            document.getElementById("idElevator").value = "";
            setSearchStreet("");
        }
    }
    const handleShowAddAdress = () => {
        setShowAddAddressBlock("block");
        setShowPostmanDelivery("none");
    }
    const handleSelectElevator = (e) => {
        const options = e.target.options;
        if (options[0].selected) {
            options[0].disabled = true;
        }
        setAddressValues({
            ...addressValues,
            elevator: e.target.value
        });

    }
    const handleCancelAddAdress = () => {
        setShowAddAddressBlock("none");
        setShowPostmanDelivery("block");
        document.getElementById("buildingGroup").value = "";
        document.getElementById("flatGroup").value = "";
        document.getElementById("groundGroup").value = "";
        document.getElementById("idElevator").value = "";
        setSearchStreet("")

    };
    const getTotalPrice = () => {
        return cart.products.reduce(
            (accumulator, item) => accumulator + item.qty * item.priceAfter,
            0
        );
    };
    const getTotalPriceAferCoupon = () => {
        return (100 - couponDiscount) * getTotalPrice() / 100;
    };
    const getTotalQty = () => {
        return cart.products.reduce(
            (accumulator, item) => accumulator + item.qty,
            0
        );
    };
    const updateCartHandler = (e) => {
        e.preventDefault();
        setCartShow(true);
    }
    const handleSearchCity = (e) => {
        e.preventDefault();
        setCityModalShow(true);
    };

    const handleCityModalClose = (selectedCity) => {
        if (selectedCity) {
            console.log("heloooooooo", selectedCity);

            setSearchCity(selectedCity);
            setSelectedCity(selectedCity);
        }
        setCityModalShow(false);
    };
    const sendOrder = async () => {

        if (session) {
            // const { data } = await axios.get(
            //     `/api/product/${product._id}?style=${router.query.style}&code=${router.query.code}`
            //   );
            console.log("user sent order");
            var empty = dispatch(emptyCart());
            console.log("emptycartPayload", empty);
        } else {
            signIn();
        }
    }
    //    const updateCartHandler=(e)=>{
    //     sendOrder(e);
    //     //window.location.reload(true);
    //     // @refresh reset
    //    }
    // const handleFormClick = (event) => {
    //     event.stopPropagation();
    // }
    return (

        <div className={styles.topsales}>
            <Container className={styles.container}>
                <Row className={styles.row}>
                    <Col className={styles.colcard}><div className={styles.leftsale}>Оформлення замовлення</div></Col>
                </Row>
                <Formik
                    enableReinitialize
                    initialValues={{
                        firstName: activeAddress ? activeAddress.firstName : "",
                        lastName: activeAddress ? activeAddress.lastName : "",
                        phoneNumber: activeAddress ? activeAddress.phoneNumber : "",
                        city: selectedCity ? selectedCity.value : ""
                    }}
                    validationSchema={validate}
                // onSubmit={() => {
                //     signInHandler();
                // }}
                >
                    {({
                        // handleSubmit,
                        handleChange,
                        // handleBlur,
                        values,
                        touched,
                        isValid,
                        errors,
                    }) => (
                        <Form  >
                            {/* <div>{activeAddress.street}</div>
                            <div>{activeAddress.building}</div>
                            <div>{activeAddress.flat}</div>
                            <div>{country.name}</div>
                            {userAdresses.map((address) => (
                                <div key={address._id} >
                                    {address.street}
                                </div>
                            ))} */}
                            <Row className={styles.products_row}>
                                <Col className={styles.colcard}>
                                    <div className={styles.checkout_form}>
                                        <Row className={styles.row}>
                                            <Col className={styles.colcard}> <div className={styles.panel}>Ваші контактні данні</div></Col>
                                        </Row>
                                        <Row className={styles.attention2}>
                                            Увага! Товари, що на різних складах або різних продавців, буде доставлено окремими замовленнями
                                        </Row>
                                        <Row className={styles.contacts}>
                                            <Col className={styles.col_contacts}>
                                                <Form.Group as={Col} controlId="groupSurname">
                                                    <Form.Label className={styles.form_label}>Прізвище</Form.Label>
                                                    <Form.Control className={styles.form_input}
                                                        type="text"
                                                        name="lastName"
                                                        value={values.lastName}
                                                        onChange={(e) => { handleChange(e); handleGetCredencials(e) }}
                                                        isInvalid={!!errors.lastName}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{errors.lastName}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="groupPhone">
                                                    <Form.Label className={styles.form_label}>Номер телефону</Form.Label>
                                                    <Form.Control className={styles.form_input}
                                                        name="phoneNumber"
                                                        value={values.phoneNumber}
                                                        onChange={(e) => { handleChange(e); handleGetCredencials(e) }}
                                                        isInvalid={!!errors.phoneNumber}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{errors.phoneNumber}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col className={styles.col_contacts}>
                                                <Form.Group as={Col} controlId="groupName">
                                                    <Form.Label className={styles.form_label}>Ім'я</Form.Label>
                                                    <Form.Control className={styles.form_input}
                                                        type="text"
                                                        name="firstName"
                                                        value={values.firstName}
                                                        onChange={(e) => { handleChange(e); handleGetCredencials(e) }}
                                                        isInvalid={!!errors.firstName}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{errors.firstName}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="groupEmail">
                                                    <Form.Label className={styles.form_label}>Електронна пошта</Form.Label>
                                                    <Form.Control className={styles.form_input} type="email" name="email" value={user ? user.email : ""} readOnly />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className={styles.row}>
                                            <Col className={styles.colcard}> <div className={styles.panel}>Спосіб доставки</div></Col>
                                        </Row>
                                        <Row className={styles.delivery}>
                                            <Col className={styles.colcard}>
                                                {/* {activeAddress.address}  {activeAddress.firstName} {activeAddress.lastName} */}

                                                <Form.Group as={Col} >
                                                    <Form.Label className={styles.form_label} htmlFor="city-name">Ваше місто</Form.Label>
                                                    <Form.Control className={styles.form_input2} placeholder="Виберіть місто..."
                                                        // value={searchCity ? searchCity.value : activeAddress ? `${activeAddress.cityType} ${activeAddress.city}, ${activeAddress.region}` : ""} name="city"
                                                        value={values.city} name="city"
                                                        onClick={handleSearchCity}
                                                        onChange={(e) => { handleChange(e); handleCityChange(e) }}
                                                        readOnly={true}
                                                        id="city-name"
                                                        isInvalid={!!errors.city}
                                                    //  ref={selectRef}
                                                    // inputRef={(ref) => {this.input = ref}}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{errors.city}
                                                    </Form.Control.Feedback>
                                                    <CityModal show={cityModalShow} onClose={handleCityModalClose}
                                                        search_сity={searchCity} />
                                                    <Row>
                                                        <Row>
                                                            <Col>
                                                                <Form.Check
                                                                    type="radio"
                                                                    // id="selfPickupCheck"
                                                                    className={styles.radio}
                                                                    aria-label="radio 9">
                                                                    <Form.Check.Input
                                                                        name="selfPickupRadio"
                                                                        id="selfPickupRadio"
                                                                        type="radio"
                                                                        value="Самовивіз з наших магазинів"
                                                                        onChange={handleChangeDelivery}
                                                                        checked={deliveryType === "Самовивіз з наших магазинів"}
                                                                    />
                                                                    <Form.Check.Label htmlFor="selfPickupRadio">Самовивіз з наших магазинів</Form.Check.Label>
                                                                </Form.Check>
                                                            </Col>
                                                            <Col className={styles.text_span}>Безкоштовно</Col>
                                                        </Row>
                                                        <Row style={{ display: showSelfPickup }}>
                                                            <Form.Select className={styles.form_input2}
                                                                onClick={handleSelectPickup}>
                                                                <option value="" disabled={false} key="selpick1">Вибрати адресу відділення...</option>
                                                                <option key="selpick2">вул.Кульпарківська, 72</option>
                                                                <option key="selpick3">вул.Мазепи, 127</option>
                                                                <option key="selpick4">вул.Антоновича, 31/2</option>
                                                            </Form.Select>
                                                        </Row>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Form.Check
                                                                type="radio"
                                                                // id="postmanCheck"
                                                                className={styles.radio}
                                                                aria-label="radio 8">
                                                                <Form.Check.Input
                                                                    name="postmanRadio"
                                                                    id="postmanRadio"
                                                                    type="radio"
                                                                    value="Кур'єр на вашу адресу"
                                                                    onChange={handleChangeDelivery}
                                                                    checked={deliveryType === "Кур'єр на вашу адресу"} />
                                                                <Form.Check.Label htmlFor="postmanRadio">Кур'єр на вашу адресу</Form.Check.Label>
                                                            </Form.Check>
                                                        </Col>
                                                        <Col className={styles.text_span}>98 $</Col>
                                                    </Row>
                                                    <Row style={{ display: showPostmanDeliveryAll }}>
                                                        <Row style={{ display: showPostmanDelivery }}>
                                                            {visibleAddressField ? (
                                                                <Form.Select className={styles.form_input2}
                                                                    name="selectPostmanDelivery"
                                                                    id="selectPostmanDelivery"
                                                                    onChange={handleSelectPostman}>
                                                                    {/* <option value="" disabled={false}>Вибрати адресу доставки...</option> */}
                                                                    {filteredUserAdresses.map((item, index) => (
                                                                        <option
                                                                            id={index} key={index}
                                                                            value={item}
                                                                        >{item.address}</option>
                                                                    ))}
                                                                </Form.Select>
                                                            ) : (
                                                                <></>
                                                            )}

                                                            <Row>
                                                                <Col>
                                                                    <Button onClick={handleShowAddAdress} id="btn-add-another-address">Додати адресу</Button>
                                                                </Col>
                                                            </Row>

                                                        </Row>

                                                        <Row style={{ display: showAddAddressBlock }} id="rowStreetSearch">
                                                            <Row>
                                                                <Form.Group as={Col} >
                                                                    <Form.Label className={styles.form_label} htmlFor="street">Вулиця</Form.Label>
                                                                    <Form.Control className={styles.form_input}
                                                                        value={searchStreet}
                                                                        name="street"
                                                                        id="street"
                                                                        onChange={(e) => setSearchStreet(e.target.value)}
                                                                        ref={selectRef}
                                                                    />
                                                                    {filteredStreets.length > 0 && (
                                                                        <ul className={styles.city_list} id="ulStreetSelect">
                                                                            {filteredStreets.map((street) => (
                                                                                <li
                                                                                    key={street._id}
                                                                                    id={street._id}
                                                                                    onClick={() => handleSelectStreet(street)}
                                                                                >
                                                                                    {/* {searchStreet.length > 3 ? `${street.street_type} ${street.name}` : ""} */}
                                                                                    {`${street.street_type} ${street.name}`}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    )}
                                                                </Form.Group>
                                                                <Form.Group as={Col} controlId="buildingGroup">
                                                                    <Form.Label className={styles.form_label}>Будинок</Form.Label>
                                                                    <Form.Control className={styles.form_input} name="building" onChange={handleChangeAdress} />
                                                                </Form.Group>
                                                                <Form.Group as={Col} controlId="flatGroup">
                                                                    <Form.Label className={styles.form_label}>Квартира</Form.Label>
                                                                    <Form.Control className={styles.form_input} name="flat" onChange={handleChangeAdress} />
                                                                </Form.Group>
                                                            </Row>
                                                            <Row>
                                                                <Form.Group as={Col} controlId="groundGroup">
                                                                    <Form.Label className={styles.form_label}>Поверх</Form.Label>
                                                                    <Form.Control className={styles.form_input} name="ground" onChange={handleChangeAdress} />
                                                                </Form.Group>
                                                                <Form.Group as={Col} controlId="elevatorGroup">
                                                                    <Form.Label className={styles.form_label}>Ліфт</Form.Label>
                                                                    <Form.Select className={styles.form_input2}
                                                                        name="elevator"
                                                                        id="idElevator"
                                                                        onClick={handleSelectElevator}>
                                                                        <option value="" disabled={false} id="optEl1" key="optEl1">Наявність вантажного ліфта</option>
                                                                        <option id="optEl2" key="optEl2">Відсутній</option>
                                                                        <option id="optEl3" key="optEl3">Присутній</option>
                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Row>
                                                            <Row>
                                                                <Col>
                                                                    <Button onClick={handleAddAdress} id="btnAddAddress">Додати</Button>
                                                                    <Button onClick={handleCancelAddAdress} id="btnCancelAddAddress">Скасувати</Button>
                                                                </Col>
                                                            </Row>
                                                        </Row>
                                                    </Row>


                                                    <Row><Col>
                                                        <Form.Check
                                                            type="radio"
                                                            // id="novaPoshtaCheck"
                                                            className={styles.radio}
                                                            aria-label="radio 6">
                                                            <Form.Check.Input
                                                                type="radio"
                                                                value="Нова пошта"
                                                                name="novaPoshtaRadio"
                                                                checked={deliveryType === "Нова пошта"}
                                                                onChange={handleChangeDelivery}
                                                            />
                                                            <Form.Check.Label>Нова пошта</Form.Check.Label>
                                                        </Form.Check>
                                                    </Col>
                                                        <Col className={styles.col_disc}><div className={styles.text_discount}><p>145 $</p><h4>80 $</h4></div></Col>
                                                    </Row>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className={styles.row}>
                                            <Col className={styles.colcard}> <div className={styles.panel}>Оплата</div></Col>
                                        </Row>
                                        <Row className={styles.payment}>
                                            <Col className={styles.colcard}>
                                                <Form.Group controlId="payment">
                                                    <Form.Check
                                                        type="radio"
                                                        className={styles.radio}
                                                        aria-label="radio 1">
                                                        <Form.Check.Input
                                                            type="radio"
                                                            value="Оплата під час отримання товару"
                                                            onChange={handleChangePayment}
                                                            checked={paymentType === "Оплата під час отримання товару"} />
                                                        <Form.Check.Label>Оплата під час отримання товару</Form.Check.Label>
                                                    </Form.Check>
                                                    <Form.Check
                                                        type="radio"
                                                        className={styles.radio}
                                                        aria-label="radio 2">
                                                        <Form.Check.Input
                                                            type="radio"
                                                            value="Оплатити зараз"
                                                            onChange={handleChangePayment}
                                                            checked={paymentType === "Оплатити зараз"} />
                                                        <Form.Check.Label>Оплатити зараз</Form.Check.Label>
                                                    </Form.Check>
                                                    <Form.Check
                                                        type="radio"
                                                        className={styles.radio}
                                                        aria-label="radio 3">
                                                        <Form.Check.Input
                                                            type="radio"
                                                            value="Безготівковий розрахунок для юридичних осіб"
                                                            onChange={handleChangePayment}
                                                            checked={paymentType === "Безготівковий розрахунок для юридичних осіб"} />
                                                        <Form.Check.Label>Безготівковий розрахунок для юридичних осіб</Form.Check.Label>
                                                    </Form.Check>
                                                    <Form.Check
                                                        type="radio"
                                                        className={styles.radio}
                                                        aria-label="radio 4">
                                                        <Form.Check.Input
                                                            type="radio"
                                                            value="Безготівковий розрахунок для фізичних осіб"
                                                            onChange={handleChangePayment}
                                                            checked={paymentType === "Безготівковий розрахунок для фізичних осіб"} />
                                                        <Form.Check.Label>Безготівковий розрахунок для фізичних осіб</Form.Check.Label>
                                                    </Form.Check>
                                                    <Form.Check
                                                        type="radio"
                                                        className={styles.radio}
                                                        aria-label="radio 5">
                                                        <Form.Check.Input
                                                            type="radio"
                                                            value="Кредит та оплата частинами"
                                                            onChange={handleChangePayment}
                                                            checked={paymentType === "Кредит та оплата частинами"} />
                                                        <Form.Check.Label>Кредит та оплата частинами</Form.Check.Label>
                                                    </Form.Check>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className={styles.row}>
                                            <Col className={styles.colcard}> <div className={styles.panel}>Контактні данні одержувача</div></Col>
                                        </Row>
                                        <Row className={styles.attention}>
                                            Увага! Отримання замовлення за паспортом. Введіть прізвище, ім'я, по батькові та мобільний номер телефону отримувача замовлення
                                        </Row>
                                        <Row className={styles.contacts}>
                                            <Col className={styles.col_contacts}>
                                                <Form.Group as={Col}>
                                                    <Form.Label className={styles.form_label}>Прізвище</Form.Label>
                                                    <Form.Control className={styles.form_input} name="lastName" onChange={handleChange} />
                                                </Form.Group>
                                                <Form.Group as={Col}>
                                                    <Form.Label className={styles.form_label} name="phoneNumber" onChange={handleChange}>Номер телефону</Form.Label>
                                                    <Form.Control className={styles.form_input} />
                                                </Form.Group>
                                            </Col>
                                            <Col className={styles.col_contacts}>
                                                <Form.Group as={Col}>
                                                    <Form.Label className={styles.form_label}>Ім'я</Form.Label>
                                                    <Form.Control className={styles.form_input} name="firstName" onChange={handleChange} />
                                                </Form.Group>
                                                <Form.Group as={Col}>
                                                    <Form.Label className={styles.form_label}>Електронна пошта</Form.Label>
                                                    <Form.Control className={styles.form_input} type="email" name="email" onChange={handleChange} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className={styles.row}>
                                            <Col className={styles.colcard}> <div className={styles.panel}>Ваше замовлення</div></Col>
                                        </Row>
                                        <Row className={styles.order}>
                                            <button
                                                onClick={(e) => updateCartHandler(e)}
                                            >Редагувати</button>
                                            <CartPage
                                                show={cartShow}
                                                onHide={() => setCartShow(false)}
                                            />
                                            {
                                                cart.products.map((p, i) => (
                                                    <Col className={styles.colcard} key={p._id} >
                                                        <CartItem product={p} />
                                                    </Col>
                                                ))}
                                            {/* <Col className={styles.colcard}>
                                        <Button className={styles.big_confirm}>Підтвердити</Button>
                                    </Col> */}
                                        </Row>
                                    </div>
                                </Col>
                                <Col className={styles.colcard} xs lg="4">
                                    <div className={styles.confirm}>
                                        <Button className={styles.promo} onClick={() => setShowPromo(showPromo === "none" ? "block" : "none")}>
                                            Промокод
                                            {showPromo === "none" ? <img width="30px" height="30px" src="../../../icons/down-btn.png"></img> :
                                                <img width="30px" height="30px" src="../../../icons/up-btn.png"></img>}
                                        </Button>
                                        <div className={styles.promo_div} style={{ display: showPromo }}>
                                            <Form.Control className={styles.form_input3} />
                                            {/* TODO onClick */}
                                            <Button className={styles.small_sbm}>Застосувати</Button>
                                        </div>
                                        <div className={styles.form_line}></div>
                                        <div className={styles.total}>
                                            <Form.Label className={styles.total_label}>Разом:</Form.Label>
                                            <ul>
                                                <li><div className={styles.info_li}><p>{getTotalQty()} товарів на сумму</p><h6>{getTotalPrice().toFixed(2)} ₴</h6></div></li>
                                                <li><div className={styles.info_li}><p>Вартість доставки</p><h6>за тарифами перевізника</h6></div></li>
                                                <li><div className={styles.info_li}><p>До сплати:</p><h3>{getTotalPriceAferCoupon().toFixed(2)} ₴</h3></div></li>
                                            </ul>
                                            <Button className={styles.small_sbm}
                                                onClick={() => sendOrder()}
                                            >Підтвердити</Button>
                                        </div>
                                        <div className={styles.form_line}></div>
                                        <div className={styles.info}>
                                            <p>Отримання замовлення від 5 000 ₴ тільки за паспортом (Закон від 06.12.2019 № 361-IX)</p>
                                            <ul>Підтверджуючи замовлення, я приймаю умови:
                                                <li><div className={styles.info_li}><p>положення про обробку і захист персональних даних</p><img width="120px" height="25px" src="../../../icons/info.png" onClick={() => setInfoShow(true)}></img></div></li>
                                                <li><div className={styles.info_li}><p>угоди користувача</p><img width="120px" height="25px" src="../../../icons/info.png" onClick={() => setInfo2Show(true)}></img></div></li>
                                            </ul>
                                        </div>

                                    </div>
                                </Col>

                            </Row>
                        </Form>

                    )}

                </Formik>
                <PersonalDataPolicy show={infoShow}
                    onHide={() => setInfoShow(false)} />
                <UserConditions show={info2Show}
                    onHide={() => setInfo2Show(false)} />
            </Container>
        </div >
    )
}


