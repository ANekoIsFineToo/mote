import { createAction } from 'redux-actions';

export const LOAD_DRAFT = '@@note/LOAD_DRAFT';
export const SAVE_DRAFT = '@@note/SAVE_DRAFT';
export const SET_DRAFT = '@@note/SET_DRAFT';
export const RESET_DRAFT = '@@note/RESET_DRAFT';

export const SAVE_NEW_NOTE = '@@note/SAVE_NEW_NOTE';

export const loadDraft = createAction(LOAD_DRAFT);
export const saveDraft = createAction(SAVE_DRAFT);
export const setDraft = createAction(SET_DRAFT);
export const resetDraft = createAction(RESET_DRAFT);

export const saveNewNote = createAction(SAVE_NEW_NOTE);
