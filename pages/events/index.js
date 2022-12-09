import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import EventCard from '../../components/event/EventCard';
import { useAuth } from '../../utils/context/authContext';
import { getEvents } from '../../utils/data/eventData';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const showEvents = () => {
    getEvents(user.uid).then(setEvents);
  };
  useEffect(() => {
    showEvents();
  }, [user]);

  return (
    <article className="games">
      <h1>Events</h1>
      <Button onClick={() => { router.push('/events/new'); }}>
        Register New Event
      </Button>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="game">
          <EventCard eventObj={event} onUpdate={showEvents} />
        </section>
      ))}
    </article>
  );
}

export default Home;
