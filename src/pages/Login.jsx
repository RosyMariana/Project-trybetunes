import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const num = 3;

class Login extends Component {
  constructor() {
    super();

    this.state = {
      stateName: '',
      ativado: true,
      carregar: false,
      redirecionar: false,
    };
  }

  clicou = async () => {
    const { stateName } = this.state;
    this.setState({
      carregar: true,
    });
    await createUser({ name: stateName });
    this.setState({
      carregar: false,
      redirecionar: true,
    });
  }

   onChangeInput = ({ target }) => {
     this.setState({
       stateName: target.value,
       [target.name]: target.value,
     }, () => {
       this.setState({
         ativado: true,
       });
       const { stateName } = this.state;
       if (stateName.length >= num) {
         this.setState({
           ativado: false,
         });
       }
     });
   };

   render() {
     const {
       stateName,
       ativado,
       carregar,
       redirecionar,
     } = this.state;
     if (carregar) {
       return <Loading />;
     }
     return (
       <div data-testid="page-login">
         <h2> Login </h2>
         <label htmlFor="login">
           <input
             type="text"
             name="login"
             data-testid="login-name-input"
             onChange={ this.onChangeInput }
             value={ stateName }
           />
         </label>
         <button
           data-testid="login-submit-button"
           type="button"
           onClick={ this.clicou }
           disabled={ ativado }
         >
           {' '}
           Entrar
           {' '}

         </button>
         {redirecionar ? <Redirect to="search" /> : ''}
       </div>
     );
   }
}

export default Login;
