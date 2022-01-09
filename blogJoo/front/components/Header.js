import React from "react";

const Header = () => {
  return (
    <>
      <header>
        <div className="header-wrapper">
          <div className="story-group">
            <div className="magnifying-glass">
              <a href="#none">
                <i className="fa fa-search" aria-hidden="true" />
              </a>
            </div>
            <h3>joo 스토리</h3>
            <a href="#none">
              <img src="https://fakeimg.pl/100/" alt="" />
            </a>
          </div>
          <hr />
        </div>
      </header>
      <style jsx>{`
        header {
          width: 100%;
          /* position: fixed;
          z-index: 999; */
        }

        .header-wrapper {
          width: 1300px;
          margin: 0 auto;
        }

        .story-group {
          display: flex;
          margin-top: 7px;
        }
        .magnifying-glass {
          width: 60px;
          height: 60px;
          line-height: 60px;
          text-align: center;
        }
        .story-group h3 {
          margin: auto;
        }

        .story-group img {
          width: 60px;
          height: 60px;
          margin-left: auto;
          object-fit: cover;
          display: block;
        }
        .header-wrapper hr {
          margin: 7px 0;
        }

        @media (min-width: 335px) and (max-width: 757px) {
          .header-wrapper {
            position: fixed;
            width: 100%;
            background-color: white;
            z-index: 999;
          }

          .header-wrapper hr {
            margin-bottom: 0px;
          }

          .story-group {
            margin-left: 10px;
            margin-right: 10px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
