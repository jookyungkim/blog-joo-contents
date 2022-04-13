import produce from "../utill/produce";

export const initialState = {
  me: null,
  visitantCounts: [],
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: false,
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: false,
  addVisitantLoading: false,
  addVisitantDone: false,
  addVisitantError: false,
  loadVisitantCountLoading: false,
  loadVisitantCountDone: false,
  loadVisitantCountError: false
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const ADD_VISITANT_REQUEST = "ADD_VISITANT_REQUEST";
export const ADD_VISITANT_SUCCESS = "ADD_VISITANT_SUCCESS";
export const ADD_VISITANT_FAILURE = "ADD_VISITANT_FAILURE";

export const LOAD_VISITANT_COUNT_REQUEST = "LOAD_VISITANT_COUNT_REQUEST";
export const LOAD_VISITANT_COUNT_SUCCESS = "LOAD_VISITANT_COUNT_SUCCESS";
export const LOAD_VISITANT_COUNT_FAILURE = "LOAD_VISITANT_COUNT_FAILURE";

export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";

const dummyUser = data => ({});

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = action.data;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInDone = false;
        draft.logInError = action.error;
        break;
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.logOutError = false;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = null;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
        draft.loadMyInfoError = false;
        draft.me = action.data;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error;
        break;
      case ADD_VISITANT_REQUEST:
        draft.addVisitantLoading = true;
        draft.addVisitantDone = false;
        draft.addVisitantError = null;
        break;
      case ADD_VISITANT_SUCCESS:
        draft.addVisitantLoading = false;
        draft.addVisitantDone = true;
        draft.addVisitantError = false;
        draft.visitantCounts = action.data;
        break;
      case ADD_VISITANT_FAILURE:
        draft.addVisitantLoading = false;
        draft.addVisitantError = action.error;
        break;
      case LOAD_VISITANT_COUNT_REQUEST:
        draft.loadVisitantCountLoading = true;
        draft.loadVisitantCountDone = false;
        draft.loadVisitantCountError = null;
        break;
      case LOAD_VISITANT_COUNT_SUCCESS:
        draft.loadVisitantCountLoading = false;
        draft.loadVisitantCountDone = true;
        draft.loadVisitantCountError = false;
        draft.visitantCounts = action.data;
        break;
      case LOAD_VISITANT_COUNT_FAILURE:
        draft.loadVisitantCountLoading = false;
        draft.loadVisitantCountError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
