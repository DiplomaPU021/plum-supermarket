import { useState } from 'react';
import { Form } from 'react-bootstrap';
import styles from "../styles.module.scss";

const nextDay = new Date();
nextDay.setDate(new Date().getDate() + 1);
const nextDayFormatted = nextDay.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' });

const timeOptions = [
  { label: '10:00-12:00', value: '10:00-12:00' },
  { label: '12:00-14:00', value: '12:00-14:00' },
  { label: '14:00-16:00', value: '14:00-16:00' },
  { label: '16:00-18:00', value: '16:00-18:00' },
];

const CustomForm = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  return (
    <>

      <Form.Group className={styles.status}>
        {[...Array(4)].map((_, index) => {
          const nextDayValue = new Date();
          nextDayValue.setDate(new Date().getDate() + index + 2);
          const nextDayFormattedValue = nextDayValue.toLocaleDateString('uk-UA', {
            day: 'numeric',
            month: 'long',
          });
          return (
            <Form.Check
              key={`dayOption-${index}`}
              className={styles.status__radiobtn}
              type="radio"
              aria-label={`radio ${index + 1}`}
              label={nextDayFormattedValue}
              name="day"
              id={`formHorizontalRadios${index + 1}`}
              value={nextDayFormattedValue}
              onChange={handleDayChange}
            />
          );
        })}
      </Form.Group>
      <Form.Group className={styles.status}>
        {timeOptions.map((option, index) => (
          <Form.Check
            key={`timeOption-${index}`}
            className={styles.status__radiobtn}
            type="radio"
            aria-label={`radio ${index + 1}`}
            label={option.label}
            name="time"
            id={`formHorizontalRadios${index + 5}`}
            value={option.value}
            onChange={handleTimeChange}
          />
        ))}
      </Form.Group>
    </>
  );
};

export default CustomForm;
