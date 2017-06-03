import { fromJS } from 'immutable';

import * as note from '../actions/note';

const initialState = fromJS({
  draft: '',
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case note.SAVE_DRAFT: {
      return state.update('draft', () => action.payload);
    }

    default: {
      return state;
    }
  }
};

export const getDraft = state => state.get('draft');
