import React, { useState, useEffect } from "react";
import axios from "axios";

import CategoryCard from "../CategoryCard.jsx";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

const Categories = ({ dropdown }) => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

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
                <CategoryCard
                  key={index}
                  image={getItem(item.icons, "url")}
                  name={item.name}
                  index={index}
                  pathCat={`category/${item.id}`}
                />
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default Categories;
