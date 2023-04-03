import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { Image, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import ComparisonListModal from "./ComparisonListModal";
import Link from "next/link";
import LoopIcon from "../icons/LoopIcon";
import ThemeIcon from "../icons/ThemeIcon";
import HeartIcon from "../icons/HeartIcon";
import CartIcon from "../icons/CartIcon";
import AccountIcon from "../icons/AccountIcon";
import { useSession } from "next-auth/react";
import Cart from "../cart";
import WishList from "../wishlist";
import MyCabinet from "../mycabinet";
import ScalesIcon from "../icons/ScalesIcon";
import ThemeSwitcher from './ThemeSwitcher';
import { saveWishList } from "@/requests/user";

export default function Header({ country }) {
  const { data: session, status } = useSession();
  const cart = useSelector((state) => state.cart);
  const wishList = useSelector((state) => state.wishList);
  const [cartShow, setCartShow] = useState(false);
  const [wishShow, setWishShow] = useState(false);
  const [scaleShow, setScaleShow] = useState(false);
  const [language1, setLanguage1] = useState(false);
  const [language2, setLanguage2] = useState(false);
  const [themeChange, setThemeChange] = useState(false);
  const [myCabinetOpen, setMyCabinetOpen] = useState(false);
  const [comparisonChange, setСomparisonChange] = useState(false);
  const [error, setError]= useState({inCartError:false, uidProduct:""});


  // useEffect(() => {
  //   console.log("35");
  //   if (session) {
  //     setTimeout(async () => {
  //       for (let i = 0; i < wishList.wishListItems.length; i++) {
  //         saveWishList({productId:wishList.wishListItems[i]._id, size:wishList.wishListItems[i].size, image:wishList.wishListItems[i].images[0], color:wishList.wishListItems[i].color?.color, code:wishList.wishListItems[i].code});
  //       }
  //     }, 5000)
  //   }
  // }, [wishList, session])
  const getScaleItemsCount = () => {
    //TODO implement
    return 0;
  };

  const getWishItemsCount = () => {
    return wishList.wishListItems.reduce(
      (accumulator, item) => accumulator + item.qty,
      0
    );
  };

  const getItemsCount = () => {
    return cart.cartItems.reduce(
      (accumulator, item) => accumulator + item.qty,
      0
    );
  };

  const handleBtn1Click = () => {
    setLanguage1(true)
    setLanguage2(false)
  }

  const handleBtn2Click = () => {
    setLanguage2(true)
    setLanguage1(false)
  }



  return (
    <div className={styles.main}>
      <div className={styles.headertop}>
        <section>
          <ul>
            <li>
              <button style={{ fontWeight: language1 ? "700" : "300" }} onClick={handleBtn1Click} >
                UA
              </button>
            </li>
            <li>
              <button style={{ fontWeight: language2 ? "700" : "300" }} onClick={handleBtn2Click}>
                ENG
              </button>
            </li>
          </ul>
        </section>
        {/* <ThemeSwitcher onColor={"#FAF8FF"} offColor={"#585068"} isChecked={themeChange} handleSwitch={() => setThemeChange(!themeChange)} /> */}
      </div>
      <div className={styles.main_container}>
        <Link href="/">
          <div className={styles.logo}>
            <Image src="../../../logo/logo_light.png" alt="logo" height="60px" />
          </div>
        </Link>
        <div className={styles.search}>
          <div className={styles.search_flex}>
            <input type="text" placeholder="Я шукаю..." />
            <button>
              <LoopIcon fillColor="#FAF8FF" />
            </button>
          </div>
        </div>
        <div className={styles.btnpannel}>
          <div className={styles.cart}>
            <button onClick={() => setScaleShow(true)} style={{ backgroundColor: comparisonChange ? "#220F4B" : "#FAF8FF" }}>
              <ScalesIcon fillColor={comparisonChange ? "#FAF8FF" : "#220F4B"} />
            </button>
            <span> {getScaleItemsCount()}</span>
          </div>
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
            error={error}
            setError={setError}
          />
          <WishList
            show={wishShow}
            onHide={() => setWishShow(false)}
            error={error}
            setError={setError}
          />
          <ComparisonListModal
            show={scaleShow}
            onHide={() => setScaleShow(false)}
          />
          {session && status == "authenticated" ? (
            //TODO change
            <div className={styles.cart}>
              <button
                style={{ backgroundColor: "#220F4B" }}
                onClick={() => setMyCabinetOpen(true)}
              >
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
            onHide={() => setMyCabinetOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

const languages = [
  {
    name: "UA",
    link: ""
  }, {
    name: "ENG",
    link: ""
  }
]
