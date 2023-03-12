import React, { useContext, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import CreatorContext from 'pages/ItemCreator/CreatorContext';

import getImage from 'common/helpers/getImage';
import * as S from '../../ItemCreator.css';
import { Cell, QrWrapper, Wrapper, AddButton } from './Bookmarks.css';

const QRCode = () => {
  const printRef = useRef();
  const { itemData } = useContext(CreatorContext);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <S.BookmarkWrapper>
      <Wrapper>
        <Cell>
          <span>Kod QR obiektu</span>
          <QrWrapper ref={printRef}>
            {itemData.encodedQr ? (
              <>
                <img src={getImage(itemData.encodedQr)} alt='Kod QR' />
                <span>{`${itemData?.name?.pl} / ${itemData?.name?.en}`}</span>
              </>
            ) : (
              <span>Brak kodu QR</span>
            )}
          </QrWrapper>
          {itemData.encodedQr && (
            <AddButton
              style={{ marginTop: '15px' }}
              type='button'
              onClick={handlePrint}
            >
              Drukuj
            </AddButton>
          )}
        </Cell>
      </Wrapper>
    </S.BookmarkWrapper>
  );
};

export default QRCode;
