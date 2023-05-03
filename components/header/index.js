import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Image, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import ComparisonListModal from "./ComparisonListModal";
import Link from "next/link";
import LoopIcon from "../icons/LoopIcon";
import HeartIcon from "../icons/HeartIcon";
import CartIcon from "../icons/CartIcon";
import AccountIcon from "../icons/AccountIcon";
import { useSession } from "next-auth/react";
import Cart from "../cart";
import WishList from "../wishlist";
import MyCabinet from "../mycabinet";
import ScalesIcon from "../icons/ScalesIcon";
import ThemeSwitcher from "./ThemeSwitcher";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import axios from 'axios';
import { updateWishList } from "@/store/wishListSlice";
import { addToSearchedList } from "@/store/searchedListSlice";
import { useRouter } from "next/router";
import CreatableSelect from 'react-select/creatable';


export default function Header({ country }) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.cart);
  const wishList = useSelector((state) => state.wishList);
  const scaleList = useSelector((state) => state.scaleList);
  const searchedList = useSelector((state) => state.searchedList);
  const [cartShow, setCartShow] = useState(false);
  const [wishShow, setWishShow] = useState(false);
  const [scaleShow, setScaleShow] = useState(false);
  const [language1, setLanguage1] = useState(true);
  const [language2, setLanguage2] = useState(false);
  const [themeChange, setThemeChange] = useState(false);
  const [myCabinetOpen, setMyCabinetOpen] = useState(false);
  const [error, setError] = useState({ inCartError: false, uidPrInCart: "", inWishListError: false, uidPrInWish: "" });
  const [divVisible, setDivVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState();
  const [orders, setOrders] = useState([]);
  // useEffect(() => {
  //   // console.log('App comp value:', JSON.stringify(error));
  // }, [wishShow]);

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
    return scaleList.scaleListItems.reduce(
      (acc, cur) => acc + cur.items.length,
      0
    );
  };

  const getWishItemsCount = () => {
    // return wishList.wishListItems.reduce(
    //   (accumulator, item) => accumulator + item.qty,
    //   0
    // );
    return wishList.wishListTotal;
  };

  const getItemsCount = () => {
    return cart.cartItems.reduce(
      (accumulator, item) => accumulator + item.qty,
      0
    );
  };
  const handleWishShow = async () => {
    if (session) {
      try {
        const res = await axios.get('/api/user/wishlist');
        const data = res.data;
        // console.log("handleWishShow", data.wishList);
        dispatch(updateWishList(data.wishList));
        setIsOpen(false);
        setWishShow(true);
      } catch (error) {
        console.log(error);
      }

    } else {
      setWishShow(false);
      setIsOpen(true);
    }

  };
  const handlerUserProfile = async () => {
    try {
      const res1 = await axios.get('/api/user/manageProfile');
      const data1 = res1.data;
      setUser(data1.user);
      const res2 = await axios.get('/api/user/manageOrders');
      const data2 = res2.data;
      setOrders(data2.orders);
      setMyCabinetOpen(true);
    } catch (error) {
      console.log(error);
    }


  }
  const handleBtn1Click = () => {
    setLanguage1(true)
    setLanguage2(false)
  }
  const handleBtn2Click = () => {
    setLanguage2(true)
    setLanguage1(false)
  }

  useEffect(() => {
    if (window.location.pathname === "/checkout" || window.location.pathname.startsWith('/order/')) {
      setDivVisible(false)
    } else {
      setDivVisible(true)
    }
  })
  const setShowWishListHandler = () => {
    if (session) {
      setWishShow(true)
    } else {
      alert("Залогінтесь");
    }
  }

  const [str, setStr] = useState( router.query.text || "");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(searchedList.searchedListItems);
  const [value, setValue] = useState(null);


  const handlerSubmit = (searchQuery) => {
    if(searchQuery && searchQuery.length > 1) {
      router.push(`/search?text=${searchQuery}`);
    }
  };

  const handlerOnSearch = () =>{
     //e.preventDefault();
     //console.log("iv---", e);

    const newOption = {
      label: str,
      value: str.toLowerCase().trim(),
    };
    setOptions((prev) => [...prev, newOption]);
    setValue(newOption);
    
    router.push(`/search?text=${str}`);
    // handlerSubmit(newOption.value);
  }

  // const handleInputChange = (e) => {
  //   console.log("iv---", e);
  //   setStr(e);
  //   console.log("q---",  str);
  // }

  const handleCreate = ( inputValue) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = {
        label: inputValue,
        value: inputValue.toLowerCase().trim(),
      };
      setIsLoading(false);
      dispatch(addToSearchedList(newOption));
      setOptions((prev) => [...prev, newOption]);
      setValue(newOption);
      //setStr(newOption.value);
      handlerSubmit(newOption.value);
    }, 700);
  };

  return (
    <div className={styles.main}>
      {/* {JSON.stringify(value)}
      {JSON.stringify(str)} */}
      <Tooltip
        id="header-login-tooltip"
        content="Будь ласка зареєструйтесь!"
        isOpen={isOpen}
        place="bottom"
        style={{ backgroundColor: "#70BF63", color: "#fff", borderRadius: "30px" }}
      />
      <div className={styles.headertop} style={{ display: divVisible ? 'flex' : 'none' }}>
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

        <ThemeSwitcher onColor={"#FAF8FF"} offColor={"#585068"} isChecked={themeChange} handleSwitch={() => setThemeChange(!themeChange)} />
      </div>
      <div className={styles.main_container}>
        <Link href="/">
          <div className={styles.logo}>
            <Image src="../../../logo/logo_light.png" alt="logo" height="60px" />
          </div>
        </Link>
        <div
          className={styles.search}
          style={{ width: divVisible ? "65%" : "10%" }}
        >
          <div
            className={styles.search_flex}
            style={{ display: divVisible ? "flex" : "none" }}
          >
            <CreatableSelect
              styles={{
                control: (base) => ({
                  ...base,
                  paddingLeft: "20px",
                  borderRadius: "25px",
                  background: "#FAF8FF",
                  //border: "2px solid #220F4B",
                  border: "none",
                  boxShadow: "none",
                  "&:hover": {
                    outline: "none",
                    boxShadow: "none",
                  },
                }),
                menu: (base) => ({
                  ...base,
                  padding: "12px",
                  border: "0",
                  borderRadius: "23px",
                  background: "#FAF8FF",
                }),
                singleValue: (base) => ({
                  ...base,
                  fontSize: "16px",
                  color: "#220F4B",
                  fontFamily: "Noto Sans",
                }),
                option: (base, state) => ({
                  ...base,
                  paddingLeft: "20px",
                  marginTop: "2px",
                  borderRadius: "23px",
                  background: state.isSelected
                    ? "rgba(138, 227, 124, 0.4)"
                    : "#FAF8FF",
                  color: "#220F4B",
                  height: "100%",
                  "&:hover": {
                    outline: "none",
                    boxShadow: "none",
                    background: "#FAF8FF",
                    background: "rgba(138, 227, 124, 0.2)",
                    cursor: "pointer",
                  },
                }),
                clearIndicator: () => ({
                  display: "none",
                }),
                dropdownIndicator: () => ({
                  display: "none",
                }),
                indicatorSeparator: () => ({
                  display: "none",
                }),
              }}
              className={styles.container}
              placeholder="Я шукаю..."
              isClearable
              search={true}
              isSearchable={true}
              isDisabled={isLoading}
              isLoading={isLoading}
              //onInputChange={handleInputChange}
              onInputChange={(e) => { setStr(e);}}
              //onInputChange={(e)=>handleInputChange(e)}
             
              //onChange={(e)=>handleInputChange(e)}

              onChange={(newValue) => {
                setValue(newValue);
                if (newValue) {
                  handlerSubmit(newValue.value);
                }
              }}
              onCreateOption={handleCreate}
              options={options}
              value={value}
            />
            <button
              onClick={handlerOnSearch}
            >
              <LoopIcon fillColor="#FAF8FF" />
            </button>
          </div>
        </div>
        <div className={styles.checkout_header} style={{ display: divVisible ? 'none' : 'flex' }}>
          <p>Консультації по телефону <span>+38 023 652 12 56</span> Графік роботи Call-центру</p>
        </div>
        <div className={styles.btnpannel} style={{ display: divVisible ? 'flex' : 'none' }}>
          <div className={styles.cart}>
            <button onClick={() => setScaleShow(true)} style={{ backgroundColor: scaleShow ? "#220F4B" : "#FAF8FF" }}>
              <ScalesIcon fillColor={scaleShow ? "#FAF8FF" : "#220F4B"} />
            </button>
            {getScaleItemsCount() !== 0 ? <span> {getScaleItemsCount()}</span> : null}
          </div>
          <div className={styles.cart}>
            <button
              onClick={handleWishShow}
              style={{ backgroundColor: wishShow ? "#220F4B" : "#FAF8FF" }}
              data-tooltip-id="header-login-tooltip"
              onMouseLeave={() => setIsOpen(false)}>
              <HeartIcon fillColor={wishShow ? "#FAF8FF" : "#220F4B"} />
            </button>
            {getWishItemsCount() !== 0 && getWishItemsCount()>0 ? <span> {getWishItemsCount()}</span> : null}
          </div>
          <div className={styles.cart}>
            <button onClick={() => setCartShow(true)} style={{ backgroundColor: cartShow ? "#220F4B" : "#FAF8FF" }}>
              <CartIcon fillColor={cartShow ? "#FAF8FF" : "#220F4B"} />
            </button>
            {getItemsCount() !== 0 ? <span> {getItemsCount()}</span> : null}
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
                onClick={handlerUserProfile}
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
            user={user}
            setUser={setUser}
            orders={orders}
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
