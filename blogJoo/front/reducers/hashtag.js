import produce from "../utill/produce";

export const initialState = {
  mainHashtags: [],
  recentHashtags: [], // 최근검색 태그
  popularHashtags: [], // 인기검색 태그
  loadHashtagsLoading: false,
  loadHashtagsDone: false,
  loadHashtagsError: null,
  loadRecentHashtagsLoading: false,
  loadRecentHashtagsDone: false,
  loadRecentHashtagsError: null,
  loadPopularHashtagsLoading: false,
  loadPopularHashtagsDone: false,
  loadPopularHashtagsError: null
};

export const LOAD_HASHTAGS_REQUEST = "LOAD_HASHTAGS_REQUEST";
export const LOAD_HASHTAGS_SUCCESS = "LOAD_HASHTAGS_SUCCESS";
export const LOAD_HASHTAGS_FAILURE = "LOAD_HASHTAGS_FAILURE";

export const LOAD_RECENT_HASHTAGS_REQUEST = "LOAD_RECENT_HASHTAGS_REQUEST";
export const LOAD_RECENT_HASHTAGS_SUCCESS = "LOAD_RECENT_HASHTAGS_SUCCESS";
export const LOAD_RECENT_HASHTAGS_FAILURE = "LOAD_RECENT_HASHTAGS_FAILURE";

export const LOAD_POPULAR_HASHTAGS_REQUEST = "LOAD_POPULAR_HASHTAGS_REQUEST";
export const LOAD_POPULAR_HASHTAGS_SUCCESS = "LOAD_POPULAR_HASHTAGS_SUCCESS";
export const LOAD_POPULAR_HASHTAGS_FAILURE = "LOAD_POPULAR_HASHTAGS_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_HASHTAGS_REQUEST:
        draft.loadHashtagsLoading = true;
        draft.loadHashtagsDone = false;
        draft.loadHashtagsError = null;
        break;
      case LOAD_HASHTAGS_SUCCESS:
        draft.loadHashtagsLoading = false;
        draft.loadHashtagsDone = true;
        draft.mainHashtags = action.data;
        break;
      case LOAD_HASHTAGS_FAILURE:
        draft.loadHashtagsLoading = false;
        draft.loadHashtagsDone = false;
        draft.loadHashtagsError = action.error;
        break;
      case LOAD_RECENT_HASHTAGS_REQUEST:
        draft.loadRecentHashtagsLoading = true;
        draft.loadRecentHashtagsDone = false;
        draft.loadRecentHashtagsError = null;
        break;
      case LOAD_RECENT_HASHTAGS_SUCCESS:
        draft.loadRecentHashtagsLoading = false;
        draft.loadRecentHashtagsDone = true;
        draft.recentHashtags = action.data;
        break;
      case LOAD_RECENT_HASHTAGS_FAILURE:
        draft.loadRecentHashtagsLoading = false;
        draft.loadRecentHashtagsDone = false;
        draft.loadRecentHashtagsError = action.error;
        break;
      case LOAD_POPULAR_HASHTAGS_REQUEST:
        draft.loadPopularHashtagsLoading = true;
        draft.loadPopularHashtagsDone = false;
        draft.loadPopularHashtagsError = null;
        break;
      case LOAD_POPULAR_HASHTAGS_SUCCESS:
        draft.loadPopularHashtagsLoading = false;
        draft.loadPopularHashtagsDone = true;
        draft.popularHashtags = action.data;
        break;
      case LOAD_POPULAR_HASHTAGS_FAILURE:
        draft.loadPopularHashtagsLoading = false;
        draft.loadPopularHashtagsDone = false;
        draft.loadPopularHashtagsError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
