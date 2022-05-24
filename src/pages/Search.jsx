import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const num = 2;

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artista: '',
      ativado: true,
      carregar: false,
      redirecionar: false,
      albuns: [],
    };
  }

  clicou = async () => {
    const { artista } = this.state;
    this.setState({
      carregar: true,
    });
    const resultado = await searchAlbumsAPI(artista);
    this.setState({
      carregar: false,
      redirecionar: true,
      albuns: resultado,
    });
  }

  onChangeInput = ({ target }) => {
    this.setState({
      artista: target.value,
      [target.name]: target.value,
    }, () => {
      this.setState({
        ativado: true,
      });
      const { artista } = this.state;
      if (artista.length >= num) {
        this.setState({
          ativado: false,
        });
      }
    });
  };

  render() {
    const {
      artista,
      ativado,
      carregar,
      redirecionar,
      albuns,
    } = this.state;
    if (carregar) {
      return <Loading />;
    }
    return (
      <div data-testid="page-search">
        <Header> Search </Header>
        <input
          data-testid="search-artist-input"
          type="text"
          onChange={ this.onChangeInput }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          onClick={ this.clicou }
          disabled={ ativado }
        >
          Pesquisar

        </button>
        {redirecionar && albuns.length > 0 ? (
          <div>
            <h2>
              {' '}
              Resultado de álbuns de:
              {' '}
              {artista}
              {' '}

            </h2>
            <ul className="teste">
              {albuns.map((album) => (
                <li key={ album.collectionId }>
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    <h4 className="teste">{ album.collectionName }</h4>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
          : <p> Nenhum álbum foi encontrado </p>}
      </div>
    );
  }
}

export default Search;
