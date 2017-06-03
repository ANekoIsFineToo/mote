import { createAction } from 'redux-actions';

export const SAVE_DRAFT = '@@note/SAVE_DRAFT';

export const saveDraft = createAction(SAVE_DRAFT);
