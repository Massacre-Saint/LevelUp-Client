import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';

const EventCard = ({ eventObj }) => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Time: {eventObj.time}</Card.Title>
        <Card.Text>Event on: {eventObj.date}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">About this event: {eventObj.description}</Card.Footer>
      {
      user.uid === eventObj.organizer.uid
        ? (
          <Button onClick={() => router.push(`/events/edit/${eventObj.id}`)}>Edit</Button>
        )
        : (
          ''
        )
      }
    </Card>
  );
};

EventCard.propTypes = {
  eventObj: PropTypes.shape({
    id: PropTypes.number,
    game: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      maker: PropTypes.string,
      gamer: PropTypes.number,
      number_of_player: PropTypes.number,
      skill_level: PropTypes.number,
    }).isRequired,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    organizer: PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,
      bio: PropTypes.string,
    }),
  }).isRequired,
};

export default EventCard;
