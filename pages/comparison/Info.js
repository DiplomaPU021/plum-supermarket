import styles from "../../styles/comparison.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import Overlay from "react-bootstrap/Overlay";

export default function Info({ target, show, setShow, tooltipData}) {
  return (
    <Overlay
      target={target}
      container={target}
      show={show}
      placement="right"
    > 
      <Card  id="popover-contained"
        style={{
          zIndex: 2,
        }}
        className={styles.modal__main}
      >
        <Card.Body className={styles.modal__main_card}>
          <Card.Title className={styles.header}>
          {tooltipData && tooltipData.title ? tooltipData.title : ""}
            <button
              onClick={() => {
                setShow(false);
              }}
            >
              <img src="../../icons/close_btn.png" alt="" />
            </button>
          </Card.Title>
          <Card.Text className={styles.body} scrollable="true">
          {tooltipData && tooltipData.info ? tooltipData.info : ""}
          </Card.Text>
        </Card.Body>
      </Card>
    </Overlay>
  );
}
