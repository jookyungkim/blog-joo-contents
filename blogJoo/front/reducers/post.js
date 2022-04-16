import { faker } from "@faker-js/faker";
import shortId from "shortid";
import produce from "../utill/produce";

export const initialState = {
  imagePaths: [],
  mainPosts: [],
  sliderPosts: [],
  singlePost: null,
  imagePath: null,
  subLinkPosts: [],
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  loadSliderPostsLoading: false,
  loadSliderPostsDone: false,
  loadSliderPostsError: null,
  loadhashtagPostsLoading: false,
  loadhashtagPostsDone: false,
  loadhashtagPostsError: null,
  loadLinkPostsLoading: false,
  loadLinkPostsDone: false,
  loadLinkPostsError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  updatePostLoading: false,
  updatePostDone: false,
  updatePostError: null,
  hasMorePosts: false,
  uploadImageLoading: false,
  uploadImageDone: false,
  uploadImageError: null,
  loadSearchPostsLoading: false,
  loadSearchPostsDone: false,
  loadSearchPostsError: null,
  isLikeLoading: false,
  isLikeDone: false,
  isLikeError: null,
  likeLoading: false,
  likeDone: false,
  likeError: null,
  unLikeLoading: false,
  unLikeDone: false,
  unLikeError: null,
  isLike: false
};

// export const generateDummyPost = number => {
//   return Array(number)
//     .fill()
//     .map(() => ({
//       id: shortId.generate(),
//       title: "input 태그 속성들",
//       content: faker.lorem.paragraph(),
//       Images: [
//         {
//           src: faker.image.image()
//         }
//       ]
//     }));
// };

export const LOAD_HASHTAG_POSTS_REQUEST = "LOAD_HASHTAG_POSTS_REQUEST";
export const LOAD_HASHTAG_POSTS_SUCCESS = "LOAD_HASHTAG_POSTS_SUCCESS";
export const LOAD_HASHTAG_POSTS_FAILURE = "LOAD_HASHTAG_POSTS_FAILURE";

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const LOAD_SLIDER_POSTS_REQUEST = "LOAD_SLIDER_POSTS_REQUEST";
export const LOAD_SLIDER_POSTS_SUCCESS = "LOAD_SLIDER_POSTS_SUCCESS";
export const LOAD_SLIDER_POSTS_FAILURE = "LOAD_SLIDER_POSTS_FAILURE";

export const LOAD_LINK_POSTS_REQUEST = "LOAD_LINK_POSTS_REQUEST";
export const LOAD_LINK_POSTS_SUCCESS = "LOAD_LINK_POSTS_SUCCESS";
export const LOAD_LINK_POSTS_FAILURE = "LOAD_LINK_POSTS_FAILURE";

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const UPDATE_POST_REQUEST = "UPDATE_POST_REQUEST";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_FAILURE = "UPDATE_POST_FAILURE";

export const UPLOAD_IMAGE_REQUEST = "UPLOAD_IMAGE_REQUEST";
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
export const UPLOAD_IMAGE_FAILURE = "UPLOAD_IMAGE_FAILURE";

export const LOAD_SEARCH_POSTS_REQUEST = "LOAD_SEARCH_POSTS_REQUEST";
export const LOAD_SEARCH_POSTS_SUCCESS = "LOAD_SEARCH_POSTS_SUCCESS";
export const LOAD_SEARCH_POSTS_FAILURE = "LOAD_SEARCH_POSTS_FAILURE";

export const IS_LIKE_REQUEST = "IS_LIKE_REQUEST";
export const IS_LIKE_SUCCESS = "IS_LIKE_SUCCESS";
export const IS_LIKE_FAILURE = "IS_LIKE_FAILURE";

export const LIKE_REQUEST = "LIKE_REQUEST";
export const LIKE_SUCCESS = "LIKE_SUCCESS";
export const LIKE_FAILURE = "LIKE_FAILURE";

export const UNLIKE_REQUEST = "UNLIKE_REQUEST";
export const UNLIKE_SUCCESS = "UNLIKE_SUCCESS";
export const UNLIKE_FAILURE = "UNLIKE_FAILURE";

const dummyUser = data => ({});

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        draft.hasMorePosts = false;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.hasMorePosts = action.data.length === 10;
        break;
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        draft.hasMorePosts = false;
        break;
      case LOAD_SLIDER_POSTS_REQUEST:
        draft.loadSliderPostsLoading = true;
        draft.loadSliderPostsDone = false;
        draft.loadSliderPostsError = null;
        break;
      case LOAD_SLIDER_POSTS_SUCCESS:
        draft.loadSliderPostsLoading = false;
        draft.loadSliderPostsDone = true;
        draft.sliderPosts = action.data;
        break;
      case LOAD_SLIDER_POSTS_FAILURE:
        draft.loadSliderPostsLoading = false;
        draft.loadSliderPostsError = action.error;
        break;
      case LOAD_HASHTAG_POSTS_REQUEST:
        draft.loadHashtagPostsLoading = true;
        draft.loadHashtagPostsDone = false;
        draft.loadHashtagPostsError = null;
        break;
      case LOAD_HASHTAG_POSTS_SUCCESS:
        draft.loadHashtagPostsLoading = false;
        draft.loadHashtagPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.hasMorePosts = action.data.length === 10;
        break;
      case LOAD_HASHTAG_POSTS_FAILURE:
        draft.loadHashtagPostsLoading = false;
        draft.loadHashtagPostsError = action.error;
        break;
      case LOAD_LINK_POSTS_REQUEST:
        draft.loadLinkPostsLoading = true;
        draft.loadLinkPostsDone = false;
        draft.loadLinkPostsError = null;
        break;
      case LOAD_LINK_POSTS_SUCCESS:
        draft.loadLinkPostsLoading = false;
        draft.loadLinkPostsDone = true;
        draft.subLinkPosts = action.data;
        break;
      case LOAD_LINK_POSTS_FAILURE:
        draft.loadLinkPostsLoading = false;
        draft.loadLinkPostsError = action.error;
        break;
      case LOAD_SEARCH_POSTS_REQUEST:
        draft.loadSearchPostsLoading = true;
        draft.loadSearchPostsDone = false;
        draft.loadSearchPostsError = null;
        break;
      case LOAD_SEARCH_POSTS_SUCCESS:
        draft.loadSearchPostsLoading = false;
        draft.loadSearchPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.hasMorePosts = action.data.length === 10;
        break;
      case LOAD_SEARCH_POSTS_FAILURE:
        draft.loadSearchPostsLoading = false;
        draft.loadSearchPostsError = action.error;
        break;
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.singlePost = action.data;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case UPDATE_POST_REQUEST:
        draft.updatePostLoading = true;
        draft.updatePostDone = false;
        draft.updatePostError = null;
        break;
      case UPDATE_POST_SUCCESS:
        draft.updatePostLoading = false;
        draft.updatePostDone = true;
        break;
      case UPDATE_POST_FAILURE:
        draft.updatePostLoading = false;
        draft.updatePostError = action.error;
        break;
      case UPLOAD_IMAGE_REQUEST:
        draft.uploadImageLoading = true;
        draft.uploadImageDone = false;
        draft.uploadImageError = null;
        break;
      case UPLOAD_IMAGE_SUCCESS:
        draft.imagePath = action.data;
        draft.uploadImageLoading = false;
        draft.uploadImageDone = true;
        break;
      case UPLOAD_IMAGE_FAILURE:
        draft.uploadImageLoading = false;
        draft.uploadImageError = action.error;
        break;
      case LIKE_REQUEST:
        draft.likeLoading = true;
        draft.likeDone = false;
        draft.likeError = null;
        break;
      case LIKE_SUCCESS:
        draft.likeLoading = false;
        draft.likeDone = true;
        draft.isLike = action.data;
        break;
      case LIKE_FAILURE:
        draft.likeLoading = false;
        draft.likeError = action.error;
        break;
      case UNLIKE_REQUEST:
        draft.unLikeLoading = true;
        draft.unLikeDone = false;
        draft.unLikeError = null;
        break;
      case UNLIKE_SUCCESS:
        draft.unLikeLoading = false;
        draft.unLikeDone = true;
        draft.isLike = action.data;
        break;
      case UNLIKE_FAILURE:
        draft.unLikeLoading = false;
        draft.unLikeError = action.error;
        break;
      case IS_LIKE_REQUEST:
        draft.isLikeLoading = true;
        draft.isLikeDone = false;
        draft.isLikeError = null;
        break;
      case IS_LIKE_SUCCESS:
        draft.isLikeLoading = false;
        draft.isLikeDone = true;
        draft.isLike = action.data;
        break;
      case IS_LIKE_FAILURE:
        draft.isLikeLoading = false;
        draft.isLikeError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
