import styles from "../styles.module.scss"
import { Form, Row, Col, Button } from "react-bootstrap"
import React, { useEffect, useRef, useState } from 'react'
import CityModal from "../citymodal";
import { getStreets } from "@/requests/street";
import useDeepCompareEffect from "use-deep-compare-effect";
import { deliveryTypes } from "@/data/deliveryTypes";



export default function Shipping({ user, activeAddress, setActiveAddress, country, deliveryType, setDelivery }) {
    const [cityModalShow, setCityModalShow] = useState(false);
    // const [searchCity, setSearchCity] = useState(null);
    //це по суті є activeCity
    const [selectedCity, setSelectedCity] = useState(
         activeAddress? {value: `${activeAddress?.cityType} ${activeAddress?.city}, ${activeAddress?.region}`, object_category: activeAddress?.cityType, object_name: activeAddress?.city, object_code: activeAddress?.zipCode, region: activeAddress?.region} : null );
    // const [selectedCity, setSelectedCity] = useState(null );

    const [showSelfPickup, setSelfPickup] = useState("none");
    const [showPostmanDeliveryAll, setShowPostmanDeliveryAll] = useState("none");
    const [showPostmanDelivery, setShowPostmanDelivery] = useState("block");
    const [showNovaPoshtaDelivery, setShowNovaPoshtaDelivery] = useState("none");
    const [showAddAddressBlock, setShowAddAddressBlock] = useState("none");
    const [userAdresses, setUserAdresses] = useState(user?.address || []);
    // const [activeStreet, setActiveStreet] = useState({ value: activeAddress?.address, name: activeAddress?.street, street_type: activeAddress?.streetType, city_name: activeAddress?.city, city_code: activeAddress?.zipCode || null });
    // адреса в селекторі
    const [filteredUserAdresses, setFilteredUserAdresses] = useState(userAdresses?.filter(address => address.zipCode === selectedCity.object_code));
    //вулиці в випадаючому списку (з бази)
    const [filteredStreets, setFilteredStreets] = useState([]);
    const [searchStreet, setSearchStreet] = useState("");

    const [selectedStreet, setSelectedStreet] = useState({ value: activeAddress?.address, name: activeAddress?.street, street_type: activeAddress?.streetType, city_name: activeAddress?.city, city_code: activeAddress?.zipCode || null });

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

    const handleSearchCity = (e) => {
        e.preventDefault();
        setCityModalShow(true);
    };
    const handleCityModalClose = (selectedCity) => {
        if (selectedCity) {
            // console.log("heloooooooo", selectedCity);
            setUserAdresses(user?.address || []);
            // setSearchCity(selectedCity);
            setSelectedCity(selectedCity);

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
        if (addressValues && addressValues.building !== '' && addressValues.flat !== '' && addressValues.filled) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [addressValues]);

    useDeepCompareEffect(() => {

        setSelectedStreet({ value: activeAddress?.address, name: activeAddress?.street, street_type: activeAddress?.streetType, city_name: activeAddress?.city, city_code: activeAddress?.zipCode || null });
        filteredUserAdresses?.length == 0 ? setShowAddAddressBlock("block") && setShowPostmanDelivery("none") : setShowAddAddressBlock("none") && setShowPostmanDelivery("block");
    }, [filteredUserAdresses]);

    useDeepCompareEffect(() => {
        if (selectedCity) {
            setFilteredUserAdresses(userAdresses?.filter(address => address.zipCode === selectedCity.object_code));
            if (filteredUserAdresses && filteredUserAdresses.length > 0) {
                setVisibleAddressField(true);

            } else {
                setVisibleAddressField(false);
            }
        }
    }, [selectedCity, filteredUserAdresses, userAdresses]);

    const handleSelectStreet = (street) => {
        selectRef.current.focus();
        // console.log("street!!!!!!!!!!!!!!", street);
        // console.log("streetREF!!!!!!!!!!", selectRef.current);
        setSelectedStreet(street);
        setSearchStreet(`${street.street_type} ${street.name}`);
        setAddressValues({
            ...addressValues,
            filled: true,
        });
    }
    const handleChangeAdress = (e) => {
        setAddressValues({
            ...addressValues,
            [e.target.name]: e.target.value
        });
    }
    const handleSelectPostman = (e) => {
        setActiveAddress(filteredUserAdresses[e.target.selectedIndex]);
    }

    const handleChangeDelivery = e => {
        console.log("handleDeliveryValue", e.target.value);
        console.log("handleDeliveryName", e.target.name);

        if (e.target.name === "selfPickupRadio") {
            setSelfPickup("block")
        } else {
            setSelfPickup("none")
        }
        if (e.target.name === "postmanRadio") {
            setShowPostmanDeliveryAll("block")
        } else {
            setShowPostmanDeliveryAll("none")
        }
        if (e.target.name === "novaPoshtaRadio") {
            setShowNovaPoshtaDelivery("block")
        } else {
            setShowNovaPoshtaDelivery("none")
        }
         const deliveryCost=  deliveryTypes.filter(deliveryType => deliveryType.name === e.target.value).map(p=>p.price);
        setDelivery(prevState => ({
            ...prevState,
            deliveryType: e.target.value,
            deliveryCost
        }));

    };


    const handleSelectPickup = (e) => {
        const options = e.target.options;
        if (options[0].selected) {
            options[0].disabled = true;
        }
        console.log("handleSelectPickup", e.target.value);

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
                for (let i = 0; i < userAdresses.length; i++) {
                    let temp_address = {};
                    temp_address = { ...userAdresses[i], active: false };
                    addresses.push(temp_address);
                }
                addresses.push(newAddress);
                setUserAdresses(addresses);
                // saveAddress(newAddress);        
            }

            setShowAddAddressBlock("none")
            setShowPostmanDelivery("block");
            document.getElementById("buildingGroup").value = "";
            document.getElementById("flatGroup").value = "";
            document.getElementById("groundGroup").value = "";
            document.getElementById("idElevator").value = "";
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
        document.getElementById("groundGroup").value = "";
        document.getElementById("idElevator").value = "";
        setSearchStreet("")
    };
    return (
        <>
            {/* <Form onSubmit={(e) => e.preventDefault()}> */}
            <Row className={styles.row}>
                <Col className={styles.colcard}> <div className={styles.panel}>Спосіб доставки</div></Col>
            </Row>
            <Row className={styles.delivery}>
                <Col className={styles.colcard}>
                    <div> {deliveryType}</div>
                    {/* <div> {deliv.deliveryType}</div>
                        <div>selected city {JSON.stringify(selectedCity, null, 4)}</div>
                        <div>selected street {JSON.stringify(selectedStreet, null, 4)}</div>
                        <div> userAdresses {JSON.stringify(userAdresses, null, 4)}</div>

                        <div> searchStreet {searchStreet}</div>
                        <div> {selectedStreet?.name}</div> */}
                    <Form.Group as={Col} >
                        <Form.Label className={styles.form_label} htmlFor="city-name">Ваше місто</Form.Label>
                        <Form.Control className={styles.form_input2} placeholder="Виберіть місто..."
                            // value={selectedCity ? selectedCity.value : activeAddress ? `${activeAddress.cityType} ${activeAddress.city}, ${activeAddress.region}` : ""} name="city"
                            value={selectedCity ? selectedCity.value : ""} name="city"
                            onClick={handleSearchCity}
                            // onChange={(e) => handleCityChange(e)}
                            readOnly={true}
                            id="city-name"

                        //  ref={selectRef}
                        // inputRef={(ref) => {this.input = ref}}
                        />
                        {/* <Form.Control.Feedback type="invalid">{formik.errors.city}
                            </Form.Control.Feedback> */}
                        <CityModal show={cityModalShow} onClose={handleCityModalClose}
                        // search_сity={searchCity} 
                        />
                        <Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type="radio"
                                        // id="selfPickupCheck"
                                        className={styles.radio}
                                        aria-label="radio 9">
                                        <Form.Check.Input
                                            id="selfPickupRadio"
                                            name="selfPickupRadio"
                                            type="radio"
                                            value={deliveryTypes[0].name}
                                            onChange={handleChangeDelivery}
                                            checked={deliveryType === `${deliveryTypes[0].name}`}
                                        />
                                        <Form.Check.Label htmlFor="selfPickupRadio">{deliveryTypes[0].name}</Form.Check.Label>
                                    </Form.Check>
                                </Col>
                                <Col className={styles.text_span}>{deliveryTypes[0].price}</Col>
                            </Row>
                            <Row style={{ display: showSelfPickup }}>
                                <Form.Select className={styles.form_input2}
                                    name="selfPickup"
                                    onClick={handleSelectPickup}
                                >
                                    <option value="" disabled={false} key="selfpick1">Вибрати адресу відділення...</option>
                                    {deliveryTypes[0].adresses.map((item, i) => (
                                        item.city == selectedCity?.object_name ?
                                            <option key={item.id}>{item.cityType}{item.city}, {item.street}</option> : 
                                            <React.Fragment key={i} />
                                    ))
                                    }

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
                                        value={deliveryTypes[1].name}
                                        onChange={handleChangeDelivery}
                                        checked={deliveryType === `${deliveryTypes[1].name}`} />
                                    <Form.Check.Label htmlFor="postmanRadio">{deliveryTypes[1].name}</Form.Check.Label>
                                </Form.Check>
                            </Col>
                            <Col className={styles.text_span}>{deliveryTypes[1].price} &#x20b4;</Col>
                        </Row>
                        <Row style={{ display: showPostmanDeliveryAll }}>
                            <Row>
                                <div style={{ display: showPostmanDelivery }}>
                                    {visibleAddressField ? (
                                        <Form.Select className={styles.form_input2}
                                            name="selectPostmanDelivery"
                                            id="selectPostmanDelivery"
                                            onChange={handleSelectPostman}
                                            value={selectedStreet?.value}
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
                                    ) : (
                                        <></>
                                    )}
                                </div>

                                <div style={{ display: showAddAddressBlock }}>
                                    <Form.Group as={Col} >
                                        <Form.Label className={styles.form_label} htmlFor="street">Вулиця</Form.Label>
                                        <Form.Control className={styles.form_input}
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

                                </div>

                            </Row>
                            <Row>
                                <Row style={{ display: showPostmanDelivery }}>
                                    <Form.Group as={Col} controlId="groundGroup">
                                        <Form.Label className={styles.form_label}>Поверх</Form.Label>
                                        <Form.Control className={styles.form_input}
                                            name="ground"
                                            onChange={handleChangeGround}
                                            value={activeAddress ? activeAddress.ground : ""} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="elevatorGroup">
                                        <Form.Label className={styles.form_label}>Ліфт</Form.Label>
                                        <Form.Select className={styles.form_input2}
                                            name="elevator"
                                            id="idElevator"
                                            value={activeAddress ? activeAddress.elevator : ""}
                                            onChange={handleSelectElevator}>
                                            <option value="" disabled={false} id="optEl1" key="optEl1">Наявність вантажного ліфта</option>
                                            <option id="optEl2" key="optEl2">Відсутній</option>
                                            <option id="optEl3" key="optEl3">Присутній</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Row>

                            </Row>
                            {visibleAddressField ? (
                                <Row style={{ display: showPostmanDelivery }}>
                                    <Col>
                                        <div>
                                            <Button onClick={handleShowAddAdress} id="btn-add-another-address">Додати адресу</Button>
                                        </div>
                                    </Col>
                                </Row>
                            ) : (
                                <></>
                            )}

                            <Row style={{ display: showAddAddressBlock }}>
                                <Col>
                                    <Button onClick={handleAddAdress} id="btnAddAddress" disabled={isButtonDisabled}>Додати</Button>
                                    <Button onClick={handleCancelAddAdress} id="btnCancelAddAddress">Скасувати</Button>
                                </Col>
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
                                    value={deliveryTypes[2].name}
                                    name="novaPoshtaRadio"
                                    checked={deliveryType === `${deliveryTypes[2].name}`}
                                    onChange={handleChangeDelivery}
                                />
                                <Form.Check.Label>{deliveryTypes[2].name}</Form.Check.Label>
                            </Form.Check>
                        </Col>
                            <Col className={styles.text_span}>{deliveryTypes[2].price}</Col>
                        </Row>
                    </Form.Group>
                </Col>
            </Row>
            {/* </Form> */}
        </>
    )
}