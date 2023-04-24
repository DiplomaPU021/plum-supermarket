// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import styles from "./styles.module.scss";
// import { useState } from "react";
// const CARD_OPTIONS = {
//     iconStyle:"solid",
//     style: {
//         base:{
//             iconColor:"#000",
//             colorl:"#000",
//             fontSize:"22px",
//             fontSmoothing:"antialiased",
//             "-webkit-autofill":{color:"#000"},
//         },
//         layout: {
//             type: 'tabs',
//             defaultCollapsed: false
//           }
//     }
// };

// export default function Form() {
//     const [error, setError] = useState("");
//     const stripe = useStripe();
//     const elements = useElements();
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setError("");
//     }
//     return (
//         <div className={styles.stripe}>
//             <form onSubmit={handleSubmit}>
//                 <CardElement options={CARD_OPTIONS} />
//                 <button type="submit" className={styles.small_sbm}>Оплатити</button>
//                 {error && <span className={styles}>{error}</span>}
//             </form>
//         </div>
//     )
// }
