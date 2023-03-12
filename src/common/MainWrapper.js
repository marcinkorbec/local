import styled from 'styled-components';

export default styled.main`
  width: 100vw;
  max-width: 100vw;
  height: calc(100vh - 50px);
  overflow: auto;
  margin-top: 50px;
  overflow-x: hidden;

  background-color: ${({ theme }) => theme.background};
`;
