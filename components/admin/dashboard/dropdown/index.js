import styles from "./styles.module.scss"
import Link from "next/link"
import { MdArrowForwardIos, MdSpaceDashboard } from 'react-icons/md'
import { FcSalesPerformance } from 'react-icons/fc'
import { IoListCircleSharp, IoNotifications, IoNotificationsSharp } from 'react-icons/io5';
import { ImUsers } from 'react-icons/im';
import { AiFillMessage } from 'react-icons/ai';
import { FaRegUserCircle, FaThList } from 'react-icons/fa';
import { BsPatchPlus } from 'react-icons/bs';
import { MdOutlineCategory } from 'react-icons/md';
import { RiCoupon3Fill, RiLogoutCircleFill, RiSettingsLine } from 'react-icons/ri';
import { VscHome } from "react-icons/vsc"
import { useState } from 'react';
import { signOut } from "next-auth/react"

export default function Dropdown({ userImage }) {
    const [show, setShow] = useState(false);

    return (
        <div className={styles.dropdown}
            onMouseOver={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            <div className={styles.dropdown_toggle}>
                {userImage !== 'profile.gif' ? (<img width="50px" height="50px" src={userImage} alt="photo" />) : (<img width="50px" height="50px" src="../../../../../profile/account2.png" alt="pic" />)}
            </div>
            <div className={`${styles.dropdown_content} ${show ? styles.active : ""}`}>
                <div className={styles.dropdown_content_icons}>
                    <div className={styles.dropdown_content_icons_icon}>
                        <Link href="/admin/dashboard">
                            <MdSpaceDashboard />
                        </Link>
                    </div>
                    <div className={styles.dropdown_content_icons_icon}>
                        <Link href="/admin/dashboard/orders">
                            <IoListCircleSharp />
                        </Link>
                    </div>
                    <div className={styles.dropdown_content_icons_icon}>
                        <Link href="/admin/dashboard/users">
                            <ImUsers />
                        </Link>
                    </div>
                    <div className={styles.dropdown_content_icons_icon}>
                        <Link href="/admin/dashboard/product/all">
                            <FaThList />
                        </Link>
                    </div>
                    <div className={styles.dropdown_content_icons_icon}>
                        <Link href="/admin/dashboard/product/create">
                            <BsPatchPlus />
                        </Link>
                    </div>
                    <div className={styles.dropdown_content_icons_icon}>
                        <Link href="/admin/dashboard/categories">
                            <MdOutlineCategory />
                        </Link>
                    </div>
                    <div className={styles.dropdown_content_icons_icon}>
                        <Link href="/admin/dashboard/subCategories">
                            <div style={{ transform: "rotate(180deg)" }}>
                                <MdOutlineCategory />
                            </div>
                        </Link>
                    </div>
                    <div className={styles.dropdown_content_icons_icon}>
                        <Link href="/admin/dashboard/coupons">
                            <RiCoupon3Fill />
                        </Link>
                    </div>
                </div>
                <div className={styles.dropdown_content_items}>
                    <div className={styles.dropdown_content_items_item}>
                        <Link href="/">
                            <VscHome />
                        </Link>
                    </div>
                    <div className={styles.dropdown_content_items_item}>
                        <Link href="/">
                            <FaRegUserCircle />
                        </Link>
                    </div>
                    <div className={styles.dropdown_content_items_item}>
                        <Link href="/">
                            <IoNotificationsSharp />
                        </Link>
                    </div>
                    <div className={styles.dropdown_content_items_item}>
                        <Link href="/">
                            <RiSettingsLine />
                        </Link>
                    </div>
                </div>
                <div className={styles.dropdown_logout}>
                    <button onClick={() => signOut()}>Вийти</button>
                </div>
            </div>
        </div>
    )
}