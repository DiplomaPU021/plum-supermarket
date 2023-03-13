import { useRouter } from "next/router"
import LogIn from "./LogIn"
import Register from "./Register"

export default function Authorization({ logShow, regShow, setLogShow, setRegShow }) {
    const router = useRouter();

    if (logShow) {
        console.log("LOG IN")
        return (
            <LogIn setRegShow={setRegShow} setLogShow={setLogShow} />
        )
    }
    else {
        console.log("REG")
        return (
            <Register setRegShow={setRegShow} setLogShow={setLogShow} />
        )
    }
}