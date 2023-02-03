import styles from "./styles.module.scss"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function RecomendedVideo({ title, link }) {
    return (
        <div className={styles.container}>
            <Card style={{ width: '315px', height: '300px',alignItems: 'center', marginTop: '12px' }}>
                <iframe width="280" height="150"
                    src="https://www.youtube.com/embed/kYFnAnmwG5c?autoplay=1&mute=1">
                </iframe>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Button variant="primary">Play</Button>
                </Card.Body>
            </Card>
            <Card style={{ width: '315px', height: '300px', alignItems: 'center', marginTop: '12px' }}>
                <iframe width="280" height="150"
                    src="https://www.youtube.com/embed/L71D1XIXNk4?autoplay=1&mute=1">
                </iframe>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Button variant="primary">Play</Button>
                </Card.Body>
            </Card>
            <Card style={{ width: '315px', height: '300px', alignItems: 'center', marginTop: '12px' }}>
                <iframe width="280" height="150"
                    src="https://www.youtube.com/embed/dPMTD7ifzcQ?autoplay=1&mute=1">
                </iframe>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Button variant="primary">Play</Button>
                </Card.Body>
            </Card>
        </div>
    )
}