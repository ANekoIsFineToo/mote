import { fromJS } from 'immutable';
import log from 'loglevel';
import { push } from 'react-router-redux';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import db from '../db';
import * as common from '../actions/common';
import * as note from '../actions/note';
import * as fromNote from '../reducers/note';

function* loadDraft(action) {
  try {
    const data = yield call([db.Drafts, 'get'], action.payload);

    yield put(note.setDraft(fromJS(data)));
  } catch (err) {
    log.error(err);
  }
}

function* saveDraft(action) {
  try {
    const data = action.payload;

    yield put(note.setDraft(data));
    yield call([db.Drafts, 'put'], data.toJS());
  } catch (err) {
    log.error(err);
  }
}

function* resetDraft() {
  yield put(note.saveDraft(fromNote.initialState.get('draft')));
}

function* saveNewNote(action) {
  try {
    const data = action.payload;
    const title = data.get('title');
    const content = data.get('content');
    const color = data.get('color');

    const id = yield call([db.Notes, 'put'], { title, content, color });
    yield call([db.Drafts, 'put'], data.toJS());

    yield put(push('/note/' + id));

    yield put(common.setSnackbar('Nota guardada.'));

    yield put(note.resetDraft());
  } catch (err) {
    log.error(err);

    yield put(common.setSnackbar('Error al guardar la nota.'));
  }
}

function* loadNote(action) {
  try {
    const data = yield call([db.Notes, 'get'], action.payload);

    yield put(note.setNote(fromJS(data)));
  } catch (err) {
    log.error(err);

    yield put(common.setSnackbar('Error al cargar la nota.'));
  }
}

function* noteSaga() {
  yield takeLatest(note.LOAD_DRAFT, loadDraft);
  yield takeLatest(note.SAVE_DRAFT, saveDraft);
  yield takeEvery(note.RESET_DRAFT, resetDraft);
  yield takeEvery(note.SAVE_NEW_NOTE, saveNewNote);
  yield takeLatest(note.LOAD_NOTE, loadNote);
}

export default noteSaga;
