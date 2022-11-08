import React from 'react';
import { Person } from '../../types/Person';

interface Props {
  people: Person[]
}

export const People: React.FC<Props> = ({ people }) => (
  <section className="is-flex is-flex-direction-column">
    <section className="hero">
      <div className="hero-body">
        <p className="title">
          People list
        </p>
      </div>
    </section>

    <table className="table">
      <thead>
        <th>Id</th>
        <th>Name</th>
        <th>Username</th>
        <th>Email</th>
        <th>City</th>
        <th>Street</th>
      </thead>
      <tbody>
        {people.map(({ id, name, username, email, address }) => (
          <tr key={id}>
            <th>{id}</th>
            <th>{name}</th>
            <th>{username}</th>
            <th>{email}</th>
            <th>{address.city}</th>
            <th>{address.street}</th>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);
