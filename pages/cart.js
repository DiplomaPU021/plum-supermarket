import { useSession } from "next-auth/react"
import Header from '@/components/header'
import Footer from '@/components/footer'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    const { data: session } = useSession()
    console.log(session);
    return (
      <div>
        <Header />
        {/* {session ? "you are logged in" : "you are not logged in"} */}
        <div>
        cart
        </div>
        <Footer />
      </div>
    );
  }