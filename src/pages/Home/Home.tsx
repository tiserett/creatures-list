import React from 'react';
import { NavLink } from 'react-router-dom';

export const Home = () => (
  <section className="fullHeight hero is-medium is-primary">
    <div className="hero-body">
      <p className="title is-1 has-text-black-bis mb-6">
        Welcome to People Table
        <br />
        Done by Maksym Sobko
      </p>
      <article
        className="
        subtitle
        is-size-5
        has-text-black-bis
        has-text-weight-bold"
      >
        <p>
          On top of each page you can see header with navigation.
          <br />
          On the People page you can see button to add new person.
          <br />
          You can also see input to find person by his username.
          <br />
          Below button and input you can see table with information about
          certain people.
          <br />
          Each row contains information about person&apos;s: id, name, username,
          email, city and street.
          <br />
          In the end of each row you can see: select, edit and delete buttons.
          <br />
          This project is deployed via github pages. Styles were written using
          bulma.
        </p>
      </article>

      <NavLink to="/People" className="button is-large is-link mb-4">
        Show people
      </NavLink>
      <br />
      <a
        href="https://www.linkedin.com/in/maksym-sobko-253a8824a/"
        target="_blank"
        rel="noreferrer"
        className="button is-large is-link"
      >
        Linkedin
      </a>
    </div>
  </section>
);
