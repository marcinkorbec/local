import React, { useState, useEffect, useRef } from 'react';
import MainWrapper from 'common/MainWrapper';
import CloseIcon from '@mui/icons-material/Close';
import PrintIcon from '@mui/icons-material/Print';
import { useReactToPrint } from 'react-to-print';
import * as S from './Committee.css';

const Committee = () => {
  const [inputs, setInputs] = useState([1]);
  const [gradeInputs, setGradeInputs] = useState([1, 2, 3, 4, 5, 6]);
  const [pricingInputs, setPricingInputs] = useState([1, 2, 3, 4, 5]);

  const [itemsValues, setItemsValues] = useState([{ id: 0, value: 0 }]);
  const [inputId, setInputId] = useState(10);

  const [total, setTotal] = useState(0);

  const initialValues = [
    'stan zachowania',
    'technika wykonania',
    'czas wykonania obiektu',
    'autor (o ile jest znany)',
    'powtarzalność obiektu na rynku antykwarycznym',
    'wycenę obiektu na rynku antykwarycznym',
  ];

  const initialPricingValues = [
    'ilość obiektów',
    'wymiary obiektów',
    'przydatność w działalności wystawienniczej',
    'materiał wykonania',
    'wymogi zdeponowania i formy konserwacji (o ile takie zostały wskazane przez użyczającego)',
  ];

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const addInput = setFunc => {
    setInputId(prev => prev + 1);

    if (setFunc === setItemsValues) {
      setFunc(prev => [...prev, { id: inputId, value: 0 }]);
    } else setFunc(prev => [...prev, inputId]);
  };

  const sumValues = () => {
    const sum = itemsValues.reduce(
      (prev, current) => prev + parseFloat(current.value),
      0
    );
    setTotal(sum);
  };

  const removeInput = (el, arrayName, setFunc) => {
    let newInputs;

    setFunc(newInputs);
    if (arrayName === itemsValues) {
      newInputs = arrayName.filter(e => e.id !== el);
    } else newInputs = arrayName.filter(e => e !== el);

    setFunc(newInputs);
    sumValues();
  };

  const updateValues = (el, e) => {
    const newValues = itemsValues;
    const index = newValues.findIndex(element => element.id === el);
    newValues.splice(index, 1, { id: el, value: e.target.value || 0 });

    setItemsValues(newValues);
    sumValues();
  };

  useEffect(() => {
    sumValues();
  }, [itemsValues]);

  const peopleInputsMap = inputs.map(el => (
    <S.Li key={el}>
      <S.Input type='text' />
      <S.Button remove onClick={() => removeInput(el, inputs, setInputs)}>
        <CloseIcon />
      </S.Button>
    </S.Li>
  ));

  const gradeInputsMap = gradeInputs.map((el, i) => (
    <S.Li key={el}>
      {i + 1}. <S.Input type='text' defaultValue={initialValues[i]} />
      <S.Button
        remove
        onClick={() => removeInput(el, gradeInputs, setGradeInputs)}
      >
        <CloseIcon />
      </S.Button>
    </S.Li>
  ));

  const pricingInputsMap = pricingInputs.map((el, i) => (
    <S.Li key={el}>
      {i + 1}. <S.Input type='text' defaultValue={initialPricingValues[i]} />
      <S.Button
        remove
        onClick={() => removeInput(el, pricingInputs, setPricingInputs)}
      >
        <CloseIcon />
      </S.Button>
    </S.Li>
  ));

  const itemsInputsMap = itemsValues.map(el => (
    <S.Li key={el.id}>
      <S.Input type='text' />
      <S.Input
        short
        price
        type='number'
        value={itemsValues[el]?.value}
        onChange={e => updateValues(el.id, e)}
      />
      zł
      <S.Button
        remove
        onClick={() => removeInput(el.id, itemsValues, setItemsValues)}
      >
        <CloseIcon />
      </S.Button>
    </S.Li>
  ));

  return (
    <MainWrapper>
      <S.Button onClick={handlePrint} print>
        <PrintIcon /> Drukuj
      </S.Button>
      <S.Wrapper>
        <S.Page ref={printRef}>
          <S.Text>
            Notatka służbowa z dnia <S.Input type='date' short />, dotycząca
            wyceny darowizny przedmiotów przekazanych <S.Input type='text' />
          </S.Text>
          <S.Text>
            Komisja ds. wyceny eksponatów w składzie:
            <S.Ul>
              {peopleInputsMap}
              <S.Button onClick={() => addInput(setInputs)}>+ Dodaj</S.Button>
            </S.Ul>
          </S.Text>

          <S.Text>
            Komisja poddała ocenie merytorycznej i wycenie rynkowej przedmioty
            określone w załączniku nr 1.
          </S.Text>

          <S.Text>
            W ocenie rynkowej uwzględniono:
            <S.Ol>{gradeInputsMap}</S.Ol>
            <S.Button onClick={() => addInput(setGradeInputs)}>
              + Dodaj
            </S.Button>
          </S.Text>

          <S.Text>
            W wycenie najmu uwzględniono:
            <S.Ol>{pricingInputsMap}</S.Ol>
            <S.Button onClick={() => addInput(setPricingInputs)}>
              + Dodaj
            </S.Button>
          </S.Text>

          <S.Text>
            Wartość użyczenia przedmiotów wykazanych w załączniku nr 1, została
            wyceniona na {Number.isNaN(total) ? '0' : total} zł.
          </S.Text>

          <S.Text style={{ textAlign: 'right' }}>
            <b>Komisja ds. wyceny eksponatów NCKF</b>
          </S.Text>
          <S.Text>
            <b>Załącznik nr 1</b>
          </S.Text>
          <S.Text>
            <S.Ul>{itemsInputsMap}</S.Ul>
            <S.Button onClick={() => addInput(setItemsValues)}>
              + Dodaj
            </S.Button>
          </S.Text>
        </S.Page>
      </S.Wrapper>
    </MainWrapper>
  );
};

export default Committee;
