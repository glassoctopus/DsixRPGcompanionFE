/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import { deleteNote } from '../../utils/data/noteData';
import FancyCardLong from '../character/cards/FancyCardLong';
import FancyButton from '../FancyButton';

const NoteTable = ({ notes }) => {
  const router = useRouter();

  const updateThisNote = (id) => {
    router.push(`/notes/update/${id}`);
  };

  const deleteThisNote = (id) => {
    deleteNote(id);
    window.location.reload();
  };

  const viewNote = (id) => {
    router.push(`/notes/${id}`);
  };

  return (
    <FancyCardLong>
      <div className="note-table" style={{ borderRadius: '13px', width: '100%' }}>
        <h1 className="text-center mb-4">Notes</h1>
        <table>
          <tbody>
            {notes.map((note) => (
              <tr
                key={`note--${note.id}`}
                style={{
                  borderRadius: '13px', backgroundColor: '#00aaff', margin: '13px', padding: '13px',
                }}
              >
                <td style={{
                  borderRadius: '13px 0px 0px 13px', margin: '13px', padding: '13px',
                }}
                >{note.title}
                </td>
                <td>{note.completed ? 'Completed' : 'Incomplete'}</td>
                <td>{note.description}
                </td>
                <td style={{
                  borderRadius: '0px 13px 13px 0px', margin: '13px', padding: '13px',
                }}
                >

                  <FancyButton onClick={() => viewNote(note.id)} style={{ marginRight: '13px' }} className="m-2">
                    VIEW
                  </FancyButton>
                  <FancyButton onClick={() => updateThisNote(note.id)} style={{ marginRight: '13px' }} className="m-2">
                    EDIT
                  </FancyButton>
                  <FancyButton onClick={() => deleteThisNote(note.id)} style={{ marginRight: '13px' }} className="m-2">
                    DELETE
                  </FancyButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </FancyCardLong>
  );
};

NoteTable.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    completed: PropTypes.bool,
    temporary_field: PropTypes.bool,
  })).isRequired,
};

export default NoteTable;
