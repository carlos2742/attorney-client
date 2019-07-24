// import * as Portal from '../actions/portal.actions';
//
// export interface State {
//
// }
//
// export const initialState: State = {
// };
//
// export function reducer(
//   state = initialState,
//   action: Portal.ActionsUnion
// ): State {
//   switch (action.type) {
//     case Portal.ActionTypes.InitializeLanguage: {
//       console.log(Portal.ActionTypes.InitializeLanguage);
//       return {
//         language: {
//           ...state.language,
//           initializing: true,
//         }
//       };
//     }
//     case Portal.ActionTypes.InitializedLanguage: {
//       console.log(Portal.ActionTypes.InitializedLanguage);
//       return {
//         language: {
//           initializing: false,
//           initialized: true,
//           currentLanguage: action.payload
//         }
//       };
//     }
//     case Portal.ActionTypes.ChangeLanguageSuccess: {
//       console.log(Portal.ActionTypes.ChangeLanguageSuccess);
//       return {
//         language: {
//           ...state.language,
//           currentLanguage: action.payload
//         }
//       };
//     }
//
//     default: {
//       return state;
//     }
//   }
// }
