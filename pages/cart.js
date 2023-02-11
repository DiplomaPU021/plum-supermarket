import { useSession, signIn } from "next-auth/react"
import Header from '@/components/header'
import Footer from '@/components/footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateCart } from "@/store/cartSlice"
import Checkout from '@/components/cart/checkout'
import PaymantMethods from "@/components/cart/paymantMethods"
import ProductSwiper from "@/components/ProductSwiper";
import Router from "next/router";
import { saveCart } from "@/requests/user";

export default function cart() {
    const Router = useRouter();

    const { data: session } = useSession()
    const [selected, setSelected] = useState([])
    const { cart } = userSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const [shippingFee, setShippingFee] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    useEffect(() => {

        ///TODO
    }, [selected]);

    console.log(selected);
    const saveCartToDbHandler = async () => {
        if (session) {
            const res = saveCart(selected, session.user.id);

            Router.push('/checkout');
        } else {
            signIn();
        }
    }
    return (
        <div>
            <Header />
            {cart.length > 1 ? (
                <div>Cart is not empty</div>
            ) : (<div>Cart is empty</div>)
            }
            {session ? "you are logged in" : "you are not logged in"}
            <div>
                <Checkout
                    subtotal={subtotal}
                    shippingFee={shippingFee}
                    total={total}
                    selected={selected}
                    saveCartToDbHandler={saveCartToDbHandler}
                />
            </div>
            <Footer />
        </div>
    );
}