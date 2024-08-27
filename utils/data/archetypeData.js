import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const createArchtype = (archtype) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/archetypes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(archtype),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleArchtype = (id) => new Promise((resolve, reject) => {
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
      console.error('Error fetching single archtype:', error);
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

const updateArchtype = (id, archtype) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/archetypes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(archtype),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    //   return response.json();
    })
    .then((data) => {
      console.log('Update archtype Response:', data); // Log the response data
      resolve(data);
    })
    .catch((error) => {
      console.error('Error updating archtype:', error);
      reject(error);
    });
});

const deleteArchtype = (id) => new Promise((resolve, reject) => {
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
  createArchtype,
  getSingleArchtype,
  getArchetypes,
  updateArchtype,
  deleteArchtype,
};
