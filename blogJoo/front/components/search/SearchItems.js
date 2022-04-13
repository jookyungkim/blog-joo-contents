import React from "react";
import PropTypes from "prop-types";

import SearchText from "./SearchText";

const SearchItems = ({ items }) => {
  // console.log("Search items ", items);
  return (
    <>
      <div className="search-block">
        <div className="search-list">
          {items.map(item => (
            <SearchText key={item.id} item={item} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .search-block {
          /* border: 1px solid red; */
          position: absolute;
          background-color: #ffffff;
          width: 250px;
        }
        .search-list {
          /* border: 1px solid red; */
          background-color: #ffffff;
        }

        @media (min-width: 335px) and (max-width: 757px) {
          .search-list {
            margin: auto;
            width: 298px;
          }
          .search-block {
            width: 100%;
            background-color: #ffffff00;
          }
        }
      `}</style>
    </>
  );
};

SearchItems.propTypes = {
  items: PropTypes.array
};

export default SearchItems;
