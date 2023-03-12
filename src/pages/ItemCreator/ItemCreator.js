import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import MainWrapper from 'common/MainWrapper';
import allActions from 'store/actions';
import { toast } from 'react-toastify';
import { api } from 'API';
import { OPTIONS } from 'utils/toastOptions';

import * as S from './ItemCreator.css';
import CreatorHeader from './components/CreatorHeader';
import CreatorContext from './CreatorContext';
import SideMenu from './components/SideMenu';
import Bookmark from './components/Bookmarks/Bookmark';
import { initialState } from './creatorConsts';
import { requestGenerator } from './requestGenerator';

const useQuery = () => new URLSearchParams(useLocation().search);

const NEW_ITEM_RESTORE = 'NEW_ITEM_RESTORE';

const ItemCreator = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const query = useQuery();
  const { id } = useParams();
  const [currentBook, setCurrentBook] = useState(0);
  const [currentBookmark, setCurrentBookmark] = useState(
    parseInt(query?.get('bookmarkId') || 0, 10)
  );
  const [itemData, setItemData] = useState(initialState);
  const [editingQueue, setEditingQueue] = useState([]);
  const [disableAll, setDisableAll] = useState(false);

  const getItem = async () => {
    try {
      const { data } = await api.getItem(id);
      setDisableAll(data?.closed);
      setItemData({ ...data, newImages: [], newAttachments: [] });
      dispatch(allActions.pageTitle.setTitle(data?.name?.pl));
    } catch (e) {
      toast.error('Wystąpił błąd podczas ładowania przedmiotu', OPTIONS);
    }
  };

  const restoreNotSaved = () => {
    const restore = localStorage.getItem(NEW_ITEM_RESTORE);

    if (typeof restore?.name === 'string') {
      localStorage.removeItem(NEW_ITEM_RESTORE);
      return;
    }

    if (restore) {
      const restored = JSON.parse(restore);
      if (restored.prevItemId === id)
        setItemData({ ...initialState, ...restored });
    }
  };

  useEffect(() => {
    restoreNotSaved();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (id) {
      getItem();
    } else {
      dispatch(allActions.pageTitle.setTitle('Nowy obiekt'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  useEffect(() => {
    if (!itemData.keywords) {
      setItemData(prev => ({
        ...prev,
        keywords: {
          pl: [],
          en: [],
        },
      }));
    }

    if (!id && typeof itemData.name !== 'string')
      try {
        const itemToSave = { ...itemData };
        itemToSave.newAttachments = undefined;
        itemToSave.images = undefined;
        itemToSave.newImages = undefined;
        itemToSave.preservationState = undefined;

        localStorage.setItem(
          NEW_ITEM_RESTORE,
          JSON.stringify({
            prevItemId: id,
            ...itemToSave,
          })
        );
      } catch {
        toast.warn(
          `Uwaga. Przekroczono ilość dostępnego miejsca podręcznego. 
          Przywracanie obiektu po wyjściu z kreatora może się nie udać.`
        );
      }
  }, [itemData, id]);

  const createNewItem = async () => {
    try {
      const { data } = await api.postAddItem(itemData);
      await Promise.all(
        requestGenerator({
          queue: editingQueue,
          itemId: data?.id,
          presId: data?.preservationState?.id,
          mainCount: itemData.mainCount,
        })
      );
      setEditingQueue([]);
      toast.success('Przedmiot został dodany', OPTIONS);
      localStorage.removeItem(NEW_ITEM_RESTORE);

      history.push(`/item-creator/${data.id}`);
    } catch (e) {
      toast.error(
        <div>
          <p>Wystąpił błąd</p>
          <p>
            {JSON.stringify(e?.response?.data?.message || e?.response?.data)}
          </p>
        </div>,
        OPTIONS
      );
    }
  };

  const updateItem = async () => {
    try {
      const { data } = await api.putUpdateItem(id, itemData);
      await Promise.all(
        requestGenerator({
          queue: editingQueue,
          itemId: id,
          presId: data?.preservationState?.id,
          mainCount: itemData.mainCount,
        })
      );
      getItem();
      setEditingQueue([]);
      toast.success('Przedmiot został zaktualizowany', OPTIONS);
    } catch (e) {
      toast.error(
        <div>
          <p>Wystąpił błąd</p>
          <p>
            {JSON.stringify(e?.response?.data?.message || e?.response?.data)}
          </p>
        </div>,
        OPTIONS
      );
    }
  };

  const handleSave = () => {
    if (!id) {
      createNewItem();
    } else {
      updateItem();
    }
  };

  const handleCancel = () => {
    if (id) {
      getItem();
    } else {
      setItemData(initialState);
    }
  };

  return (
    <CreatorContext.Provider
      value={{
        itemData,
        setItemData,
        getItem,
        currentBook,
        setCurrentBook,
        currentBookmark,
        setCurrentBookmark,
        editingQueue,
        setEditingQueue,
        handleCancel,
        handleSave,
        disableAll,
      }}
    >
      <MainWrapper>
        <S.CreatorWrapper>
          <CreatorHeader />
          <S.ContentWrapper>
            <SideMenu />
            <Bookmark />
          </S.ContentWrapper>
        </S.CreatorWrapper>
      </MainWrapper>
    </CreatorContext.Provider>
  );
};

export default ItemCreator;
