import { useRouter } from "next/router"
import Image from 'react-bootstrap/Image'
import styles from "./styles.module.scss"
import { getProviders, signIn } from "next-auth/react"
import { useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import { updateWishList } from "@/store/wishListSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import DotLoaderSpinner from "../loaders/dotLoader";

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
    const dispatch = useDispatch();
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(false);

    useDeepCompareEffect(() => {
        async function fetchData() {
            const response = await getProviders();
            if (response) {
                setProviders(response);
            }
        }
        fetchData();
    }, [providers]);

    const signInHandler = async (id) => {
        try {
            setLoading(true);
            const res = signIn(id);
            setUserProfileShow(true);

            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }
    return (
        <div className={styles.container_frame}>
            {
                loading && <DotLoaderSpinner loading={loading} />
            }
            <div className={styles.devider}>
                <div className={styles.line2}></div>
                <span>або увійдіть за допомогою</span>
                <div className={styles.line2}></div>
            </div>
            <div className={styles.linkicons}>
                <button className={styles.social_btn}
                    onClick={() => signInHandler(providers.google.id)} >
                    <Image height="24px" width="24px" src={`../../icons/logos_google-icon.png`} alt="provider" />
                </button>
                <button className={styles.social_btn}
                    onClick={() => signInHandler(providers.facebook.id)} >
                    <Image height="24px" width="24px" src={`../../icons/logos_facebook.png`} alt="provider" />
                </button>
            </div>
        </div>
    )
}