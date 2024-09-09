import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const createCharacterGroup = (characterGroup) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/charactergroups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(characterGroup),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleCharacterGroup = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/charactergroups/${id}`, {
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
      console.error('Error fetching single charactergroups:', error);
      reject(error);
    });
});

const getCharacterGroups = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/charactergroups`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const addCharacterToGroup = (groupId, characterId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/charactergroups/${groupId}/add_character/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ character_id: characterId }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => {
      console.error('Error adding character to group:', error);
      reject(error);
    });
});

const removeCharacterFromGroup = (groupId, characterId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/charactergroups/${groupId}/remove_character/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ character_id: characterId }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => {
      console.error('Error removing character from group:', error);
      reject(error);
    });
});

const updateCharacterGroup = (id, characterGroup) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/charactergroups/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(characterGroup),
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
      console.error('Error updating charactergroups:', error);
      reject(error);
    });
});

const deleteCharacterGroup = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/charactergroups/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createCharacterGroup,
  getSingleCharacterGroup,
  getCharacterGroups,
  addCharacterToGroup,
  removeCharacterFromGroup,
  updateCharacterGroup,
  deleteCharacterGroup,
};
