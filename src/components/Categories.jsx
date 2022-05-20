import React, { useState, useEffect } from "react";
import axios from "axios";

import CategoryCard from "./CategoryCard.jsx";

import { Navigation, FreeMode} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

const Categories = ({ dropdown }) => {

  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)

  const [category, setCategory] = useState("")

  useEffect (() => {
    let token = localStorage.getItem("token");
    axios(`	https://api.spotify.com/v1/browse/categories`, {
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
  }, [])

  const getItem = (item, keyword) => {
    for (let key in item) {
      for (let innerKey in item[key]) {
        return item[key][keyword];
      }
    }
  };

  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={5}
        freeMode={true}
        loop={true}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
       onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
       }}
        modules={[Navigation, FreeMode]}
        breakpoints={{
          1440: {
            slidesPerView: 6,
          },
          1200: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 4
          },
          991: {
            slidesPerView: 5
          },
          768: {
            slidesPerView: 4
          },
          650: {
            slidesPerView: 3
          },
          0: {
            slidesPerView: 2
          }
        }}
      >
        {category?.items
          ? category.items.map((item, index) => (
            <SwiperSlide key={index}>
              <CategoryCard
                image={getItem(item.icons, "url")}
                name={item.name}
                index={index}
                pathCat={`category/${(item.id)}`}
              />
            </SwiperSlide>
            ))
          : null}
      </Swiper>
      <div ref={navigationPrevRef} className="slick-arrow slick-prev" />
      <div ref={navigationNextRef} className="slick-arrow slick-next" />
    </>
  );
};

export default Categories;
