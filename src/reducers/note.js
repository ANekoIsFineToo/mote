import { fromJS } from 'immutable';

import * as note from '../actions/note';

const initialState = fromJS({
  draft: {
    note: 0,
    title: '',
    content: '',
    bgColor: '',
  },
  note: {
    id: 1,
    title: '',
    content: '',
    bgColor: '',
  },
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case note.SAVE_DRAFT: {
      return state.update('draft', draft => draft.merge(action.payload));
    }

    case note.RESET_DRAFT: {
      return state.update('draft', () => initialState.get('draft'));
    }

    case note.SAVE_NOTE: {
      return state.update('note', note => note.merge(action.payload));
    }

    default: {
      return state;
    }
  }
};

export const getDraft = state => state.get('draft');
export const getNote = state => state.get('note');
