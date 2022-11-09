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
        is-size-5
        has-text-black-bis
        has-text-weight-bold"
      >
        <p>
          On top of each page you
          can see header with navigation.
          <br />
          On the People page you can see
          button to add new person.
          <br />
          You can also see input to find person by his username.
          <br />
          Below button and input you can see table
          with information about certain people.
          <br />
          Each row contains information about person&apos;s:
          id, name, username, email, city and street.
          <br />
          In the end of each row you can see:
          select, edit and delete buttons.
          <br />
          This project is deployed via github pages.
          Styles were written using bulma.
        </p>
      </article>
    </div>
  </section>

);
