import React from "react";
import PropTypes from "prop-types";

const SearchText = ({ item }) => {
  return (
    <>
      <div className="search-text">
        <h4>{item.text}</h4>
      </div>
      <style jsx>{`
        .search-text {
          /* border: 1px solid red; */
          padding-top: 5px;
          padding-bottom: 5px;
        }
      `}</style>
    </>
  );
};

SearchText.propTypes = {
  item: PropTypes.object
};

export default SearchText;
