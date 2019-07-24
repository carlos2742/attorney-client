import * as Portal from '../actions/portal.actions';
interface Language {
  initialized: boolean;
  currentLanguage: string;
}
export interface State {
  language: Language;
}

export const initialState: State = {
  language: {
    initialized: false,
    currentLanguage: ''
  }
};

export function reducer(
  state = initialState,
  action: Portal.ActionsUnion
): State {
  switch (action.type) {
    case Portal.ActionTypes.InitLanguage: {
      console.log(Portal.ActionTypes.InitLanguage);
      return state;
    }
    case Portal.ActionTypes.ChangeLanguage: {
      console.log(Portal.ActionTypes.ChangeLanguage);
      return state;
    }

    default: {
      return state;
    }
  }
}
