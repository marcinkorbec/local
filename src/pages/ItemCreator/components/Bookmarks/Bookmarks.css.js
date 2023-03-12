import styled, { css } from 'styled-components';
import { centerFlex } from 'styles/mixins';

export const Wrapper = styled.div`
  width: 75%;
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 20px;
`;

export const Cell = styled.div`
  display: flex;
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
  ${({ row }) =>
    row &&
    css`
      align-items: center;
    `};

  > input,
  > textarea {
    height: 38px;
    padding: 5px 10px;
    border: 1px solid ${({ theme }) => theme.primaryDark};
    border-radius: 5px;

    ${({ row }) =>
      row &&
      css`
        margin: auto 50% auto auto;
      `};
  }

  > textarea {
    min-height: 150px;
    resize: vertical;
    height: 100%;
  }

  > span {
    color: ${({ theme }) => theme.font};
    font-weight: 600;
    margin-bottom: 10px;
  }
`;

export const DoubleCell = styled(Cell)`
  grid-column: 1 / span 2;

  > input[type='date'] {
    max-width: 300px;
  }
`;

export const SelectedFile = styled.div`
  display: flex;
  flex-direction: row;

  button {
    height: 38px;
    padding: 5px 10px;
    border: 1px solid ${({ theme }) => theme.primaryDark};
    border-radius: 5px;
    background-color: white;
    cursor: pointer;

    &:disabled {
      background-color: lightgray;
    }
  }

  input {
    display: none;
  }

  span {
    margin: auto 15px;
  }

  svg {
    margin: auto 0;
  }
`;

export const ItemsList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  height: 150px;
  overflow-y: auto;

  background: white;
  border: 1px solid ${({ theme }) => theme.primaryDark};
  border-radius: 5px;

  ${({ full }) =>
    full &&
    css`
      grid-column: 1 / span 2;
      height: 50vh;
    `}
`;

export const Item = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;

  border-bottom: 1px solid ${({ theme }) => theme.primaryDark};

  svg {
    margin: 0 15px 0 auto;
    cursor: pointer;
    width: 16px;
    height: 16px;
  }

  span,
  p {
    max-width: 90%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  aside {
    flex-basis: 100%;
    font-size: 0.7em;
  }

  > button {
    margin: 15px 15px 15px 0;
  }

  .video-react,
  video {
    * {
      color: white;
    }
  }

  .react-audio-player {
    margin: auto;
  }

  ${({ smallImg }) =>
    smallImg &&
    css`
      img {
        max-width: 100px;
        max-height: 75px;
        margin-right: 15px;
      }

      svg {
        margin-top: auto;
        margin-bottom: auto;
      }
    `}
`;

export const AddButton = styled.button`
  max-width: 300px;
  height: 38px;
  padding: 5px 10px;
  border: 1px solid ${({ theme }) => theme.primaryDark};
  border-radius: 5px;
  background-color: white;
  transition: 0.5s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-left: 10px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.primaryDark};
  }

  &:disabled {
    background-color: lightgray;
  }
`;

export const CellRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 10px;

  > input,
  > textarea {
    height: 38px;
    padding: 5px 10px;
    border: 1px solid ${({ theme }) => theme.primaryDark};
    border-radius: 5px;
    width: 100%;

    &:first-child {
      margin-right: 10px;
    }
  }

  > input[type='date'] {
    max-width: 300px;
  }

  > textarea {
    min-height: 100px;
    resize: vertical;
  }

  > div {
    min-width: 80px;
    margin-left: 10px;
  }

  > button {
    margin: auto 0 auto 10px;
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  position: relative;
  max-width: 100%;
  /* margin: auto; */

  img {
    max-width: 100%;
    max-height: 300px;
  }

  svg {
    position: absolute;
    cursor: pointer;
    width: 25px;
    height: 25px;
  }

  .star {
    top: 5%;
    left: 2.5%;
    fill: yellow;
  }

  .delete {
    bottom: 5%;
    left: 2.5%;
    fill: red;
  }
`;

export const QrWrapper = styled(ImageWrapper)`
  flex-direction: column;
  background-color: white;
  max-width: 200px;

  img {
    width: 200px;
    height: 200px;
    margin: 0 auto;
  }

  span {
    padding-bottom: 10px;
    font-weight: 600;
    font-size: 20px;
    text-align: center;
  }
`;

export const ConservationImageWrapper = styled.div`
  display: flex;
  position: relative;
  align-self: flex-start;
  margin: 20px 0;
  /* margin: auto; */

  img {
    max-width: 100%;
    max-height: 500px;
  }
`;

export const ConservationDetails = styled.div`
  display: 'flex';
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  min-width: 40%;
  height: 100%;
  margin: 20px;
  margin-top: 50px;
  padding: 30px 10px;

  label {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 10px 0;

    span {
      font-weight: 600;
      font-size: 0.9rem;
    }

    input {
      height: 32px;
      width: 100%;
      border: 1px solid ${({ theme }) => theme.primaryDark};
      border-radius: 5px;
    }

    textarea {
      width: 100%;
      height: 200px;
      resize: none;
      border: 1px solid ${({ theme }) => theme.primaryDark};
      border-radius: 5px;
    }
  }
`;

export const Notice = styled.p`
  text-align: center;
  padding: 20px;
  min-width: 40%;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.secondary};
  margin: 0 auto;
`;

export const ConservationWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 60%;

  span {
    font-weight: bold;
    margin: 10px 0;
  }
`;

export const ConservationPoint = styled.div`
  position: absolute;
  display: ${({ top }) => (top != null ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
  border-radius: 50%;

  svg {
    transition: 0.4s;
    border-radius: 50%;
    path {
      fill: white;
    }
  }

  ${({ active }) =>
    active &&
    css`
      pointer-events: none;
      svg {
        z-index: 2;
        font-size: 26px;
        fill: black;
        circle {
          opacity: 0.7;
        }
        path {
          fill: #f6d77a;
        }
      }
    `}
`;

export const DeleteButton = styled(AddButton)`
  position: absolute;
  top: 0;
  right: 10px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }

  :hover {
    background: ${({ theme }) => theme.red};
  }
`;

export const DimensionsPopupWrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 25px;

  input,
  textarea {
    height: 38px;
    padding: 5px 10px;
    border: 1px solid ${({ theme }) => theme.primaryDark};
    border-radius: 5px;
    width: 100%;
  }

  input[type='date'] {
    width: auto;
  }

  textarea {
    width: 300px;
    height: 200px;
  }

  img {
    max-width: 300px;
  }

  > div {
    width: 100%;
    display: flex;

    > span {
      ${centerFlex};
      margin: 0 15px;
    }

    > button {
      margin: 10px auto;
    }
  }
`;

export const ConserwationWrapper = styled.div`
  display: flex;
  flex-direction: column;

  img {
    max-width: 300px;
    height: auto;
  }

  textarea {
    width: 100%;
    margin: 0 10px;
  }

  > span {
    font-weight: 600;
    font-style: italic;
  }
`;

// points

export const PointsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ListEl = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ListElDesc = styled.div`
  display: ${({ toggle }) => (toggle ? 'flex' : 'none')};
  border: 1px solid ${({ theme }) => theme.primary};
  background: #fff;
  min-height: 50px;
  align-items: center;
  padding: 10px;
`;

export const ListElTitle = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.primaryDark};
  border: 1px solid ${({ theme }) => theme.primary};
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.15s;

  :hover {
    background: ${({ theme }) => theme.primary};
  }
`;

export const ButtonsWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const symbolStyles = css`
  font-size: 1rem;
  height: 38px;
  padding: 7px 10px;
  background-color: white;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${({ theme }) => theme.primaryDark};
  border-top: 1px solid ${({ theme }) => theme.primaryDark};
  ${({ left, right }) =>
    left
      ? css`
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          border-left: 1px solid ${({ theme }) => theme.primaryDark};
        `
      : right
      ? css`
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          border-right: 1px solid ${({ theme }) => theme.primaryDark};
        `
      : ''}
  ${({ textRight }) =>
    textRight &&
    css`
      text-align: right;
    `}
`;

export const SymbolLabel = styled.label`
  ${symbolStyles};
`;

export const SymbolInput = styled.input`
  ${symbolStyles};
  border-left: none !important;
  border-right: none !important;
  border-radius: 0 !important;
  min-width: 50px;
`;
