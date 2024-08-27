import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const createEquipment = (equipment) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/equipments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(equipment),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleEquipment = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/equipments/${id}`, {
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
      console.error('Error fetching single equipment:', error);
      reject(error);
    });
});

const getEquipments = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/equipments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateEquipment = (id, equipment) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/equipments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(equipment),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    //   return response.json();
    })
    .then((data) => {
      console.log('Update equipment Response:', data); // Log the response data
      resolve(data);
    })
    .catch((error) => {
      console.error('Error updating equipment:', error);
      reject(error);
    });
});

const deleteEquipment = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/equipments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createEquipment,
  getSingleEquipment,
  getEquipments,
  updateEquipment,
  deleteEquipment,
};
