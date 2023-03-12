import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'm-web-components';
import { Table, Thead, Tbody, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import UsersTableRow from 'pages/Administration/Users/components/UsersTableRow';
import InspectionTableRow from 'pages/Inspection/InspectionTableRow';
import AccessionTableRow from 'pages/Books/Accession/components/AccessionTableRow';
import InventoryTableRow from 'pages/Books/Inventory/components/InventoryTableRow';
import ShortagesTableRow from 'pages/Books/Shortages/components/ShortagesTableRow';
import DepositoryTableRow from 'pages/Books/Depository/components/DepositoryTableRow';
import MuseumObjectsTableRow from 'pages/Registers/MuseumObjects/components/MuseumObjectsTableRow';
import EvidenceTableRow from 'pages/Registers/Evidence/components/EvidenceTableRow';
import SupportingEvidenceTableRow from 'pages/Registers/SupportingEvidence/components/SupportingEvidenceTableRow';
import CommitteeTableRow from 'pages/Committee/components/CommitteeTableRow';

import allActions from 'store/actions';
import ComponentIndicator from 'common/Indicators/ComponentIndicator';
import { ReactComponent as FilterIcon } from 'assets/filter.svg';
import SortIcon from './components/SortIcon';

import * as S from './Table.css';
import useSortResults from './components/useSortResults';
import { handleOnChangeSelectedRows } from './helpers/checkboxesFunc';

import {
  handleDragEnter,
  handleDragOver,
  handleDragStart,
  handleOnDrop,
} from './helpers/dragFunctions';
import AdvancedFilters from './components/AdvancedFilters/AdvancedFilters';
import InspectionItemsTableRow from '../../pages/Inspection/InspectionItemsTable/InspectionItemsTableRow';

const options = [
  { label: '5 wyników', value: 5 },
  { label: '10 wyników', value: 10 },
  { label: '15 wyników', value: 15 },
  { label: '20 wyników', value: 20 },
  { label: '50 wyników', value: 50 },
];

const TableComponent = ({
  columns,
  data: rows,
  name,
  getValues,
  rowFunctions, // e.g. object: { handleModalOpen, ...}
  noColumnFilter,
  noFilterColumns = [],
  advancedFilters,
  simple,
  selectedRows,
  setSelectedRows,
  setMenuFunctions,
  tableWrapperStyle,
  tableStyle,
  saveColsOrder,
  inspectionId,
  setInspectionId,
  noSearch,
  rowStatus,
  headerAutoHeight,
}) => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters[name]);
  const tableResults = useSelector(
    state => state.tableResults[`${name}Parameters`]
  );
  const [isDragActive, setIsDragActive] = useState(false);
  const [disableDrag, setDisableDrag] = useState(false);
  const { changeSort } = useSortResults(getValues);
  const pagination = useSelector(state => state.tableResults);
  const parametersName = `${name}Parameters`;
  const noInputFilterColumns = [...noFilterColumns, 'menu'];

  const [cols, setCols] = useState(columns);
  const [dragOver, setDragOver] = useState('');

  useEffect(() => {
    setCols(columns);
  }, [columns]);

  useEffect(() => {
    getValues({ ...filters, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    if (
      pagination[parametersName]?.page >
      +(
        pagination[parametersName]?.totalPages ||
        pagination[`${name}defaultParameters`]?.totalPages
      )
    ) {
      if (getValues) getValues({ page: 1 });
    }
  }, [pagination, parametersName, name, getValues]);

  const changeSize = value => getValues({ size: value.value, page: 1 });
  const changePage = (event, value) => getValues({ page: value });

  const handleColumnFilterChange = (value, field) => {
    dispatch(
      allActions.filters.setFilterTable({
        nameFilter: field,
        value,
        nameTable: name,
      })
    );
  };

  const header = cols.map(col => (
    <S.CustomTh
      isSortable={col.sorting}
      key={col.fieldName}
      isDragHover={col.fieldName === dragOver && col.draggable}
      onDragStart={e => {
        setIsDragActive(true);
        handleDragStart(e, cols);
      }}
      onDragEnd={() => {
        setDragOver('');
        setIsDragActive(false);
      }}
      onDragOver={e => handleDragOver(e)}
      onDragExit={() => setDragOver('')}
      onDrop={e => {
        setIsDragActive(false);
        handleOnDrop(e, cols, setCols, setDragOver, saveColsOrder);
      }}
      onDragEnter={e => handleDragEnter(e, setDragOver)}
      dragOver={col.fieldName === dragOver}
      draggable={col.draggable && !disableDrag}
      id={col.fieldName}
      headerAutoHeight={headerAutoHeight}
    >
      {col.component ? (
        col.component
      ) : (
        <S.HeaderCell isDragActive={isDragActive}>
          <S.HeaderTitle
            isSortable={col.sorting}
            onClick={col.sorting ? () => changeSort(col.fieldName) : null}
          >
            {col.title}{' '}
            {col.sorting && !simple && (
              <SortIcon
                direction={tableResults?.sortDirection}
                isCurrent={tableResults?.sortBy === col.fieldName}
              />
            )}
          </S.HeaderTitle>
          {!noColumnFilter && !noInputFilterColumns.includes(col.fieldName) && (
            <S.ColumnFilter>
              <FilterIcon />
              <input
                type={col.type || 'text'}
                onMouseEnter={() => setDisableDrag(true)}
                onMouseLeave={() => setDisableDrag(false)}
                value={filters[col.fieldName] || ''}
                onChange={e =>
                  handleColumnFilterChange(e.target.value, col.fieldName)
                }
                placeholder='...'
              />
            </S.ColumnFilter>
          )}
        </S.HeaderCell>
      )}
    </S.CustomTh>
  ));

  const rowsRender = rows?.map(row => {
    const props = {
      row,
      cols,
      dragOver,
      selectedRows,
      getValues,
      setMenuFunctions,
      ...rowFunctions,
      handleOnChangeSelectedRows: id =>
        handleOnChangeSelectedRows(id, selectedRows, setSelectedRows),
    };

    switch (name) {
      case 'users':
        return <UsersTableRow key={row.id} {...props} />;
      case 'inspection':
        return (
          <InspectionTableRow
            key={row.id}
            {...props}
            inspectionId={inspectionId}
            setInspectionId={setInspectionId}
          />
        );
      case 'inspectionItems':
        return (
          <InspectionItemsTableRow
            key={row.id}
            {...props}
            rowStatus={rowStatus}
          />
        );
      case 'accession':
        return <AccessionTableRow key={row.id} {...props} />;
      case 'inventory':
        return <InventoryTableRow key={row.id} {...props} />;
      case 'shortages':
        return <ShortagesTableRow key={row.id} {...props} />;
      case 'depository':
        return <DepositoryTableRow key={row.id} {...props} />;
      case 'evidence':
        return <MuseumObjectsTableRow key={row.id} {...props} />;
      case 'evidenceItem':
        return <EvidenceTableRow key={row.id} {...props} />;
      case 'supportingEvidenceItem':
        return <SupportingEvidenceTableRow key={row.id} {...props} />;
      case 'committee':
        return <CommitteeTableRow key={row.id} {...props} />;

      default:
        return <div>coś poszło nie tak...</div>;
    }
  });

  // !simple - for table at home
  return (
    <>
      {!rows ? (
        <ComponentIndicator />
      ) : (
        <S.Wrapper tableWrapperStyle={tableWrapperStyle}>
          {advancedFilters && (
            <AdvancedFilters
              filters={advancedFilters.filters}
              search={advancedFilters.search}
              getValues={getValues}
              nameTable={name}
              noSearch={noSearch}
            />
          )}
          <Table style={tableStyle}>
            <Thead>
              <Tr>{header}</Tr>
            </Thead>
            <Tbody>
              {rows?.length > 0 ? (
                rowsRender
              ) : (
                <Tr>
                  <S.EmptyTd>Brak wyników wyszukiwania.</S.EmptyTd>
                </Tr>
              )}
            </Tbody>
          </Table>
          <Pagination
            changePage={changePage}
            changeSize={changeSize}
            countPages={
              +(
                pagination[parametersName]?.totalPages ||
                pagination.defaultParameters?.totalPages
              )
            }
            size={
              +(
                pagination[parametersName]?.size ||
                pagination.defaultParameters?.size
              )
            }
            optionsPagination={options}
            customStyles={S.customStyles}
            customSelectStyles={S.customSelectStyles}
            defaultPage={1}
            page={pagination[parametersName]?.page || 1}
          />
        </S.Wrapper>
      )}
    </>
  );
};

export default TableComponent;
