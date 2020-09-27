import React, { FunctionComponent, MouseEvent } from 'react';

import Logo from '../../shared/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideNavToggle from '../SideNav/SideNavToggle/SideNavToggle';

import './Toolbar.scss';

type ToolbarProps = {
  sideNavToggleClicked: (event: MouseEvent) => void
};

const Toolbar: FunctionComponent<ToolbarProps> = (props) => (
  <header className="toolbar">
    <SideNavToggle clicked={props.sideNavToggleClicked}/>
    <div className="toolbar-logo">
      <Logo />
    </div>
    <nav className="desktop-only">
      <NavigationItems />
    </nav>
  </header>
);

export default Toolbar;