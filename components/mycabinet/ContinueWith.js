import { useRouter } from "next/router"
import Image from 'react-bootstrap/Image'
import styles from "./styles.module.scss"
import { getProviders, signIn } from "next-auth/react"
import { useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";

export default function ContinueWith(
    {
        setRegShow,
        setLogShow,
        setCongratsShow,
        setAuthShow,
        setUserProfileShow
    }
) {
    const router = useRouter();
    const [providers, setProviders] = useState([]);

    useDeepCompareEffect(() => {
        async function fetchData() {
            const response = await getProviders();
            // console.log(Object.values(response).map(p => p.id));
            if (response) {
                setProviders(response);
            }
        }
        fetchData();
    }, [providers]); // Or [] if effect doesn't need props or state
    const signInHandler = () => {
        const res = signIn(providers.google.id);

        setUserProfileShow(true);
        // window.alert(res);
        // console.log("res", res);
    }
    return (
        <div className={styles.container_frame}>
            <div className={styles.devider}>
                <div className={styles.line2}></div>
                <span>або увійдіть за допомогою</span>
                <div className={styles.line2}></div>
            </div>
            <div className={styles.linkicons}>
                <button className={styles.social_btn}
                    onClick={signInHandler} >
                    <Image height="46px" width="46px" src={`../../icons/google.png`} alt="provider" />
                    Увійти з допомогою Google
                </button>
            </div>
            {/* <div className={styles.linkicons}>
                <button className={styles.social_btn}
                    onClick={() => signIn(providers.apple.id)} >
                    <Image height="46px" width="46px" src={`../../icons/apple.png`} alt="provider" />
                    Увійти з допомогою Apple
                </button>
            </div> */}
            {/* <Image src='../../../authIcons/auth_google.png' width="46px" height="46px" onClick={() => signIn(providers.google.id)} /> */}
            {/* <Image src='../../../authIcons/auth_github.png' width="46px" height="46px" />
                <Image src='../../../authIcons/auth_auth.png' width="46px" height="46px" onClick={() => signIn(providers.auth0.id)} />
                <Image src='../../../authIcons/auth_fb.png' width="46px" height="46px" /> */}
        </div>
    )
}