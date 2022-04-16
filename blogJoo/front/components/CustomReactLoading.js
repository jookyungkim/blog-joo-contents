import React from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";
import PropTypes from "prop-types";

const ReactLoadingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const CustomReactLoading = ({ type, color }) => {
  return (
    <>
      <ReactLoadingWrapper>
        <ReactLoading type={type} color={color} />
      </ReactLoadingWrapper>
    </>
  );
};

CustomReactLoading.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

export default CustomReactLoading;
