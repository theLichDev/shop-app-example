import React, { FunctionComponent, MouseEvent } from 'react';

import './SideNavToggle.scss';

type SideNavToggleProps = {
  clicked: (event: MouseEvent<HTMLDivElement>) => void
}

const SideNavToggle: FunctionComponent<SideNavToggleProps> = (props) => (
  <div onClick={props.clicked} className="side-nav-toggle">
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default SideNavToggle;