import { useSession } from "next-auth/react"
import Header from '@/components/header'
import Footer from '@/components/footer'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function cart() {
    const cart = [];
    const { data: session } = useSession()
    console.log(session);
    return (
        <div>
            <Header />
            {cart.length > 1 ? (
                <div>Cart is not empty</div>
            ) : (<div>Cart is empty</div>)
            }
            {session ? "you are logged in" : "you are not logged in"}

            <Footer />
        </div>
    );
}