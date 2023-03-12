import styled from 'styled-components';

export const AdvancedFiltersWrapper = styled.form`
  width: 100%;
  min-height: 50px;
  display: grid;
  grid-template-columns: ${({ noSearch }) =>
    noSearch ? '20% 70% 10%' : ' 15% 55% 15% 15%'};
  background-color: ${({ theme }) => theme.background};

  .nice-dates-popover {
    max-width: 300px;
    height: auto;
  }
`;

export const CellWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  padding: 20px;
`;

export const AdvancedTitle = styled.span`
  margin: auto;
  font-size: 1rem;
  display: flex;
  font-weight: 600;

  > svg {
    max-width: 1rem;
    max-height: 1rem;
    margin: auto;
    margin-right: 10px;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: flex;
  justify-content: space-between;
  width: 260px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.primaryDark};
  box-shadow: 1px 1px 15px rgba(0, 4, 40, 0.03);
  padding: 2px 1rem;
  background-color: #fff;
  margin: auto;

  svg {
    fill: #888794;
    width: 2rem;
    height: 2rem;
    margin: auto;
  }

  input {
    width: 100%;
    border: none;
    margin: 0;
  }
`;
