import { useRouter } from "next/router"
import Image from 'react-bootstrap/Image'
import styles from "./styles.module.scss"
import { getProviders, signIn } from "next-auth/react"
import { useEffect, useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";

export default function ContinueWith() {
    const router = useRouter();
    const [providers, setProviders] = useState([]);

    // useEffect(async () => {
    // //  setProvider(await getProviders().google);
    // const p= await getProviders();
    //     console.log("providerGoogle", p.google);
    //     // setProviders(Object.values(providers));
    // }, []);

    useDeepCompareEffect(() => {
        async function fetchData() {
            const response = await getProviders();
            console.log(Object.values(response).map(p => p.id));
            if (response) {
                setProviders(response);
            }
        }
        fetchData();
    }, [providers]); // Or [] if effect doesn't need props or state
    return (
        <div className={styles.container_frame}>
            <div className={styles.devider}>
                <div className={styles.line2}></div>
                <span>або увійдіть за допомогою</span>
                <div className={styles.line2}></div>
            </div>
            {/* {providers.map((provider) => {
                                    if (provider.name == "Credentials") {
                                        return;
                                    }
                                    return (
                                        <div key={provider.name}>
                                            <button className={styles.social_btn}
                                                onClick={() => signIn(provider.id)}>                                             
                                                <Image src={`../../icons/${provider.name}.png`} width="46px" height="46px" alt="provider"/>
                                                Sign in with {provider.name}
                                            </button>
                                        </div>
                                    );auth0

                                })}*/}

            <div className={styles.linkicons}>
                <Image src='../../../authIcons/auth_google.png' width="46px" height="46px" onClick={() => signIn(providers.google.id)} />
                <Image src='../../../authIcons/auth_github.png' width="46px" height="46px" />
                <Image src='../../../authIcons/auth_auth.png' width="46px" height="46px" onClick={() => signIn(providers.auth0.id)} />
                <Image src='../../../authIcons/auth_fb.png' width="46px" height="46px" />
            </div>
        </div>
    )

}