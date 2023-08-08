import styles from "./styles.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import PaymentMethod from "./payment";
import UserData from "./userdata";
import Shipping from "./shipping";
import Summary from "./summary";
import SimpleCopyright from "./SimpleCopyright";

export default function CheckoutOrder({ cart, user, country }) {
  const [payment, setPayment] = useState({
    paymentMethod: "Оплата під час отримання товару",
    paymentMethodId: "",
  });
  const { paymentMethod } = payment;
  const [delivery, setDelivery] = useState({
    deliveryType: "Нова пошта",
    deliveryCost: "за тарифами перевізника",
    deliveryAddress: "м. Київ, відділення №1",
    deliveryId: "novaPoshta",
  });
  const [userAdresses, setUserAdresses] = useState(user?.address || []);
  const [activeAddress, setActiveAddress] = useState(
    userAdresses?.find((address) => address.active === true) || null,
  );
  const [userData, setUserData] = useState({
    firstName: activeAddress
      ? activeAddress.firstName
        ? activeAddress.firstName
        : user.firstName
        ? user.firstName
        : ""
      : "",
    lastName: activeAddress
      ? activeAddress.lastName
        ? activeAddress.lastName
        : user.lastName
        ? user.lastName
        : ""
      : "",
    phoneNumber: activeAddress
      ? activeAddress.phoneNumber
        ? activeAddress.phoneNumber
        : user.phoneNumber
        ? user.phoneNumber
        : ""
      : "",
    email: user ? user.email : "",
    errorLastName: "",
    errorFirstName: "",
    errorPhoneNumber: "",
  });

  const [orderError, setOrderError] = useState({
    userError: "",
    shippingError: "",
    paymentError: "",
  });
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(
    cart?.cartTotalPrice,
  );
  const [isPaid, setIsPaid] = useState(false);
  useEffect(() => {
    if (activeAddress) {
      setActiveAddress((prevAddress) => ({
        ...prevAddress,
        firstName: activeAddress?.firstName || "",
        lastName: activeAddress?.lastName || "",
        phoneNumber: activeAddress?.phoneNumber || "",
        address: activeAddress?.address || "",
        streetType: activeAddress?.streetType || "",
        street: activeAddress?.street || "",
        building: activeAddress?.building || "",
        flat: activeAddress?.flat || "",
        ground: activeAddress?.ground || "",
        elevator: activeAddress?.elevator || "",
        region: activeAddress?.region || "",
        city: activeAddress?.city || "",
        cityType: activeAddress?.cityType || "",
        zipCode: activeAddress?.zipCode || "",
        country: activeAddress?.country || "",
        active: true,
      }));
    }
  }, []);

  useEffect(() => {
    setActiveAddress((prevState) => ({
      ...prevState,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      phoneNumber: userData?.phoneNumber,
    }));
  }, [userData]);

  return (
    <div>
      <Container fluid className={styles.container}>
        <Row className={styles.row}>
          <div className={styles.leftsale}>Оформлення замовлення</div>
        </Row>
        <Row className={styles.general_div}>
          <Col className={styles.colcard}>
            <div className={styles.checkout_form}>
              <UserData
                userData={userData}
                setUserData={setUserData}
                setOrderError={setOrderError}
              />
              <Shipping
                user={user}
                userData={userData}
                activeAddress={activeAddress}
                setActiveAddress={setActiveAddress}
                country={country}
                delivery={delivery}
                setDelivery={setDelivery}
                setOrderError={setOrderError}
              />
              <PaymentMethod
                paymentMethod={paymentMethod}
                setPayment={setPayment}
                totalAfterDiscount={totalAfterDiscount}
                setIsPaid={setIsPaid}
                user={user}
                setOrderError={setOrderError}
              />
            </div>
          </Col>
          <Col className={styles.summary_form} xs lg="4">
            <Summary
              cart={cart}
              userData={userData}
              totalAfterDiscount={totalAfterDiscount}
              setTotalAfterDiscount={setTotalAfterDiscount}
              paymentMethod={paymentMethod}
              activeAddress={activeAddress}
              setActiveAddress={setActiveAddress}
              delivery={delivery}
              setDelivery={setDelivery}
              isPaid={isPaid}
              orderError={orderError}
              setOrderError={setOrderError}
            />
          </Col>
        </Row>
      </Container>
      <SimpleCopyright />
    </div>
  );
}
