import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { deleteSingleGame } from '../../utils/data/gameData';

const GameCard = ({ gameObj, onUpdate }) => {
  const router = useRouter();
  const { user } = useAuth();

  const deleteGame = (gameId) => {
    if (window.confirm('Are you sure ?')) {
      deleteSingleGame(gameId).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>{gameObj.title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {gameObj.maker}</Card.Title>
        <Card.Text>{gameObj.number_of_players} players needed</Card.Text>
        {user.uid === gameObj.gamer.uid ? (
          <>
            <Button onClick={() => router.push(`/games/edit/${gameObj.id}`)}>Edit</Button>
            <Button onClick={(() => deleteGame(gameObj.id))}>Delete</Button>
          </>
        ) : ''}
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {gameObj.skill_level}</Card.Footer>
    </Card>
  );
};

GameCard.propTypes = {
  gameObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    maker: PropTypes.string.isRequired,
    number_of_players: PropTypes.number.isRequired,
    skill_level: PropTypes.number.isRequired,
    gamer: PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
