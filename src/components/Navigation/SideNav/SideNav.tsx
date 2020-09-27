import React, { FunctionComponent, MouseEvent } from 'react';

import Logo from '../../shared/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ClickOutside from '../../shared/ClickOutside/ClickOutside';
import Wrapper from '../../../hoc/Wrapper/Wrapper';

import './SideNav.scss';

type SideNavProps = {
  open: boolean,
  closed: (event: MouseEvent) => void
};

const SideNav: FunctionComponent<SideNavProps> = (props) => {
  const attachedClasses = ["side-nav", props.open ? "open" : "close"];
  return (
    <Wrapper>
      <ClickOutside show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className="side-nav-logo">
          <Logo />
        </div>
        <nav>
          <NavigationItems clicked={props.closed} showCart/>
        </nav>
      </div>
    </Wrapper>
  );
};

export default SideNav;