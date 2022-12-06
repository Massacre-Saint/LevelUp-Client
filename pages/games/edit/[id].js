import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GameForm from '../../../components/game/GameForm';
import { useAuth } from '../../../utils/context/authContext';
import { getGame } from '../../../utils/data/gameData';

const EditGame = () => {
  const [editItem, setEditItem] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    getGame(id).then(setEditItem);
  }, [user, id]);
  return (
    <>
      <h2>
        Edit Game
      </h2>
      <GameForm user={user} gameObj={editItem} />
    </>
  );
};
export default EditGame;
