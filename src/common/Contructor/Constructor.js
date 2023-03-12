import { SaveButton } from 'common/Buttons';
import React, { useEffect, useRef, useState } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { useReactToPrint } from 'react-to-print';
import { api } from 'API';
import { toast } from 'react-toastify';
import { OPTIONS } from 'utils/toastOptions';
import CompactTypeSettings from './components/CompactTypeSettings';
import PaddingSettings from './components/PaddingSettings';
import EmptyCell from './EmptyCell';
import * as S from './Constructor.css';

// eslint-disable-next-line new-cap
const GridLayout = WidthProvider(RGL);

export const ITEM_REPORT_NAME = 'INVENTORY';

const Constructor = ({
  initialLayout,
  initialLayout2,
  cellsContent,
  cellsContent2,
}) => {
  const printRef = useRef();
  const [loadedSettings, setLoadedSettings] = useState({});
  const [allCells, setAllCells] = useState(cellsContent);
  const [empty, setEmpty] = useState(0);
  const [newLayout, setNewLayout] = useState(initialLayout);
  const [settings, setSettings] = useState({
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    compactType: {
      value: 'vertical',
      label: 'Pionowe',
    },
  });

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleSave = async () => {
    const body = {
      content: JSON.stringify({ settings, layout: newLayout }),
      type: ITEM_REPORT_NAME,
    };
    try {
      if (!loadedSettings?.id) {
        await api.postReport(body);
      } else {
        await api.putReport(loadedSettings.id, body);
      }
      toast.success('Ustawienia zostały zapisane', OPTIONS);
    } catch {
      toast.error('Wystąpił błąd podczas zapisywania ustawień', OPTIONS);
    }
  };

  const handleDeleteSettings = async () => {
    if (loadedSettings?.id) {
      try {
        await api.deleteReport(loadedSettings.id);
        setNewLayout(initialLayout);
        setAllCells(cellsContent);
      } catch {
        toast.error('Podczas usuwania wystąpił błąd.', OPTIONS);
      }
    } else {
      toast.error(
        'Nie można ususnąć ustawień, ponieważ żadne nie zostały wczytane.',
        OPTIONS
      );
    }
  };

  const handleRestoreSettings = async () => {
    if (loadedSettings?.id) {
      try {
        const { data } = await api.getReports();
        setLoadedSettings(
          data?.filter(e => e.reportType === ITEM_REPORT_NAME)[0]
        );
        setAllCells(cellsContent);
      } catch {
        toast.error('Wystąpił błąd podczas ładowania ustawień raportu.');
      }
    } else {
      setNewLayout(initialLayout);
      setAllCells(cellsContent);
    }
  };

  const handleLayoutChange = e => {
    setNewLayout(e);
  };

  const handleDelete = key => {
    setNewLayout(prev => prev.filter(el => el.i !== key));
    setAllCells(prev => prev.filter(el => el.key !== key));
  };

  const handleAddEmpty = () => {
    const key = `empty_${empty}`;
    const init = {
      i: key,
      x: 30,
      y: 36,
      w: 4,
      h: 4,
    };
    const content = {
      key,
      content: <EmptyCell handleDelete={() => handleDelete(key)} />,
    };

    setNewLayout(prev => [...prev, init]);
    setAllCells(prev => [...prev, content]);
    setEmpty(prev => prev + 1);
  };

  useEffect(() => {
    const getReport = async () => {
      try {
        const { data } = await api.getReports();
        setLoadedSettings(
          data?.filter(e => e.reportType === ITEM_REPORT_NAME)[0]
        );
      } catch {
        toast.error('Wystąpił błąd podczas ładowania ustawień raportu.');
      }
    };
    getReport();
    setAllCells(cellsContent);
  }, [cellsContent]);

  useEffect(() => {
    if (loadedSettings?.content) {
      const { settings: importedSettings, layout } = JSON.parse(
        loadedSettings.content
      );

      let emptyCounter = 0;
      const emptyCellsArr = [];

      layout.forEach(el => {
        if (el.i.includes('empty_')) {
          const content = {
            key: el.i,
            content: <EmptyCell handleDelete={() => handleDelete(el.i)} />,
          };
          emptyCellsArr.push(content);
          emptyCounter += 1;
        }
      });

      setEmpty(emptyCounter);
      setAllCells(prev => [...prev, ...emptyCellsArr]);

      setSettings(importedSettings);
      setNewLayout(layout);
    }
  }, [loadedSettings]);

  const mappedCells = allCells.map(el => <div key={el.key}>{el.content}</div>);
  const mappedCells2 = cellsContent2.map(el => (
    <div key={el.key}>{el.content}</div>
  ));

  return (
    <S.Wrapper>
      <S.SideMenu>
        <h1>Konstruktor raportów</h1>

        <h2>Marginesy:</h2>
        <PaddingSettings
          paddings={settings.padding}
          setSettings={setSettings}
        />

        <h2>Wyrównanie:</h2>
        <CompactTypeSettings
          compactType={settings.compactType}
          setSettings={setSettings}
        />
        <S.ButtonsContainer>
          <SaveButton type='button' onClick={handlePrint} small>
            Drukuj
          </SaveButton>
          <SaveButton type='button' onClick={handleSave} small>
            Zapisz
          </SaveButton>
        </S.ButtonsContainer>
        <S.ButtonsContainer>
          <SaveButton type='button' onClick={handleAddEmpty}>
            Dodaj puste pole
          </SaveButton>
        </S.ButtonsContainer>
        <S.ButtonsContainer>
          <SaveButton type='button' onClick={handleRestoreSettings}>
            Przywróć ustawienie
          </SaveButton>
        </S.ButtonsContainer>
        <S.ButtonsContainer>
          <SaveButton type='button' onClick={handleDeleteSettings}>
            Usuń zapisane ustawienia
          </SaveButton>
        </S.ButtonsContainer>
      </S.SideMenu>
      <S.PrintWrapper ref={printRef}>
        <S.PageWrapper padding={settings.padding} id='section-to-print'>
          <GridLayout
            key={JSON.stringify(settings.padding)}
            className='layout'
            layout={newLayout}
            cols={30}
            rowHeight={
              32 -
              Math.floor(
                (settings.padding.top * 37 + settings.padding.bottom * 37) / 35
              )
            }
            maxRows={35}
            margin={[0, 0]}
            compactType={settings.compactType.value}
            onLayoutChange={handleLayoutChange}
          >
            {mappedCells}
          </GridLayout>
        </S.PageWrapper>
        <S.PageWrapper padding={settings.padding} id='section-to-print'>
          <GridLayout
            key={JSON.stringify(settings.padding)}
            className='layout'
            layout={initialLayout2}
            cols={30}
            rowHeight={
              32 -
              Math.floor(
                (settings.padding.top * 37 + settings.padding.bottom * 37) / 35
              )
            }
            maxRows={35}
            margin={[0, 0]}
            compactType={settings.compactType.value}
          >
            {mappedCells2}
          </GridLayout>
        </S.PageWrapper>
      </S.PrintWrapper>
    </S.Wrapper>
  );
};

export default Constructor;
