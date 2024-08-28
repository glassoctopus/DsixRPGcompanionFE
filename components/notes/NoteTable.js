/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import { deleteNote } from '../../utils/data/noteData';

const NoteTable = ({ notes }) => {
  const router = useRouter();

  const updateThisNote = (id) => {
    router.push(`/notes/update/${id}`);
  };

  const deleteThisNote = (id) => {
    deleteNote(id);
    window.location.reload();
  };

  return (
    <div className="note-table">
      <h1 className="text-center mb-4">Notes</h1>
      <table className="table">
        <tbody>
          {notes.map((note) => (
            <tr key={`note--${note.id}`}>
              <td>{note.title}</td>
              <td>{note.completed ? 'Completed' : 'Incomplete'}</td>
              <td>{note.description}</td>
              <td>
                <Link href={`/notes/${note.id}`} passHref>
                  <Button variant="primary" className="m-2">VIEW</Button>
                </Link>
                <Button variant="info" onClick={() => updateThisNote(note.id)} className="m-2">
                  EDIT
                </Button>
                <Button variant="danger" onClick={() => deleteThisNote(note.id)} className="m-2">
                  DELETE
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
