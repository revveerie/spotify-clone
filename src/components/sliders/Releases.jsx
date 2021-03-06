import React, { useState, useEffect } from "react";
import axios from "axios";

import BasicCard from "../cards/BasicCard.jsx";

import { Navigation, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";

import getItem from "../../helpers/getItem.js";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

const Releases = () => {
  const [releases, setReleases] = useState("");

  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  const RELEASES_ENDPOINT = "https://api.spotify.com/v1/browse/new-releases?country=US";

  useEffect(() => {
    let token = localStorage.getItem("token");

    axios(RELEASES_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((releasesResponse) => {
        setReleases(releasesResponse.data.albums);
      })

      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={6}
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
            slidesPerView: 4,
          },
          991: {
            slidesPerView: 5,
          },
          768: {
            slidesPerView: 4,
          },
          650: {
            slidesPerView: 3,
          },
          0: {
            slidesPerView: 2,
          },
        }}
      >
        {releases?.items
          ? releases.items.map((item, index) => (
              <SwiperSlide key={index}>
                <BasicCard
                  image={getItem(item.images, "url")}
                  name={item.name}
                  artist={getItem(item.artists, "name")}
                  type={item.album_type}
                  pathArtist={`artist/${getItem(item.artists, "id")}`}
                  id={item.id}
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

export default Releases;
