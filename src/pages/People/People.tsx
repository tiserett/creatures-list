import React, { useState } from 'react';
import { DeleteModal } from '../../components/DeleteModal';
import { Person } from '../../components/Person';
import { PersonType } from '../../types/PersonType';

interface Props {
  people: PersonType[]
  setPeople: (value: PersonType[]) => void
}

export const People: React.FC<Props> = ({ people, setPeople }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(0);

  const handleDelete = (id: number) => {
    setPeople(people.filter(person => person.id !== id));
  }

  return (
    <section className="hero">
      <div className="hero-body">
        <p className="title">
          People list
        </p>

        <table className="table is-hoverable is-bordered is-striped is-fullwidth">
          <thead>
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>City</th>
            <th>Street</th>
            <th>Operations</th>
          </thead>

          <tbody>
            {people.map(person => (
              <Person
                key={person.id}
                person={person}
                handleIsOpen={setIsOpen}
                setId={setId}
              />
            ))}
          </tbody>
        </table>

        <button className="button is-success is-outlined title is-5">
          Add new person
        </button>
      </div>

      {isOpen && (
        <DeleteModal
          people={people}
          id={id}
          handleIsOpen={setIsOpen}
          handleDelete={handleDelete}
        />
      )}
    </section>
  );
};
