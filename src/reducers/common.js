import { fromJS } from 'immutable';

import * as common from '../actions/common';

const initialState = fromJS({
  title: '',
  snackbar: '',
});

export default (state = initialState, action) => {
  switch (action.type) {
    case common.SET_TITLE: {
      return state.set('title', action.payload);
    }

    case common.SET_SNACKBAR: {
      return state.set('snackbar', action.payload);
    }

    default: {
      return state;
    }
  }
};

export const getTitle = state => state.get('title');
export const getSnackbar = state => state.get('snackbar');
