import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../../../../store/ExpandSlice';
import styles from './styles.module.scss';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdArrowForwardIos, MdSpaceDashboard } from 'react-icons/md'
import { FcSalesPerformance } from 'react-icons/fc'
import { IoListCircleSharp, IoNotificationsSharp } from 'react-icons/io5';
import { ImUsers } from 'react-icons/im';
import { AiFillMessage } from 'react-icons/ai';
import { FaThList } from 'react-icons/fa';
import { BsPatchPlus } from 'react-icons/bs';
import { MdOutlineCategory } from 'react-icons/md';
import { RiCoupon3Fill, RiLogoutCircleFill, RiSettingsLine } from 'react-icons/ri';
import { useState } from 'react';

export default function Sidebar() {
    const router = useRouter();
    const route = router.pathname.split("/admin/dashboard/")[1];
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const { expandSidebar } = useSelector((state) => ({ ...state }));
    const [logoW, setLogoW] = useState("150px")
    const expand = expandSidebar.expandSidebar;
    const handleExpand = () => {
        dispatch(toggleSidebar());
    };
    return (
        <div className={`${styles.sidebar} ${expand ? styles.opened : ""}`}>
            <div className={styles.sidebar__toggle} onClick={() => handleExpand()}>
                <div
                    style={{
                        transform: `${expand ? 'rotate(180deg)' : ''}`,
                        transition: 'all .2s',
                    }}
                >
                    <MdArrowForwardIos />
                </div>
            </div>
            <div className={styles.sidebar__container}>
                <Link href="/">
                    <div className={styles.sidebar__header}>
                        <img src="../../../../logo/logo_light.png" alt="" height="50px" />
                    </div>
                </Link>
                <div className={styles.sidebar__user}>
                    <img src="../../../profile/account2.png" alt="" />
                    <div className={styles.show}>
                        <span>Вітаємо </span>
                        <span>{session?.user?.name}</span>
                    </div>
                </div>
                <ul className={styles.sidebar__list}>
                    <li className={route == undefined ? styles.active : ""}>
                        <Link href="/admin/dashboard">
                            <MdSpaceDashboard />
                            <span className={styles.show}>Головна панель</span>
                        </Link>
                    </li>
                    <li className={route == "sales" ? styles.active : ""}>
                        <Link href="/admin/dashboard/sales">
                            <FcSalesPerformance />
                            <span className={styles.show}>Продажі</span>
                        </Link>
                    </li>
                    <li className={route == "orders" ? styles.active : ""}>
                        <Link href="/admin/dashboard/orders">
                            <IoListCircleSharp />
                            <span className={styles.show}>Замовлення</span>
                        </Link>
                    </li>
                    <li className={route == "users" ? styles.active : ""}>
                        <Link href="/admin/dashboard/users">
                            <ImUsers />
                            <span className={styles.show}>Клієнти</span>
                        </Link>
                    </li>
                </ul>
                <div className={styles.sidebar__dropdown}>
                    <div className={styles.sidebar__dropdown_header}>
                        <div className={styles.show}>Продукт</div>
                    </div>
                    <ul className={styles.sidebar__list}>
                        <li className={route == "product/all" ? styles.active : ""}>
                            <Link href="/admin/dashboard/product/all">
                                <FaThList />
                                <span className={styles.show}>Всі продукти</span>
                            </Link>
                        </li>
                        <li className={route == "product/create" ? styles.active : ""}>
                            <Link href="/admin/dashboard/product/create">
                                <BsPatchPlus />
                                <span className={styles.show}>Створити продукт</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.sidebar__dropdown}>
                    <div className={styles.sidebar__dropdown_header}>
                        <div className={styles.show}>Категорії / підкатегорії</div>
                    </div>
                    <ul className={styles.sidebar__list}>
                        <li className={route == "categories" ? styles.active : ""}>
                            <Link href="/admin/dashboard/categories">
                                <MdOutlineCategory />
                                <span className={styles.show}>Категорії</span>
                            </Link>
                        </li>
                        <li className={route == "groupSubCategories" ? styles.active : ""}>
                            <Link href="/admin/dashboard/groupSubCategories">
                                <div style={{ transform: "rotate(90deg)" }}>
                                    <MdOutlineCategory />
                                </div>
                                <span className={styles.show}>Групи Підкатегорії</span>
                            </Link>
                        </li>
                        <li className={route == "subCategories" ? styles.active : ""}>
                            <Link href="/admin/dashboard/subCategories">
                                <div style={{ transform: "rotate(180deg)" }}>
                                    <MdOutlineCategory />
                                </div>
                                <span className={styles.show}>Підкатегорії</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.sidebar__dropdown}>
                    <div className={styles.sidebar__dropdown_header}>
                        <div className={styles.show}>Купони</div>
                    </div>
                    <ul className={styles.sidebar__list}>
                        <li className={route == "coupons" ? styles.active : ""}>
                            <Link href="/admin/dashboard/coupons">
                                <RiCoupon3Fill />
                                <span className={styles.show}>Купони</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <nav>
                    <ul className={`${styles.sidebar__list} ${expand ? styles.nav_flex : ""}`}>
                        <li>
                            <Link href="">
                                <RiSettingsLine />
                            </Link>
                        </li>
                        <li>
                            <Link href="">
                                <IoNotificationsSharp />
                            </Link>
                        </li>
                        <li>
                            <Link href="">
                                <AiFillMessage />
                            </Link>
                        </li>
                        <li>
                            <Link href="">
                                <RiLogoutCircleFill />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}