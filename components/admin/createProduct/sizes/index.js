import { useState } from "react"
import styles from "./styles.module.scss"
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { sizesList } from "@/data/sizes";
export default function Sizes({
    sizes,
    product,
    setProduct,
    ...rest
}) {
    const [noSize, setNoSize] = useState(false);
    const handleSize = (i, e) => {
        const values = [...sizes];
        values[i][e.target.name] = e.target.value;
        values[i].code = createUniqueCode();
        setProduct({ ...product, sizes: values });
    }
    const handleRemove = (i) => {
        if (sizes.length > 1) {
            const values = [...sizes];
            values.splice(i, 1);
            setProduct({ ...product, sizes: values });
        }
    }
    const createUniqueCode = () => {
        const len = 8;
        let randStr = "";
        for (let i = 0; i < len; i += 1) {
            const ch = Math.floor(Math.random() * 10 + 1);
            randStr += ch;
        }
        return randStr;
    };
    const handleAddSizeField = () => {
        setProduct({
            ...product,
            sizes: [
                ...sizes, {
                    size: "",
                    qty: "",
                    price: "",
                    price_unit: "₴",
                    code: createUniqueCode(),
                }
            ]
        })
    }
    return (
        <div>
            <div className={styles.header}>Розміри / Кількості / Ціни</div>
            <button disabled={rest.disabled} type="reset" className={styles.click_btn} onClick={() => {
                if (!noSize) {
                    let data = sizes.map((item) => {
                        return {
                            size: "",
                            qty: item.qty,
                            price: item.price,
                            price_unit: "₴",
                            code: createUniqueCode(),
                        }
                    })
                    setProduct({ ...product, sizes: data })
                } else {
                    let data = sizes.map((item) => {
                        return {
                            size: item.size || "",
                            qty: item.qty,
                            price: item.price,
                            price_unit: "₴",
                            code: createUniqueCode(),
                        }
                    })
                    setProduct({ ...product, sizes: data })
                }
                setNoSize((prev) => !prev)
            }}>
                {noSize ? "Натисніть якщо продукт має розмір" : "Натисніть якщо продукт не має розміру"}
            </button>
            {
                sizes ? sizes.map((size, i) => (
                    <div className={styles.container_size} key={i}>
                        <select
                            name="size"
                            value={noSize ? "" : size.size}
                            disabled={noSize}
                            style={{ display: `${noSize ? "none" : ""}` }}
                            onChange={(e) => handleSize(i, e)}
                        >
                            <option value="">Виберіть розмір</option>
                            {
                                sizesList.map((s) => (
                                    <option value={s} key={s}>{s}</option>
                                ))
                            }
                        </select>
                        <input
                            type="number"
                            name="qty"
                            placeholder={noSize ? "Кількість товарів" : "Кількість розмірів"}
                            min={1}
                            value={size.qty}
                            onChange={(e) => handleSize(i, e)}
                            disabled={rest.disabled}
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder={noSize ? "Ціна товару" : "Ціна розміру"}
                            min={1}
                            value={size.price}
                            onChange={(e) => handleSize(i, e)}
                            disabled={rest.disabled}
                        />
                        {
                            !noSize ? (<>
                                <AiFillMinusCircle onClick={() => handleRemove(i)} disabled={rest.disabled} />
                                <AiFillPlusCircle disabled={rest.disabled} onClick={() => handleAddSizeField()} />
                            </>
                            ) : (<></>)
                        }
                    </div>
                )) : <></>}
        </div>
    )
}