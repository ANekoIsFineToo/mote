import { fromJS } from 'immutable';
import log from 'loglevel';
import { call, put, takeLatest } from 'redux-saga/effects';

import db from '../db';
import * as note from '../actions/note';

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

function* noteSaga() {
  yield takeLatest(note.LOAD_DRAFT, loadDraft);
  yield takeLatest(note.SAVE_DRAFT, saveDraft);
}

export default noteSaga;
