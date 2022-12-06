import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import EventForm from '../../../components/event/EventForm';
import { useAuth } from '../../../utils/context/authContext';
import { getEvent } from '../../../utils/data/eventData';

const EditEvent = () => {
  const [editItem, setEditItem] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getEvent(id).then(setEditItem);
  }, [user, id]);
  return (
    <>
      <h2>
        Edit Event
      </h2>
      <EventForm user={user} eventObj={editItem} />
    </>
  );
};
export default EditEvent;
