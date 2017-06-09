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
});

export default (state = initialState, action) => {
  switch (action.type) {
    case note.SET_DRAFT: {
      return state.update('draft', draft => draft.merge(action.payload));
    }

    case note.SET_NOTE: {
      return state.update('note', note => note.merge(action.payload));
    }

    default: {
      return state;
    }
  }
};

export const getDraft = state => state.get('draft');
