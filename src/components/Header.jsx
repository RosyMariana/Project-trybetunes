import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      pessoa: '',
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    this.setState({ pessoa: await getUser() });
  }

  render() {
    const { pessoa } = this.state;

    return (
      <header data-testid="header-component">

        <Link data-testid="link-to-search" to="/search"> Search </Link>
        <Link data-testid="link-to-favorites" to="/favorites"> Favoritos</Link>
        <Link data-testid="link-to-profile" to="/profile"> Profile </Link>

        <p> Header</p>
        {pessoa
          ? <p data-testid="header-user-name">{pessoa.name}</p> : <Loading />}
      </header>
    );
  }
}

export default Header;
