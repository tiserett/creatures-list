import React from 'react';
import { NavigationLink } from '../NavigationLink';

export const Navigation = () => (
  <nav className="navbar is-dark" aria-label="main navigation">
    <div className="navbar-start">
      <NavigationLink to="/Home" title="Home" />

      <NavigationLink to="/Creatures" title="Creatures" />
    </div>
  </nav>
);
