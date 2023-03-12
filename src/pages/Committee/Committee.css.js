import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Page = styled.div`
  width: 210mm;
  flex-direction: column;
  margin: 1cm;
  padding: 1cm;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.primary};

  @media print {
    border: none;
    margin: 0;
    width: 100%;
    overflow: visible;
    > ol li,
    > ul li {
      display: block;
      clear: both;
    }
  }
`;

export const Text = styled.div`
  margin: 10px 0;
`;

export const Li = styled.li`
  display: flex;
  align-items: center;
  page-break-inside: avoid;
  page-break-after: auto;
`;

export const Ol = styled.ol``;

export const Ul = styled.ul``;

export const Input = styled.input`
  width: ${({ short }) => (short ? 'auto' : '100%')};
  border: 1px solid ${({ theme }) => theme.primaryDark};
  height: 30px;
  margin: 3px;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @media print {
    width: auto;
    border: none;
    height: auto;
    padding: 0;
    width: ${({ short }) => (short ? '80px' : '100%')};
    overflow: visible;
    ::-webkit-inner-spin-button,
    ::-webkit-calendar-picker-indicator {
      display: none;
      -webkit-appearance: none;
    }
  }

  ${({ price }) =>
    price &&
    css`
      width: 20%;
      text-align: right;
    `}
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 10px;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.primaryDark};
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;

  :hover {
    background: ${({ theme }) => theme.primary};
  }

  ${({ print }) =>
    print &&
    css`
      margin: 20px 0 0 20px;
      svg {
        margin-right: 10px;
      }
    `}

  ${({ remove, theme }) =>
    remove &&
    css`
      border: none;
      background: none;

      svg {
        :hover {
          fill: ${theme.red};
        }
      }
    `}

  @media print {
    display: none;
  }
`;
