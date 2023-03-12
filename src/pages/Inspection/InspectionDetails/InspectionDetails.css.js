import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 80px;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;

  @media print {
    div {
      overflow: visible;
    }
  }
`;

export const ReportTablesWrap = styled.table`
  width: 100%;
  table-layout: fixed;
  border-spacing: 0;

  > tr td {
    vertical-align: top;
  }

  @media print {
    overflow: visible;
    > tr > td {
      display: block;
      clear: both;
    }
  }
`;

export const Title = styled.h1`
  margin: 30px !important;
  font-size: 2rem;
  line-height: 2.2rem;
  min-height: auto;
`;

export const Table = styled.table`
  width: 100%;
  padding: 10px;
  table-layout: fixed;
  border-spacing: 0;
`;

export const Td = styled.td`
  padding: 10px;
  height: 100%;

  ${({ header }) =>
    header === true &&
    css`
      font-weight: 600;
    `}

  @media print {
    overflow: visible;
  }
`;

export const ReportWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;

  @media print {
    display: block;
    width: 100%;
  }
  @page {
    size: auto;
    margin: 10mm;
  }
`;

export const Header = styled.div`
  width: 100%;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 10px;
  background-color: ${({ theme }) => theme.primary};
  text-align: center;

  @media print {
    width: 100%;
  }
`;

export const Button = styled.button`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.primaryDark};
  border-radius: 3px;
  padding: 10px;
  cursor: pointer;
  margin: 10px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;

  svg {
    // margin-right: 5px;
  }

  :hover {
    background: ${({ theme }) => theme.secondaryLight};
  }
`;

export const Menu = styled.div`
  position: fixed;
  left: 0;
  top: 100px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primaryDark};
  border-radius: 0 3px 3px 0;
  padding: 10px;
  width: 10.5%;
`;

export const Tr = styled.tr`
  page-break-inside: avoid;
  page-break-after: auto;
  :nth-of-type(2n + 1) {
    background: ${({ theme }) => theme.primaryDark};
  }
  overflow: visible;
`;

export const Th = styled.th``;
