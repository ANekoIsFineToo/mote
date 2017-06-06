import { fromJS } from 'immutable';
import log from 'loglevel';
import Noty from 'noty';
import { push } from 'react-router-redux';
import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';

import db from '../db';
import * as note from '../actions/note';

function* loadDraft(action) {
  try {
    const data = yield call([db.drafts, 'get'], action.payload);

    yield put(note.setDraft(fromJS(data)));
  } catch (err) {
    log.error(err);
  }
}

function* saveDraft(action) {
  try {
    const data = action.payload;
    const parent = data.get('note');
    const title = data.get('title');
    const content = data.get('content');
    const bgColor = data.get('bgColor');

    yield put(note.setDraft(data));
    yield call([db.drafts, 'put'], { note: parent, title, content, bgColor });
  } catch (err) {
    log.error(err);
  }
}

function* saveNewNote(action) {
  try {
    const data = action.payload;
    const title = data.get('title');
    const content = data.get('content');
    const bgColor = data.get('bgColor');

    const id = yield call([db.notes, 'put'], { title, content, bgColor });
    yield call([db.drafts, 'put'], { note: id, title, content, bgColor });

    yield put(push('/note/' + id));

    new Noty({ type: 'success', text: 'La nota ha sido guardada correctamente.' }).show();

    yield put(note.resetDraft());

    const state = yield select();
    const draft = state.getIn(['note', 'draft']);

    yield put(note.saveDraft(draft));
  } catch (err) {
    log.error(err);

    new Noty({ type: 'error', text: 'Se ha producido un error al intentar guardar la nota.' }).show();
  }
}

function* loadNote(action) {
  try {
    const data = yield call([db.notes, 'get'], action.payload);

    yield put(note.setNote(fromJS(data)));
  } catch (err) {
    log.error(err);

    new Noty({ type: 'error', text: 'Se ha producido un error al intentar cargar la nota.' }).show();
  }
}

function* saveNote(action) {
  try {
    const state = yield select();

    const data = action.payload;
    const old = state.getIn(['note', 'note']);
    let parent = old.get('id');
    let title = old.get('title');
    let content = old.get('content');
    let bgColor = old.get('bgColor');

    yield put(note.setNote(data));
    yield call([db.versions, 'put'], { note: parent, title, content, bgColor });

    parent = data.get('note');
    title = data.get('title');
    content = data.get('content');
    bgColor = data.get('bgColor');

    yield call([db.notes, 'put'], { id: parent, title, content, bgColor });

    yield put(push('/note/' + parent));

    new Noty({ type: 'success', text: 'La nota ha sido actualizada correctamente.' }).show();
  } catch (err) {
    log.error(err);

    new Noty({ type: 'error', text: 'Se ha producido un error al intentar actualizar la nota.' }).show();
  }
}

function* removeNote(action) {
  try {
    const id = action.payload;

    // TODO: Move to trash instead of delete directly

    yield call([db.drafts.where('note').equals(id), 'delete']);
    yield call([db.notes.where('id').equals(id), 'delete']);
    yield call([db.versions.where('note').equals(id), 'delete']);

    yield put(push('/'));

    new Noty({ type: 'success', text: 'La nota ha sido eliminada correctamente.' }).show();
  } catch (err) {
    log.error(err);

    new Noty({ type: 'error', text: 'Se ha producido un error al intentar eliminar la nota.' }).show();
  }
}

function* loadVersions(action) {
  try {
    const id = action.payload;

    const versions = yield call([db.versions.where('note').equals(id), 'toArray'],);

    yield put(note.setVersions(fromJS(versions)));
  } catch (err) {
    log.error(err);
  }
}

function* noteSaga() {
  yield takeLatest(note.LOAD_DRAFT, loadDraft);
  yield takeLatest(note.SAVE_DRAFT, saveDraft);
  yield takeEvery(note.SAVE_NEW_NOTE, saveNewNote);
  yield takeLatest(note.LOAD_NOTE, loadNote);
  yield takeEvery(note.SAVE_NOTE, saveNote);
  yield takeEvery(note.REMOVE_NOTE, removeNote);
  yield takeLatest(note.LOAD_VERSIONS, loadVersions);
}

export default noteSaga;
