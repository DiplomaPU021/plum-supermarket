import styles from "../styles.module.scss"
import { Form, Row, Col, Button, Container } from "react-bootstrap"
import React, { useEffect, useRef, useState } from 'react'
import CityModal from "../citymodal";
import { getStreets } from "@/requests/street";
import useDeepCompareEffect from "use-deep-compare-effect";
import { deliveryTypes } from "@/data/deliveryTypes";


export default function Shipping({ user, activeAddress, setActiveAddress, country, delivery, setDelivery }) {
    const [cityModalShow, setCityModalShow] = useState(false);
    const [selectedCity, setSelectedCity] = useState(
        activeAddress ? { value: `${activeAddress?.cityType} ${activeAddress?.city}, ${activeAddress?.region}`, object_category: activeAddress?.cityType, object_name: activeAddress?.city, object_code: activeAddress?.zipCode, region: activeAddress?.region } : null);
    const [showSelfPickup, setSelfPickup] = useState("none");
    const [showPostmanDeliveryAll, setShowPostmanDeliveryAll] = useState("none");
    const [showPostmanDelivery, setShowPostmanDelivery] = useState("block");
    const [showNovaPoshtaDelivery, setShowNovaPoshtaDelivery] = useState("block");
    const [showAddAddressBlock, setShowAddAddressBlock] = useState("none");
    const [userAddresses, setUserAdresses] = useState(user?.address || []);
    const [filteredUserAdresses, setFilteredUserAdresses] = useState(userAddresses?.filter(address => address.zipCode === selectedCity?.object_code));
    // const [filteredUserAdresses, setFilteredUserAdresses] = useState(() => {
    //     const filteredAddresses = userAddresses?.filter(address => address.zipCode === selectedCity.object_code);
    //     const uniqueAddresses = [...new Set(filteredAddresses.map(address => address.address))];
    //     return uniqueAddresses.map(address => {
    //       return filteredAddresses.find(item => item.address === address);
    //     });
    //   });
    //вулиці в випадаючому списку (з бази)
    const [filteredStreets, setFilteredStreets] = useState([]);
    const [searchStreet, setSearchStreet] = useState("");
    const [selectedStreet, setSelectedStreet] = useState(activeAddress ? { value: activeAddress?.address, name: activeAddress?.street, street_type: activeAddress?.streetType, city_name: activeAddress?.city, city_code: activeAddress?.zipCode } : null);
    const [visibleAddressField, setVisibleAddressField] = useState(filteredUserAdresses?.length > 0 ? true : false);
    const [addressValues, setAddressValues] = useState({
        street: '',
        building: '',
        flat: '',
        ground: '',
        elevator: '',
        filled: false,
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const selectRef = useRef();
    const cityRef = useRef();
    const postmanRef = useRef();

    const handleSearchCity = (e) => {
        e.preventDefault();
        cityRef.current.focus();
        setCityModalShow(true);

    };
    const handleCityModalClose = (selectedCity) => {
        if (selectedCity) {
            setUserAdresses(user?.address || []);
            setSelectedCity(selectedCity);
            setActiveAddress(filteredUserAdresses?.length > 0 ? prevState => ({
                ...prevState,
                address: "",
                streetType: "",
                street: "",
                building: "",
                flat: "",
                ground: "",
                elevator: "",
                cityType: selectedCity.object_category,
                country: country.name,
                city: selectedCity.object_name,
                region: selectedCity.region,
                zipCode: selectedCity.object_code,
                active: true

            }) : prevState => ({
                ...prevState,
                address: "",
                streetType: "",
                street: "",
                building: "",
                flat: "",
                ground: "",
                elevator: "",
                cityType: selectedCity.object_category,
                country: country.name,
                city: selectedCity.object_name,
                region: selectedCity.region,
                zipCode: selectedCity.object_code,
                active: true,
            }))
        }
        setCityModalShow(false);
    };

    useEffect(() => {
        if (selectedCity && searchStreet) {
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

    useEffect(() => {
        if (addressValues && addressValues.building !== '' && addressValues.filled) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [addressValues]);

    useDeepCompareEffect(() => {
        filteredUserAdresses?.length == 0 ? setShowAddAddressBlock("block") && setShowPostmanDelivery("none") : setShowAddAddressBlock("none") && setShowPostmanDelivery("block");
    }, [filteredUserAdresses]);

    //     const updateFilteredAddresses = useCallback((selectedCity, userAddresses) => {
    //   const filteredAddresses = userAddresses?.filter(address => address.zipCode === selectedCity.object_code);

    //   if (JSON.stringify(filteredAddresses) !== JSON.stringify(filteredUserAdresses)) {
    //     setFilteredUserAdresses(filteredAddresses);
    //   }
    // }, [filteredUserAdresses]);
    useDeepCompareEffect(() => {
        if (selectedCity) {
            setFilteredUserAdresses(userAddresses?.filter(address => address.zipCode === selectedCity.object_code));
            // setFilteredUserAdresses(() => {
            //     const filteredAddresses = userAddresses?.filter(address => address.zipCode === selectedCity.object_code);
            //     const uniqueAddresses = [...new Set(filteredAddresses.map(address => address.address))];
            //     return uniqueAddresses.map(address => {
            //       return filteredAddresses.find(item => item.address === address);
            //     });
            //   })
            if (filteredUserAdresses && filteredUserAdresses.length > 0) {
                setVisibleAddressField(true);
                setActiveAddress(prevState => ({
                    ...prevState,
                    address: filteredUserAdresses[0].address,
                    streetType: filteredUserAdresses[0].street_type,
                    street: filteredUserAdresses[0].name,
                    building: filteredUserAdresses[0].building,
                    flat: filteredUserAdresses[0].flat,
                    ground: filteredUserAdresses[0].ground,
                    elevator: filteredUserAdresses[0].elevator,
                    active: true,
                }))

            } else {
                setVisibleAddressField(false);
            }
        }
    }, [selectedCity, filteredUserAdresses, userAddresses]);

    const handleSelectStreet = (street) => {
        selectRef.current.focus();
        setSelectedStreet(street);
        setSearchStreet(`${street.street_type} ${street.name}`);
        setAddressValues({
            ...addressValues,
            filled: true,
        });
        setActiveAddress(prevState => ({
            ...prevState,
            active: true,
        }))
    }
    const handleChangeAdress = (e) => {
        setAddressValues({
            ...addressValues,
            [e.target.name]: e.target.value
        });
    }
    const handleSelectPostman = (e) => {
        postmanRef.current.focus();
        setActiveAddress(filteredUserAdresses[e.target.selectedIndex]);
    }

    const handleChangeDelivery = e => {
        if (e.target.name === "selfPickup") {
            setSelfPickup("block")
        } else {
            setSelfPickup("none")
        }
        if (e.target.name === "postmanDelivery") {
            setShowPostmanDeliveryAll("block")
        } else {
            setShowPostmanDeliveryAll("none")
        }
        if (e.target.name === "novaPoshta") {
            setShowNovaPoshtaDelivery("block")
        } else {
            setShowNovaPoshtaDelivery("none")
        }
        const deliveryPrice = deliveryTypes.filter(d => d.name === e.target.value).map(p => p.price);
        // console.log("deliveryCost238", deliveryPrice[0]);
        setDelivery(prevState => ({
            ...prevState,
            deliveryType: e.target.value,
            deliveryCost: deliveryPrice[0],
            deliveryId: e.target.id,
        }));

    };

    const handleSelectPickup = (e) => {
        const options = e.target.options;
        if (options[0].selected) {
            options[0].disabled = true;
        }
        // console.log("handleSelectPickup", e.target.id);
        setDelivery({
            ...delivery,
            deliveryAddress: e.target.value,
        }
        );

    };
    const handleAddAdress = () => {
        if (selectedCity) {
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
                setActiveAddress(newAddress);
                let addresses = [];
                for (let i = 0; i < userAddresses.length; i++) {
                    let temp_address = {};
                    temp_address = { ...userAddresses[i], active: false };
                    addresses.push(temp_address);
                }
                addresses.push(newAddress);
                setUserAdresses(addresses);

            }

            setShowAddAddressBlock("none")
            setShowPostmanDelivery("block");
            document.getElementById("buildingGroup").value = "";
            document.getElementById("flatGroup").value = "";
            // document.getElementById("groundGroup").value = "";
            // document.getElementById("idElevator").value = "";
            setSearchStreet("");
            setAddressValues({
                ...addressValues,
                filled: false,
            });
        }
    }
    const handleShowAddAdress = () => {
        setShowAddAddressBlock("block");
        setShowPostmanDelivery("none");
    }
    const handleChangeGround = (e) => {
        setActiveAddress({
            ...activeAddress,
            ground: e.target.value
        });
    }
    const handleSelectElevator = (e) => {
        const options = e.target.options;
        if (options[0].selected) {
            options[0].disabled = true;
        }
        setActiveAddress({
            ...activeAddress,
            elevator: e.target.value
        });
    }
    const handleCancelAddAdress = () => {
        setShowAddAddressBlock("none");
        setShowPostmanDelivery("block");
        document.getElementById("buildingGroup").value = "";
        document.getElementById("flatGroup").value = "";
        // document.getElementById("groundGroup").value = "";
        // document.getElementById("idElevator").value = "";
        setSearchStreet("")
    };
    return (
        <>
            <Form onSubmit={(e) => e.preventDefault()}>
                <Row className={styles.row}>
                    <div className={styles.panel}> <div className={styles.count}>2</div>Спосіб доставки</div>
                </Row>
                <Row className={styles.delivery}>
                    <Form.Group style={{ padding: 0 }}>
                        <Form.Label className={styles.form_label} htmlFor="city-name">Ваше місто</Form.Label>
                        <Form.Control className={styles.form_input} placeholder="Оберіть місто..."
                            value={selectedCity ? selectedCity.value : ""} name="city"
                            onClick={handleSearchCity}
                            readOnly={true}
                            id="city-name"
                            ref={cityRef}
                        />
                        <CityModal show={cityModalShow} onClose={handleCityModalClose} />
                        <Row>
                            <Col>
                                <Form.Check
                                    type="radio"
                                    className={styles.radio}
                                    aria-label="radio 9">
                                    <Form.Check.Input
                                        id="selfPickup"
                                        name="selfPickup"
                                        type="radio"
                                        value={deliveryTypes[0].name}
                                        onChange={handleChangeDelivery}
                                        checked={delivery.deliveryType === `${deliveryTypes[0].name}`}
                                    />
                                    <Form.Check.Label htmlFor="selfPickup" className={styles.labeltext}>{deliveryTypes[0].name}</Form.Check.Label>
                                </Form.Check>
                            </Col>
                            <Col className={styles.text_span}>{deliveryTypes[0].price}</Col>
                            <Row style={{ display: showSelfPickup }} >
                                <Form.Select className={styles.form_input2}
                                    onClick={handleSelectPickup}
                                >
                                    <option value="" disabled={false} key="selfpick1">Вибрати адресу відділення...</option>
                                    {deliveryTypes[0].adresses.map((item, i) => (
                                        item.city == selectedCity?.object_name ?
                                            <option key={item.id} >{item.cityType}{item.city}, {item.street}</option> :
                                            <React.Fragment key={i} />
                                    ))}
                                </Form.Select>
                            </Row>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Check
                                    type="radio"
                                    className={styles.radio}
                                    aria-label="radio 8">
                                    <Form.Check.Input
                                        name="postmanDelivery"
                                        id="postmanDelivery"
                                        type="radio"
                                        value={deliveryTypes[1].name}
                                        onChange={handleChangeDelivery}
                                        checked={delivery.deliveryType === `${deliveryTypes[1].name}`} />
                                    <Form.Check.Label htmlFor="postmanDelivery" className={styles.labeltext}>{deliveryTypes[1].name}</Form.Check.Label>
                                </Form.Check>
                            </Col>
                            <Col className={styles.text_span}>{deliveryTypes[1].price} &#x20b4;</Col>
                        </Row>
                        <Row style={{ display: showPostmanDeliveryAll }}>   {/* //TODO padding controll */}
                            {visibleAddressField ? (
                                <div className={styles.group_floor}>
                                    <Form.Select className={styles.form_address}
                                        name="selectPostmanDelivery"
                                        id="selectPostmanDelivery"
                                        onChange={handleSelectPostman}
                                        ref={postmanRef}
                                    >
                                        {/* <option value="" disabled={false}>Вибрати адресу доставки...</option> */}
                                        {filteredUserAdresses != null && filteredUserAdresses
                                            .filter((c) => c.city == selectedCity.object_name)
                                            ? filteredUserAdresses.map((item, index) => (
                                                <option
                                                    key={item.address}
                                                    value={item.address}
                                                >{item.address}</option>
                                            )
                                            ) : <></>}
                                    </Form.Select>
                                    <Col>

                                        <button onClick={handleShowAddAdress} id="btn-add-another-address">Додати адресу</button>

                                    </Col>
                                </div>

                            ) : (
                                <></>
                            )}
                            <div style={{ display: showAddAddressBlock }} className={styles.street_div}>
                                <Form.Group >
                                    <Form.Label className={styles.form_label} htmlFor="street">Вулиця</Form.Label>
                                    <Form.Control className={styles.form_floor}
                                        type="text"
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
                                                    {`${street.street_type} ${street.name}`}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
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
                                    <button onClick={handleAddAdress} id="btnAddAddress" disabled={isButtonDisabled}>Додати</button>
                                    <button onClick={handleCancelAddAdress} id="btnCancelAddAddress">Скасувати</button>
                                </div>
                            </div>
                            <div className={styles.group_floor}>
                                <Form.Group controlId="groundGroup" className={styles.floor}>
                                    <Form.Label className={styles.form_label}>Поверх</Form.Label>
                                    <Form.Control className={styles.form_floor}
                                        name="ground"
                                        onChange={handleChangeGround}
                                        value={activeAddress ? activeAddress.ground : ""} />
                                </Form.Group>

                                <Form.Group controlId="elevatorGroup" className={styles.floor}>
                                    <Form.Label className={styles.form_label}>Ліфт</Form.Label>
                                    <Form.Select className={styles.form_elevator}
                                        name="elevator"
                                        id="idElevator"
                                        value={activeAddress ? activeAddress.elevator : ""}
                                        onChange={handleSelectElevator}>
                                        <option value="" disabled={false} id="optEl1" key="optEl1">Наявність ліфта</option>
                                        <option id="optEl2" key="optEl2">Відсутній</option>
                                        <option id="optEl3" key="optEl3">Присутній</option>
                                    </Form.Select>
                                </Form.Group>

                            </div>
                            <Form.Group controlId="formBasicCheckbox" className={styles.lift_up}>
                                <Form.Check type="checkbox" label="Підняти на поверх" />
                            </Form.Group>
                            <div className={styles.shiping_line}></div>
                            <Container className={styles.bottom}>
                                <Row className={styles.deltime_text}>Вкажіть зручний день та час для доставки</Row>
                                <Row className={styles.shipping_time}>
                                    <button id="kiev">14 травня</button>
                                    <button id="kharkiv">15 травня</button>
                                    <button id="kharkiv">16 травня</button>
                                    <button id="lviv">17 травня</button>
                                </Row>
                                <Row className={styles.shipping_time}>
                                    <button id="frankivsk">10:00-12:00</button>
                                    <button id="odesa">12:00-14:00</button>
                                    <button id="kharkiv">14:00-16:00</button>
                                    <button id="dnipro">16:00-18:00</button>
                                </Row>
                            </Container >

                        </Row>
                        <Row>
                            <Col>
                                <Form.Check
                                    type="radio"
                                    className={styles.radio}
                                    aria-label="radio 6">
                                    <Form.Check.Input
                                        type="radio"
                                        value={deliveryTypes[2].name}
                                        name="novaPoshta"
                                        id="novaPoshta"
                                        checked={delivery.deliveryType === `${deliveryTypes[2].name}`}
                                        onChange={handleChangeDelivery}
                                    />
                                    <Form.Check.Label htmlFor="novaPoshta" className={styles.labeltext}>{deliveryTypes[2].name}</Form.Check.Label>
                                </Form.Check>
                            </Col>
                            <Col className={styles.text_span}>{deliveryTypes[2].price}</Col>
                        </Row>
                        <Row style={{ display: showNovaPoshtaDelivery }}>
                            <Col>
                                <Form.Label className={styles.form_label} htmlFor="npdepartment">Введіть адресу відділення</Form.Label>
                                <Form.Control className={styles.form_input}
                                    type="text"
                                    name="npdepartment"
                                    id="npdepartment"
                                    onChange={(e) => setDelivery({ ...delivery, deliveryAddress: e.target.value })}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                </Row>
            </Form >
        </>
    )
}