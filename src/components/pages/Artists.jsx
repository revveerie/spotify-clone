import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import ArtistCard from "../cards/ArtistCard.jsx";

import getItem from "../../helpers/getItem.js";

import NoFollow from "../../assets/icons/avatar-dg.png";

const Artists = ({ dropdown }) => {
  const [artists, setArtists] = useState("");

  const ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/following?type=artist&limit=50";

  useEffect(() => {
    let token = localStorage.getItem("token");

    axios(ARTISTS_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((artistsResponse) => {
        console.log(artistsResponse.data.artists);
        setArtists(artistsResponse.data.artists);
      })

      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className={dropdown ? "artists page hidden" : "artists page"}>
        <div className="page__header">
          <div className="page__header-text">Followed artists</div>
        </div>
        {artists.total == 0 ? (
          <div className="no-follow">
            <div className="no-follow__image">
              <img src={NoFollow} />
            </div>
            <div className="no-follow__text">Follow your first artist</div>
            <div className="show-more__button">
              <Link to='/' className="show-more__button-link">
                  Explore
              </Link>
            </div>
          </div>
        ) : (
          <div className="artists__wrapper">
            {artists?.items
              ? artists.items.map((item, index) => (
                  <div className="grid-item" key={index}>
                    <ArtistCard
                      index={index}
                      image={getItem(item.images, "url")}
                      name={item.name}
                      artist={item.name}
                      type={item.type}
                      id={item.id}
                      key={index}
                    />
                  </div>
                ))
              : null}
          </div>
        )}
      </div>
    </>
  );
};

export default Artists;
