import React, { useEffect, useState } from 'react';
import Constructor from 'common/Contructor/Constructor';
import MainWrapper from 'common/MainWrapper';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { OPTIONS } from 'utils/toastOptions';
import { api } from 'API';
import { cellsContent, cellsContent2, layout, layout2 } from './defaultFields';

const ReportCreator = () => {
  const [itemData, setItemData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getItem = async () => {
      try {
        const { data } = await api.getItem(id);
        setItemData(data);
      } catch {
        toast.error(
          'Wystąpił błąd podczas ładowania danych przedmiotu.',
          OPTIONS
        );
      }
    };

    if (id) getItem();
  }, [id]);

  return (
    <MainWrapper>
      {((id && itemData) || !id) && (
        <Constructor
          initialLayout={layout}
          initialLayout2={layout2}
          cellsContent={cellsContent(itemData)}
          cellsContent2={cellsContent2(itemData)}
          itemData={itemData}
        />
      )}
    </MainWrapper>
  );
};

export default ReportCreator;
