import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const createAbility = (ability) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/abilities/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ability),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleAbility = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/abilities/${id}/`, {
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
      console.error('Error fetching single Ability:', error);
      reject(error);
    });
});

const getAbilities = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/abilities/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateAbility = (id, ability) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/abilities/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ability),
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
      console.error('Error updating Ability:', error);
      reject(error);
    });
});

const deleteAbility = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/abilities/${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createAbility,
  getSingleAbility,
  getAbilities,
  updateAbility,
  deleteAbility,
};
