import { useState } from "react"
import styles from "./styles.module.scss"
import { ErrorMessage, useField } from "formik"
import ColorPicker from "./ColorPicker"

export default function Colors({
    name,
    product,
    setProduct,
    color,
    ...props
}) {
    const [toggle, setToggle] = useState(false)

    const [field, meta] = useField(props)
    // const renderSwatches = () => {
    //     return colors.map((color, id) => {
    //         <div
    //             className={styles.squre_color}
    //             key={id}
    //             style={{ backgroundColor: color }}
    //             onClick={() => {
    //                 setProduct({
    //                     ...product, color: { color: product.color.color, image: color }
    //                 })
    //             }}
    //         >
    //             {color}
    //         </div>
    //     })
    // }
    //TODO to choose one color for each product or list of colors??? if one change in ColorPicker colors[0] on color
    return (
        <div className={styles.colors}>
            <div className={`${styles.header} ${meta.error[name] ? styles.header__error:""}`}>
                <div className={styles.flex}>
                    {
                        meta.error[name] && <img src="../../../images/warning.png" alt="" />
                    }
                    Виберіть новий колір продукту
                </div>
                <span>
                    {
                        meta.touched && meta.error[name] && <div className={styles.error_msg}>
                            <span></span>
                            <ErrorMessage name={name} />
                        </div>
                    }
                </span>
            </div>
            {/* <input type="text" value={product.color?.image}
                name={name}
                // hidden
                {...field}
                {...props}
            /> */}
            <div className={styles.colors_infos}></div>
            <div className={toggle ? styles.toggle : ""}>
                {/* <div className={styles.wheel}>{renderSwatches()}</div> */}
            </div>
            <ColorPicker
                product={product}
                setProduct={setProduct}
                color={color}
            />
        </div>
    )


}