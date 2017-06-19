import { fromJS } from 'immutable';

import * as note from '../actions/note';

export const initialState = fromJS({
  draft: {
    note: 0,
    title: '',
    content: '',
    color: '',
  },
  note: {
    id: 1,
    title: '',
    content: '',
    color: '',
  },
  notes: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case note.SET_DRAFT: {
      return state.set('draft', action.payload);
    }

    case note.SET_NOTE: {
      return state.set('note', action.payload);
    }

    case note.SET_NOTES: {
      return state.set('notes', action.payload);
    }

    default: {
      return state;
    }
  }
};

export const getDraft = state => state.get('draft');
export const getNote = state => state.get('note');
export const getNotes = state => state.get('notes');
