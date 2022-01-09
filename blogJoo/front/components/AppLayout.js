import PropTypes from "prop-types";
import Header from "./Header";
import Nav from "./Nav";

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
        }

        .main-wrapper {
          display: flex;
        }
      `}</style>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppLayout;
