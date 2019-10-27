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
  padding: 30px 50px;
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
  width: 700px;
  background-color: #ffffff;
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
    let token =
      hash.access_token ||
      'BQC87KcimI4x5XZp0ikuRCZDCz5fVy7pLEjdbCDBOEkQ7qBngUsC40LqwIIcVH-L-nx0UxMA_Dc91IxhGEwmXGFRFm0KzcwHtBiEFuoZj9G0w8XXGHwpg_bCktc4GcUyKkaz-3LJ1pcMg8wCRIPoNN-DL84vr68';

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
    const dataInner = tracks.reduce((acc, track) => {
      acc.push({ x: track.name, y: track.energy });
      return acc;
    }, []);

    const data = [{ id: 'your energy', data: dataInner }];

    return (
      <Page>
        <Title>energy</Title>
        <ChartWrapper>
          <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 50, bottom: 50, left: 80 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'energy',
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
