import Button from 'react-bootstrap/Button';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import styles from "./styles.module.scss";


export default function FloatingButton  (){
    const [showButton, setShowButton] = useState(false);
  
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    const handleClick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  
    return (
      <Button
        variant="primary"
        className={styles.floating_button}
        onClick={handleClick}
        style={{ display: showButton ? 'flex' : 'none' }}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </Button>
    );
  };
  