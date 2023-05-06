import styles from "./styles.module.scss"
import { useRef } from "react"
import { useDispatch } from "react-redux"
import { ErrorMessage, useField } from "formik"
import { RiShape2Line, RiDeleteBin7Fill } from "react-icons/ri";
import { GiExtractionOrb } from "react-icons/gi"
import { showDialog, hideDialog } from "@/store/DialogSlice";

export default function Images({
    images,
    setImages,
    header,
    text,
    name,
    setColorImage,
    ...props
}) {
    const dispatch = useDispatch();
    const fileInput = useRef(null)
    const [meta, field] = useField(props)
    const handleImages = (e) => {
        let files = Array.from(e.target.files);
        files.forEach((img, i) => {
            if (i == 5 || images.length >= 6) {
                dispatch(showDialog({
                    header: 'Maximum 6 images are allowed',
                    msgs: [
                        {
                            msg: `Maximum 6 images are allowed`,
                            type: "error"
                        }

                    ]
                }))
                return;
            }
            else if (img.type !== "image/jpeg" && img.type !== "image/jpg" && img.type !== "image/webp") {
                dispatch(showDialog({
                    header: 'Unsupported Format.',
                    msgs: [
                        {
                            msg: `${img.name} format is unsupported! Only JPEG, PNG, WEBP are allowed`,
                            type: "error"
                        }

                    ]
                }))
                files = files.filter((item) => item !== img.name)
                return;
            }
            else if (img.size > 1024 * 1024 * 10) {
                dispatch(showDialog({
                    header: 'Unsupported Size.',
                    msgs: [
                        {
                            msg: `${img.name} size is too large, maximum of 10MB allowed`,
                            type: "error"
                        }

                    ]
                }))
                return;
            }
            else {
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = (e) => {
                setImages((images) => [
                    ...images, e.target.result
                ])
            }
             }

        })
    }

    const handleRemove = (image) => {
        setImages((images) => images.filter((item) => item !== image))
    }

    return (
        <div className={styles.images}>
            <div className={`${styles.header} ${meta.error ? styles.header_error : ""}`} style={{border: "none"}}>
                <div className={styles.flex}>
                    {
                        meta.error && <img src="../../../images/warning.png" alt="" />
                    }
                    {header}
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
            <input type="file"
                name={name}
                ref={fileInput}
                hidden
                multiple
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleImages}
            />
            <div className={styles.images_main}>
                <div className={`${styles.images_main_grid} ${images.legth == 2
                    ? styles.grid_two
                    : images.legth == 3
                        ? styles.grid_three
                        : images.legth == 4
                            ? styles.grid_four
                            : images.legth == 5
                                ? styles.grid_five
                                : images.legth == 6
                                    ? styles.grid_six
                                    : ""}`}>
                    {
                        !images.length ? <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png" alt="" />
                            : (
                                images.map((img, i) => (
                                    <div className={styles.images_main_grid_wrap} key={i}>
                                        <div className={styles.blur}></div>
                                        <img src={img} alt="" />
                                        <div className={styles.images_main_grid_actions}>
                                            <button onClick={() => handleRemove(img)}><RiDeleteBin7Fill /></button>
                                            <button><GiExtractionOrb /></button>
                                            <button><RiShape2Line /></button>
                                        </div>
                                    </div>
                                ))
                            )
                    }
                </div>
            </div>
            <button type="reset" disabled={images.length == 6}
                style={{ opacity: `${images.length == 6 && "0.5"}` }}
                onClick={() => fileInput.current.click()}
                className={`${styles.btn} ${styles.btn_primary}`}>Add Images</button>
        </div>
    )
}