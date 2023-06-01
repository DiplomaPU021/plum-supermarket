import styles from "./styles.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import DeleteIcon from "../icons/DeleteIcon";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { removeFromScaleList } from "../../store/scaleListSlice";

export default function ComparisonListModal({ show, onHide }) {
  const scaleList = useSelector((state) => state.scaleList);

  const dispatch = useDispatch();
  const deleteGroupHadler = (subCategory) => {
    dispatch(removeFromScaleList({ ...subCategory }));
  };

  return (
    <Modal
      className={styles.modal}
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <div className={styles.modal__main}>
        <div className={styles.modal__main_card}>
          <Modal.Header closeButton className={styles.header}>
            <Modal.Title>Список порівнянь</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: "0" }}>
            <table>
              <tbody>
                {scaleList.scaleListItems.map((subCategory, i) => (
                  <tr key={i}>
                    <td>
                      <Link
                        onClick={() => onHide()}
                        style={{ textDecoration: "none" }}
                        href={`/comparison/${subCategory.subCategory_slug}`}
                      >
                        <span>{subCategory.subCategoryName}</span>
                      </Link>
                    </td>
                    <td>{subCategory.items.length}</td>
                    <td>
                      <button onClick={() => deleteGroupHadler(subCategory)}>
                        <DeleteIcon fillColor="#220F4B" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Modal.Body>
        </div>
      </div>
    </Modal>
  );
}
