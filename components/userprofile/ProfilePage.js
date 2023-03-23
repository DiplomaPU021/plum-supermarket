// import styles from "./styles.module.scss"
// import Modal from 'react-bootstrap/Modal'
// import Image from 'react-bootstrap/Image'
// import Link from "next/link"
// import { useRouter } from "next/router"
// import { signOut } from "next-auth/react"


// export default function ProfilePage(props) {
//     const router = useRouter();
    
//     const signOutHandler=()=>{
//         signOut({redirect: false, callbackUrl: "/"});
    
//     }
   
//     return (
//         <Modal.Body className={styles.modalbodyempty}>
//             <h2>Ваші персональні дані</h2>
//             <h5>Особисті дані</h5>
//             {/* <Link href={signOut()}>Вийти</Link> */}
//             <a>
//             <span onClick={signOutHandler}>Вийти</span>
//             </a>
//         </Modal.Body>

//     )
// }