import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ArtistAlbumCard from "../cards/ArtistAlbumCard.jsx";

import getItem from "../../helpers/getItem.js";

const ArtistAlbums = ({ dropdown }) => {
  const { id } = useParams();
  const [artistAlbums, setArtistAlbums] = useState("");
  const [artistSingles, setArtistSingles] = useState("");
  const [artist, setArtist] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");

    axios(`https://api.spotify.com/v1/artists/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((artistResponse) => {
        setArtist(artistResponse.data);
      })

      .catch((error) => console.log(error));

    axios(`https://api.spotify.com/v1/artists/${id}/albums?limit=50&include_groups=album`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((albumsResponse) => {
        setArtistAlbums(albumsResponse.data.items);
      })

      .catch((error) => console.log(error));

    axios(`https://api.spotify.com/v1/artists/${id}/albums?limit=50&include_groups=single`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((singlesResponse) => {
        setArtistSingles(singlesResponse.data.items);
      })

      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className={dropdown ? "artist-albums page hidden" : "artist-albums page"} id="top">
        <div className="artist-albums__header">
          <div className="artist-albums__title">
            <p className="artist-albums__title-text-top">
              {artistAlbums.length != 0 ? "Albums" : "Singles"} by {artist.name}
            </p>
          </div>
        </div>
        <div className="albums__wrapper">
          {artistAlbums.length != 0
            ? artistAlbums
              ? artistAlbums.map((item, index) => (
                  <div className="grid-item" key={index}>
                    <ArtistAlbumCard
                      index={index}
                      image={getItem(item.images, "url")}
                      name={item.name}
                      pathAlbum={`/album/${item.id}`}
                    />
                  </div>
                ))
              : null
            : artistSingles
            ? artistSingles.map((item, index) => (
                <div className="grid-item" key={index}>
                  <ArtistAlbumCard
                    index={index}
                    image={getItem(item.images, "url")}
                    name={item.name}
                    pathAlbum={`/album/${item.id}`}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default ArtistAlbums;
