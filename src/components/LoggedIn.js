import React from 'react';
import styled from 'styled-components';
import hash from '../hash';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #262626;
`;

const Title = styled.div`
  color: #94ceca;
  font-size: 80px;
  font-weight: bold;
  letter-spacing: 3px;
`;

export class LoggedIn extends React.Component {
  componentDidMount() {
    let token = hash.access_token;
  }

  render() {
    return (
      <Page>
        <Title>you're logged in!</Title>
      </Page>
    );
  }
}
