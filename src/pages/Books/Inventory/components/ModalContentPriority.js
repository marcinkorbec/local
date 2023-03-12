import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { api } from 'API';
import { toast } from 'react-toastify';
import { OPTIONS } from 'utils/toastOptions';
import { centerFlex } from 'styles/mixins';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  width: 600px;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
`;

const ItemListWrapper = styled.div`
  height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  border: 2px solid lightgray;
`;

const ItemWrapper = styled.div`
  width: 100%;
  min-height: 75px;
  padding: 5px;
  display: grid;
  grid-template-columns: 30% 15% 40% 15%;
  border-bottom: 1px solid lightgray;
`;

const ItemWrapperHeader = styled(ItemWrapper)`
  position: sticky;
  border-bottom: 2px solid lightgray;
  top: 0;
`;

const ItemCell = styled.div`
  ${centerFlex};

  &:not(:first-child) {
    border-left: 1px solid lightgray;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
  }
`;

const ModalContentPriority = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const { data } = await api.getEvacuations();
        setLocations(data);
      } catch {
        toast.error('Wystąpił błąd podczas ładowania listy ksiąg', OPTIONS);
      }
    };
    getList();
  }, []);

  const mappedLocations = locations?.map(el => (
    <ItemWrapper key={el.locationId}>
      <ItemCell>{el.priority || 'Nieokreślony'}</ItemCell>
      <ItemCell>{el.locationId}</ItemCell>
      <ItemCell>{el.name}</ItemCell>
      <ItemCell>
        <Link to={`/admin/generalData/0?locationId=${el.locationId}`}>
          Zmień
        </Link>
      </ItemCell>
    </ItemWrapper>
  ));

  return (
    <Wrapper>
      <ItemListWrapper>
        <ItemWrapperHeader key='header'>
          <ItemCell>Priorytet</ItemCell>
          <ItemCell>ID</ItemCell>
          <ItemCell>Lokalizacja</ItemCell>
          <ItemCell />
        </ItemWrapperHeader>
        {mappedLocations}
      </ItemListWrapper>
    </Wrapper>
  );
};

export default ModalContentPriority;
