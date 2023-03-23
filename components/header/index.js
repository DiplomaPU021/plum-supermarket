import styles from './styles.module.scss'
import { useSelector } from "react-redux"
import { Image, InputGroup } from 'react-bootstrap';
import { useState, useEffect } from "react";
// import UserMenu from "./UserMenu"
import Link from "next/link"
import LoopIcon from '../icons/LoopIcon';
import ThemeIcon from '../icons/ThemeIcon'
import HeartIcon from '../icons/HeartIcon'
import CartIcon from '../icons/CartIcon'
import AccountIcon from '../icons/AccountIcon'
import { useSession } from "next-auth/react"
import Cart from '../cart'
import WishList from '../wishlist';
import MyCabinet from '../mycabinet'
// import UserProfile from '../userprofile'

export default function Header({ country }) {
    const { data: session, status } = useSession();
    const cart = useSelector((state) => state.cart);
    const [loggedIn, setLoggedIn] = useState(false);
    const [visible, setVisible] = useState(false)
    const [cartShow, setCartShow] = useState(false);
    const [wishShow, setWishShow] = useState(false);
    const [language, setLanguage] = useState(false);
    const [themeChange, setThemeChange] = useState(false);
    // const [userProfileOpen, setUserProfileOpen] = useState(false)
    const [myCabinetOpen, setMyCabinetOpen] = useState(false)


    const getWishItemsCount = () => {
        //TODO implement
        return 0;
    };

    const getItemsCount = () => {
        return cart.cartItems.reduce((accumulator, item) => accumulator + item.qty, 0);
    };

    return (
        <div className={styles.main}>
            <div className={styles.main_container}>
                <Link href="/">
                    <div className={styles.logo}>
                        <Image src="../../../logo/logo_light.png" alt="logo" height="46px" />
                    </div>
                </Link>
                <div className={styles.search}>
                    <InputGroup className={styles.inputgroup}>
                        <input className={styles.forminput} placeholder="Search..." />
                        <button className={styles.formbtn} id="button-addon2" >
                            <LoopIcon fillColor={"#FAF8FF"} />
                        </button>
                    </InputGroup>
                </div>
                <div className={styles.btnpannel}>
                    <button className={styles.location} onClick={() => setLanguage(true)} style={{ backgroundColor: language ? "#220F4B" : "#FAF8FF", color: language ? "#FAF8FF" : "#220F4B" }}>
                        UA
                    </button>
                    <button onClick={() => setThemeChange(true)} style={{ backgroundColor: themeChange ? "#220F4B" : "#FAF8FF" }}>
                        <ThemeIcon fillColor={themeChange ? "#FAF8FF" : "#220F4B"} />
                    </button>
                    <div className={styles.cart}>
                        <button onClick={() => setWishShow(true)} style={{ backgroundColor: wishShow ? "#220F4B" : "#FAF8FF" }}>
                            <HeartIcon fillColor={wishShow ? "#FAF8FF" : "#220F4B"} />
                        </button>
                        <span> {getWishItemsCount()}</span>
                    </div>
                    <div className={styles.cart}>
                        <button onClick={() => setCartShow(true)} style={{ backgroundColor: cartShow ? "#220F4B" : "#FAF8FF" }}>
                            <CartIcon fillColor={cartShow ? "#FAF8FF" : "#220F4B"} />
                        </button>
                        <span> {getItemsCount()}</span>
                    </div>
                    <Cart
                        show={cartShow}
                        onHide={() => setCartShow(false)}
                    />
                    <WishList
                        show={wishShow}
                        onHide={() => setWishShow(false)}
                    />


                    {/* <div
                        onMouseOver={() => setVisible(true)}
                        onMouseLeave={() => setVisible(false)}
                    > */}
                    {session && status == "authenticated" ? (
                        //TODO change
                        <div className={styles.cart}>
                            <button style={{ backgroundColor: "#220F4B" }} onClick={() => setMyCabinetOpen(true)}>
                                <AccountIcon fillColor={"#FAF8FF"} />
                                {/* <img src={"/"+session.user.image} alt="profile"/> */}
                                {/* {session.user.name} */}
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => setMyCabinetOpen(true)}>
                            <AccountIcon fillColor={"#220F4B"} />
                        </button>
                    )}
                    <MyCabinet
                        show={myCabinetOpen}
                        onHide={() => setMyCabinetOpen(false)} />
                        
                    {/* <UserProfile
                            show={userProfileOpen}
                            onHide={() => setUserProfileOpen(false)} /> */}
                    {/* {visible && <UserMenu session={session} />} */}
                    {/* </div> */}

                </div>

            </div>
        </div>
    )
}