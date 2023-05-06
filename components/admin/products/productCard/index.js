import Products from "@/components/popular/Products";
import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductSwiper from "@/components/productCard/ProductSwiper";
import Link from "next/link";
import { TbEdit } from "react-icons/tb"
import { AiOutlineEye } from "react-icons/ai"
import { RiDeleteBin2Line } from "react-icons/ri"



export default function ProdcutCard({ product }) {
    return (
        <div className={styles.product}>
            <h1 className={styles.product__name}>
                {product.name}
            </h1>
            <h2 className={styles.product__category}>
                #{product.category.name}
            </h2>
            {/* TODO пусть висит пригодиться для навигации */}
            {/* <Swiper
                // ref={swiperRef}
                // centeredSlides={true}
                // autoplay={{ delay: 500, stopOnLastSlide: false }}
                // speed={500}
                modules={[Navigation]}
                className="products__swiper"
                navigation={true}
            > */}
            <div className={styles.subproducts_list}>
                {product.subProducts.map((p, i) => (
                    <div className={styles.subproducts_list__item} key={p._id}>
                        <div className={styles.subproducts_list__item_img}>
                            <ProductSwiper images={p.images} />
                        </div>
                        <div className={styles.subproducts_list__actions}>
                            <Link href={`/admin/dashboard/product/${product._id}`}>
                                <TbEdit />
                            </Link>
                            <Link href={`/product/${product.slug}?style=${i}`}>
                                <AiOutlineEye fill="#220F4B" />
                            </Link>
                            <Link href="">
                                <RiDeleteBin2Line fill="#ed4337" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {/* </Swiper> */}
        </div>
    )
}