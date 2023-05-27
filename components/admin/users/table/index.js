import { RiDeleteBin7Fill } from 'react-icons/ri';
import styles from './styles.module.scss';
import { toast } from "react-toastify";
import axios from "axios";
import Image from 'next/image';


export default function UsersTable({ users, setUsers }) {

    const deleteHandler = async (id) => {
        try {
            const { data } = await axios.delete('/api/admin/user', { data: { id }, })
            toast.success(data.message);
            setUsers(data.users)
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className={styles.users_table}>
            <div className={styles.header}>Клієнти</div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Фото</th>
                        <th>Ім&apos;я</th>
                        <th>Прізвище</th>
                        <th>Телефон</th>
                        <th>Email</th>
                        <th>Дата народження</th>
                        <th>Стать</th>
                        <th>Роль</th>
                        <th>Адреса</th>
                        <th>Видалити</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, i) => (
                        <tr key={i}>
                            <td>{i}</td>
                            <td>{user.image !== 'profile.gif' ? (<Image width={40} height={40} src={user.image} alt="photo" />) : (<Image width={40} height={40} src="/profile/account2.png" alt="pic" />)}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.email}</td>
                            <td>{user.birthday}</td>
                            <td>{user.gender}</td>
                            <td>{user.role}</td>
                            <td>{user.address?.address}</td>
                            <td><button onClick={() => { deleteHandler(user._id) }}><RiDeleteBin7Fill /></button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    );
}

