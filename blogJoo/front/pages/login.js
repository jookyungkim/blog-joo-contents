const login = () => {
  return (
    <>
      <div className="login-container">
        <div className="login-inner">
          <div className="login-wrapper">
            <form className="login-form">
              <div className="id-gorup">
                <input type="email" placeholder="1234@naver.com" />
              </div>
              <div className="pwd-group">
                <input type="password" placeholder="password" />
              </div>
              <button className="common-button">관리자</button>
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
export default login;
