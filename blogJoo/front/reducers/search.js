import produce from "../utill/produce";

export const initialState = {
  mainSearchs: [],
  searchUrl: null,
  loadSearchsLoading: false,
  loadSearchsDone: false,
  loadSearchsError: null,
  loadSearchsIpLoading: false,
  loadSearchsIpDone: false,
  loadSearchsIpError: null,
  addSearchLoading: false,
  addSearchDone: false,
  addSearchError: null
};

export const LOAD_SEARCHS_REQUEST = "LOAD_SEARCHS_REQUEST";
export const LOAD_SEARCHS_SUCCESS = "LOAD_SEARCHS_SUCCESS";
export const LOAD_SEARCHS_FAILURE = "LOAD_SEARCHS_FAILURE";

export const LOAD_SEARCHS_IP_REQUEST = "LOAD_SEARCHS_IP_REQUEST";
export const LOAD_SEARCHS_IP_SUCCESS = "LOAD_SEARCHS_IP_SUCCESS";
export const LOAD_SEARCHS_IP_FAILURE = "LOAD_SEARCHS_IP_FAILURE";

export const ADD_SEARCH_REQUEST = "ADD_SEARCH_REQUEST";
export const ADD_SEARCH_SUCCESS = "ADD_SEARCH_SUCCESS";
export const ADD_SEARCH_FAILURE = "ADD_SEARCH_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_SEARCHS_REQUEST:
        draft.loadSearchsLoading = true;
        draft.loadSearchsDone = false;
        draft.loadSearchsError = null;
        break;
      case LOAD_SEARCHS_SUCCESS:
        draft.loadSearchsLoading = false;
        draft.loadSearchsDone = true;
        draft.mainSearchs = action.data;
        break;
      case LOAD_SEARCHS_FAILURE:
        draft.loadSearchsLoading = false;
        draft.loadSearchsDone = false;
        draft.loadSearchsError = action.error;
        break;
      case LOAD_SEARCHS_IP_REQUEST:
        draft.loadSearchsIpLoading = true;
        draft.loadSearchsIpDone = false;
        draft.loadSearchsIpError = null;
        draft.searchUrl = null;
        break;
      case LOAD_SEARCHS_IP_SUCCESS:
        draft.loadSearchsIpLoading = false;
        draft.loadSearchsIpDone = true;
        draft.mainSearchs = action.data;
        break;
      case LOAD_SEARCHS_IP_FAILURE:
        draft.loadSearchsIpLoading = false;
        draft.loadSearchsIpDone = false;
        draft.loadSearchsIpError = action.error;
        break;
      case ADD_SEARCH_REQUEST:
        draft.addSearchLoading = true;
        draft.addSearchDone = false;
        draft.addSearchError = null;
        break;
      case ADD_SEARCH_SUCCESS:
        draft.addSearchLoading = false;
        draft.addSearchDone = true;
        draft.mainSearchs = action.data;
        break;
      case ADD_SEARCH_FAILURE:
        draft.addSearchLoading = false;
        draft.addSearchDone = false;
        draft.addSearchError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
