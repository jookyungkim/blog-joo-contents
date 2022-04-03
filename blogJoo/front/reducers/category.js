import produce from "../utill/produce";

export const initialState = {
  mainCategorys: [],
  loadCategorysLoading: false, // 로그인 시도중
  loadCategorysDone: false,
  loadCategorysError: null
};

export const LOAD_CATEGORYS_REQUEST = "LOAD_CATEGORYS_REQUEST";
export const LOAD_CATEGORYS_SUCCESS = "LOAD_CATEGORYS_SUCCESS";
export const LOAD_CATEGORYS_FAILURE = "LOAD_CATEGORYS_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_CATEGORYS_REQUEST:
        draft.loadCategorysLoading = true;
        draft.loadCategorysDone = false;
        draft.loadCategorysError = null;
        break;
      case LOAD_CATEGORYS_SUCCESS:
        draft.loadCategorysLoading = false;
        draft.loadCategorysDone = true;
        draft.mainCategorys = action.data;
        break;
      case LOAD_CATEGORYS_FAILURE:
        draft.loadCategorysLoading = false;
        draft.loadCategorysDone = false;
        draft.loadCategorysError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
