import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const createArchetype = (archetype) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/archetypes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(archetype),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleArchetype = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/archetypes/${id}`, {
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
      console.error('Error fetching single archetype:', error);
      reject(error);
    });
});

const getArchetypes = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/archetypes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateArchetype = (id, archetype) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/archetypes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(archetype),
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
      console.error('Error updating archetype:', error);
      reject(error);
    });
});

const deleteArchetype = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/archetypes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createArchetype,
  getSingleArchetype,
  getArchetypes,
  updateArchetype,
  deleteArchetype,
};
