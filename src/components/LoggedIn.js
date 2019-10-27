import React from 'react';
import styled from 'styled-components';
import hash from '../hash';
import axios from 'axios';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: #262626;
`;

const Title = styled.div`
  color: #94ceca;
  font-size: 80px;
  font-weight: bold;
  letter-spacing: 3px;
`;

const Track = styled.div`
  color: #ffffff;
`;

export class LoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: {},
      tracks: []
    };
  }

  componentDidMount() {
    let token = hash.access_token;

    if (token) {
      this.setState({ token }, this.getRecentTracks);
    }
  }

  getRecentTracks = () => {
    const { token } = this.state;
    axios
      .get('https://api.spotify.com/v1/me/player/recently-played', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(res => {
        let tracks = res.data.items
          .map(item => item.track)
          .reduce((acc, cur) => {
            acc.push({ name: cur.name, id: cur.id });
            return acc;
          }, []);

        Promise.all(
          tracks.map(track => track.id).map(id => this.getSongEnergy(id))
        )
          .then(res => {
            console.log(res);
            tracks = tracks.reduce((acc, track, index) => {
              acc.push({
                ...track,
                energy: res[index]
              });
              return acc;
            }, []);

            this.setState({ tracks });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  getSongEnergy = trackId => {
    const { token } = this.state;
    return axios
      .get(`https://api.spotify.com/v1/audio-features/${trackId}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(res => res.data.energy)
      .catch(err => console.log(err));
  };

  render() {
    const { tracks } = this.state;
    console.log(tracks);
    return (
      <Page>
        <Title>you're logged in!</Title>
        {tracks.map(track => (
          <div>
            <Track>{track.name}</Track>
          </div>
        ))}
      </Page>
    );
  }
}
