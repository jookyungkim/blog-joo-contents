import React from "react";

const tag = () => {
  return (
    <>
      <div className="tag-container">
        <div className="inner">
          <div className="tag-wrapper">
            <h2>인기태그</h2>
            <div className="tag-group">
              <a href="#none">html</a>
              <a href="#none">css</a>
              <a href="#none">javascript</a>
              <a href="#none">java</a>
              <a href="#none">sql</a>
              <a href="#none">html</a>
              <a href="#none">css</a>
              <a href="#none">javascript</a>
              <a href="#none">java</a>
              <a href="#none">sql</a>
              <a href="#none">html</a>
              <a href="#none">css</a>
              <a href="#none">javascript</a>
              <a href="#none">java</a>
              <a href="#none">sql</a>
              <a href="#none">html</a>
              <a href="#none">css</a>
              <a href="#none">javascript</a>
              <a href="#none">java</a>
              <a href="#none">sql</a>
              <a href="#none">html</a>
              <a href="#none">css</a>
              <a href="#none">javascript</a>
              <a href="#none">java</a>
              <a href="#none">sql</a>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .tag-container {
          width: 100%;
          height: 100vh;
        }

        .tag-container .tag-wrapper {
          margin-top: 30px;
        }

        .tag-container .tag-wrapper h2 {
          margin-bottom: 15px;
        }

        .tag-container .tag-wrapper .tag-group {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
        }

        .tag-container .tag-wrapper .tag-group a {
          border: 1px solid #eeeeee;
          border-radius: 0.5rem;
          margin-right: 10px;
          padding: 0.7em 0.7em;
          background-color: #3ae374;
          margin-bottom: 10px;
        }

        @media (min-width: 335px) and (max-width: 757px) {
          .tag-container .inner {
            width: 100%;
          }
          .tag-container .tag-wrapper {
            width: 95%;
            margin: auto;
            margin-top: 30px;
          }
          .tag-container .tag-wrapper h2 {
            text-align: center;
          }
          .tag-container .tag-wrapper .tag-group {
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
          }
          .tag-container .tag-wrapper .tag-group a {
            display: block;
          }
          .tag-container .tag-wrapper .tag-group a:nth-child(5n) {
            margin-right: 0px;
          }
        }
      `}</style>
    </>
  );
};

export default tag;
