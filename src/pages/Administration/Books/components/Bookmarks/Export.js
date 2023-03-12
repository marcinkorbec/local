import React, { useContext, useState } from 'react';
import BookContext from 'pages/Administration/Books/BookContext';
import StyledSelect from 'common/Inputs/StyledSelect';
import { toast } from 'react-toastify';
import { OPTIONS } from 'utils/toastOptions';
import { api } from 'API';
import { BookmarkWrapper, Wrapper, Cell, SubmitButton } from './Bookmarks.css';
import { selectBooks, selectExt } from '../../constants';

const defaultReqData = {
  selectedBook: null,
  selectedExt: null,
};

const Export = () => {
  const { defaultBook } = useContext(BookContext);
  const [reqData, setReqData] = useState({
    ...defaultReqData,
    selectedBook: selectBooks.filter(e => e.value === defaultBook)?.[0] || null,
  });

  const handleExport = async () => {
    try {
      const { data } = await api.getExportFile(
        reqData.selectedBook.value,
        reqData.selectedExt.value
      );

      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      //   const json = JSON.stringify(data);
      const blob = new Blob([data], { type: 'octet/stream' });
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = `Export z ${reqData.selectedBook?.label}${reqData.selectedExt?.label}`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success('Plik został pobrany.', OPTIONS);
    } catch {
      toast.error('Wystąpił bład podczas exportowania.', OPTIONS);
    }
  };

  return (
    <BookmarkWrapper>
      <Wrapper>
        <Cell>
          <span>Export danych</span>
        </Cell>
        <Cell />
        <Cell>
          <span>Księga</span>
          <StyledSelect
            value={reqData.selectedBook}
            options={selectBooks}
            onChange={e => setReqData(prev => ({ ...prev, selectedBook: e }))}
          />
        </Cell>
        <Cell />
        <Cell>
          <span>Rozszerzenie</span>
          <StyledSelect
            value={reqData.selectedExt}
            options={selectExt}
            onChange={e => setReqData(prev => ({ ...prev, selectedExt: e }))}
          />
        </Cell>
        <Cell />
        <Cell>
          <SubmitButton
            disabled={
              reqData.selectedBook === null ||
              reqData.selectedExt === null ||
              reqData.selectedBook === undefined ||
              reqData.selectedExt === undefined
            }
            onClick={handleExport}
            type='button'
          >
            Exportuj
          </SubmitButton>
        </Cell>
      </Wrapper>
    </BookmarkWrapper>
  );
};

export default Export;
