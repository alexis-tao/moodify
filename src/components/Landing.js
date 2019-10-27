import React from 'react';
import styled from 'styled-components';

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

const LoginButton = styled.div`
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

  &:hover,
  &:focus {
    background-color: #94ceca;
  }
`;

function onClick() {
  // spotify auth
}

export const Landing = () => (
  <Page>
    <div>
      <Title>moodify</Title>
      <LoginButton onClick={onClick}>login</LoginButton>
    </div>
  </Page>
);
