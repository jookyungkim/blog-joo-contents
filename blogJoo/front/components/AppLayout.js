import PropTypes from "prop-types";
import Header from "./Header";
import Nav from "./Nav";
import wrapper from "../pages/_app";

const AppLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="main">
        <div className="inner">
          <div className="main-wrapper">
            <Nav />
            {children}
          </div>
        </div>
      </div>
      <style jsx>{`
        .main {
          width: 100%;
          /* margin-top: px; */
        }

        .main-wrapper {
          display: flex;
        }

        /* @media (min-width: 335px) and (max-width: 757px) {
          .main-wrapper {
            margin-top: 20px;
          }
        } */
      `}</style>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppLayout;
