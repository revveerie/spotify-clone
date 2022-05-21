import React, { useState, useEffect } from "react";
import axios from "axios";

import FeaturedCard from "../FeaturedCard.jsx";

const Featured = ({ dropdown }) => {

  const [category, setCategory] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios(`https://api.spotify.com/v1/browse/featured-playlists`, {
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

  const getItem = (item, keyword) => {
    for (let key in item) {
      for (let innerKey in item[key]) {
        return item[key][keyword];
      }
    }
  };

  return (
    <>
      <div className={dropdown ? "categories-page page hidden" : "categories-page page"}>
        <div className="page__header">
          <div className="page__header-text">Categories</div>
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
