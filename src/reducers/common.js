import { fromJS } from 'immutable';

import * as common from '../actions/common';

const initialState = fromJS({
  title: '',
});

export default (state = initialState, action) => {
  switch (action.type) {
    case common.SET_TITLE: {
      return state.set('title', action.payload);
    }

    default: {
      return state;
    }
  }
};

export const getTitle = state => state.get('title');
