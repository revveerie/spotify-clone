import React from "react";
import { Link } from 'react-router-dom';

const ShowMore = ({ path }) => {

  return (
    <>
      <div className="show-more__button">
        <Link to={path} className="show-more__button-link">
            Show more
        </Link>
      </div>
    </>
  )
};

export default ShowMore;
