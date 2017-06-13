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

    if (data) {
      yield put(note.setDraft(fromJS(data)));
    }
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
    yield call([db.Drafts, 'put'], { note: id, title, content, color });

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

    if (data) {
      yield put(note.setNote(fromJS(data)));
    } else {
      yield put(push('/'));

      yield put(common.setSnackbar('No se ha encontrado la nota especificada.'))
    }
  } catch (err) {
    log.error(err);

    yield put(common.setSnackbar('Error al cargar la nota.'));
  }
}

function* saveNote(action) {
  try {
    const data = action.payload;
    const id = data.get('note');
    const title = data.get('title');
    const content = data.get('content');
    const color = data.get('color');

    yield call([db.Notes, 'put'], { id, title, content, color });

    yield put(push('/note/' + id));

    yield put(push(common.setSnackbar('Nota guardada.')));
  } catch (err) {
    log.error(err);

    yield put(common.setSnackbar('Error al guardar la nota.'));
  }
}

function* removeNote(action) {
  try {
    const id = action.payload;

    // TODO: Move to trash instead of delete directly

    yield call([db.Drafts.where('note').equals(id), 'delete']);
    yield call([db.Notes.where('id').equals(id), 'delete']);

    yield put(push('/'));

    yield put(common.setSnackbar('Nota eliminada.'));
  } catch (err) {
    log.error(err);

    yield put(common.setSnackbar('Error al eliminar la nota.'));
  }
}

function* noteSaga() {
  yield takeLatest(note.LOAD_DRAFT, loadDraft);
  yield takeLatest(note.SAVE_DRAFT, saveDraft);
  yield takeEvery(note.RESET_DRAFT, resetDraft);
  yield takeEvery(note.SAVE_NEW_NOTE, saveNewNote);
  yield takeLatest(note.LOAD_NOTE, loadNote);
  yield takeEvery(note.SAVE_NOTE, saveNote);
  yield takeEvery(note.REMOVE_NOTE, removeNote);
}

export default noteSaga;
