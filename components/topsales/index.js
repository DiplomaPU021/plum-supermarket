import styles from "./styles.module.scss"
import Container from 'react-bootstrap/Container'
import Products from "../../components/popular/Products"
import ButtonsTab from "../../components/topsales/ButtonsTab"

export default function TopSales({ products, pageSize, setPageSize }) {
    return (
        <Container fluid className={styles.cont}>
            <ButtonsTab />
            <Products products={products} pageSize={pageSize} setPageSize={setPageSize} />
        </Container>
    )
}