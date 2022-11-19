import { useState } from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { useAppSelector } from '../../app/hooks';
import { AddModal } from '../../components/AddModal';
import { DeleteModal } from '../../components/DeleteModal';
import { EditModal } from '../../components/EditModal';
import { Person } from '../../components/Person';
import { PersonType } from '../../types/PersonType';
import '../../styles/transition.scss';

export const People: React.FC = () => {
  const people: PersonType[] = useAppSelector(state => state.people);
  const [query, setQuery] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState(0);

  const visiblePeople = people.filter(
    person => person.username.toLowerCase().includes(query.toLowerCase()),
  );

  const handleQuery = (value: string) => {
    if (value === ' ') {
      return;
    }

    setQuery(value);
  };

  return (
    <section className="hero">
      <div className="hero-body p-5">
        <p className="title">
          People list
        </p>

        <button
          type="submit"
          className="button is-success is-outlined title is-5"
          onClick={() => setIsAdding(true)}
        >
          Add new person
        </button>
        {isAdding && (
          <AddModal
            setIsAdding={setIsAdding}
          />
        )}

        <input
          className="input mb-5"
          type="text"
          placeholder="Enter username"
          value={query}
          onChange={(event) => handleQuery(event.target.value)}
        />

        <table
          className="table is-hoverable is-bordered is-fullwidth"
        >
          <thead>
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>City</th>
            <th>Street</th>
            <th>Operations</th>
          </thead>

          <TransitionGroup component="tbody">
            {visiblePeople.map(person => (
              <CSSTransition
                key={person.id}
                timeout={1000}
                classNames="item"
              >
                <Person
                  person={person}
                  handleIsDeleting={setIsDeleting}
                  handleIsEditing={setIsEditing}
                  setId={setId}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </table>
      </div>

      {
        isEditing && (
          <EditModal setIsEditing={setIsEditing} id={id} />
        )
      }
      {
        isDeleting && (
          <DeleteModal
            id={id}
            handleIsDeleting={setIsDeleting}
          />
        )
      }
    </section>
  );
};
