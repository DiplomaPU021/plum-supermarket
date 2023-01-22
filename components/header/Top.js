import styles from "./styles.module.scss"
import { MdSecurity } from "react-icons/md"
import { BsSuitHeart } from "react-icons/bs"
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri"
import Link from "next/link"
import * as React from "react"
import UserMenu from "./UserMenu"

export default function Top() {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [visible, setVisible] = React.useState(false)
    return (

        <div className={styles.top}>
            <div className={styles.top_container}>
                <div></div>
                <ul className={styles.top_list}>
                    <li className={styles.li}>
                        <img src="https://cdn2.iconfinder.com/data/icons/world-flag-2/30/18-512.png" alt="ua-flag" />
                        <span>Ukraine / hrn</span>
                    </li>
                    <li className={styles.li}>
                        <MdSecurity />
                        <span>Buyer Protection</span>
                    </li>
                    <li className={styles.li}>
                        <span>Customer Service</span>
                    </li>
                    <li className={styles.li}>
                        <span>Help</span>
                    </li>
                    <li className={styles.li}>
                        <BsSuitHeart />
                        <Link href="/profile/wishlist">
                            <span>Wishlist</span>
                        </Link>
                    </li>
                    <li className={styles.li}
                    onMouseOver={()=>setVisible(true)}
                    onMouseLeave={()=>setVisible(false)}
                    >
                    {loggedIn ? (
                        <li className={styles.li}>
                            <div className={styles.flex}>
                               <img src="https://st3.depositphotos.com/1007566/12989/v/450/depositphotos_129895474-stock-illustration-hacker-character-avatar-icon.jpg" alt="profile"/>
                                <span>USER NAME</span>
                                <RiArrowDropDownFill />

                            </div>
                        </li>
                    ) : (
                        <li className={styles.li}>
                            <div className={styles.flex}>
                                <RiAccountPinCircleLine />
                                <span>Account</span>
                                <RiArrowDropDownFill />

                            </div>
                        </li>
                    )}
                    {visible && <UserMenu loggedIn={loggedIn}/>}
                   
                    </li>

                </ul>
            </div>
        </div>
    )


}