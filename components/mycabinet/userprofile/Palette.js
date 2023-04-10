import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import { Accordion, Nav, Container, Row, Col } from 'react-bootstrap'
import Link from "next/link"
import { useRouter } from "next/router"
import { signOut } from "next-auth/react"
import { useEffect, useState } from "react";


export default function Palette(props) {
    const router = useRouter();

    return (
        <h2>Palette</h2>
    )
}