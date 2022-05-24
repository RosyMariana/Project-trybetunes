import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header> Profile </Header>
        <Link to="profile/edit"> Editar </Link>
      </div>
    );
  }
}

export default Profile;
