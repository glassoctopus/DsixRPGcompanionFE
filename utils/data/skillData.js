import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const createSkill = (skill) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/skills`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(skill),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleSkill = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/skills/${id}`, {
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
      console.error('Error fetching single Skill:', error);
      reject(error);
    });
});

const getSkills = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/skills`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateSkill = (id, Skill) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/skills/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Skill),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    //   return response.json();
    })
    .then((data) => {
      console.log('Update Skill Response:', data); // Log the response data
      resolve(data);
    })
    .catch((error) => {
      console.error('Error updating Skill:', error);
      reject(error);
    });
});

const deleteSkill = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/skills/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createSkill,
  getSingleSkill,
  getSkills,
  updateSkill,
  deleteSkill,
};
