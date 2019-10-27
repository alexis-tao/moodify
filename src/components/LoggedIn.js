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
      topTracks: []
    };
  }
  componentDidMount() {
    let token = hash.access_token;
    if (token) {
      axios
        .get('https://api.spotify.com/v1/me/player/recently-played', {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        .then(res => {
          console.log(res.data);
          this.setState({ topTracks: res.data.items });
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    const { topTracks } = this.state;
    return (
      <Page>
        <Title>you're logged in!</Title>
        {topTracks.map(item => (
          <Track>{item.track.name}</Track>
        ))}
      </Page>
    );
  }
}
