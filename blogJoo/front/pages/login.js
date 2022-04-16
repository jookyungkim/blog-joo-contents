import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import axios from "axios";
import Router from "next/router";

import { LOG_IN_REQUEST, ADD_VISITANT_REQUEST, LOAD_MY_INFO_REQUEST, LOG_OUT_REQUEST } from "../reducers/user";
import useInput from "../hooks/useInput";
import wrapper from "../store/configureStore";
import CustomReactLoading from "../components/CustomReactLoading";

const login = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInDone, logInError, me } = useSelector(state => state.user);
  const [email, onChangeEmail] = useInput();
  const [password, onChangePassword] = useInput();

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }

    if (me && logInDone) {
      Router.replace("/");
    }
  }, [logInError, logInDone, me]);

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

  const logoutHandler = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST
    });
  });

  return (
    <>
      {logInLoading && <CustomReactLoading type={"spin"} color={"#222f3e"} />}
      {me && logInDone && <CustomReactLoading type={"spin"} color={"#222f3e"} />}
      <div className="login-container">
        <div className="login-inner">
          <div className="login-wrapper">
            {me ? (
              <div className="logout">
                <button className="common-button" type="button" onClick={logoutHandler}>
                  관리자 로그아웃
                </button>
              </div>
            ) : (
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
            )}
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

        .logout {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
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

  store.dispatch({
    type: LOAD_MY_INFO_REQUEST
  });

  store.dispatch({
    type: ADD_VISITANT_REQUEST
  });

  store.dispatch(END);
  await store.sagaTask.toPromise();
});
export default login;
