import * as Portal from '../actions/portal.actions';

export interface State {
  menu: {
    selected: string;
  };
}

export const initialState: State = {
  menu: {
    selected: 'home'
  }
};

export function reducer(
  state = initialState,
  action: Portal.ActionsUnion
): State {
  switch (action.type) {
    case Portal.ActionTypes.SelectMenu: {
      console.log(Portal.ActionTypes.SelectMenu);
      return {
        ...state,
        menu: {
          selected: action.payload
        }
      };
    }
    default: {
      return state;
    }
  }
}
