import { createAction } from 'redux-actions';

export const LOAD_DRAFT = '@@note/LOAD_DRAFT';
export const SET_DRAFT = '@@note/SET_DRAFT';
export const SAVE_DRAFT = '@@note/SAVE_DRAFT';
export const RESET_DRAFT = '@@note/RESET_DRAFT';

export const SAVE_NEW_NOTE = '@@note/SAVE_NEW_NOTE';
export const LOAD_NOTE = '@@note/LOAD_NOTE';
export const SET_NOTE = '@@note/SET_NOTE';
export const SAVE_NOTE = '@@note/SAVE_NOTE';
export const REMOVE_NOTE = '@@note/REMOVE_NOTE';

export const LOAD_NOTES = '@@note/LOAD_NOTES';
export const SET_NOTES = '@@note/SET_NOTES';

export const LOAD_VERSION = '@@note/LOAD_VERSION';
export const SET_VERSION = '@@note/SET_VERSION';
export const RESTORE_VERSION = '@@note/RESTORE_VERSION';
export const REMOVE_VERSION = '@@note/REMOVE_VERSION';

export const LOAD_VERSIONS = '@@note/LOAD_VERSIONS';
export const SET_VERSIONS = '@@note/SET_VERSIONS';

export const loadDraft = createAction(LOAD_DRAFT);
export const setDraft = createAction(SET_DRAFT);
export const saveDraft = createAction(SAVE_DRAFT);
export const resetDraft = createAction(RESET_DRAFT);

export const saveNewNote = createAction(SAVE_NEW_NOTE);
export const loadNote = createAction(LOAD_NOTE);
export const setNote = createAction(SET_NOTE);
export const saveNote = createAction(SAVE_NOTE);
export const removeNote = createAction(REMOVE_NOTE);

export const loadNotes = createAction(LOAD_NOTES);
export const setNotes = createAction(SET_NOTES);

export const loadVersion = createAction(LOAD_VERSION);
export const setVersion = createAction(SET_VERSION);
export const restoreVersion = createAction(RESTORE_VERSION);
export const removeVersion = createAction(REMOVE_VERSION);

export const loadVersions = createAction(LOAD_VERSIONS);
export const setVersions = createAction(SET_VERSIONS);
