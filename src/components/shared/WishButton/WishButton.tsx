import React, { FunctionComponent, MouseEvent } from 'react';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

import './WishButton.scss';

type WishButtonProps = {
  clicked: (event: MouseEvent<HTMLDivElement>) => void;
  active?: boolean | number;
};

const WishButton: FunctionComponent<WishButtonProps> = (props) => {
  const classes = ["wish-button"];
  if (props.active) {
    classes.push("active-wish");
  }
  return (
    <div onClick={props.clicked} className={classes.join(' ')}>
      { props.active ? <MdFavorite /> : <MdFavoriteBorder /> }
    </div>
  );
};

export default WishButton;