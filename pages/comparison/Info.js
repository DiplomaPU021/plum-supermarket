import styles from "../../styles/comparison.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Image } from "react-bootstrap";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function Info({showTooltip, setShowTooltip, tooltipData}) {
  return (
    <Tooltip
    id="info-tooltip"
    place="right"
    offset={20}
    className={styles.tooltip}
    noArrow={true}
    clickable={true}
    isOpen={showTooltip}
  >
    <Card className={styles.tooltip__card}>
      <Card.Body className={styles.tooltip__card_body}>
        <Card.Title className={styles.header}>
          {tooltipData && tooltipData.title ? tooltipData.title : ""}
          <button
            onClick={() => {
              setShowTooltip(false);
            }}
          >
            <Image src="../../icons/close_btn.png" alt="" />
          </button>
        </Card.Title>
        <Card.Text className={styles.text} scrollable="true">
          {tooltipData && tooltipData.info ? tooltipData.info : ""}
        </Card.Text>
      </Card.Body>
    </Card>
  </Tooltip>
  );
}
