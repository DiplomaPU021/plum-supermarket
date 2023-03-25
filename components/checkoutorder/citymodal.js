import Modal from 'react-bootstrap/Modal'
import { useState, useEffect, useRef } from 'react'
import AsyncSelect from 'react-select/async';
import { getCity } from "@/requests/city"
import { Button } from 'react-bootstrap';


export default function CityModal(props) {

    // console.log("props onCityModal", props);
    const clickRef = useRef(null);
    const [searchCity, setSearchCity] = useState();
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);


    // useEffect(() => {
    //     console.log("searchCityChange", searchCity);
    // }, [setSearchCity])
    // const handleInputCityChange = (newValue) => {
    //     setSearchCity(newValue);
    //     console.log("newValue onCityModal", newValue);
    //     console.log("searchCityInput onCityModal", searchCity);
    // };
    const handleCityChange = (selectedOption) => {
        setSearchCity(selectedOption);
        // props.onChange && props.onChange(selectedOption);
        // console.log("selectedOption onCityModal", selectedOption);
        // console.log("selectedCity onCityModal", searchCity);

    };
    const filterCities = async (inputValue) => {
        if (inputValue.length > 0) {
            //regex на введення лише кирилиці
            if (/^[А-Яа-яЇїІі'-]+$/.test(inputValue)) {
                const cities = await getCity(inputValue);
                // console.log("data", cities);
                const newCities = cities.map((item) => {
                    let label;
                    let value;;
                    if (item.object_name.toLowerCase() != item.community.toLowerCase()) {
                        label = `${item.object_category} ${item.object_name}, ${item.region}, ${item.community}`;

                    } else {
                        value = label = `${item.object_category} ${item.object_name}, ${item.region}`;
                    }
                    value = label;
                    return {
                        ...item,
                        label,
                        value,
                    };
                });
                return newCities;
            }

        }
        return [];
    };


    const loadOptions = (inputValue, callback) => {
        if (inputValue.length > 3) {
            setTimeout(() => {
                filterCities(inputValue).then((options) => {
                    callback(options);
                });
            }, 1000);
        } else {
            callback([]);
        }
    };
    const handleClose = () => {
        //  props.onClose(selectedCity ? selectedCity.label : '');
        props.onClose(searchCity);
    };
    //       useEffect(() => {
    // setSearchCity(searchCity);

    //       }, [props.search_сity]);     
    const handleCityClick = async (e) => {
        // clickRef.current.focus();
        console.log(e.target.textContent);

        let selectedCity = "";
        if (e.target.id == "frankivsk") {
            selectedCity = {
                community: "Івано-Франківськ",
                level_1: "2600000000",
                level_2: "2610100000",
                object_category: "м.",
                object_code: "2610100000",
                object_name: "Івано-Франківськ",
                region: "Івано-Франківська Область",
                _id: "63fd04b68cbfb5572cac4439",
                value: "м. Івано-Франківськ, Івано-Франківська Область",
                label: "м. Івано-Франківськ, Івано-Франківська Область"
            };
            setSearchCity(selectedCity);
        } else if (e.target.id == "kiev") {
            selectedCity = {
                community: "Київ",
                level_1: "3200000000",
                level_2: "8000000000",
                object_category: "м.",
                object_code: "8000000000",
                object_name: "Київ",
                region: "Київська Область",
                _id: "63fd04b68cbfb5572cac4442",
                value: "м. Київ, Київська Область",
                label: "м. Київ, Київська Область"
            };
        } else if (e.target.id == "lviv") {
            selectedCity = {
                community: "Львів",
                level_1: "4600000000",
                level_2: "4610100000",
                object_category: "м.",
                object_code: "4610100000",
                object_name: "Львів",
                region: "Львівська Область",
                _id: "63fd04b68cbfb5572cac4455",
                value: "м. Львів, Львівська Область",
                label: "м. Львів, Львівська Область"
            };
        } else if (e.target.id == "odesa") {
            selectedCity = {
                community: "Одеса",
                level_1: "5100000000",
                level_2: "5110100000",
                object_category: "м.",
                object_code: "5110100000",
                object_name: "Одеса",
                region: "Одеська Область",
                _id: "63fd04b68cbfb5572cac446c",
                value: "м. Одеса, Одеська Область",
                label: "м. Одеса, Одеська Область"
            };
        } else if (e.target.id == "dnipro") {
            selectedCity = {
                community: "Дніпро",
                level_1: "1200000000",
                level_2: "1210100000",
                object_category: "м.",
                object_code: "1210100000",
                object_name: "Дніпро",
                region: "Дніпропетровська Область",
                _id: "63fd04b68cbfb5572cac4428",
                value: "м. Дніпро, Дніпропетровська Область",
                label: "м. Дніпро, Дніпропетровська Область"
            };
        } else if (e.target.id == "kharkiv") {
            selectedCity = {
                community: "Харків",
                level_1: "6300000000",
                level_2: "631010000",
                object_category: "м.",
                object_code: "631010000",
                object_name: "Харків",
                region: "Харківська Область",
                _id: "63fd04b68cbfb5572cac4499",
                value: "м. Харків, Харківcька Область",
                label: "м. Харків, Харківcька Область"
            };
        }
        setSearchCity(selectedCity);
        props.onClose(selectedCity);

    }

    return (
        <Modal show={props.show} onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <div>
                <Modal.Header closeButton onClick={handleClose}></Modal.Header>
                <Modal.Body>
                    <Button onClick={handleCityClick} id="kiev">Київ</Button>
                    <Button onClick={handleCityClick} id="lviv">Львів</Button>
                    <Button onClick={handleCityClick} id="kharkiv">Харків</Button>
                    <Button onClick={handleCityClick} id="frankivsk">Івано-Франківськ</Button>
                    <Button onClick={handleCityClick} id="odesa">Одеса</Button>
                    <Button onClick={handleCityClick} id="dnipro">Дніпро</Button>
                    <AsyncSelect
                        cacheOptions
                        defaultOptions
                        loadOptions={loadOptions}
                        onChange={handleCityChange}
                        // onInputChange={handleInputCityChange}
                        value={searchCity}
                        isClearable={isClearable}
                        isSearchable={isSearchable}
                        // ref={clickRef}
                    />

                </Modal.Body>
            </div>
        </Modal>
    )
}
