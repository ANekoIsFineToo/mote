import { fromJS } from 'immutable';
import Noty from 'noty';
import { push } from 'react-router-redux';
import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';

import db from '../db';
import * as note from '../actions/note';

function* loadDraft(action) {
  try {
    const data = yield call([db.drafts, 'get'], action.payload);

    yield put(note.saveDraft(fromJS(data)));
  } catch (err) {
    // TODO: Add logging
  }
}

function* saveDraft(action) {
  try {
    const draft = action.payload;
    const parent = draft.get('note');
    const title = draft.get('title');
    const content = draft.get('content');
    const bgColor = draft.get('bgColor');

    yield call([db.drafts, 'put'], { note: parent, title, content, bgColor });
  } catch (err) {
    // TODO: Add logging
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
    yield call([db.versions, 'put'], { note: id, title, content, bgColor });

    yield put(push('/note/' + id));

    new Noty({ type: 'success', text: 'La nota ha sido guardada correctamente.' }).show();

    yield put(note.resetDraft());

    const state = yield select();
    const draft = state.getIn(['note', 'draft']);

    yield put(note.saveDraft(draft));
  } catch (err) {
    // TODO: Add logging
  }
}

function* loadNote(action) {
  try {
    const data = yield call([db.notes, 'get'], action.payload);

    yield put(note.saveNote(fromJS(data)));
  } catch (err) {
    // TODO: Add logging
  }
}

function* saveNote(action) {
  try {
    const data = action.payload;
    const parent = data.get('note');
    const title = data.get('title');
    const content = data.get('content');
    const bgColor = data.get('bgColor');

    yield call([db.notes, 'put'], { id: parent, title, content, bgColor });
    yield call([db.versions, 'put'], { note: parent, title, content, bgColor });

    yield put(push('/note/' + parent));

    new Noty({ type: 'success', text: 'La nota ha sido actualizada correctamente.' }).show();
  } catch (err) {
    // TODO: Add logging
  }
}

function* noteSaga() {
  yield takeLatest(note.LOAD_DRAFT, loadDraft);
  yield takeLatest(note.SAVE_DRAFT, saveDraft);
  yield takeEvery(note.SAVE_NEW_NOTE, saveNewNote);
  yield takeLatest(note.LOAD_NOTE, loadNote);
  yield takeLatest(note.SAVE_NOTE, saveNote);
}

export default noteSaga;
