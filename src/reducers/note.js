import { fromJS } from 'immutable';

import * as note from '../actions/note';

const initialState = fromJS({
  draft: {
    note: 0,
    title: '',
    content: '',
  },
});

export default (state = initialState, action) => {
  switch (action.type) {
    case note.SET_DRAFT: {
      return state.update('draft', draft => draft.merge(action.payload));
    }

    default: {
      return state;
    }
  }
};

export const getDraft = state => state.get('draft');
