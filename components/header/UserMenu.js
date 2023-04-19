// import styles from "./styles.module.scss"
// import Link from "next/link"
// import { signOut, signIn } from "next-auth/react";

// export default function UserMenu({ session }) {
//     return (
//         <div className={styles.menu}>
//             <h4>Welcome to Plum!</h4>
//             {session ? (
//                 <div className={styles.flex}>
//                     {session.user.image ?
//                         (<img src={session.user.image}
//                             alt="profile image"
//                             className={styles.menu_image} />)
//                         : (<img src="https://res.cloudinary.com/dzctqbi3o/image/upload/v1676906580/Diploma/user/profile_nkfuxi.gif"
//                             alt="profile image"
//                             className={styles.menu_image} />)
//                     }
//                     <div className={styles.col}>
//                         <span>Welcome back,</span>
//                         <h3>{session.user.name}</h3>
//                         <span onClick={() => signOut()}>Sign out</span>
//                     </div>
//                 </div>) : (
//                 <div className={styles.flexmenu}>
//                     <button className={styles.btn_plum}
//                         onClick={() => signIn()}
//                     >Register</button>
//                     <button className={styles.btn_plum}
//                         onClick={() => signIn()}>Login</button>
//                 </div>
//             )}
//             <ul>
//                 <li>
//                     <Link href="/profile">Account</Link>
//                 </li>
//                 <li>
//                     <Link href="/profile/orders">My Orders</Link>
//                 </li>
//                 <li>
//                     <Link href="/profile/messages">Message Center</Link>
//                 </li>
//                 <li>
//                     <Link href="/profile/address">Address</Link>
//                 </li>
//                 <li>
//                     <Link href="/profile/wishlist">Wishlist</Link>
//                 </li>
//             </ul>
//         </div>
//     )
// }