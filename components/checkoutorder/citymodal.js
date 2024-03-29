import styles from "./styles.module.scss";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect, useRef } from "react";
import AsyncSelect from "react-select/async";
import { getCity } from "../../requests/city";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function CityModal(props) {
  const clickRef = useRef(null);
  const [searchCity, setSearchCity] = useState();
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);

  const handleCityChange = (selectedOption) => {
    setSearchCity(selectedOption);
    if (selectedOption != null) {
      props.onClose(selectedOption);
    }
  };
  const filterCities = async (inputValue) => {
    if (inputValue.length > 0) {
      if (/^[А-Яа-яЇїІі'-]+$/.test(inputValue)) {
        const cities = await getCity(inputValue);
        const newCities = cities.map((item) => {
          let label;
          let value;
          if (item.object_name.toLowerCase() != item.community.toLowerCase()) {
            label = `${item.object_category} ${item.object_name}, ${item.region}, ${item.community}`;
          } else {
            value =
              label = `${item.object_category} ${item.object_name}, ${item.region}`;
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
    props.onClose(searchCity);
  };
  const handleCityClick = async (e) => {
    let selectedCity = "";
    if (e.target.id == "zhytomyr") {
      selectedCity = {
        community: "Житомир",
        level_1: "1800000000",
        level_2: "1810100000",
        object_category: "м.",
        object_code: "1810100000",
        object_name: "Житомир",
        region: "Житомирська Область",
        _id: "63fd04b68cbfb5572cac4436",
        value: "м. Житомир, Житомирська Область",
        label: "м. Житомир, Житомирська Область",
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
        label: "м. Київ, Київська Область",
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
        label: "м. Львів, Львівська Область",
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
        label: "м. Одеса, Одеська Область",
      };
    } else if (e.target.id == "ternopil") {
      selectedCity = {
        community: "Тернопіль",
        level_1: "6100000000",
        level_2: "6110100000",
        object_category: "м.",
        object_code: "6110100000",
        object_name: "Тернопіль",
        region: "Тернопільська Область",
        _id: "63fd04b68cbfb5572cac4428",
        value: "м. Тернопіль, Тернопільська Область",
        label: "м. Тернопіль, Тернопільська Область",
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
        label: "м. Харків, Харківcька Область",
      };
    }
    setSearchCity(selectedCity);
    props.onClose(selectedCity);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#FAF8FF",
      borderRadius: "23px",
      borderWidth: "1px",
      borderColor: state.isFocused ? "#220F4B" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 0 1px #220F4B" : provided.boxShadow,
      "&:hover": {
        borderColor: state.isFocused ? "#220F4B" : "#220F4B",
        borderWidth: "1px",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#f2f2f2",
      borderRadius: "12px",
      borderColor: "#b2b2b2",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#e6e6e6" : "transparent",
      color: "#333",
      "&:hover": {
        backgroundColor: "#e6e6e6",
      },
    }),
  };

  return (
    <Modal
      show={props.show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName={styles.modal}
      centered
    >
      <Modal.Body className={styles.modalbody}>
        <Container>
          <Row className={styles.product_row}>
            <button onClick={handleCityClick} id="kiev">
              Київ
            </button>
            <button onClick={handleCityClick} id="kharkiv">
              Харків
            </button>
            <button onClick={handleCityClick} id="lviv">
              Львів
            </button>
          </Row>
          <Row className={styles.product_row}>
            <button onClick={handleCityClick} id="zhytomyr">
              Житомир
            </button>
            <button onClick={handleCityClick} id="odesa">
              Одеса
            </button>
            <button onClick={handleCityClick} id="ternopil">
              Тернопіль
            </button>
          </Row>
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
            onChange={handleCityChange}
            value={searchCity}
            isClearable={isClearable}
            isSearchable={isSearchable}
            styles={customStyles}
          />
        </Container>
      </Modal.Body>
    </Modal>
  );
}
