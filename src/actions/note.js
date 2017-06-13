import { createAction } from 'redux-actions';

export const LOAD_DRAFT = '@@note/LOAD_DRAFT';
export const SAVE_DRAFT = '@@note/SAVE_DRAFT';
export const SET_DRAFT = '@@note/SET_DRAFT';
export const RESET_DRAFT = '@@note/RESET_DRAFT';

export const SAVE_NEW_NOTE = '@@note/SAVE_NEW_NOTE';
export const LOAD_NOTE = '@@note/LOAD_NOTE';
export const SAVE_NOTE = '@@note/SAVE_NOTE';
export const SET_NOTE = '@@note/SET_NOTE';
export const REMOVE_NOTE = '@@note/REMOTE_NOTE';

export const loadDraft = createAction(LOAD_DRAFT);
export const saveDraft = createAction(SAVE_DRAFT);
export const setDraft = createAction(SET_DRAFT);
export const resetDraft = createAction(RESET_DRAFT);

export const saveNewNote = createAction(SAVE_NEW_NOTE);
export const loadNote = createAction(LOAD_NOTE);
export const saveNote = createAction(SAVE_NOTE);
export const setNote = createAction(SET_NOTE);
export const removeNote = createAction(REMOVE_NOTE);
