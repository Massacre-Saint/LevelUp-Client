import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getEvents = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/events`, {
    method: 'GET',
    headers: {
      Authorization: uid,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getEvent = (eventId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/events/${eventId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});
const createEvent = (event) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/events`, {
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => resolve(response.data))
    .catch(reject);
});
const updateEvent = (data, id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/events/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteSingleEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/events/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});
export {
  getEvents, getEvent, createEvent, updateEvent, deleteSingleEvent,
};
