import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import axios from "axios";

import { LOG_IN_REQUEST } from "../reducers/user";
import useInput from "../hooks/useInput";
import wrapper from "../store/configureStore";

const login = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector(state => state.user);
  const [email, onChangeEmail] = useInput();
  const [password, onChangePassword] = useInput();

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      dispatch({
        type: LOG_IN_REQUEST,
        data: { email, password }
      });
    },
    [email, password]
  );

  return (
    <>
      <div className="login-container">
        <div className="login-inner">
          <div className="login-wrapper">
            <form className="login-form" onSubmit={onSubmitForm}>
              <div className="id-gorup">
                <input
                  name="user-email"
                  type="email"
                  value={email || ""}
                  onChange={onChangeEmail}
                  placeholder="1234@naver.com"
                  required
                />
              </div>
              <div className="pwd-group">
                <input
                  name="user-password"
                  type="password"
                  value={password || ""}
                  onChange={onChangePassword}
                  placeholder="password"
                  required
                />
              </div>
              <button className="common-button" type="submit">
                관리자
              </button>
            </form>
          </div>
        </div>
      </div>
      <style jsx>{`
        .login-container {
          width: 100%;
          height: 100vh;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
        }

        .login-container .login-inner {
          width: 600px;
          height: 600px;
        }

        .login-container .login-wrapper {
          height: 100%;
          border: 1px solid #b8b8b8;
        }

        .login-container .login-wrapper .login-form {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          height: 100%;
        }

        .login-container .login-wrapper .login-form input {
          padding: 0.8em 3.5em;
        }

        .login-container .login-wrapper .login-form .id-gorup {
          margin-bottom: 10px;
        }

        .login-container .login-wrapper .login-form .pwd-group {
          margin-bottom: 10px;
        }

        .login-container .login-wrapper .login-form button {
          padding: 0.7em 7.5em;
        }

        @media (min-width: 335px) and (max-width: 757px) {
          .login-container .login-inner {
            width: 100%;
            height: 100%;
          }
          .login-container .login-wrapper {
            border: 0px;
          }
        }
      `}</style>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, ...etc }) => {
  // **** 매우중요 ****
  // 쿠키를 프론트 서버에서 벡엔드 서버로 보내준다. 브라우저는 간섭을 못한다.
  // 실제 내 pc 쿠키가 있을때만 넣어주고 없을때는 "" 초기화 해주기

  const cookie = req ? req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  store.dispatch(END);
  await store.sagaTask.toPromise();
});
export default login;
