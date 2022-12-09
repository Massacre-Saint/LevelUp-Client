import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { deleteSingleEvent } from '../../utils/data/eventData';

const EventCard = ({ eventObj, onUpdate }) => {
  const { user } = useAuth();
  const router = useRouter();

  const deleteEvent = (eventId) => {
    if (window.confirm('Are you sure ?')) {
      deleteSingleEvent(eventId).then(() => onUpdate());
    }
  };
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
          <>
            <Button onClick={() => router.push(`/events/edit/${eventObj.id}`)}>Edit</Button>
            <Button onClick={(() => deleteEvent(eventObj.id))} />
          </>
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
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
