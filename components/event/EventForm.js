import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getGames } from '../../utils/data/gameData';
import { createEvent, updateEvent } from '../../utils/data/eventData';

const EventForm = ({ user, eventObj }) => {
  const router = useRouter();
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({
    game: 0,
    description: '',
    date: '',
    time: '',
  });

  useEffect(() => {
    getGames().then(setGames);
    if (eventObj?.id) {
      const editEvent = {
        game: eventObj.game.id,
        time: eventObj.time,
        date: eventObj.date,
        description: eventObj.description,
      };
      setCurrentEvent(editEvent);
    }
  }, [eventObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const event = {
      game: Number(currentEvent.game),
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      organizer: user.uid,
    };
    if (eventObj.id) {
      updateEvent(event, eventObj.id).then(() => router.push('/events'));
    } else {
      createEvent(event).then(() => router.push('/events'));
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Desc</Form.Label>
          <Form.Control name="description" value={currentEvent.description} onChange={handleChange} />
          <Form.Label>Date</Form.Label>
          <Form.Control name="date" value={currentEvent.date} onChange={handleChange} />
          <Form.Label>Time</Form.Label>
          <Form.Control name="time" value={currentEvent.time} onChange={handleChange} />
          <Form.Label>Game</Form.Label>
          <Form.Select name="game" onChange={handleChange} value={currentEvent.game} required>
            <option value="">Select a Game Type</option>
            {games?.map((game) => (
              <option key={game.id} value={game.id} label={game.title} />
            ))};
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  eventObj: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    game: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
    organizer: PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,
    }),
  }).isRequired,
};
export default EventForm;
