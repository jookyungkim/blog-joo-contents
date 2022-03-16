import React from "react";
import Link from "next/link";

const profile = () => {
  return (
    <>
      <div className="profile-container">
        <div className="profile-inner">
          <div className="profile-wrapper">
            <img src="https://fakeimg.pl/600x400" alt="" />
            <div className="record">
              <div className="record-title">
                <span>
                  <i className="fa fa-square" aria-hidden="true" />
                </span>
                <h4>이력</h4>
              </div>
              <div className="record-list">
                <ul>
                  <li>2016년 6월 SI프로젝트 부터 시작</li>
                  <li>2106년 11월 차세대 프로젝트 투입</li>
                </ul>
              </div>
            </div>
            <Link href="/login">
              <a className="admin-link">관리자로그인</a>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .profile-container {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .profile-inner {
          width: 600px;
          margin: auto;
          /* border: 1px solid red; */
        }
        .profile-wrapper {
          width: 100%;
        }
        .profile-wrapper img {
          object-fit: cover;
          width: 600px;
          height: 400px;
        }
        .record {
        }
        .record-title {
          margin: 8px 0;
        }
        .record-title span {
        }
        .record-title h4 {
          display: inline-block;
        }
        .record-list {
          /* border: 1px solid blue; */
          margin-left: 20px;
          margin-bottom: 10px;
        }
        .record-list ul {
        }
        .record-list ul li {
          /* margin: 3px 0; */
        }

        .admin-link {
          background-color: #ffffff;
          border: 1px solid rgb(209, 213, 219);
          border-radius: 0.5rem;
          box-sizing: border-box;
          color: #111827;
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1.15rem;
          padding: 0.75rem 1rem;
          text-align: center;
          text-decoration: none #d1d5db solid;
          text-decoration-thickness: auto;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          cursor: default;
          user-select: none;
          -webkit-user-select: none;
          touch-action: manipulation;
          display: block;
          width: 120px;
          margin-left: auto;
        }

        .admin-link:hover {
          background-color: rgb(249, 250, 251);
        }

        .admin-link:focus {
          outline: 2px solid transparent;
          outline-offset: 2px;
        }

        .admin-link:focus-visible {
          box-shadow: none;
        }

        @media screen and (max-width: 768px) {
          .profile-container {
            align-items: flex-start;
          }

          .profile-inner {
            width: 100%;
            margin: 0;
          }

          .record {
            margin: 0 10px;
          }

          .profile-wrapper img {
            object-fit: cover;
            width: 100%;
          }

          .profile-wrapper button {
            margin-right: 10px;
          }
        }
      `}</style>
    </>
  );
};

export default profile;
