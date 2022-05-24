import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicas: [],
      carregar: false,
      musicasFavoritas: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    // const { id } = match.params.props
    this.setState({ carregar: true }, async () => {
      const musicasFavoritas = await getFavoriteSongs();
      const musicas = await getMusics(id);
      this.setState({
        musicas,
        carregar: false,
        musicasFavoritas,
      });
    });

    // this.setState({
    //   musicas: resultado,
    // });
  }

  render() {
    const {
      musicas,
      carregar,
      musicasFavoritas,
    } = this.state;
    if (carregar) {
      return <Loading />;
    }
    if (musicas[0]) {
      return (
        <div data-testid="page-album">
          <Header> Album </Header>
          <p data-testid="artist-name">{musicas[0].artistName}</p>
          <p data-testid="album-name">{musicas[0].collectionName}</p>
          <div>
            { musicas.map((musica, cont) => {
              if (cont !== 0) {
                return (
                  <MusicCard
                    key={ musica.trackId }
                    musica={ musica }
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      );
    }
    return (
      <p>{musicasFavoritas}</p>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
