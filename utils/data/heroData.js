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
    .then((data) => {
      // Assuming the response is in the format: { "They are": [/* array of heroes */] }
      if (data && Array.isArray(data['They are'])) {
        resolve(data['They are']); // Resolve with the array under "They are"
      } else {
        reject(new Error('Invalid response format'));
      }
    })
    .catch(reject);
});

const updateHero = (hero, id) => new Promise((resolve, reject) => {
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
    })
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      console.error('Error updating Hero:', error);
      reject(error);
    });
});

const createHeroSkills = (skills) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/heros/add-or-update-character-skills/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(skills),
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
      console.error('Error updating Skills:', error);
      reject(error);
    });
});

const updateHeroSkills = (skills) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/heros/add-or-update-character-skills/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(skills),
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
      console.error('Error updating Skills:', error);
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
  createHeroSkills,
  updateHeroSkills,
};
