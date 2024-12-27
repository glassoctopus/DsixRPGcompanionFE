import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const createSpecialAbility = (specialAbility) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/specialabilities/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(specialAbility),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleSpecialAbility = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/specialabilities/${id}/`, {
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
      console.error('Error fetching single specialAbility:', error);
      reject(error);
    });
});

const getSpecialAbilities = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/specialabilities/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateSpecialAbility = (id, specialAbility) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/specialabilities/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(specialAbility),
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
      console.error('Error updating specialAbility:', error);
      reject(error);
    });
});

const deleteSpecialAbility = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/specialabilities/${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createSpecialAbility,
  getSingleSpecialAbility,
  getSpecialAbilities,
  updateSpecialAbility,
  deleteSpecialAbility,
};
