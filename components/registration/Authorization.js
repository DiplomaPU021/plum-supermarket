import { useRouter } from "next/router"
import Congrats from "./Congratulate";
import LogIn from "./LogIn"
import Register from "./Register"

export default function Authorization({ logShow, regShow, congratsShow, setLogShow, setRegShow, setCongratsShow}) {
    const router = useRouter();

    if (logShow) {
        console.log("LOG IN")
        return (
            <LogIn setRegShow={setRegShow} setLogShow={setLogShow} setCongratsShow={setCongratsShow} />
        )
    }
    if (regShow) {
        console.log("REG")
        return (
            <Register setRegShow={setRegShow} setLogShow={setLogShow} setCongratsShow={setCongratsShow} />
        )
    }
    if (congratsShow) {
        console.log("Congrats")
        return (
            <Congrats setCongratsShow={setCongratsShow} setLogShow={setLogShow} setRegShow={setRegShow} />
        )

    }
}