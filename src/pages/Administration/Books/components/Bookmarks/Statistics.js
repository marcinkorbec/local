import React, { useEffect, useState } from 'react';
import { api } from 'API';
import { toast } from 'react-toastify';
import { OPTIONS } from 'utils/toastOptions';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { BookmarkWrapper, DoubleCell, Wrapper } from './Bookmarks.css';

const Statistics = () => {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const getStatistics = async () => {
      try {
        const { data } = await api.getStatistics();
        setStatistics(data);
      } catch {
        toast.error('Wystąpił błąd podczas pobierania danych', OPTIONS);
      }
    };

    getStatistics();
  }, []);

  const mappedData = statistics?.map(el => ({
    label: `${el.bookId} - ${el.bookName}`,
    value: el.items,
  }));

  return (
    <BookmarkWrapper>
      <Wrapper>
        <DoubleCell>
          <Chart data={mappedData}>
            <ArgumentAxis />
            <ValueAxis max={7} />

            <BarSeries valueField='value' argumentField='label' />
            <Title text='Statystyki ksiąg' />
            <Animation />
          </Chart>
        </DoubleCell>
      </Wrapper>
    </BookmarkWrapper>
  );
};

export default Statistics;
