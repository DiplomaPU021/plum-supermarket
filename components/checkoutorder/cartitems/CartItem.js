import styles from "../styles.module.scss"
import Card from 'react-bootstrap/Card'

export default function CartItem({ product }) {
    return (
        <div >
            <Card className={styles.card}>
                <Card.Body className={styles.cardbody}>
                    <div className={styles.picture}><img src={product.image} width='74px' height='45px' style={{ objectFit: "contain" }}></img></div>
                    <div className={styles.cardtext}>
                        <h5>                {(product.name + " " + (product.color ? product.color.color : ""
                        ) + " " + product.size).length > 55
                            ? `${product.name.substring(0, 55)}...`
                            : product.name + " " + (product.color ? product.color.color : "") + " " + product.size}</h5>
                    </div>
                    <div className={styles.cardcontrols}>
                        <p>{product.priceAfter.toLocaleString("uk-UA")} ₴</p>
                        <span>{product.qty} шт.</span>
                    </div>
                </Card.Body>
            </Card>
            <div className={styles.cardtext_line}></div>
        </div>
    )
}