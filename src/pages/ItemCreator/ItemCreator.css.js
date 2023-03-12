import styled from 'styled-components';

export const CreatorWrapper = styled.div`
  width: 100%;
  max-height: 100%;
  overflow: hidden;
`;

export const CreatorHeader = styled.div`
  width: 100%;
  height: 10vh;

  border-bottom: 1px solid ${({ theme }) => theme.primaryDark};
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
`;

export const SideMenu = styled.div`
  position: sticky;
  left: 0;
  top: 0;
  width: 300px;
  height: 90vh;
  max-height: 90vh;

  background-color: ${({ theme }) => theme.primary};
`;

export const BookmarkWrapper = styled.fieldset`
  border: none;
  width: calc(100% - 300px);
  height: 90vh;
  max-height: 90vh;
  padding: 25px;
  padding-bottom: 100px;
  overflow-x: hidden;
  overflow-y: auto;
`;
