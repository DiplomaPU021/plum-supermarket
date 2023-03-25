import styles from "../styles.module.scss"
import { Form, Row } from "react-bootstrap"
import { paymentMethods } from "@/data/paymentMethods"


export default function PaymentMethod({ paymentMethod, setPayment }) {

    const handleChangePayment = e => {
        setPayment(prevState => ({
            ...prevState,
            paymentMethod: e.target.value,
            paymentMethodId: e.target.id
        }));
    };
    return (
        <>
            <Row className={styles.row}>
                <div className={styles.panel}> <div className={styles.count}>3</div>Оплата</div>
            </Row>
            <Row className={styles.payment}>
                <Form.Group>
                    {paymentMethods.map((pm) => (
                        <Form.Check
                            key={pm.id}
                            type="radio"
                            className={styles.radio}
                            aria-label="radio 1">
                            <Form.Check.Input
                                type="radio"
                                name="payment"
                                value={pm.name}
                                id={pm.id}
                                onChange={handleChangePayment}
                                checked={paymentMethod === `${pm.name}`} />
                            <Form.Check.Label htmlFor={pm.id}>{pm.name}</Form.Check.Label>
                        </Form.Check>
                    ))}
                </Form.Group>
            </Row>
        </>
    )
}