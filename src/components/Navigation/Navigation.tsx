import React from 'react';
import { PageNavLink } from '../PageNavLink';

export const Navigation = () => (
  <nav className="navbar is-dark" aria-label="main navigation">
    <div className="navbar-start">
      <PageNavLink to="/Home" title="Home" />

      <PageNavLink to="/Creatures" title="Creatures" />
    </div>
  </nav>
);
