import React from 'react';
import styled, { keyframes } from 'styled-components';

const circle = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(255, 255, 255, 0.8);
  z-index: 99999999;
`;

const Root = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  display: inline-block;
  width: 80px;
  height: 80px;
  transform: translate(-50%, -50%);

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: ${circle} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #102e60 transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

const Indicator = () => (
  <Wrapper>
    <Root>
      <div />
      <div />
      <div />
      <div />
    </Root>
  </Wrapper>
);

export default Indicator;
