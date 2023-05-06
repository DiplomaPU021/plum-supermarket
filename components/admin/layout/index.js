import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './sidebar';
import styles from './styles.module.scss';
import { showDialog, hideDialog } from '@/store/DialogSlice';
import { useEffect, useState } from "react";

export default function Layout({ children }) {
    const { expandSidebar } = useSelector((state) => ({ ...state }));
    const showSidebar = !expandSidebar.expandSidebar;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hideDialog());
    }, [])

    return (
        <div className={styles.layout}>
            <Sidebar />
            <div
                style={{ marginLeft: `${showSidebar ? '150px' : '310px'}` }}
                className={styles.layout__main}>{children}</div>
        </div>
    )
}