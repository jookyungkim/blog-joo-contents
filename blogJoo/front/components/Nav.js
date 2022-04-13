import { useCallback, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mainCategorys } = useSelector(state => state.category);
  const { visitantCounts } = useSelector(state => state.user);

  return (
    <>
      <div className="nav-trigger" onClick={() => setIsOpen(!isOpen)} aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-wrapper">
            <div className="nav-title">
              <div className="visitant">
                <div className="visitant-detail">
                  <h4>
                    전체 방문자<span>{visitantCounts[0]}명</span>
                  </h4>
                </div>
                <div className="visitant-detail">
                  <h4>
                    오늘 <span>{visitantCounts[1]}명</span>
                  </h4>
                </div>
                <div className="visitant-detail">
                  <h4>
                    어제 <span>{visitantCounts[2]}명</span>
                  </h4>
                </div>
              </div>
              <Link href="/">
                <a>
                  <h4>홈</h4>
                </a>
              </Link>
              <a href="#none">
                <Link href="/tag">
                  <h4>태그</h4>
                </Link>
              </a>
            </div>
            <hr />
            <div className="nav-categorys">
              {mainCategorys.map((data, index) => (
                <div key={index} className="nav-category-group">
                  <div className="category-title">
                    <Link href={`/posts/${data.name}`}>
                      <a>
                        <b>{data.name}</b>
                        <span> ( {data.SubCategorys.length} )</span>
                      </a>
                    </Link>
                  </div>
                  <div className="category-list">
                    {data.SubCategorys.map((value, i) => (
                      <Link key={i} href={`/posts/${value.name}`}>
                        <a>
                          <i className="fa fa-long-arrow-right" aria-hidden="true" />
                          <span>{value.name}</span>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <style jsx>{`
        nav {
          /* border: 1px solid red; */
          width: 400px;
          z-index: 999;
        }
        .nav-inner {
          /* border: 1px solid blue; */
          width: 90%;
        }

        .nav-category a p {
          display: inline-block;
        }
        .category-list {
          /* border: 1px solid red; */
        }

        .category-list a {
          display: block;
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
          z-index: 999;
        }

        @media (min-width: 335px) and (max-width: 757px) {
          .nav {
            position: fixed;
            background-color: rgb(253, 253, 253);
            margin-top: -10px;
            display: ${isOpen ? "block" : "none"};
            /* margin-top: 45px; */
          }

          .nav-inner {
            width: 350px;
          }

          .nav-wrapper {
            margin-left: 15px;
          }
          .nav-title {
            margin-top: 15px;
          }

          .nav-trigger {
            display: block;
            /* border: 1px solid red; */
            width: 30px;
            height: 16px;
            position: fixed;
            /* right: 7px; */
            left: 15px;
            top: 30px;
          }

          .nav-trigger span {
            position: absolute;
            height: 1px;
            background-color: #000;
            width: 100%;
            transition: 0.3s;
          }
          .nav-trigger span:nth-child(1) {
            top: ${isOpen ? 50 : 0}%;
            transform: rotate(${isOpen ? 45 : 0}deg);
          }
          .nav-trigger span:nth-child(2) {
            top: ${isOpen ? 0 : 50}%;
            opacity: ${isOpen ? 0 : 100};
          }
          .nav-trigger span:nth-child(3) {
            top: ${isOpen ? 50 : 100}%;
            transform: rotate(${isOpen ? -45 : 0}deg);
          }

          /*
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
          */
        }
      `}</style>
    </>
  );
};

export default Nav;
