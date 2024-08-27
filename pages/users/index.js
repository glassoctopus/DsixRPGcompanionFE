import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getUsers } from '../../utils/data/user';
import UserCard from '../../components/UserCard';

const User = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.uid) {
      getUsers().then((data) => {
        setUsers(data);
      });
    }
  }, [user]);

  return (
    <div className="user-container">
      <div className="user-content">
        <article className="User">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">User List</h2>
            <Button as={Link} href="/users/create" className="btn btn-primary">
              Add User
            </Button>
          </div>
          <div
            className="col-md-4"
            style={{
              flex: '0 0 446px',
              maxHeight: '739px',
              border: '1px solid #ddd',
              padding: '1px',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                flex: '1',
                overflowY: 'auto',
                overflowX: 'hidden',
                boxSizing: 'border-box',
              }}
            >
              {users.length > 0 ? (
                users.map((userItem) => (
                  <UserCard
                    key={userItem.uid}
                    uid={userItem.uid}
                    handle={userItem.handle}
                    bio={userItem.bio}
                    admin={userItem.admin}
                    gameMaster={userItem.game_master}
                  />
                ))
              ) : (
                <p>No users found</p>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default User;
