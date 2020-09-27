import React, { Component } from 'react';

import Wrapper from '../Wrapper/Wrapper';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideNav from '../../components/Navigation/SideNav/SideNav';
import SimpleShoppingCart from '../../containers/ShoppingCart/SimpleShoppingCart/SimpleShoppingCart';

import './Layout.scss';

type LayoutState = {
  showSideNav: boolean
}

class Layout extends Component<{}, LayoutState> {

  state = {
    showSideNav: false
  }

  sideNavClosedHandler = () => {
    this.setState({ showSideNav: false })
  }

  sideNavToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideNav: !prevState.showSideNav };
    });
  }

  render() {
    return (
      <Wrapper>
        <Toolbar sideNavToggleClicked={this.sideNavToggleHandler}/>
        <SideNav
          open={this.state.showSideNav}
          closed={this.sideNavClosedHandler}/>
        <div className="app-content" id="app-content">
          {this.props.children}
        </div>
        <SimpleShoppingCart />
      </Wrapper>
    );
  }
}

export default Layout;