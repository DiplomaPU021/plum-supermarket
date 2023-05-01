import { useState } from "react"
import styles from "./styles.module.scss"
import { ErrorMessage, useField } from "formik"
import ColorPicker from "./ColorPicker"

export default function Colors({
    product,
    setProduct,
    name,
    colorImage,
    ...props
}) {
    const [toggle, setToggle] = useState(false)
    const [colors, setColors] = useState([])
    const [field, meta] = useField(props)
    const renderSwatches = () => {
        return colors.map((color, id) => {
            <div
                className={styles.squre_color}
                key={id}
                style={{ backgroundColor: color }}
                onClick={() => {
                    setProduct({
                        ...product, color: { color, image: product.color.image }
                    })
                }}
            >
                {color}
            </div>
        })
    }
    //TODO to choose one color for each product or list of colors??? if one change in ColorPicker colors[0] on color
    return (
        <div className={styles.colors}>
            <div className={styles.header}>
                <div className={styles.flex}>
                    {/* {
                        meta.error && <img src="../../../images/warning.png" alt="" />
                    } */}
                    Pick a product color
                </div>
                <span>
                    {
                        meta.touched && meta.error && <div className={styles.error_msg}>
                            <span></span>
                            <ErrorMessage name={name} />
                        </div>
                    }
                </span>
            </div>
            <input type="text" value={product.color}
                name={name}
                hidden
                {...field}
                {...props}
            />
            <div className={styles.colors_infos}></div>
            <div className={toggle ? styles.toggle : ""}></div>
            <ColorPicker
                colors={colors}
                setColors={setColors}
            />
        </div>
    )


}