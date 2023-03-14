import Modal from 'react-bootstrap/Modal'
import { useState, useEffect, useRef } from 'react'
import AsyncSelect from 'react-select/async';
import { getCity } from "@/requests/city"


export default function CityModal(props) {   

//  console.log("props onCityModal", props);

    const [searchCity, setSearchCity] = useState(props.search_сity);
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);

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
        if (inputValue.length > 0 ) {
            //regex на введення лише кирилиці
            if(/^[А-Яа-яЇїІі'-]+$/.test(inputValue)){
                 const cities = await getCity(inputValue);
            // console.log("data", cities);
            const newCities = cities.map((item) => {
                let label;
                let value;;
                if (item.object_name.toLowerCase() != item.community.toLowerCase()) {
               label = `${item.object_category} ${item.object_name}, ${item.region}, ${item.community}`;
               
                } else {
                   value= label = `${item.object_category} ${item.object_name}, ${item.region}`;
                }
                value=label;
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


    return (
        <Modal show={props.show} onHide={handleClose}          
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <div>
                <Modal.Header closeButton onClick={handleClose}></Modal.Header>
                <Modal.Body>
                    <AsyncSelect
                        cacheOptions
                        defaultOptions
                        loadOptions={loadOptions}
                        onChange={handleCityChange}
                        // onInputChange={handleInputCityChange}
                        value={searchCity}
                        isClearable={isClearable}
                        isSearchable={isSearchable}
                    />                
                </Modal.Body>
            </div>
        </Modal>
    )
}
