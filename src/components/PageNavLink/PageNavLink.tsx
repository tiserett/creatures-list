import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string;
  title: string;
};

export const PageNavLink: React.FC<Props> = ({ to, title }) => (
  <NavLink
    to={to}
    className={({
      isActive,
    }) => classNames(
      'navbar-item ml-6',
      { 'is-active': isActive },
    )}
  >
    {title}
  </NavLink>
);
