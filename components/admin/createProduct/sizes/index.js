import { useState } from "react"
import styles from "./styles.module.scss"
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";

export default function Sizes({
    sizes,
    product,
    setProduct
}) {
    const [noSize, setNoSize] = useState(false);
    const handleSize = (i, e) => {
        //TODO implement
    }
    const handleRemove = (i) => {
        //TODO implement
    }
    return (
        <div>
            <div className={styles.header}>Sizes / Quantity / Price</div>
            <button type="reset" className={styles.click_btn} onClick={() => {
                // if (!noSize) {
                //     let data = sizes.map((item) => {
                //         return {
                //             qty: item.qty,
                //             price: item.price,
                //         }
                //     })
                //     setProduct({ ...product, sizes: data })
                // } else {
                //     let data = sizes.map((item) => {
                //         return {
                //             size: item.size || "",
                //             qty: item.qty,
                //             price: item.price,
                //         }
                //     })
                //     setProduct({ ...product, sizes: data })
                // }
                setNoSize((prev) => !prev)
            }}>
                {noSize ? "click if product has size" : "click if product has no size"}
            </button>
            {/* {
                sizes ? sizes.map((size, i) => ( */}
            <div className={styles.container_size}>  {/* key={i}> */}
                <select
                    name="size"
                    // value={noSize ? "" : size.size}
                    disabled={noSize}
                    style={{ display: `${noSize ? "none" : ""}` }}
                >
                    <option value="">Select a size</option>
                    {
                        sizesList.map((s) => (
                            <option value={s} key={s}>{s}</option>
                        ))
                    }
                </select>
                <input
                    type="number"
                    name="qty"
                    placeholder={noSize ? "Product Quantity" : "Size Quantity"}
                    min={1}
                    //value={size.qty}
                    onChange={() => handleSize(i, e)}
                />
                <input
                    type="number"
                    name="price"
                    placeholder={noSize ? "Product Price" : "Size Price"}
                    min={1}
                    //value={size.price}
                    onChange={() => handleSize(i, e)}
                />
                {
                    !noSize ? (<>
                        <BsFillPatchMinusFill onClick={() => handleRemove(i)} />
                        <BsFillPatchPlusFill onClick={() => {
                            setProduct({
                                ...product,
                                sizes: [
                                    ...sizes, {
                                        size: "",
                                        qty: "",
                                        price: ""
                                    }
                                ]
                            })
                        }} />
                    </>
                    ) : ("")
                }
            </div>
            {/* )) : ""} */}
        </div>
    )
}



export const sizesList = [
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL"

]

