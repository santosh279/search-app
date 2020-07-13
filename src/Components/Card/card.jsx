/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "./styles.scss";
import { trimDetails } from "../../Helper/searchbar-method";
import moment from "moment";

const Card = (props) => {
  const { thumbnails, title, channelTitle, publishTime } = props.data.snippet;
  const { videoId } = props.data.id;
  const { url } = thumbnails.medium;
  return (
    <React.Fragment>
      <div className="card">
        <img className="card-img-top" src={url} alt={title} />
        <div className="card-body">
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            // eslint-disable-next-line react/jsx-no-target-blank
            target="_blank"
            className="card-title"
            style={{ fontSize: "15px" }}
          >
            {title.length > 0 ? trimDetails(title, 70) : "No title available"}
          </a>
          <p className="card-text">
            {channelTitle.length > 0
              ? channelTitle
              : "No channel title available"}{" "}
            ||{" "}
            {publishTime.length > 0
              ? moment(publishTime).fromNow()
              : "No publish time provided"}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
