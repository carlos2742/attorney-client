import * as Portal from '../actions/portal.actions';

export interface PortalState {
  menuItem: string;
  form: {
    sending: boolean;
    sent: boolean;
  };
}

export const initialState: PortalState = {
  menuItem: 'home',
  form: {
    sending: false,
    sent: false,
  }
};

export function reducer(
  state = initialState,
  action: Portal.ActionsUnion
): PortalState {
  switch (action.type) {
    case Portal.ActionTypes.SelectMenu: {
      console.log(Portal.ActionTypes.SelectMenu);
      return {
        ...state,
        menuItem: action.payload.menuItem,
      };
    }
    case Portal.ActionTypes.SendEmail: {
      console.log(Portal.ActionTypes.SendEmail);
      return {
        ...state,
        form: {
          sending: true,
          sent: false,
        }
      };
    }
    case Portal.ActionTypes.SendEmailFail: {
      console.log(Portal.ActionTypes.SendEmailFail);
      return {...state,
        form: {
          sending: false,
          sent: false
        }
      };
    }
    case Portal.ActionTypes.EmailSent: {
      console.log(Portal.ActionTypes.EmailSent);
      return {
        ...state,
        form: {
          sending: false,
          sent: true,
        }
      };
    }
    default: {
      return state;
    }
  }
}
