import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import allActions from 'store/actions';

import { ReactComponent as FilterIcon } from 'assets/filter.svg';
import { CancelButton } from 'common/Buttons';
import * as S from './AdvancedFilters.css';
import GetFilterComponent from './getFilterComponent';

const AdvancedFilters = ({
  filters,
  search: searchFilter,
  nameTable,
  getValues,
  noSearch,
}) => {
  const dispatch = useDispatch();
  const filtersValues = useSelector(state => state.filters[nameTable]);

  const onSearchChange = search => {
    dispatch(
      allActions.filters.setFilterTable({
        nameFilter: searchFilter?.name,
        value: search,
        nameTable,
      })
    );
  };

  const onSubmit = e => {
    e.preventDefault();
    getValues({ ...filtersValues, page: 1 });
  };

  const onReset = () => {
    dispatch(allActions.filters.clearFiltersTable(nameTable));
    getValues('clear');
  };

  const mappedFilters = filters.map(el => (
    <GetFilterComponent {...el} nameTable={nameTable} key={el?.label} />
  ));

  return (
    <S.AdvancedFiltersWrapper onSubmit={onSubmit} noSearch={noSearch}>
      <S.CellWrapper>
        <S.AdvancedTitle>
          <FilterIcon /> Zaawansowane filtry:
        </S.AdvancedTitle>
      </S.CellWrapper>
      <S.CellWrapper>{mappedFilters}</S.CellWrapper>
      {searchFilter && (
        <S.CellWrapper>
          <S.SearchWrapper>
            <input
              value={filtersValues[searchFilter.name] || ''}
              onChange={e => onSearchChange(e.target.value)}
              placeholder={searchFilter?.placeholder}
            />
            <SearchIcon aria-hidden='false'>
              <title>{searchFilter?.label}</title>
            </SearchIcon>
          </S.SearchWrapper>
        </S.CellWrapper>
      )}
      <S.CellWrapper>
        {/* <SaveButton small type='submit' isVisible>
          Szukaj
        </SaveButton> */}
        <CancelButton small type='button' onClick={onReset} isVisible>
          Resetuj
        </CancelButton>
      </S.CellWrapper>
    </S.AdvancedFiltersWrapper>
  );
};

export default AdvancedFilters;
