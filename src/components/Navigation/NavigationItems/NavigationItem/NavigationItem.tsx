import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationItem.scss';

type NavigationItemProps = {
  link: string,
}

const navigationItem: FunctionComponent<NavigationItemProps> = ({ link, children }) => {
  return (
    <li className="navigation-item">
      <NavLink to={link}>{children}</NavLink>
    </li>
  );
};

export default navigationItem;