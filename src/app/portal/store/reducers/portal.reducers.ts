import * as Portal from '../actions/portal.actions';
import * as PortalModels from '../../../models/portal.model';

export interface PortalState {
  menuItem: string;
  showSubHeader: boolean;
  form: {
    sending: boolean;
    sent: boolean;
  };
  articles: {
    loading: boolean;
    loaded: boolean;
    data: Array<PortalModels.Article>
  };
  article: {
    loading: boolean;
    loaded: boolean;
    data: any;
    comments: {
      loading: boolean;
      loaded: boolean;
      data: Array<PortalModels.Comment>;
      total: number;
      error: string;
    }
  };
}

export const initialState: PortalState = {
  menuItem: 'home',
  showSubHeader: true,
  form: {
    sending: false,
    sent: false,
  },
  articles: {
    loading: false,
    loaded: false,
    data: []
  },
  article: {
    loading: false,
    loaded: false,
    data: null,
    comments: {
      loading: false,
      loaded: false,
      data: [],
      total: 0,
      error: ''
    }
  }
};

export function reducer(
  state = initialState,
  action: Portal.ActionsUnion
): PortalState {
  switch (action.type) {
    case Portal.ActionTypes.SelectMenu: {
      console.log(Portal.ActionTypes.SelectMenu);
      const showSubHeader = action.payload.menuItem !== 'blog' && action.payload.menuItem !== 'article' ? true : false;
      return {
        ...state,
        menuItem: action.payload.menuItem,
        showSubHeader
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
    case Portal.ActionTypes.LoadComments: {
      console.log(Portal.ActionTypes.LoadComments);
      return {
        ...state,
        article: {
          ...state.article,
          comments: {
            loading: true,
            loaded: false,
            data: [],
            total: 0,
            error: ''
          }
        }
      };
    }
    case Portal.ActionTypes.LoadCommentsSuccess: {
      console.log(Portal.ActionTypes.LoadCommentsSuccess);
      return {
        ...state,
        article: {
          ...state.article,
          comments: {
            loading: false,
            loaded: true,
            data: action.payload.comments,
            total: action.payload.total,
            error: ''
          }
        }
      };
    }
    case Portal.ActionTypes.LoadCommentsFail: {
      console.log(Portal.ActionTypes.LoadCommentsFail);
      return {
        ...state,
        article: {
          ...state.article,
          comments: {
            ...state.article.comments,
            loading: false,
            loaded: true,
            error: action.payload.error
          }
        }
      };
    }
    default: {
      return state;
    }
  }
}
