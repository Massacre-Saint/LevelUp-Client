import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import GameCard from '../../components/game/GameCard';
import { getGames } from '../../utils/data/gameData';

function Home() {
  const [games, setGames] = useState([]);
  const router = useRouter();
  useEffect(() => {
    getGames().then((data) => setGames(data));
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
          <GameCard id={game.id} title={game.title} maker={game.maker} numberOfPlayers={game.number_of_players} skillLevel={game.skill_level} gamerId={game.gamer.id} onUpdate={getGames} />
        </section>
      ))}
    </article>
  );
}

export default Home;
