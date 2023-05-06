import { ErrorMessage } from "formik";
import styles from "./styles.module.scss";
import { useField } from "formik";
import Select from "react-select";
import { useEffect, useState } from "react";
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function MultipleSelect({
    data,
    onChange,
    placeholder,
    header,
    value,
    ...rest
}) {
    const [field, meta] = useField(rest);
    const [dataOptions, setDataOptions] = useState(
        data.map((item) => {
            let label = `${item.name}`;
            let value = `${item._id}`;
            return {
                ...item,
                label,
                value,
                isSelected :true,
                isFixed : true
            };
        })
    );
    const [clearValue, setClearValue]=useState(false);
    useEffect(() => {
        // console.log("field, ", field);
        // console.log(", meta", meta);
setClearValue(true);
         console.log(", data", data);
         console.log(", value", value);

       
        if (rest.disabled == true) {

            console.log("hello", rest);
            // const newOptions = data.map(option => {
            //     if (data.includes(option.value)) {
            //       return { ...option, isFixed: true };
            //     }
            //     return option;
            //   });
              setDataOptions(data.map((item) => {
                let label = `${item.name}`;
                let value = `${item._id}`;
                //       if (data.includes(rest.value)) {
                //   return { ...item, 
                //     label,
                //     value,
                //     isFixed: true };
                // }
                return {
                    ...item,
                    label,
                    value,
                    isSelected :true,
                    isFixed : true
                };
            }));

        } else {
            setDataOptions(data.map((item) => {
                let label = `${item.name}`;
                let value = `${item._id}`;
                return {
                    ...item,
                    label,
                    value,
                    isSelected :true,
                    isFixed : true
                };
            }));
        }
        console.log(", options", dataOptions);
    }, [data])

    return (
        <div style={{ marginBottom: "1rem" }}>
            <Select
                isMulti
                disabled={rest.disabled}
                name={field.name}
                handleChange={handleChange}
                defaultValue={value[0]}
                selectOption={value[0]}
                placeholder={header}
                components={animatedComponents}
                className={`${styles.select} ${meta.touched && meta.error && styles.error_select
                    }`}
                classNamePrefix={header}
                options={dataOptions}
                clearValue={clearValue}
            >
            </Select>
            {meta.touched && meta.error && (
                <p className={styles.error_msg}>
                    <ErrorMessage name={field.name} />
                </p>
            )}
        </div>
    );
}
