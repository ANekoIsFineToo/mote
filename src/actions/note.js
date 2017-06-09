import { createAction } from 'redux-actions';

export const LOAD_DRAFT = '@@note/LOAD_DRAFT';
export const SAVE_DRAFT = '@@note/SAVE_DRAFT';
export const SET_DRAFT = '@@note/SET_DRAFT';

export const loadDraft = createAction(LOAD_DRAFT);
export const saveDraft = createAction(SAVE_DRAFT);
export const setDraft = createAction(SET_DRAFT);
