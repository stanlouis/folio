import React from 'react';
import SideNav from 'react-simple-sidenav';

const Nav = props => {
  return (
    <SideNav
      showNav={props.showNav}
      onHideNav={props.onHideNav}
      navStyle={{
        background: '#242424',
        maxWidth: '220px'
      }}
    >
      Items
    </SideNav>
  );
};

export default Nav;
