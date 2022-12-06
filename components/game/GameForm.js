import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, getGameTypes, updateGame } from '../../utils/data/gameData';

const GameForm = ({ user, gameObj }) => {
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState({
    skill_level: null,
    number_of_players: null,
    title: '',
    maker: '',
    game_type: null,
  });
  const router = useRouter();

  useEffect(() => {
    getGameTypes().then(setGameTypes);
    if (gameObj?.id) {
      const editGame = {
        skill_level: gameObj.skill_level,
        number_of_players: gameObj.number_of_players,
        title: gameObj.title,
        maker: gameObj.maker,
        game_type: gameObj.game_type.id,
      };
      setCurrentGame(editGame);
    }
  }, [gameObj, user]);

  const handleChange = (e) => {
    // TODO: Complete the onChange function
    const { name, value } = e.target;
    setCurrentGame((prevSate) => ({
      ...prevSate,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const game = {
      maker: currentGame.maker,
      title: currentGame.title,
      number_of_players: Number(currentGame.number_of_players),
      skill_level: Number(currentGame.skill_level),
      game_type: Number(currentGame.game_type),
      user_id: user.uid,
    };
    if (gameObj.id) {
      updateGame(game, gameObj.id).then(() => router.push('/games'));
    } else {
      createGame(game).then(() => router.push('/games'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
          <Form.Label>Maker</Form.Label>
          <Form.Control name="maker" required value={currentGame.maker} onChange={handleChange} />
          <Form.Label>Number of Players</Form.Label>
          <Form.Control name="number_of_players" type="number" required value={currentGame.number_of_players} onChange={handleChange} />
          <Form.Label>Skill Level</Form.Label>
          <Form.Control name="skill_level" type="number" required value={currentGame.skill_level} onChange={handleChange} />
          <Form.Select name="gameTypeId" value={currentGame.game_type} onChange={handleChange}>
            <option value=""> Select a Game Type </option>
            {gameTypes?.map((type) => (
              <option key={type.id} value={type.id} defaultValue={type.id === currentGame.game_type}>
                {type.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  gameObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    number_of_players: PropTypes.number,
    skill_level: PropTypes.number,
    game_type: PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default GameForm;
