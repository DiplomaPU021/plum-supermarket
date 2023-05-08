import React from 'react';
import styles from './styles.module.scss';
import Modal from 'react-bootstrap/Modal';
import OrderItem from '@/components/mycabinet/orderitem/OrderItem';

export default function OrderDetails({ order, orderId, open, setOpen }) {

  const handleClose = () => setOpen(false);

  return (
    <Modal
      show={open}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className={styles.modal}
      onHide={handleClose}
      centered>
      <div className={styles.modal_main}>
        <Modal.Header closeButton>
          <Modal.Title>Деталі замовлення</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalbody}> <OrderItem order={order} key={orderId} adminActive={open} /></Modal.Body>
      </div>
    </Modal>

  );
}

