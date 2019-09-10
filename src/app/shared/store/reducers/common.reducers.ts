import * as Portal from '../actions/common.actions';
interface Language {
  initialized: boolean;
  currentLanguage: string;
}
export interface CommonState {
  language: Language;
}

export const initialState: CommonState = {
  language: {
    initialized: false,
    currentLanguage: ''
  }
};

export function reducer(
  state = initialState,
  action: Portal.ActionsUnion
): CommonState {
  switch (action.type) {
    case Portal.ActionTypes.InitializeLanguageSuccess: {
      console.log(Portal.ActionTypes.InitializeLanguageSuccess);
      return {
        language: {
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
