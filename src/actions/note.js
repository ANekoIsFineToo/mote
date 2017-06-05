import { createAction } from 'redux-actions';

export const LOAD_DRAFT = '@@note/LOAD_DRAFT';
export const SAVE_DRAFT = '@@note/SAVE_DRAFT';

export const loadDraft = createAction(LOAD_DRAFT);
export const saveDraft = createAction(SAVE_DRAFT);
