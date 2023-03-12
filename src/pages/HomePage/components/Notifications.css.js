import styled from 'styled-components';
import { scroll } from 'styles/mixins';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 70%;
`;

export const Title = styled.h2`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 1.5rem;

  svg {
    margin-left: 1rem;
  }
`;

export const NotificationsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 70%;
  overflow-y: auto;
  padding: 0 20px 10px 0;

  ${scroll}
`;

export const NotifTitle = styled.h3`
  margin: 0;
  margin-bottom: 5px;
  font-size: 1.2rem;
  font-weight: 400;
`;

export const NotifContent = styled.p`
  margin: 3px;
  font-size: 0.9rem;
  color: #000;
`;

export const Notification = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background: #fff;
  box-shadow: 5px 5px 10px #ccc;
  margin: 10px 0;
  padding: 15px 30px;

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const TurnOffButton = styled.button`
  position: absolute;
  top: 12px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;

  :hover {
    svg {
      fill: ${({ theme }) => theme.red};
    }
  }
`;
