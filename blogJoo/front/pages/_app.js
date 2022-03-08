import PropTypes from "prop-types";
import Head from "next/head";

import "../css/common.css";
import wrapper from "../store/configureStore";

function App({ Component }) {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>BlogJoo</title>
      </Head>
      <Component />
    </div>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired
};

export default wrapper.withRedux(App);
