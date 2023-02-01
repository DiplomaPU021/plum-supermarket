import styles from './styles.module.scss'
import { useSelector } from "react-redux"
import { Button, Form, Image, InputGroup } from 'react-bootstrap';
import * as React from "react"
import UserMenu from "./UserMenu"
import Link from "next/link"
import LoopIcon from '../icons/LoopIcon';
import ThemeIcon from '../icons/ThemeIcon'
import HeartIcon from '../icons/HeartIcon'
import CartIcon from '../icons/CartIcon'
import AccountIcon from '../icons/AccountIcon'
import{useSession} from "next-auth/react"

export default function Header() {
    const{data:session} = useSession();
    const { cart } = useSelector((state) => ({ ...state }))
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [visible, setVisible] = React.useState(false)
    return (
        <div className={styles.main}>
            <div className={styles.main_container}>
                <Link href="/">
                    <div className={styles.logo}>
                        <Image src="../../../logo/logo_light.jpg" alt="logo" height="46px" />
                    </div>
                </Link>
                <div className={styles.search}>
                    <InputGroup >
                        <Form.Control aria-describedby="basic-addon2" placeholder="Search..." style={{ borderRadius: "23px", borderWidth: "2px", borderColor: "#220F4B", position: "relative", height: "46px" }} />
                        <Button style={{ borderRadius: "23px", width: "72px", height: "46px", position: "absolute", backgroundColor: "#220F4B", right: 0, border: "none" }} id="button-addon2">
                            <LoopIcon fillColor={"#FAF8FF"} />
                        </Button>
                    </InputGroup>
                </div>
                <div className={styles.btnpannel}>
                    <button>
                        <ThemeIcon fillColor={"#220F4B"} />
                    </button>
                    <button>
                        <HeartIcon fillColor={"#220F4B"} />
                    </button>
                    <div className={styles.cart}>
                        <button >
                            <CartIcon fillColor={"#220F4B"} />
                        </button>
                        <span>0</span>
                    </div>
                    
                    <div
                    onMouseOver={()=>setVisible(true)}
                    onMouseLeave={()=>setVisible(false)}
                    >
                     {session ? (
                        //TODO change
                        <div className={styles.cart}>
                            <button>
                                <HeartIcon fillColor={"#220F4B"} />
                                {/* <img src={"/"+session.user.image} alt="profile"/> */}
                                {/* {session.user.name} */}
                            </button>
                        </div>
                    ) : (
                        <button>
                            <AccountIcon fillColor={"#220F4B"} />
                        </button>
                    )}
                     {visible && <UserMenu session={session} />}
                     </div>
                     </div>
               
            </div>
        </div>
    )
}