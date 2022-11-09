import React from 'react';

export const Home = () => (
  <section className="hero is-medium is-primary">
    <div className="hero-body">
      <p className="title is-1 has-text-black-bis mb-6">
        Welcome to People table
        <br />
        Done by Maksym Sobko
      </p>
      <article className="
        subtitle
        is-size-3
        has-text-black-bis
        has-text-weight-bold"
      >
        <p>
          On top of each page you
          can see header with navigation.
        </p>
        <p>
          On the People page you can see table
          with information about certain people.
        </p>
        <p>
          Each row contains information about person&apos;s:
          id, name, username, email, city and street.
        </p>
        <p>
          In the end of each row you can see:
          open, edit and delete buttons.
        </p>
        <p>
          Below table you can see Add new person button,
          which opens modal window with form.
        </p>
        <p>
          This project is deployed via github pages.
          <br />
          Styles were written using bulma.
        </p>
      </article>
    </div>
  </section>

);
