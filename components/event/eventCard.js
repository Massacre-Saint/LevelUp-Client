import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

const EventCard = ({
  description,
  date,
  time,
}) => (
  <Card className="text-center">
    <Card.Body>
      <Card.Title>Time: {time}</Card.Title>
      <Card.Text>Event on: {date}</Card.Text>
    </Card.Body>
    <Card.Footer className="text-muted">About this event: {description}</Card.Footer>
  </Card>
);

EventCard.propTypes = {
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default EventCard;
