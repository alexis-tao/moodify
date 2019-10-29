import React from 'react';
import styled from 'styled-components';

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
  margin-bottom: 30px;
`;

const LoginButton = styled.a`
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 2px;
  padding: 10px 30px;
  margin: 15px auto;
  text-align: center;
  width: 40%;
  background-color: #fc7978;
  border-radius: 30px;
  cursor: pointer;
  text-decoration: none;

  &:hover,
  &:focus {
    background-color: #94ceca;
    text-decoration: none;
  }
`;

export const authEndpoint = 'https://accounts.spotify.com/authorize';

const clientId = '284a9e0c8fb64ad793066b89ec6370a5';
const redirectUri = 'http://localhost:3000/loggedIn';
const scopes = ['user-top-read', 'user-read-recently-played'];

export class Landing extends React.Component {
  render() {
    return (
      <Page>
        <div>
          <Title>moodify</Title>
          <LoginButton
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
              '%20'
            )}&response_type=token&show_dialog=true`}
          >
            login with spotify
          </LoginButton>
        </div>
      </Page>
    );
  }
}
