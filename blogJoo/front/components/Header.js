import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <header>
        <div className="header-wrapper">
          <div className="story-group">
            <div className="magnifying-glass">
              <Link href="/search">
                <a>
                  <i className="fa fa-search" aria-hidden="true" />
                </a>
              </Link>
            </div>
            <h3>joo 스토리</h3>
            <Link href="/profile">
              <a>
                <img src="https://fakeimg.pl/100/" alt="" />
              </a>
            </Link>
          </div>
          <hr />
        </div>
      </header>
      <style jsx>{`
        header {
          width: 100%;
          height: 85px;
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

          .story-group h3 {
            margin-left: 55px;
          }

          .magnifying-glass {
            line-height: 60px;
            margin-left: 35px;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
