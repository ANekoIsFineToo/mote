import { fromJS } from 'immutable';
import { push } from 'react-router-redux';
import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';

import db from '../db';
import * as note from '../actions/note';

function* loadDraft(action) {
  try {
    const draft = yield call([db.drafts, 'get'], action.payload);

    yield put(note.saveDraft(fromJS(draft)));
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

    yield put(push('/note/' + id));

    // TODO: Display `note saved` message

    yield put(note.resetDraft());

    const state = yield select();
    const draft = state.getIn(['note', 'draft']);

    yield put(note.saveDraft(draft));
  } catch (err) {
    // TODO: Add logging
  }
}

function* noteSaga() {
  yield takeLatest(note.LOAD_DRAFT, loadDraft);
  yield takeLatest(note.SAVE_DRAFT, saveDraft);
  yield takeEvery(note.SAVE_NEW_NOTE, saveNewNote);
}

export default noteSaga;
