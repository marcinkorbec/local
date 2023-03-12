import styled, { css } from 'styled-components';
import { device } from 'styles/devices';
import { centerFlex, scroll } from 'styles/mixins';
import { Td, Th } from 'react-super-responsive-table';

export const Wrapper = styled.div`
  max-width: 100%;

  table {
    border-collapse: collapse;
    border: 1px solid ${({ theme }) => theme.secondary};
  }

  th {
    text-align: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  td,
  th {
    padding: 5px 10px;
  }

  tr {
    :nth-child(2n) {
      background-color: ${({ theme }) => theme.primary};
    }
  }

  ${({ tableWrapperStyle }) => ({ ...tableWrapperStyle })}
`;

export const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 20px;

  @media ${device.desktop} {
    flex-direction: row;
    align-items: center;
  }

  aside {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-end;

    @media ${device.tablet} {
      flex-direction: row;
      align-items: center;
    }
  }
`;

export const HeaderCell = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  ${({ isDragActive }) => isDragActive && 'pointer-events: none;'};
`;

export const HeaderTitle = styled.div`
  margin: 0 0 auto 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding: 10px;
  color: ${({ theme }) => theme.font};
  ${({ isSortable }) => isSortable && 'cursor: pointer;'};

  &:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.background};
    border-left: 1px solid ${({ theme }) => theme.background};
  }
`;

export const ColumnFilter = styled.div`
  margin: auto 0 0 0;
  width: 100%;
  height: 100%;
  ${centerFlex};
  justify-content: flex-start;
  flex-direction: row;
  padding: 10px;
  border-top: 1px solid ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.background};

  svg {
    width: 1rem;
    height: 1rem;
    margin-right: 10px;
  }

  input {
    width: 100%;
    background-color: ${({ theme }) => theme.background};
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.secondary};
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 26px;
  width: 260px;
  border-radius: 2px;
  box-shadow: 1px 1px 15px rgba(0, 4, 40, 0.03);
  padding: 2px 1rem;
  background-color: #fff;

  @media ${device.tablet} {
    margin-left: 30px;
    margin-right: 20px;
  }

  svg {
    fill: #888794;
    width: 2rem;
    height: 2rem;
  }

  input {
    width: 100%;
    border: none;
    margin: 0;
  }
`;

export const FiltersContainer = styled.div`
  position: relative;
  z-index: 1;
  margin: 15px 0;

  @media ${device.tablet} {
    margin: 0;
  }
`;

export const FiltersButtonToggle = styled.button`
  border: 1.2px solid ${({ theme }) => theme.secondary};
  border-radius: 2px;
  background-color: #fff;
  padding: 6px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.secondary};

  svg {
    margin-right: 10px;
  }
`;

export const FiltersStyled = styled.form`
  position: absolute;
  width: 350px;
  padding: 20px;
  border: 1px solid #f2f2f2;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  background-color: #eff5fa;

  max-height: ${({ openFilter }) => (openFilter ? 'auto' : 0)};
  /* overflow: hidden; */
  transition: 0.2s;
  transform: ${({ openFilter }) => (openFilter ? 'scale(1)' : 'scale(0)')}
    translate(-250px, 20px);
  opacity: ${({ openFilter }) => (openFilter ? '1' : '0')};

  ${scroll}

  .nice-dates-popover {
    transform: translateX(-20px);
  }

  .nice-dates-grid {
    background-color: white;
    width: 350px;
  }

  .nice-dates-day::before {
    background-color: ${({ theme }) => theme.primary};
    color: white;
  }
`;

export const Title = styled.p`
  font-weight: bold;
  color: ${({ theme }) => theme.titleLight};
`;

export const LabelFilter = styled.p`
  color: ${({ theme }) => theme.font};
  /* text-transform: uppercase; */
  font-weight: 700;
  font-size: 1rem;
  margin: auto 10px !important;
`;

export const customStyles = css`
  display: flex;
  justify-content: space-between !important;
  padding: 10px 20px;

  @media (max-width: 745px) {
    flex-direction: column-reverse;

    .MuiGrid-item.MuiGrid-grid-xs-7 {
      width: 100% !important;
    }
  }

  .MuiPagination-ul {
    display: flex;
    justify-content: flex-end;
  }

  .MuiPaginationItem-root {
    border: none;
    background-color: ${({ theme }) => theme.background};
    border: 1px solid ${({ theme }) => theme.secondary};
  }

  .MuiPaginationItem-page.Mui-selected {
    background-color: ${({ theme }) => theme.primary};
    border: 2px solid ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.colorLighter};
  }

  .MuiPaginationItem-page,
  .MuiPaginationItem-page.Mui-selected {
    :hover {
      font-weight: bold;
    }
  }

  .css-tlfecz-indicatorContainer,
  .css-lgtu0rj-indicatorContainer {
    padding: 2px 8px !important;
  }
`;

export const customSelectStyles = {
  container: provided => ({
    ...provided,
    maxWidth: '150px',
  }),
  control: provided => ({
    ...provided,
    minWidth: '150px',
    border: '1px solid #98a1a8',
    minHeight: '30px',
    borderRadius: '2px',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : '#374047',
    backgroundColor: state.isSelected ? '#374047' : 'white',
    padding: 5,
  }),
  indicatorSeparator: provided => ({
    ...provided,
    display: 'none',
  }),
  menu: provided => ({
    ...provided,
    marginTop: '0px',
  }),
};

export const EmptyTd = styled(Td)`
  display: flex;
  padding: 30px !important;
  text-align: center;
  justify-content: center;
`;

export const FilterWrapper = styled.div`
  ${centerFlex};
  flex-direction: row;
`;

export const DatePickerWrapper = styled(FilterWrapper)`
  .nice-dates-day {
    color: black;
    font-weight: 600;
  }

  .nice-dates-day_month,
  .nice-dates-week-header_day,
  .-outside {
    color: ${({ theme }) => theme.placeholderColor};
    font-weight: 500;
  }
`;

export const AccessibilityLabel = styled.label`
  width: ${({ muiinput }) => muiinput && '100%'};
  > p:first-of-type {
    position: absolute;
    left: -9999px;
  }
`;

export const CustomTh = styled(Th)`
  position: relative;
  padding: 0 0 0 0 !important;
  transition: 0.3s;
  height: ${({ headerAutoHeight }) => (headerAutoHeight ? 'auto' : '100px')};

  border: 1px solid ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary};

  ${({ draggable }) =>
    draggable &&
    css`
      cursor: move;
    `}

  ${({ isDragHover, theme }) =>
    isDragHover &&
    css`
      background-color: ${theme.acceptColor};
    `}

  ${({ isSortable }) =>
    isSortable &&
    css`
      /* cursor: pointer; */
      transition: 0.3s;

      span {
        transition: 0.3s;
      }

      &:hover {
        span {
          transform: scale(1.05);
          color: ${({ theme }) => theme.primary};
        }
      }
    `}
`;

export const DragElement = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  cursor: move;

  ${centerFlex};
`;
