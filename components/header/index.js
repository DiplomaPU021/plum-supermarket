import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Form, Image, InputGroup } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
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
import axios from "axios";
import { updateWishList } from "@/store/wishListSlice";
import { addToSearchedList } from "@/store/searchedListSlice";
import { useRouter } from "next/router";
import CreatableSelect from "react-select/creatable";

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
  const [error, setError] = useState({
    inCartError: false,
    uidPrInCart: "",
    inWishListError: false,
    uidPrInWish: "",
  });
  const [divVisible, setDivVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState();
  const [orders, setOrders] = useState([]);

  const getScaleItemsCount = () => {
    return scaleList.scaleListItems.reduce(
      (acc, cur) => acc + cur.items.length,
      0
    );
  };

  const getWishItemsCount = () => {
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
        const res = await axios.get("/api/user/wishlist");
        const data = res.data;
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
    if (session) {
    try {
      const res1 = await axios.get("/api/user/manageProfile");
      const data1 = res1.data;
      setUser(data1.user);
      const res2 = await axios.get("/api/user/manageOrders");
      const data2 = res2.data;
      setOrders(data2.orders);
      setMyCabinetOpen(true);
    } catch (error) {
      console.log(error);
    }
  }
  };
  const handleBtn1Click = () => {
    setLanguage1(true);
    setLanguage2(false);
  };
  const handleBtn2Click = () => {
    setLanguage2(true);
    setLanguage1(false);
  };

  useEffect(() => {
    if (
      window.location.pathname === "/checkout" ||
      window.location.pathname.startsWith("/order/")
    ) {
      setDivVisible(false);
    } else {
      setDivVisible(true);
    }
  });
  const setShowWishListHandler = () => {
    if (session) {
      setWishShow(true);
    } else {
      alert("Залогінтесь");
    }
  };

 // const [str, setStr] = useState(router.query.text || "");
 //const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(searchedList.searchedListItems);
 // const [searchValue, setSearchValue] = useState(null);
  const [searchV, setSearchV] = useState("");
  const [selected, setSelected] = useState("");
  const [ulVisible, setUlVisible] = useState(true);
  const selectRef = useRef();

  const handleSearchChange = (e) => {
    setSearchV(e.target.value);
    const filteredOptions = searchedList.searchedListItems.filter(
      (option) => option.value.includes(e.target.value.toLowerCase().trim())
    );
    setOptions(filteredOptions);
    setUlVisible(true);
  };
 
  const handleSelectSearch = (search) => {
    selectRef.current.focus();
    setTimeout(() => {
      const selectedOption = searchedList.searchedListItems.find(
        (option) => option.value === search.toLowerCase().trim()
      );
      if (!selectedOption) {
        const newOption = {
          label: search,
          value: search.toLowerCase().trim(),
        };
        dispatch(addToSearchedList(newOption));
        setOptions((prev) => [...prev, newOption]);
      }
      setSearchV(search.toLowerCase().trim());
      setSelected(search);
      router.push(`/search?text=${search.toLowerCase().trim()}`);
      setUlVisible(false);
    }, 700);
  };

  const handlerOnSearch = () => {
    handleSelectSearch(searchV);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handlerOnSearch();
    }
  };

  useEffect(() => {
    setOptions(searchedList.searchedListItems);
  }, [searchedList.searchedListItems]);

  useEffect(() => {
   if(searchV.length == 0)
   setUlVisible(false);
  }, [searchV]);

  return (
    <div className={styles.main}>
      <Tooltip
        id="header-login-tooltip"
        content="Будь ласка зареєструйтесь!"
        isOpen={isOpen}
        place="bottom"
        style={{
          backgroundColor: "#70BF63",
          color: "#fff",
          borderRadius: "30px",
        }}
      />
      <div
        className={styles.headertop}
        style={{ display: divVisible ? "flex" : "none" }}
      >
        <section>
          <ul>
            <li>
              <button
                style={{ fontWeight: language1 ? "700" : "300" }}
                onClick={handleBtn1Click}
              >
                UA
              </button>
            </li>
            <li>
              <button
                style={{ fontWeight: language2 ? "700" : "300" }}
                onClick={handleBtn2Click}
              >
                ENG
              </button>
            </li>
          </ul>
        </section>

        <ThemeSwitcher
          onColor={"#FAF8FF"}
          offColor={"#585068"}
          isChecked={themeChange}
          handleSwitch={() => setThemeChange(!themeChange)}
        />
      </div>
      <div className={styles.main_container}>
        <Link href="/">
          <div className={styles.logo}>
            <Image
              src="../../../logo/logo_light.png"
              alt="logo"
              height="60px"
            />
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
            <Form.Group>
              <Form.Control
                type="text"
                value={searchV}
                name="option"
                id="option"
                onChange={(e) => handleSearchChange(e)}
                onKeyDown={(e) => handleKeyDown(e)}
                ref={selectRef}
                placeholder="Я шукаю..."
              />
            </Form.Group>
            <button onClick={() => handlerOnSearch()}>
              <LoopIcon fillColor="#FAF8FF" />
            </button>
          </div>
          <div
            className={styles.search_content}
            style={{ display: ulVisible ? "flex" : "none" }}
          >
            <ul id="ulStreetSelect">
              {options.map((option, i) => (
                <li
                  key={`${option.key}-${i}`}
                  id={option.key}
                  onClick={() => handleSelectSearch(option.value)}
                  className={option.value === selected ? styles.selected : ""}
                >
                  {option.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className={styles.checkout_header}
          style={{ display: divVisible ? "none" : "flex" }}
        >
          <p>
            Консультації по телефону <span>+38 023 652 12 56</span> Графік
            роботи Call-центру
          </p>
        </div>
        <div
          className={styles.btnpannel}
          style={{ display: divVisible ? "flex" : "none" }}
        >
          <div className={styles.cart}>
            <button
              onClick={() => setScaleShow(true)}
              style={{ backgroundColor: scaleShow ? "#220F4B" : "#FAF8FF" }}
            >
              <ScalesIcon fillColor={scaleShow ? "#FAF8FF" : "#220F4B"} />
            </button>
            {getScaleItemsCount() !== 0 ? (
              <span> {getScaleItemsCount()}</span>
            ) : null}
          </div>
          <div className={styles.cart}>
            <button
              onClick={handleWishShow}
              style={{ backgroundColor: wishShow ? "#220F4B" : "#FAF8FF" }}
              data-tooltip-id="header-login-tooltip"
              onMouseLeave={() => setIsOpen(false)}
            >
              <HeartIcon fillColor={wishShow ? "#FAF8FF" : "#220F4B"} />
            </button>
            {getWishItemsCount() !== 0 && getWishItemsCount() > 0 ? (
              <span> {getWishItemsCount()}</span>
            ) : null}
          </div>
          <div className={styles.cart}>
            <button
              onClick={() => setCartShow(true)}
              style={{ backgroundColor: cartShow ? "#220F4B" : "#FAF8FF" }}
            >
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
            <div className={styles.cart}>
              <button
                style={{ backgroundColor: "#220F4B" }}
                onClick={handlerUserProfile}
              >
                <AccountIcon fillColor={"#FAF8FF"} />
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
            country={country}
          />
        </div>
      </div>
    </div>
  );
}

const languages = [
  {
    name: "UA",
    link: "",
  },
  {
    name: "ENG",
    link: "",
  },
];
