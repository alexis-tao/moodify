import React from 'react';
import styled from 'styled-components';
import hash from '../hash';
import axios from 'axios';
import { ResponsiveLine } from '@nivo/line';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: left;
  padding: 0px 50px;
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

const ChartWrapper = styled.div`
  height: 500px;
  width: 80%;
  background-color: #ffffff;
`;

export class LoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      token: {},
      tracks: []
    };
  }

  componentDidMount() {
    let token = hash.access_token;

    if (token) {
      this.setState({ token }, this.getSpotifyInfo);
    } else {
      window.location.pathname = '';
    }
  }
  
  saveUserData = () => {
    //create user
    const userData = {
      username: this.state.userId,
      songTracks: this.state.tracks
    };

    //for testing
    console.log(userData);

    axios
      .post('http://localhost:5000/users', userData)
      .then(res => console.log(res.data))
      .catch(err => console.log('Error: ' + err));
  };

  getSpotifyInfo = () => {
    this.getUserId();
    this.getRecentTracks();
  };

  getUserId = () => {
    const { token } = this.state;
    axios
      .get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(res => this.setState({ userId: res.data.id }))
      .catch(err => console.log(err));
  };

  // get last 50 songs
  getRecentTracks = () => {
    const { token } = this.state;
    axios
      .get('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
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
            tracks = tracks.reduce((acc, track, index, self) => {
              // get unique tracks only
              if (self.map(cur => cur.id).indexOf(track.id) === index) {
                acc.push({
                  ...track,
                  energy: res[index].energy,
                  valence: res[index].valence
                });
              }
              return acc;
            }, []);

            this.setState({ tracks });
            this.saveUserData();
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  getSongEnergy = async trackId => {
    const { token } = this.state;
    try {
      const res = await axios.get(
        `https://api.spotify.com/v1/audio-features/${trackId}`,
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      );
      return res.data;
    } catch (err) {
      return console.log(err);
    }
  };

  render() {
    const { tracks, userId } = this.state;

    const valenceData = tracks.reduce((acc, track) => {
      acc.push({ x: track.name, y: track.valence });
      return acc;
    }, []);

    const data = [{ id: 'positivity', data: valenceData }];

    return (
      <Page>
        <Title>{userId}</Title>
        <ChartWrapper>
          <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 50, bottom: 50, left: 80 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'songs',
              legendOffset: 15,
              legendPosition: 'middle',
              tickValues: []
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'positivity',
              legendOffset: -45,
              legendPosition: 'middle'
            }}
            colors={['#fc7978', '#94ceca']}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
          />
        </ChartWrapper>
      </Page>
    );
  }
}
