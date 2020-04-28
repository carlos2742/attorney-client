import * as Admin from '../actions/admin.actions';
import {User} from '../../../models/admin.model';

export interface AdminState {
  loggedUser: {
    loading: boolean;
    loaded: boolean;
    data: User;
    error: string;
  };
};

export const initialState: AdminState = {
  loggedUser: {
    loading: false,
    loaded: false,
    data: null,
    error: ''
  }
};

export function reducer(
  state = initialState,
  action: Admin.ActionsUnion
): AdminState {
  switch (action.type) {
    case Admin.ActionTypes.LoadLoggedUser: {
      console.log(Admin.ActionTypes.LoadLoggedUser);
      return {
        loggedUser:{
          loading: true,
          loaded: false,
          data: null,
          error: ''
        }
      };
    }
    case Admin.ActionTypes.LoadLoggedUserSuccess: {
      console.log(Admin.ActionTypes.LoadLoggedUserSuccess);
      return {
        loggedUser:{
          ...state.loggedUser,
          loading: false,
          loaded: true,
          data: action.payload
        }
      };
    }
    case Admin.ActionTypes.LoadLoggedUserFail: {
      console.log(Admin.ActionTypes.LoadLoggedUserFail);
      return {
        loggedUser:{
          ...state.loggedUser,
          loading: false,
          loaded: false,
          error: action.payload.error
        }
      };
    }
    default: {
      return state;
    }
  }
}
