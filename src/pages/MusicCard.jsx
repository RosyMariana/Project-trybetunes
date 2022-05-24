import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      carregar: false,
      cheque: false,
    };
  }

  componentDidMount() {
    this.setState({
      cheque: false,
    });
  }

  checar = async ({ target }) => {
    const musica = this.props;
    const { cheque } = this.state;
    this.setState({
      cheque: target.checked,
      carregar: true,
    }, async () => {
      if (!cheque) {
        await addSong(musica[0]);
        this.setState({
          carregar: false,
          cheque: !target.checked,
        });
      }
    });
  }

  render() {
    const { musica } = this.props;
    const { cheque, carregar } = this.state;
    if (carregar) {
      return <Loading />;
    }
    return (
      <div>
        <p className="track-name">
          {' '}
          { musica.trackName }
          {' '}
        </p>
        <audio
          data-testid="audio-component"
          src={ musica.previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label htmlFor="check">
          <input
            type="checkbox"
            onChange={ this.checar }
            data-testid={ `checkbox-music-${musica.trackId}` }
            value={ cheque }
            checked={ cheque }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musica: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};
export default MusicCard;
