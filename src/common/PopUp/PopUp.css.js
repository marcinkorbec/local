import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: ${({ togglePopUp }) => (togglePopUp === true ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(3px);
  z-index: 999;
`;

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #eeeeee99;
`;

export const Content = styled.div`
  position: relative;
  background: #fff;
  box-shadow: 5px 5px 10px #ccc;
  align-items: center;
  justify-content: center;
  min-width: 320px;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  background: #efefef;
  height: 40px;
`;

export const Title = styled.h1`
  max-width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  font-size: 0.9rem;
  background: #e8e8e8;
  height: 100%;
  padding: 10px 20px;
  margin: 0;
`;

export const CloseButton = styled.button`
  padding: 10px 20px;
  background: none;
  border: none;
  right: 10px;
  top: 10px;
  cursor: pointer;
  justify-self: flex-end;

  :hover {
    background: #eb6161;
    svg {
      fill: #fff;
    }
  }
`;

export const Buttons = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-around;
  margin: 20px;
`;

export const Button = styled.button`
  font-weight: 600;
  font-size: 0.85rem;
  border: none;
  border-radius: 15px;
  padding: 5px 20px;
  background: #e8e8e8;
  box-shadow: 0px 3px 3px #ddd;

  :hover {
    background: #dcdcdc;
  }
`;

export const ChildrenWrap = styled.div`
  padding: 20px;
`;
