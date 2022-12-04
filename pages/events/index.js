import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import EventCard from '../../components/event/eventCard';
import { getEvents } from '../../utils/data/eventData';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  return (
    <article className="games">
      <h1>Events</h1>
      <Button onClick={() => { router.push('/events/new'); }}>
        Register New Event
      </Button>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="game">
          <EventCard description={event.description} date={event.date} time={event.time} />
        </section>
      ))}
    </article>
  );
}

export default Home;
