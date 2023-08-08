import styles from "./styles.module.scss";
import Modal from "react-bootstrap/Modal";
import { Nav, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Profile from "./Profile";
import MyOrders from "./MyOrders";
import Bonus from "./Bonus";
import Forum from "./Forum";
import Email from "./Email";
import Palette from "./Palette";

export default function ProfilePage(props) {
  const [activeKey, setActiveKey] = useState("orders");
  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
  };

  const profilePages = () => {
    switch (activeKey) {
      case "profile":
        return <Profile user={props.user} />;
      case "orders":
        return <MyOrders orders={props.orders} />;
      case "bonus":
        return <Bonus />;
      case "forum":
        return <Forum />;
      case "email":
        return <Email />;
      case "palette":
        return <Palette />;
      default:
        return <MyOrders orders={props.orders} />;
    }
  };

  return (
    <Modal.Body className={styles.modaldiv}>
      <Container className={styles.container}>
        <Row className={styles.profilerow}>
          <Col className={styles.navselector}>
            <Nav
              activeKey={activeKey}
              onSelect={handleSelect}
              className="flex-column"
            >
              <Nav.Item>
                <Nav.Link
                  eventKey="profile"
                  className={
                    activeKey == "profile"
                      ? styles.navlink_active
                      : styles.navlink
                  }
                >
                  <img
                    width="30px"
                    height="30px"
                    src={
                      activeKey != "profile"
                        ? "../../../profile/account.png"
                        : "../../../profile/account2.png"
                    }
                  />
                  <span>Профіль</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="orders"
                  className={
                    activeKey == "orders"
                      ? styles.navlink_active
                      : styles.navlink
                  }
                >
                  <img
                    width="30px"
                    height="30px"
                    src={
                      activeKey != "orders"
                        ? "../../../profile/listbox.png"
                        : "../../../profile/listbox2.png"
                    }
                  />
                  <span>Мої замовлення</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="bonus"
                  className={
                    activeKey == "bonus"
                      ? styles.navlink_active
                      : styles.navlink
                  }
                >
                  <img
                    width="30px"
                    height="30px"
                    src={
                      activeKey != "bonus"
                        ? "../../../profile/star.png"
                        : "../../../profile/star2.png"
                    }
                  />
                  <span>Бонуси</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="forum"
                  className={
                    activeKey == "forum"
                      ? styles.navlink_active
                      : styles.navlink
                  }
                >
                  <img
                    width="30px"
                    height="30px"
                    src={
                      activeKey != "forum"
                        ? "../../../profile/forum.png"
                        : "../../../profile/forum2.png"
                    }
                  />
                  <span>Відгуки</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="email"
                  className={
                    activeKey == "email"
                      ? styles.navlink_active
                      : styles.navlink
                  }
                >
                  <img
                    width="30px"
                    height="30px"
                    src={
                      activeKey != "email"
                        ? "../../../profile/email.png"
                        : "../../../profile/email2.png"
                    }
                  />
                  <span>Листування</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="palette"
                  className={
                    activeKey == "palette"
                      ? styles.navlink_active
                      : styles.navlink
                  }
                >
                  <img
                    width="30px"
                    height="30px"
                    src={
                      activeKey != "palette"
                        ? "../../../profile/palette.png"
                        : "../../../profile/palette2.png"
                    }
                  />
                  <span>Участь в акціях</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Row className={styles.logout}>
              <a>
                <img
                  width="30px"
                  height="30px"
                  src="../../../profile/setting.png"
                ></img>
              </a>
              <a>
                <span onClick={props.signOutHandler}>Вийти</span>
                <img
                  width="30px"
                  height="30px"
                  src="../../../profile/exit.png"
                ></img>
              </a>
            </Row>
          </Col>
          <Col>{profilePages()}</Col>
        </Row>
      </Container>
    </Modal.Body>
  );
}
