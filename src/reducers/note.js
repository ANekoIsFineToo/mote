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
  version: {
    id: 1,
    note: 1,
    title: '',
    content: '',
    bgColor: '',
  },
  versions: [],
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case note.SET_DRAFT: {
      return state.update('draft', draft => draft.merge(action.payload));
    }

    case note.RESET_DRAFT: {
      return state.update('draft', () => initialState.get('draft'));
    }

    case note.SET_NOTE: {
      return state.update('note', note => note.merge(action.payload));
    }

    case note.SET_VERSION: {
      return state.update('version', version => version.merge(action.payload));
    }

    case note.SET_VERSIONS: {
      return state.update('versions', () => action.payload);
    }

    default: {
      return state;
    }
  }
};

export const getDraft = state => state.get('draft');
export const getNote = state => state.get('note');
export const getVersion = state => state.get('version');
export const getVersions = state => state.get('versions');
