import { fromJS } from 'immutable';
import { call, put, takeLatest } from 'redux-saga/effects';

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
    const note = draft.get('note');
    const title = draft.get('title');
    const content = draft.get('content');
    const bgColor = draft.get('bgColor');

    yield call([db.drafts, 'put'], { note, title, content, bgColor });
  } catch (err) {
    // TODO: Add logging
  }
}

function* noteSaga() {
  yield takeLatest(note.LOAD_DRAFT, loadDraft);
  yield takeLatest(note.SAVE_DRAFT, saveDraft);
}

export default noteSaga;
