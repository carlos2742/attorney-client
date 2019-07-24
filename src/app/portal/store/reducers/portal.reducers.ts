import * as Portal from '../actions/portal.actions';
interface Language {
  initializing: boolean;
  initialized: boolean;
  currentLanguage: string;
}
export interface State {
  language: Language;
}

export const initialState: State = {
  language: {
    initializing: false,
    initialized: false,
    currentLanguage: ''
  }
};

export function reducer(
  state = initialState,
  action: Portal.ActionsUnion
): State {
  switch (action.type) {
    case Portal.ActionTypes.InitializeLanguage: {
      console.log(Portal.ActionTypes.InitializeLanguage);
      return {
        language: {
          ...state.language,
          initializing: true,
        }
      };
    }
    case Portal.ActionTypes.InitializedLanguage: {
      console.log(Portal.ActionTypes.InitializedLanguage);
      return {
        language: {
          initializing: false,
          initialized: true,
          currentLanguage: action.payload
        }
      };
    }
    case Portal.ActionTypes.ChangeLanguageSuccess: {
      console.log(Portal.ActionTypes.ChangeLanguageSuccess);
      return {
        language: {
          ...state.language,
          currentLanguage: action.payload
        }
      };
    }

    default: {
      return state;
    }
  }
}
