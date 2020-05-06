import * as Portal from '../actions/portal.actions';
import {Article, Comment} from '../../../models/portal.model';

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
    data: Array<Article>;
    total: number;
    error: string;
  };
  article: {
    loading: boolean;
    loaded: boolean;
    data: Article;
    error: string;
    comments: {
      loading: boolean;
      loaded: boolean;
      data: Array<Comment>;
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
    data: [],
    total: 0,
    error: ''
  },
  article: {
    loading: false,
    loaded: false,
    data: null,
    error: '',
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
    case Portal.ActionTypes.LoadArticle: {
      console.log(Portal.ActionTypes.LoadArticle);
      return {
        ...state,
        article: {
          ...state.article,
          loading: true,
          loaded: false,
        }
      };
    }
    case Portal.ActionTypes.LoadArticleSuccess: {
      console.log(Portal.ActionTypes.LoadArticleSuccess);
      return {
        ...state,
        article: {
          ...state.article,
          loading: false,
          loaded: true,
          data: action.payload
        }
      };
    }
    case Portal.ActionTypes.LoadArticleFail: {
      console.log(Portal.ActionTypes.LoadArticleFail);
      return {
        ...state,
        article: {
          ...state.article,
          loading: false,
          loaded: true,
          data: null,
          error: action.payload.error
        }
      };
    }
    case Portal.ActionTypes.LoadArticles: {
      console.log(Portal.ActionTypes.LoadArticles);
      return {
        ...state,
        articles: {
          ...state.articles,
          loading: true,
          loaded: false,
        }
      };
    }
    case Portal.ActionTypes.LoadArticlesSuccess: {
      console.log(Portal.ActionTypes.LoadArticlesSuccess);
      return {
        ...state,
        articles: {
          ...state.articles,
          loading: false,
          loaded: true,
          data: action.payload.data,
          total: action.payload.total
        }
      };
    }
    case Portal.ActionTypes.LoadArticlesFail: {
      console.log(Portal.ActionTypes.LoadArticlesFail);
      return {
        ...state,
        articles: {
          ...state.articles,
          loading: false,
          loaded: true,
          data: [],
          total: 0,
          error: action.payload.error
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
            ...state.article.comments,
            loading: true,
            loaded: false
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
            data: action.payload.comments as Array<Comment>,
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
            loading: false,
            loaded: true,
            data: [],
            total: 0,
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
