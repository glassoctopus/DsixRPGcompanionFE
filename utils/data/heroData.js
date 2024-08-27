import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const createHero = (hero) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/heros`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hero),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleHero = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/heros/${id}`, {
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
      console.error('Error fetching single Hero:', error);
      reject(error);
    });
});

const getHeros = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/heros`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateHero = (id, hero) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/heros/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hero),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    //   return response.json();
    })
    .then((data) => {
      console.log('Update Hero Response:', data); // Log the response data
      resolve(data);
    })
    .catch((error) => {
      console.error('Error updating Hero:', error);
      reject(error);
    });
});

const isForceSensitive = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/heros/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ force_sensitive: true }),
  })
    .then((response) => {
      if (response.ok) {
        resolve();
      } else {
        reject(new Error(`Error: ${response.statusText}`));
      }
    })
    .catch((error) => reject(new Error(error)));
});

const isNotForceSensitive = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/heros/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ force_sensitive: false }),
  })
    .then((response) => {
      if (response.ok) {
        resolve();
      } else {
        reject(new Error(`Error: ${response.statusText}`));
      }
    })
    .catch((error) => reject(new Error(error)));
});

const deleteHero = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/heros/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createHero,
  getSingleHero,
  getHeros,
  updateHero,
  isForceSensitive,
  isNotForceSensitive,
  deleteHero,
};
