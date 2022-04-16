import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";

import Slider from "react-slick";
import ReleasesCard from "./ReleasesCard.jsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Releases = ({ dropdown }) => {
  const [releases, setReleases] = useState("");

  const RELEASES_ENDPOINT = "https://api.spotify.com/v1/browse/new-releases?country=US";

  var settings = {
    dots: false,
    slidesToShow: 5,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1650,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

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

  const getItem = (item, keyword) => {
    for (let key in item) {
      for (let innerKey in item[key]) {
        return item[key][keyword];
      }
    }
  };

  return (
    <>
      <Slider {...settings} className={dropdown ? "hidden" : ""}>
        {releases?.items
          ? releases.items.map((item, index) => (
              <ReleasesCard
                key={index}
                image={getItem(item.images, "url")}
                name={item.name}
                artist={getItem(item.artists, "name")}
                type={item.type}
                pathRelease="/album"
                pathArtist="/artist"
              />
            ))
          : null}
      </Slider>
    </>
  );
};

export default Releases;
