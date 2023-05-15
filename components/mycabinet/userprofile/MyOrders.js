import styles from "./styles.module.scss";
import { Container, Row, Col, Pagination, Form } from "react-bootstrap";
import LoopIcon from "@/components/icons/LoopIcon";
import { useEffect, useState } from "react";
import OrderItem from "../orderitem/OrderItem";

export default function MyOrders(props) {
  const [orders, setOrders] = useState(props.orders);

  const [showDirection, setShowDirection] = useState("desc");

  const setSortDirection = () => {
    showDirection == "desc"
      ? (setShowDirection("asc"),
        setOrders(
          orders.sort((a, b) => a.costAfterDiscount - b.costAfterDiscount)
        ))
      : (setShowDirection("desc"),
        setOrders(
          orders.sort((a, b) => b.costAfterDiscount - a.costAfterDiscount)
        ));
  };

  const sortByStatus = (status) => {
    if (status === "all") {
      setOrders(props.orders);
    } else if (status.length > 1) {
      let filteredOrders = props.orders.filter(
        (order) => order.status === status
      );
      setOrders(filteredOrders);
    }
  };

  const [searchOrder, setSearchOrder] = useState("");

  const searchOrderHandler = () => {
    if (searchOrder.length > 0) {
      setOrders(
        props.orders.filter(
          (order) => order._id.substring(0, 6) === searchOrder
        )
      );
    } else {
      setOrders(props.orders);
    }
  };

  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 3;

  function displayComponentsForActivePage() {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return orders.slice(startIndex, endIndex);
  }

  function handlePageChange(pageNumber) {
    setActivePage(pageNumber);
  }

  return (
    <Container>
      <Row className={styles.orderpagehead}>
        <Col xs className={styles.col}>
          <Form.Group className={styles.status}>
            <Form.Check
              className={styles.status__radiobtn}
              type="radio"
              aria-label="radio 1"
              label="Bсі замовлення"
              name="status"
              id="formHorizontalRadios1"
              value="all"
              onChange={(e) => sortByStatus(e.target.value)}
            />
            <Form.Check
              className={styles.status__radiobtn}
              type="radio"
              aria-label="radio 2"
              label="Виконані"
              name="status"
              id="formHorizontalRadios2"
              value="Завершено"
              onChange={(e) => sortByStatus(e.target.value)}
            />
            <Form.Check
              className={styles.status__radiobtn}
              type="radio"
              aria-label="radio 3"
              label="Очікувані"
              name="status"
              id="formHorizontalRadios3"
              value="Нове замовлення"
              onChange={(e) => sortByStatus(e.target.value)}
            />
            <Form.Check
              className={styles.status__radiobtn}
              type="radio"
              aria-label="radio 4"
              label="Скасовані"
              name="status"
              id="formHorizontalRadios4"
              value="Скасовано"
              onChange={(e) => sortByStatus(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className={styles.searchrow}>
        <div className={styles.search}>
          <div className={styles.search_field}>
            <input
              type="text"
              value={searchOrder}
              onChange={(e) => setSearchOrder(e.target.value)}
              placeholder="Пошук замовлення"
            />
            <button onClick={searchOrderHandler}>
              <LoopIcon fillColor="#FAF8FF" />
            </button>
          </div>
        </div>
        <button
          className={styles.cardextrabtn}
          onClick={() => setSortDirection()}
        >
          Сортування за суммою{" "}
          {showDirection === "desc" ? (
            <img
              width="30px"
              height="30px"
              src="../../../icons/down-btn.png"
            ></img>
          ) : (
            <img
              width="30px"
              height="30px"
              src="../../../icons/up-btn.png"
            ></img>
          )}
        </button>
      </Row>
      {orders.length > 0 ? (
        <Row className={styles.orders}>
          {displayComponentsForActivePage().map((order) => (
            <OrderItem order={order} key={order._id} />
          ))}
          <div>
            <Pagination
              className={styles.pagination}       
            >
              <Pagination.Prev
                onClick={() => setActivePage(activePage - 1)}
                disabled={activePage === 1}
                style={{ backgroundColor: "transparent !important" }}
              />
              {Array.from({
                length: Math.ceil(orders.length / itemsPerPage),
              }).map((_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === activePage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => setActivePage(activePage + 1)}
                disabled={
                  activePage === Math.ceil(orders.length / itemsPerPage)
                }
              />
            </Pagination>
          </div>
        </Row>
      ) : (
        <></>
      )}
    </Container>
  );
}
