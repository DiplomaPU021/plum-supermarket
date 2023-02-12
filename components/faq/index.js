import styles from "./styles.module.scss"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function FAQ() {
    return (
        <div>
            <div className={styles.topfaq}>
                <div className={styles.circle}>
                    <h1>?</h1>
                </div>
                <div className={styles.textcenter}>
                    <h5>Any questions?</h5>
                    <h4>USE THE HELP CENTER</h4>
                </div>
            </div>
            <div className={styles.container}>
                <Card className={styles.cartst}>
                    <Card.Body className={styles.cardbody}>
                        <Button className={styles.cartbtn}>Payment</Button>
                        <p>This section contains the necessary information about available payment methods and how to use them</p>
                    </Card.Body>
                </Card>
                <Card className={styles.cartst}>
                    <Card.Body className={styles.cardbody}>
                        <Button className={styles.cartbtn}>Delivery</Button>
                        <p>Information on terms and methods of delivery, terms of receipt and storage, can be found here</p>
                    </Card.Body>
                </Card>
                <Card className={styles.cartst}>
                    <Card.Body className={styles.cardbody}>
                        <Button className={styles.cartbtn}>Order</Button>
                        <p>Information on how to check the status of the order, cancel it, or change the reservation period</p>

                    </Card.Body>
                </Card>
                <Card className={styles.cartst}>
                    <Card.Body className={styles.cardbody}>
                        <Button className={styles.cartbtn}>Guarantee</Button>
                        <p>Need help with an item you've already purchased? Useful information here</p>
                    </Card.Body>
                </Card>
            </div>
            <div className={styles.topfaq}>
                <div className={styles.textcenter}>
                    <h4>More answers here</h4>
                </div>
                <Button className={styles.helpbtn}>HELP CENTER PLUM</Button>
            </div>
        </div>

    )
}