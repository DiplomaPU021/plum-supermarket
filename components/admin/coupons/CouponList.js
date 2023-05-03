import styles from './styles.module.scss';
import ListItem from "./ListItem";

export default function CouponList({ coupons, setCoupons }) {
    return (
        <ul className={styles.list}>
            {
                coupons.map((coupon) => (
                    <ListItem
                        coupon={coupon}
                        key={coupon._id}
                        setCoupons={setCoupons}
                    />
                ))}
        </ul>
    )

}