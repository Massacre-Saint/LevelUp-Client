import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import GameCard from '../../components/game/GameCard';
import { getGames } from '../../utils/data/gameData';

function Home() {
  const [games, setGames] = useState([]);
  const router = useRouter();
  const showGames = () => {
    getGames().then((data) => setGames(data));
  };
  useEffect(() => {
    showGames();
  }, []);
  console.warn(games);
  return (
    <article className="games">
      <h1>Games
      </h1>
      <Button
        onClick={() => {
          router.push('/games/new');
        }}
      >
        Register New Game
      </Button>
      {games.map((game) => (
        <section key={`game--${game.id}`} className="game">
          <GameCard gameObj={game} onUpdate={showGames} />
        </section>
      ))}
    </article>
  );
}

export default Home;
