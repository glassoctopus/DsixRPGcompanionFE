import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const createNote = (note) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleNote = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notes/${id}`, {
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
      console.error('Error fetching single note:', error);
      reject(error);
    });
});

const getNotes = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateNote = (id, note) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    //   return response.json();
    })
    .then((data) => {
      console.log('Update Note Response:', data); // Log the response data
      resolve(data);
    })
    .catch((error) => {
      console.error('Error updating Note:', error);
      reject(error);
    });
});

const deleteNote = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createNote,
  getSingleNote,
  getNotes,
  updateNote,
  deleteNote,
};
