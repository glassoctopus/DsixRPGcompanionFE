import React, { useState } from 'react';
import PropTypes from 'prop-types';

const GroupForm = ({ gameMasters, onSubmit, onCancel }) => {
  const [newGroup, setNewGroup] = useState({
    group_name: '',
    private: false,
    is_adventure_party: false,
    game_master: '',
  });

  const handleInputChange = (e) => {
    const {
      name, value, type, checked,
    } = e.target;
    if (name === 'is_adventure_party') {
      setNewGroup((prev) => ({
        ...prev,
        [name]: checked,
        game_master: checked ? '' : prev.game_master,
      }));
    } else {
      setNewGroup((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleGameMasterSelect = (event) => {
    setNewGroup((prev) => ({
      ...prev,
      game_master: event.target.value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(newGroup);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Group Name:
        <input
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            margin: '8px 0',
          }}
          type="text"
          name="group_name"
          value={newGroup.group_name}
          onChange={handleInputChange}
          required
        />
      </label>
      <label style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
      >
        <input
          type="checkbox"
          name="private"
          checked={newGroup.private}
          onChange={handleInputChange}
        />
        Private Group
      </label>
      <label style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
      >
        <input
          type="checkbox"
          name="is_adventure_party"
          checked={newGroup.is_adventure_party}
          onChange={handleInputChange}
        />
        Is Adventure Party
      </label>

      {/* Conditionally render the Game Master field if Is Adventure Party is checked */}
      {newGroup.is_adventure_party && (
        <select
          value={newGroup.game_master}
          onChange={handleGameMasterSelect}
          style={{
            padding: '3px',
            borderRadius: '3px',
            border: '1px solid #ccc',
            fontSize: '16px',
            color: 'black',
            boxShadow: '0px 4px 8px rgba(255, 255, 255, 0.3)',
            backgroundColor: 'white',
            outline: 'none',
            width: '100%',
            maxWidth: '400px',
            cursor: 'pointer',
          }}
        >
          <option value="">---Select Game Master---</option>
          {gameMasters.map((gameMaster) => (
            <option key={gameMaster.id} value={gameMaster.id}>
              {gameMaster.handle}
            </option>
          ))}
        </select>
      )}

      <div>
        <button
          style={{
            padding: '10px 16px',
            backgroundColor: '#00b300',
            color: '#ffffcc',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            marginTop: '10px',
          }}
          type="submit"
        >
          Create Group
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '10px 16px',
            backgroundColor: '#ffcc00',
            color: '#000',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            marginTop: '10px',
            marginLeft: '10px',
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

GroupForm.propTypes = {
  gameMasters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    handle: PropTypes.string.isRequired,
  })).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default GroupForm;
