import { fromJS } from 'immutable';

import * as connection from '../actions/connection';

const initialState = fromJS({
  isConnected: true,
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case connection.UPDATE_CONNECTIVITY: {
      return state.update('isConnected', () => action.payload);
    }

    default: {
      return state;
    }
  }
};

export const isConnected = state => state.get('isConnected');
