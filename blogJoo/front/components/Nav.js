const Nav = () => {
  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-wrapper">
            <div className="nav-trigger">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="nav-title">
              <div className="visitant">
                <div className="visitant-detail">
                  <h4>
                    전체 방문자<span>10명</span>
                  </h4>
                </div>
                <div className="visitant-detail">
                  <h4>
                    어제<span>5명</span>
                  </h4>
                </div>
                <div className="visitant-detail">
                  <h4>
                    전체 방문자<span>10명</span>
                  </h4>
                </div>
              </div>
              <a href="#none">
                <h4>홈</h4>
              </a>
              <a href="#none">
                <h4>태그</h4>
              </a>
            </div>
            <hr />
            <div className="nav-categorys">
              <div className="nav-category-group">
                <div className="category-title">
                  <a href="#none">
                    <b>LANGUAGE</b>
                    <span> ( 10 )</span>
                  </a>
                </div>
                <div className="category-list">
                  <a href="#none">
                    <i className="fa fa-long-arrow-right" aria-hidden="true" />
                    <span>html</span>
                  </a>
                  <a href="#none">
                    <i className="fa fa-long-arrow-right" aria-hidden="true" />
                    <span>css</span>
                  </a>
                  <a href="#none">
                    <i className="fa fa-long-arrow-right" aria-hidden="true" />
                    <span>javascript</span>
                  </a>
                  <a href="#none">
                    <i className="fa fa-long-arrow-right" aria-hidden="true" />
                    <span>java</span>
                  </a>
                  <a href="#none">
                    <i className="fa fa-long-arrow-right" aria-hidden="true" />
                    <span>oracle</span>
                  </a>
                </div>
              </div>
              <div className="nav-category-group">
                <div className="category-title">
                  <a href="#none">
                    <b>IDE</b>
                    <span> ( 1 )</span>
                  </a>
                </div>
                <div className="category-list">
                  <a href="#none">
                    <i className="fa fa-long-arrow-right" aria-hidden="true" />
                    <span>vscode</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="nav-category-group">
              <div className="category-title">
                <a href="#none">
                  <b>DEV</b>
                  <span> ( 2 )</span>
                </a>
              </div>
              <div className="category-list">
                <a href="#none">
                  <i className="fa fa-long-arrow-right" aria-hidden="true" />
                  <span>git</span>
                </a>
                <a href="#none">
                  <i className="fa fa-long-arrow-right" aria-hidden="true" />
                  <span>핵심기능 구현</span>
                </a>
              </div>
            </div>
            <div className="nav-category-group">
              <div className="category-title">
                <a href="#none">
                  <b>IT STORY</b>
                  <span> ( 1 )</span>
                </a>
              </div>
              <div className="category-list">
                <a href="#none">
                  <i className="fa fa-long-arrow-right" aria-hidden="true" />
                  <span>뉴스/기사</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <style jsx>{`
        .nav-category a p {
          display: inline-block;
        }
        .category-list {
          /* border: 1px solid red; */
        }

        .category-list a {
          display: block;
        }

        nav {
          /* border: 1px solid red; */
          width: 400px;
        }
        .nav-inner {
          /* border: 1px solid blue; */
          width: 90%;
        }
        .nav-wrapper {
        }
        .nav-title {
        }
        .nav-title h4 {
        }
        .visitant {
          display: flex;
          margin-bottom: 10px;
        }
        .visitant-detail {
          flex: 1px;
        }

        .visitant-detail:nth-child(2) {
          text-align: center;
        }

        .visitant-detail:nth-child(3) {
          text-align: right;
        }

        .visitant-detail h4 span {
          margin-left: 8px;
          font-size: 0.8em;
          color: rgb(107, 107, 107);
        }

        .nav-title a {
          display: block;
          margin-bottom: 10px;
        }
        .nav-wrapper hr {
        }
        .nav-categorys {
        }
        .nav-category-group {
          margin: 10px 0;
        }
        .category-title {
        }
        .category-title a {
        }
        .category-title a b {
        }
        .category-title a span {
          font-size: 0.8em;
        }
        .category-list {
          margin-left: 25px;
        }
        .category-list a {
          display: block;
          margin: 5px 0;
        }
        .category-list a i {
        }
        .category-list a span {
        }

        .nav-trigger {
          display: none;
        }

        @media (min-width: 335px) and (max-width: 757px) {
          .nav {
            position: fixed;
            background-color: rgb(253, 253, 253);
            /* width: 0px; */
            display: none;
          }

          .nav-inner {
            width: 350px;
          }

          .nav-wrapper {
            margin-left: 15px;
          }
          .nav-title {
            margin-top: 50px;
          }

          .nav-trigger {
            display: block;
            /* border: 1px solid red; */
            width: 30px;
            height: 16px;
            position: absolute;
            /* right: 7px; */
            left: 15px;
            top: 15px;
          }

          .nav-trigger span {
            position: absolute;
            height: 1px;
            background-color: #000;
            width: 100%;
            transition: 0.3s;
          }
          .nav-trigger span:nth-child(1) {
            top: 0;
          }
          .nav-trigger span:nth-child(2) {
            top: 50%;
          }
          .nav-trigger span:nth-child(3) {
            top: 100%;
          }

          .nav-trigger.active span:nth-child(1) {
            top: 50%;
            transform: rotate(45deg);
          }
          .nav-trigger.active span:nth-child(2) {
            opacity: 0;
          }
          .nav-trigger.active span:nth-child(3) {
            top: 50%;
            transform: rotate(-45deg);
          }
        }
      `}</style>
    </>
  );
};

export default Nav;
