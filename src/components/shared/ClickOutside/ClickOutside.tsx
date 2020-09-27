import React, { FunctionComponent, MouseEvent } from 'react';

import './ClickOutside.scss';

type ClickOutsideProps = {
  show: boolean;
  clicked: (event: MouseEvent<HTMLDivElement>) => void
};

const ClickOutside: FunctionComponent<ClickOutsideProps> = (props) => (
  props.show ? <div className="click-outside" onClick={props.clicked}></div> : null
);

export default ClickOutside;