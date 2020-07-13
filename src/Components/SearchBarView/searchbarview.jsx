import React from "react";
import "./styles.scss";
const SearchBarView = (props) => {
  return (
    <React.Fragment>
      <div className="search-bar">
        <div className="input-group mb-3">
          <input
            type="text"
            onBlur={() => props.onBlur() }
            className="form-control"
            placeholder="Search"
            onChange={(e) => {
              props.onChange(e);
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchBarView;
