import styled, { css } from 'styled-components';
import { centerFlex } from 'styles/mixins';
import rglStyles from './rglStyles';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2.5vh 0;

  display: flex;
  overflow-y: auto;
`;

export const PrintWrapper = styled.div`
  width: 100%;
  height: calc(297mm * 2 + 25px);
  padding: 2.5vh 0;

  ${centerFlex};
  flex-direction: column;

  @media print {
    height: calc(297mm * 2);
  }
`;

export const PageWrapper = styled.div`
  min-width: 210mm;
  max-width: 210mm;
  min-height: 297mm;
  max-height: 297mm;
  margin: auto;
  background-color: white;
  box-shadow: 0 0 10px lightgray;
  margin-bottom: 25px;

  user-select: none;

  ${({ padding }) => css`
    padding: ${padding?.top || 0}cm ${padding?.right || 0}cm
      ${padding?.bottom || 0}cm ${padding?.left || 0}cm;
  `}

  ${rglStyles}

  @media print {
    box-shadow: none;
    margin-bottom: 0;
  }

  @page {
    size: A4;
    margin: 0;
  }
`;

export const SideMenu = styled.div`
  position: sticky;
  top: 0%;
  width: 25vw;
  padding: 25px;
  display: flex;
  flex-direction: column;

  background-color: white;
  box-shadow: 0 0 10px lightgray;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
`;

export const SingleSetting = styled.div`
  margin: 10px auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;

  h3 {
    font-size: 1rem;
    margin: 10px auto;
    text-align: left;
    width: 100%;
  }

  input {
    width: 60px;
    height: 2rem;
    margin: auto auto auto 0;
    padding-left: 10px;
  }
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 10px auto;
`;

export const Cell = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid black;
  overflow: hidden;
  position: relative;
`;

export const CellHeader = styled.div`
  padding: 10px;
  width: 100%;
  font-size: 1.5rem;
  border-bottom: 1px solid black;
  height: 40px;

  input {
    border: none;
    max-width: 95%;
  }
`;

export const CellContent = styled.div`
  padding: 10px;
  width: 100%;
  max-width: 100%;
  font-size: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  textarea {
    padding: 10px;
    width: 95%;
    max-width: 95%;
    height: 60%;
    border: none;
    resize: none;
    font-size: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

export const RemoveIcon = styled.button`
  width: 10px;
  max-height: 15px;
  position: absolute;
  top: 0;
  right: 15px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  @media print {
    display: none;
  }
`;
