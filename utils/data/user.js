import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const updateThisUser = (id, User) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(User),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    })
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      console.error('Error updating User:', error);
      reject(error);
    });
});

const updateGameMasterStatus = (id, isGameMaster) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ game_master: isGameMaster }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      console.error('Error updating User:', error);
      reject(error);
    });
});

const getSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => {
      console.error('Error fetching single User:', error);
      reject(error);
    });
});

const getUsers = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  updateThisUser,
  getSingleUser,
  getUsers,
  updateGameMasterStatus,
};
