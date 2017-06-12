import { createAction } from 'redux-actions';

export const SET_TITLE = '@@common/SET_TITLE';
export const SET_SNACKBAR = '@@common/SET_SNACKBAR';

export const setTitle = createAction(SET_TITLE);
export const setSnackbar = createAction(SET_SNACKBAR);
