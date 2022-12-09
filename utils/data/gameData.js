import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/games`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getGame = (gameId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/games/${gameId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createGame = (game) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/games`, {
    method: 'POST',
    body: JSON.stringify(game),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => resolve(response.data))
    .catch(reject);
});

const updateGame = (data, id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/games/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const getGameTypes = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/gametypes`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteSingleGame = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/games/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});
export {
  getGames, getGame, createGame, updateGame, getGameTypes, deleteSingleGame,
};
// eslint-disable-next-line import/prefer-default-export
