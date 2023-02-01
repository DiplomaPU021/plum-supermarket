import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.scss'
import { useSession, signIn, signOut } from "next-auth/react"
import Header from '@/components/header'
import Footer from '@/components/footer'
import ProductCard from "@/components/productCard";
import HomeCarousel from '@/components/carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import YoutubeVideo from '@/components/youtube'
import RecomendedVideo from '@/components/recomendedVideo'


const inter = Inter({ subsets: ["latin"] });

const products = [
  {
    _id: 0,
    name: "product0",
    slug: "product0",
    category: "pants",
    subProducts: [
      {
        discount: 0,
        color: {
          color: "#f15f6f",
          image: "photos/04blackhole1-articleLarge-v3.jpg",
        },
        sizes: [
          {
            size: "M",
            price: 70,
          },
          {
            size: "S",
            price: 72,
          },
          {
            size: "XS",
            price: 65,
          },
        ],
        images: [
          {
            url: "photos/HRW-0230209.jpg",
          },
          {
            url: "photos/photo_2022-03-16_18-22-51.jpg",
          },
        ],
      },
      {
        discount: 3,
        color: {
          color: "#ecd297",
          image: "photos/20221010_125826.jpg",
        },
        sizes: [
          {
            size: "M",
            price: 54,
          },
          {
            size: "S",
            price: 22,
          },
          {
            size: "XS",
            price: 11,
          },
        ],
        images: [
          {
            url: "photos/photo_2022-06-01_21-03-38.jpg",
          },
          {
            url: "photos/HRW-0230209.jpg",
          },
        ],
      },
    ],
  },
  {
    _id: 1,
    name: "product1",
    slug: "product1",
    category: "pants",
    subProducts: [
      {
        discount: 23,
        color: {
          color: "#ecd297",
          image: "photos/20221010_125826.jpg",
        },
        sizes: [
          {
            size: "M",
            price: 94,
          },
          {
            size: "S",
            price: 16,
          },
          {
            size: "XS",
            price: 62,
          },
        ],
        images: [
          {
            url: "photos/photo_2022-03-16_18-22-51.jpg",
          },
          {
            url: "photos/photo_2022-06-01_21-03-38.jpg",
          },
        ],
      },
      {
        discount: 17,
        color: {
          color: "#ecd297",
          image: "photos/04blackhole1-articleLarge-v3.jpg",
        },
        sizes: [
          {
            size: "M",
            price: 99,
          },
          {
            size: "S",
            price: 78,
          },
          {
            size: "XS",
            price: 33,
          },
        ],
        images: [
          {
            url: "photos/photo_2022-03-16_18-22-51.jpg",
          },
          {
            url: "photos/photo_2022-06-01_21-03-38.jpg",
          },
        ],
      },
    ],
  },
  {
    _id: 2,
    name: "product2",
    slug: "product2",
    category: "pants",
    subProducts: [
      {
        discount: 4,
        color: {
          color: "#ecd297",
          image: "photos/04blackhole1-articleLarge-v3.jpg",
        },
        sizes: [
          {
            size: "M",
            price: 34,
          },
          {
            size: "S",
            price: 12,
          },
          {
            size: "XS",
            price: 55,
          },
        ],
        images: [
          {
            url: "photos/photo_2022-06-01_21-03-38.jpg",
          },
          {
            url: "photos/photo_2022-03-16_18-22-51.jpg",
          },
        ],
      },
      {
        discount: 12,
        color: {
          color: "#ecd297",
          image: "photos/20221010_125826.jpg",
        },
        sizes: [
          {
            size: "M",
            price: 34,
          },
          {
            size: "S",
            price: 12,
          },
          {
            size: "XS",
            price: 55,
          },
        ],
        images: [
          {
            url: "photos/HRW-0230209.jpg",
          },
          {
            url: "photos/photo_2022-06-01_21-03-38.jpg",
          },
        ],
      },
    ],
  },
];

export default function Home() {
  const { data: session } = useSession()
  console.log(session);
  return (
    <div className={styles.container}>
      <Header />
      <HomeCarousel />
      {/* {session ? "you are logged in" : "you are not logged in"} */}
      <div className={styles.products}>
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
      <YoutubeVideo/>
      <RecomendedVideo/>
      <Footer />
    </div>
  );
}
