import React, { useEffect, useState } from 'react';
import { api } from 'API';
import { toast } from 'react-toastify';
import { OPTIONS } from 'utils/toastOptions';

import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';

import AddWorker from './AddWorker';

import * as S from './Inspection.css';

const InspectionWorkers = ({ inspectionId }) => {
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState({
    name: '',
    surname: '',
  });
  const [participationTypes, setParticipationTypes] = useState([]);
  const [inspectionTeams, setInspectionTeams] = useState([]);
  const [selectedType, setSelectedType] = useState();
  const [togglePopUp, setTogglePopUp] = useState();
  const [teamName, setTeamName] = useState('');
  const [addedWorkers, setAddedWorkers] = useState();
  const [disabled, setDisabled] = useState(false);
  const [addNew, setAddNew] = useState(false);

  const getInspectionWorkers = async () => {
    try {
      const resp = await api.getInspectionWorkers();
      setWorkers(resp.data);
    } catch (err) {
      toast.error(<div>{err}</div>);
    }
  };

  const getParticipationTypes = async () => {
    try {
      const resp = await api.getParticipationTypes();
      setParticipationTypes(resp.data);
    } catch (err) {
      toast.error(<div>{err}</div>);
    }
  };

  const closePopUp = () => {
    setTogglePopUp(false);
    setSelectedType(null);
    setSelectedWorker({ name: '', surname: '' });
    setTeamName('');
  };

  const addWorker = async () => {
    const data = {
      participationType: selectedType,
      workerName: selectedWorker?.name,
      workerSurname: selectedWorker?.surname,
      teamName,
    };
    if (inspectionId) {
      try {
        setDisabled(true);
        const resp = await api.putAddWorker(inspectionId, data);
        setAddedWorkers(resp.data.inspectionMembers);
        setDisabled(false);
        closePopUp();
        toast.success('Pomyślnie dodano osobę do zespołu.');
        getInspectionWorkers();
      } catch (err) {
        toast.error(
          <div>
            {JSON.stringify(
              err?.response?.data?.message || err?.response?.data
            )}
          </div>,
          OPTIONS
        );
      }
    } else {
      toast.error('Aby dodać uczestnika wybierz najpierw skontrum.');
    }
    setDisabled(false);
  };

  const getInspectionTeams = async () => {
    try {
      const resp = await api.getInspectionTeams();
      setInspectionTeams(resp.data);
    } catch (err) {
      toast.error(
        <div>
          {JSON.stringify(err?.response?.data?.message || err?.response?.data)}
        </div>,
        OPTIONS
      );
    }
  };

  const getInspectionDetails = async () => {
    if (inspectionId)
      try {
        const resp = await api.getInspectionDetails(inspectionId);
        setAddedWorkers(resp.data.inspectionMembers);
      } catch (err) {
        err?.response?.data?.errors?.map(el =>
          toast.error(<div>{el.defaultMessage}</div>, OPTIONS)
        );
      }
  };

  const deleteWorker = async workerId => {
    try {
      const resp = await api.deleteWorker(inspectionId, workerId);
      setAddedWorkers(resp.data.inspectionMembers);
    } catch (err) {
      toast.error(
        <div>
          {JSON.stringify(err?.response?.data?.message || err?.response?.data)}
        </div>,
        OPTIONS
      );
    }
  };

  useEffect(() => {
    getInspectionDetails();
    getInspectionWorkers();
    getParticipationTypes();
    getInspectionTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getInspectionTeams();
  }, [addedWorkers]);

  useEffect(() => {
    getInspectionDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inspectionId]);

  const selectWorker = worker => {
    setSelectedWorker({
      workerId: worker.workerId,
      name: worker.name,
      surname: worker.surname,
    });
  };

  const addExisting = () => {
    setAddNew(false);
    setTogglePopUp(true);
  };

  const workersList = workers?.map(el => (
    <S.ListEl key={el.workerId} onClick={() => selectWorker(el)}>
      {el.name} {el.surname}
      <S.Button
        onClick={addExisting}
        type='button'
        addButton
        disabled={inspectionId == null}
      >
        <AddIcon /> Dodaj
      </S.Button>
    </S.ListEl>
  ));

  const addedWorkersList = addedWorkers?.map(el => (
    <S.ListEl key={el.name} addedWorkers>
      <S.ElWrap>
        {el.name} {el.surname} <S.Role>{el.participationType}</S.Role>
        <S.TeamName> {el.team}</S.TeamName>
      </S.ElWrap>
      <S.Button onClick={() => deleteWorker(el.workerId)} deleteButton>
        <ClearIcon />
      </S.Button>
    </S.ListEl>
  ));

  const addNewPerson = () => {
    setSelectedWorker(null);
    setAddNew(true);
    setTogglePopUp(true);
  };

  return (
    <>
      <S.WorkersWrapper>
        <S.ListWrap>
          <S.WorkersList>
            <S.Titlebar>Lista osób</S.Titlebar>
            <S.List>{workersList}</S.List>
          </S.WorkersList>

          <S.WorkersList>
            <S.Titlebar>Uczestnicy skontrum</S.Titlebar>
            <S.List>
              {inspectionId == null ? (
                <S.Notice>
                  Wybierz skontrum z listy, aby zarządzać użytkownikami
                </S.Notice>
              ) : (
                addedWorkersList
              )}
            </S.List>
          </S.WorkersList>
        </S.ListWrap>
        <S.Button onClick={addNewPerson} disabled={inspectionId == null}>
          <AddIcon />
          Dodaj nową osobę
        </S.Button>
      </S.WorkersWrapper>

      <AddWorker
        addWorker={addWorker}
        participationTypes={participationTypes}
        inspectionTeams={inspectionTeams}
        togglePopUp={togglePopUp}
        setTogglePopUp={setTogglePopUp}
        setSelectedType={setSelectedType}
        setTeamName={setTeamName}
        selectedType={selectedType}
        teamName={teamName}
        disabled={disabled}
        setSelectedWorker={setSelectedWorker}
        selectedWorker={selectedWorker}
        addNew={addNew}
        closePopUp={closePopUp}
      />
    </>
  );
};
export default InspectionWorkers;
