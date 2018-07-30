import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import Nav from './Sidenav/sidenav';

class Header extends Component {
  state = {
    showNav: false
  };

  onHideNav = () => {
    this.setState({ showNav: false });
  };

  render() {
    return (
      <header>
        <div className="open_nav">
          <FontAwesome
            name="bars"
            onClick={() => this.setState({ showNav: true })}
            style={{
              color: '#ffffff',
              padding: '10px',
              cursor: 'pointer'
            }}
          />
          <Nav
            showNav={this.state.showNav}
            onHideNav={() => this.onHideNav()}
          />
        </div>
        <Link to="/" className="logo">
          Folio Reviews
        </Link>
      </header>
    );
  }
}

export default Header;
