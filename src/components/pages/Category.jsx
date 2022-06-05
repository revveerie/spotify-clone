import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import PlaylistCard from "../cards/PlaylistCard.jsx";

import getItem from "../../helpers/getItem.js";

const Category = ({ dropdown }) => {
  const [category, setCategory] = useState("");
  const { id } = useParams();
  useEffect(() => {
    let token = localStorage.getItem("token");

    axios(`	https://api.spotify.com/v1/browse/categories/${id}/playlists?limit=50`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((categoryResponse) => {
        setCategory(categoryResponse.data.playlists);
      })

      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className={dropdown ? "playlists page hidden" : "playlists page"}>
        <div className="page__header">
          <div className="page__header-text">Category</div>
        </div>
        <div className="playlists__wrapper">
          {category?.items
            ? category.items.map((item, index) => (
                <div className="grid-item" key={index}>
                  <PlaylistCard
                    index={index}
                    name={item.name}
                    image={getItem(item.images, "url")}
                    creator={item.owner.display_name}
                    id={item.id}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default Category;
