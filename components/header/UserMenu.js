import styles from "./styles.module.scss"
import Link from "next/link"

export default function UserMenu({ loggedIn }) {
    return (
        <div className={styles.menu}>
            <h4>Welcome to Plum!</h4>
            {loggedIn ? (
                <div className={styles.flex}>
                    <img src="https://st3.depositphotos.com/1007566/12989/v/450/depositphotos_129895474-stock-illustration-hacker-character-avatar-icon.jpg"
                        alt="profile"
                        className={styles.menu_image} />
                    <div className={styles.col}>
                        <span>Welcome back,</span>
                        <h3>USER NAME</h3>
                        <span>Sign out</span>
                    </div>
                </div>) : (
                <div className={styles.flex}>
                    <button className={styles.btn_primary}>Register</button>
                    <button className={styles.btn_outlined}>Login</button>
                </div>
            )}
            <ul>
                <li>
                    <Link href="/profile">Account</Link>
                </li>
                <li>
                    <Link href="/profile/orders">My Orders</Link>
                </li>
                <li>
                    <Link href="/profile/messages">Message Center</Link>
                </li>
                <li>
                    <Link href="/profile/address">Address</Link>
                </li>
                <li>
                    <Link href="/profile/wishlist">Wishlist</Link>
                </li>
            </ul>
        </div>
    )
}