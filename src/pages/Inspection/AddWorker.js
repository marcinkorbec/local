import React, { useState } from 'react';
import Select from 'react-select';

import PopUp from 'common/PopUp/PopUp';

import * as S from './Inspection.css';
import { Buttons, Button } from '../../common/PopUp/PopUp.css';

const AddWorker = ({
  addWorker,
  togglePopUp,
  setSelectedType,
  setTeamName,
  selectedType,
  teamName,
  inspectionTeams,
  participationTypes,
  disabled,
  selectedWorker,
  setSelectedWorker,
  addNew,
  closePopUp,
}) => {
  const [checked, setChecked] = useState(false);

  const handleChange = e => {
    setSelectedType(e.value);
  };

  const handleTeamName = e => {
    setTeamName(e.value);
  };

  const handleTeamNameInput = e => {
    setTeamName(e.target.value);
  };

  const teamsOptions = inspectionTeams?.map(el => ({ value: el, label: el }));

  const options = participationTypes?.map(el => ({ value: el, label: el }));

  return (
    <PopUp
      title='Dodaj uczestnika'
      togglePopUp={togglePopUp}
      setTogglePopUp={closePopUp}
    >
      {addNew === true && (
        <>
          <S.Label>
            Imię:
            <S.Input
              name='workerName'
              value={selectedWorker?.name}
              onChange={e =>
                setSelectedWorker(prev => ({ ...prev, name: e.target.value }))
              }
            />
          </S.Label>

          <S.Label>
            Nazwisko:
            <S.Input
              name='workerSurname'
              value={selectedWorker?.surname}
              onChange={e =>
                setSelectedWorker(prev => ({
                  ...prev,
                  surname: e.target.value,
                }))
              }
            />
          </S.Label>
        </>
      )}
      <S.Label htmlFor='role'>Wybierz funkcję: </S.Label>
      <Select
        id='role'
        options={options}
        value={options?.filter(obj => obj.value === selectedType)}
        onChange={handleChange}
      />
      <S.Label htmlFor='team_name'>Wybierz z listy nazwę zespołu:</S.Label>
      <Select
        id='team_name'
        options={teamsOptions}
        value={teamsOptions?.filter(obj => obj.value === teamName)}
        onChange={handleTeamName}
      />
      <S.Label htmlFor='team_name_input' checkboxLabel>
        <input
          type='checkbox'
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
          id='team_name_input'
        />
        lub wpisz własną:
      </S.Label>
      <S.Input
        value={teamName}
        onChange={handleTeamNameInput}
        disabled={!checked}
      />
      <Buttons>
        <Button onClick={addWorker} disabled={disabled}>
          Dodaj
        </Button>
        <Button onClick={closePopUp}>Anuluj</Button>
      </Buttons>
    </PopUp>
  );
};

export default AddWorker;
