import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  align-self: flex-start;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: auto 1fr;
  padding: 15px;

  @media (max-width: 1400px) {
    grid-template-columns: 1fr;
  }
`;

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 10px;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 3px;
  background: none;
  cursor: pointer;
  font-size: 14px;

  svg {
    margin-right: 10px;
  }

  :hover {
    background: ${({ theme }) => theme.primary};
    transition: 0.2s;
  }

  ${({ deleteButton }) =>
    deleteButton === true &&
    css`
      margin: 0px 5px;
      padding: 5px;
      width: 30px;
      height: 30px;

      :hover {
        background: ${({ theme }) => theme.red};
        transition: 0.2s;
      }

      svg {
        margin: 0;
      }
    `}

  ${({ disabled }) =>
    disabled === true &&
    css`
      background: ${({ theme }) => theme.secondaryLight};
      cursor: not-allowed;

      :hover {
        background: ${({ theme }) => theme.secondaryLight};
      }
    `}
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  height: 50px;
  justify-content: space-between;
`;

export const Titlebar = styled.div`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.secondaryDarker};
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  text-transform: uppercase;
  font-weight: 600;
`;

export const ListWrap = styled.div`
  display: flex;
  height: 90%;
`;

export const List = styled.div`
  height: 90%;
  overflow-y: auto;
`;

export const ListEl = styled.div`
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;

  :nth-of-type(2n) {
    background: ${({ theme }) => theme.primary};
  }

  :hover {
    background: ${({ theme }) => theme.primaryDark};
  }
  ${({ selected }) =>
    selected === true &&
    css`
      background: ${({ theme }) => theme.primaryDark};
    `}
`;

export const ElWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Role = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.secondary};
`;

export const TeamName = styled.span`
  font-size: 0.8rem;
`;

export const WorkersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const WorkersList = styled.div`
  width: 100%;
  height: 100%;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: ${({ checkboxLabel }) => (checkboxLabel ? 'row' : 'column')};
  margin: 10px 0;

  input[type='checkbox'] {
    align-self: center;
    margin-right: 10px;
  }
`;

export const Input = styled.input`
  height: 36px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.primaryDark};
  border-radius: 3px;
`;

export const ItemsTableWrapper = styled.div`
  width: 100%;
  height: 100%;
  grid-column: 1 / span 2;
  @media (max-width: 1400px) {
    grid-column: 1;
  }
`;

export const Textarea = styled.textarea`
  resize: none;
  width: 90%;
  height: 100px;
`;

export const Notice = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.secondary};
`;
