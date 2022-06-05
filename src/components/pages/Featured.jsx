import React, { useState, useEffect } from "react";
import axios from "axios";

import FeaturedCard from "../cards/FeaturedCard.jsx";

import getItem from "../../helpers/getItem.js";

const Featured = ({ dropdown }) => {

  const [category, setCategory] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");

    axios(`https://api.spotify.com/v1/browse/featured-playlists?limit=50`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((categoryResponse) => {
        console.log(categoryResponse.data.playlists);
        setCategory(categoryResponse.data.playlists);
      })

      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className={dropdown ? "categories-page page hidden" : "categories-page page"}>
        <div className="page__header">
          <div className="page__header-text">Featured playlists</div>
        </div>
        <div className="categories-page__wrapper">
          {category?.items
            ? category.items.map((item, index) => (
                <FeaturedCard
                  key={index}
                  image={getItem(item.images, "url")}
                  name={item.name}
                  index={index}
                  id = {item.id}
                />
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default Featured;
