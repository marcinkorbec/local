/* eslint-disable jsx-a11y/media-has-caption */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Player } from 'video-react';
import ReactAudioPlayer from 'react-audio-player';
import CreatorContext from 'pages/ItemCreator/CreatorContext';
import { toast } from 'react-toastify';
import { OPTIONS } from 'utils/toastOptions';
import { api } from 'API';

import * as S from '../../ItemCreator.css';
import {
  AddButton,
  SelectedFile,
  DoubleCell,
  Item,
  Wrapper,
  CellRow,
} from './Bookmarks.css';

const getVideoExt = name => (/[.]/.exec(name) ? /[^.]+$/.exec(name) : 'mp4');
const getAudioExt = name => (/[.]/.exec(name) ? /[^.]+$/.exec(name) : 'mp3');

const Video = ({ el }) => {
  const [vidSrc, setVidSrc] = useState();

  useEffect(() => {
    const getVideo = async () => {
      try {
        const { data } = await api.getFile(el.id);

        setVidSrc(
          URL.createObjectURL(
            new Blob([data], { type: `video/${getVideoExt(el.name)}` })
          )
        );
      } catch {
        toast.error(
          'Wystąpił błąd podczas ładowania jednego z plików video.',
          OPTIONS
        );
      }
    };
    if (el) getVideo();
  }, [el]);

  return <Player src={vidSrc} fluid={false} width={500} height={500} />;
};

const Audio = ({ el }) => {
  const [vidSrc, setVidSrc] = useState();

  useEffect(() => {
    const getAudio = async () => {
      try {
        const { data } = await api.getFile(el.id);

        setVidSrc(
          URL.createObjectURL(
            new Blob([data], { type: `audio/${getAudioExt(el.name)}` })
          )
        );
      } catch {
        toast.error(
          'Wystąpił błąd podczas ładowania jednego z plików video.',
          OPTIONS
        );
      }
    };
    if (el) getAudio();
  }, [el]);

  return <ReactAudioPlayer src={vidSrc} controls />;
};

const fileTypes = {
  AUDIO: 'AUDIO',
  VIDEO: 'VIDEO',
};

const MultimediaFiles = () => {
  const fileRefAudio = useRef();
  const fileRefVideo = useRef();
  const { itemData, getItem } = useContext(CreatorContext);
  const [videoFile, setVideoFile] = useState();
  const [audioFile, setAudioFile] = useState();
  const [loading, setLoading] = useState(false);
  const handleAddFileVideo = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoFile(file);
  };

  const handleAddFileAudio = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAudioFile(file);
  };

  const handleSubmitFile = async type => {
    try {
      setLoading(true);
      // eslint-disable-next-line no-undef
      const fd = new FormData();
      if (type === fileTypes.VIDEO) fd.append('file', videoFile);
      if (type === fileTypes.AUDIO) fd.append('file', audioFile);

      await api.fileADD(itemData.id, type, fd);

      getItem();

      if (type === fileTypes.VIDEO) setVideoFile(null);
      if (type === fileTypes.AUDIO) setAudioFile(null);
      setLoading(false);
      toast.success('Plik został dodany.', OPTIONS);
    } catch {
      toast.error('Wystąpił błąd podczas dodawania pliku.', OPTIONS);
    }
  };

  const handleDelete = async id => {
    try {
      await api.fileDELETE(id);

      getItem();

      toast.success('Plik został usunięty.', OPTIONS);
    } catch {
      toast.error('Wystąpił błąd podczas usuwania pliku.', OPTIONS);
    }
  };
  const mappedVideo = itemData?.video?.map(el => (
    <Item key={el.name} video>
      <CellRow>
        <AddButton
          style={{ margin: '15px 15px 15px 0' }}
          type='button'
          onClick={() => handleDelete(el.id)}
        >
          Usuń
        </AddButton>
        <span>{el.name}</span>
      </CellRow>
      <Video el={el} />
    </Item>
  ));

  const mappedAudio = itemData?.audio?.map(el => (
    <Item key={el.name}>
      <AddButton
        style={{ margin: '15px 15px 15px 0' }}
        type='button'
        onClick={() => handleDelete(el.id)}
      >
        Usuń
      </AddButton>
      <span>{el.name}</span>
      <Audio el={el} />
    </Item>
  ));

  return (
    <S.BookmarkWrapper disabled={!itemData.id}>
      {!itemData.id && (
        <h1 style={{ color: 'red' }}>
          Aby dodawać pliki multimedialne należy najpierw zapisać obiekt
        </h1>
      )}
      <Wrapper>
        <DoubleCell>
          <span>Pliki video</span>
          <SelectedFile>
            <input
              ref={fileRefVideo}
              type='file'
              accept='video/*'
              placeholder='Dołącz'
              onChange={handleAddFileVideo}
            />
            <button
              type='button'
              onClick={() => fileRefVideo?.current?.click()}
            >
              Dodaj plik video
            </button>
            <span>{videoFile?.name}</span>
          </SelectedFile>
          <AddButton
            style={{ marginTop: '15px' }}
            disabled={!videoFile || loading}
            type='button'
            onClick={() => handleSubmitFile(fileTypes.VIDEO)}
          >
            Zatwierdź
          </AddButton>
          {mappedVideo}
        </DoubleCell>
        <DoubleCell>
          <span>Pliki audio</span>
          <SelectedFile>
            <input
              ref={fileRefAudio}
              type='file'
              accept='audio/*'
              placeholder='Dołącz'
              onChange={handleAddFileAudio}
            />
            <button
              type='button'
              onClick={() => fileRefAudio?.current?.click()}
            >
              Dodaj plik audio
            </button>
            <span>{audioFile?.name}</span>
          </SelectedFile>
          <AddButton
            style={{ marginTop: '15px' }}
            disabled={!audioFile || loading}
            type='button'
            onClick={() => handleSubmitFile(fileTypes.AUDIO)}
          >
            Zatwierdź
          </AddButton>
          {mappedAudio}
        </DoubleCell>
      </Wrapper>
    </S.BookmarkWrapper>
  );
};

export default MultimediaFiles;
