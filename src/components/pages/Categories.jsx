import React, { useState, useEffect } from "react";
import axios from "axios";

import CategoryCard from "../cards/CategoryCard.jsx";

import getItem from "../../helpers/getItem.js";

const Categories = ({ dropdown }) => {
  const [category, setCategory] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios(`	https://api.spotify.com/v1/browse/categories?limit=50`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((categoryResponse) => {
        console.log(categoryResponse.data.categories);
        setCategory(categoryResponse.data.categories);
      })

      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className={dropdown ? "categories-page page hidden" : "categories-page page"}>
        <div className="page__header">
          <div className="page__header-text">Categories</div>
        </div>
        <div className="categories-page__wrapper">
          {category?.items
            ? category.items.map((item, index) => (
                <CategoryCard
                  key={index}
                  image={getItem(item.icons, "url")}
                  name={item.name}
                  index={index}
                  id={item.id}
                />
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default Categories;
