import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import Icon from "../Icon.jsx";
import AudioWave from "../AudioWave.jsx";
import ArtistAlbumCard from "../ArtistAlbumCard.jsx";

import NoArtist from "../../assets/images/no-artist-image.jpg";
import Play from "../../assets/icons/play-button.png";
import PlayHover from "../../assets/icons/play-button-gr.png";
import Save from "../../assets/icons/tick-gr.png";
import TickNotSaved from "../../assets/icons/tick-lg.png";
import TickSaved from "../../assets/icons/tick-gr.png";

const Artist = ({ dropdown, props }) => {
  const [artist, setArtist] = useState("");
  const [artistAlbums, setArtistAlbums] = useState("");
  const [isFollow, setIsFollow] = useState("");
  const [save, setSave] = useState(false);
  const [saveTrack, setSaveTrack] = useState(false);
  const [remove, setRemove] = useState(false);
  const [removeTrack, setRemoveTrack] = useState(false);
  const [popular, setPopular] = useState("");
  const [morePopular, setMorePopular] = useState(false);
  const [related, setRelated] = useState("");
  const [moreRelated, setMoreRelated] = useState(false);
  const [current, setCurrent] = useState(null);
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState("");
  const [currentSaved, setCurrentSaved] = useState(null);

  let savedBackground = true;
  useEffect(() => {
    if (id) {
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

      axios(`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((isFollowResponse) => {
          setIsFollow(isFollowResponse.data[0]);
        })

        .catch((error) => console.log(error));

      axios(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((popularResponse) => {
          setPopular(popularResponse.data.tracks);
        })

        .catch((error) => console.log(error));

      axios(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((relatedResponse) => {
          setRelated(relatedResponse.data.artists);
        })

        .catch((error) => console.log(error));

      axios(`https://api.spotify.com/v1/artists/${id}/albums?limit=50`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((albumsResponse) => {
          console.log(albumsResponse.data)
          setArtistAlbums(albumsResponse.data.items);
        })

        .catch((error) => console.log(error));
    }
  }, [id]);

  const getItem = (item, keyword) => {
    for (let key in item) {
      for (let innerKey in item[key]) {
        return item[key][keyword];
      }
    }
  };

  const onSave = () => {
    let token = localStorage.getItem("token");

    axios(`https://api.spotify.com/v1/me/following?type=artist&ids=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((saveResponse) => {
        setSave(saveResponse.data);
        setIsFollow(true);
      })

      .catch((error) => console.log(error));
  };

  const onRemove = () => {
    let token = localStorage.getItem("token");

    axios(`https://api.spotify.com/v1/me/following?type=artist&ids=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((removeResponse) => {
        setRemove(removeResponse.data);
        setIsFollow(false);
      })

      .catch((error) => console.log(error));
  };

  const handleClick = (e) => {
    setCurrent(e);
  };

  const onMorePopular = () => {
    morePopular == false ? setMorePopular(true) : setMorePopular(false);
  };

  const onMoreRelated = () => {
    moreRelated == false ? setMoreRelated(true) : setMoreRelated(false);
  };

  const getInfo = (item, keyword) => {
    for (let key in item) {
      if (key == keyword) return item[key];
    }
  };

  const handleClickSaved = (e, id) => {
    setCurrentSaved(e);

    let token = localStorage.getItem("token");

    axios(`https://api.spotify.com/v1/me/tracks/contains?ids=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((isSavedResponse) => {
        setIsSaved(isSavedResponse.data[0]);
      })

      .catch((error) => console.log(error));
  };

  const handleOutSaved = () => {
    setCurrentSaved();
  };

  const onSaveTrack = (e, id) => {
    let token = localStorage.getItem("token");

    axios(`https://api.spotify.com/v1/me/tracks?ids=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((saveTrackResponse) => {
        setSaveTrack(saveTrackResponse.data);
        setIsSaved(true);
      })

      .catch((error) => console.log(error));
  };

  const onRemoveTrack = (e, id) => {
    let token = localStorage.getItem("token");

    axios(`https://api.spotify.com/v1/me/tracks?ids=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((removeTrackResponse) => {
        setRemoveTrack(removeTrackResponse.data);
        setIsSaved(false);
      })

      .catch((error) => console.log(error));
  };

  function topFunction() {
    document.body.scrollTop = 0; // Для Safari
    document.documentElement.scrollTop = 0; // Для Chrome, Firefox, IE и Opera
  }
  
  return (
    <>
      <div className={dropdown ? "artist-page page hidden" : "artist-page page"} id="top">
        <div className="basic-page__top artist-page__top">
          <img src={getItem(artist.images, "url")} />
        </div>
        <div className="basic-page__content artist-page__content">
          <div className="container">
            <div className="basic-page__info artist-page__info">
              <div className="basic-page__info-image artist-page__info-image">
                {getItem(artist.images, "url") ? (
                  <img src={getItem(artist.images, "url")} />
                ) : (
                  <img src={NoArtist} />
                )}
              </div>
              <div className="basic-page__info-content artist-page__info-content info-content">
                <div className="info-content__type artist-page__type">
                  <p className="info-content__type-text artist-page__type-text">{artist.type}</p>
                </div>
                <div className="info-content__title artist-page__title">
                  <p className="info-content__title-text artist-page__title-text">{artist.name}</p>
                </div>
                <div className="info-content__buttons artist-page__buttons">
                  <div className="info-content__button info-content__button_play artist-page__button artist-page__button_play">
                    <div className="info-content__button-icon">
                      <Icon image={Play} imageActive={PlayHover}></Icon>
                    </div>
                    <div className="info-content__button-text">Play</div>
                  </div>
                  <div
                    className="info-content__button info-content__button_save artist-page__button artist-page__button_save"
                    onClick={isFollow ? onRemove : onSave}
                  >
                    {isFollow ? (
                      <>
                        <div className="info-content__button-icon">
                          <Icon image={Save} imageActive={Save}></Icon>
                        </div>
                        <div className="info-content__button-text">Following</div>
                      </>
                    ) : (
                      <div className="info-content__button-text">Follow</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="artist-page__main-row">
              <div className="artist-page__column">
                <div className="artist-page__popular">
                  <div className="artist-page__header">
                    <div className="artist-page__title">
                      <p className="artist-page__title-text-top">Popular</p>
                    </div>
                    <div className="show-more__button" onClick={onMorePopular}>
                      <div className="show-more__button-link">
                        {morePopular ? "Show less" : "Show more"}
                      </div>
                    </div>
                  </div>
                  <div className="basic-page__tracks album__tracks">
                    {popular
                      ? popular.map((item, index) =>
                          index < 5 ? (
                            <div
                              className={
                                current === item
                                  ? "basic-page__track artist-page__track active"
                                  : "basic-page__track artist-page__track"
                              }
                              key={index}
                              onMouseEnter={() => handleClickSaved(item, item.id)}
                              onMouseLeave={() => handleOutSaved()}
                            >
                              <div className="basic-page__track-image artist-page__track-image">
                                {getItem(item.album.images, "url") ? (
                                  <img src={getItem(item.album.images, "url")} alt="" />
                                ) : (
                                  <img src={NoAlbum} alt="" />
                                )}
                              </div>
                              <div className="basic-page__track-number artist-page__track-number">
                                {current === item ? (
                                  <AudioWave />
                                ) : (
                                  <p className="basic-page__track-number-text artist-page__track-number-text">
                                    {index + 1}
                                  </p>
                                )}
                              </div>

                              <div
                                className="basic-page__track-title artist-page__track-title"
                                onClick={() => handleClick(item)}
                              >
                                <p className="basic-page__track-title-text artist-page__track-title-text">
                                  {item.name}
                                </p>
                                <div className="artist-page__row">
                                  <Link
                                    className="artist-page__track-title-artist artist-page__track-title-album"
                                    to={`/album/${getInfo(item.album, "id")}`}
                                  >
                                    {getInfo(item.album, "name")}
                                  </Link>
                                </div>
                              </div>
                              <div
                                className="basic-page__track-saved artist-page__track-saved"
                                onClick={() =>
                                  isSaved
                                    ? onRemoveTrack(item, item.id)
                                    : onSaveTrack(item, item.id)
                                }
                              >
                                {currentSaved === item ? (
                                  isSaved ? (
                                    <>
                                      <div className="basic-page__icon-wrapper">
                                        <div className="basic-page__icon">
                                          <Icon image={TickSaved} imageActive={TickSaved} />
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div className="basic-page__icon-wrapper">
                                        <div className="basic-page__icon">
                                          <Icon image={TickNotSaved} imageActive={TickNotSaved} />
                                        </div>
                                      </div>
                                    </>
                                  )
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          ) : (
                            (savedBackground = false)
                          )
                        )
                      : null}
                    {morePopular ? (
                      popular ? (
                        popular.map((item, index) =>
                          index >= 5 ? (
                            <div
                              className={
                                current === item
                                  ? "basic-page__track artist-page__track active"
                                  : "basic-page__track artist-page__track"
                              }
                              key={index}
                              onMouseEnter={() => handleClickSaved(item, item.id)}
                              onMouseLeave={() => handleOutSaved()}
                            >
                              <div className="basic-page__track-image artist-page__track-image">
                                {getItem(item.album.images, "url") ? (
                                  <img src={getItem(item.album.images, "url")} alt="" />
                                ) : (
                                  <img src={NoAlbum} alt="" />
                                )}
                              </div>
                              <div className="basic-page__track-number artist-page__track-number">
                                {current === item ? (
                                  <AudioWave />
                                ) : (
                                  <p className="basic-page__track-number-text artist-page__track-number-text">
                                    {index + 1}
                                  </p>
                                )}
                              </div>

                              <div
                                className="basic-page__track-title artist-page__track-title"
                                onClick={() => handleClick(item)}
                              >
                                <p className="basic-page__track-title-text artist-page__track-title-text">
                                  {item.name}
                                </p>
                                <div className="artist-page__row">
                                  <Link
                                    className="artist-page__track-title-artist"
                                    to={`/album/${getInfo(item.album, "id")}`}
                                  >
                                    {getInfo(item.album, "name")}
                                  </Link>
                                </div>
                              </div>
                              <div
                                className="basic-page__track-saved artist-page__track-saved"
                                onClick={() =>
                                  isSaved
                                    ? onRemoveTrack(item, item.id)
                                    : onSaveTrack(item, item.id)
                                }
                              >
                                {currentSaved === item ? (
                                  isSaved ? (
                                    <>
                                      <div className="basic-page__icon-wrapper">
                                        <div className="basic-page__icon">
                                          <Icon image={TickSaved} imageActive={TickSaved} />
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div className="basic-page__icon-wrapper">
                                        <div className="basic-page__icon">
                                          <Icon image={TickNotSaved} imageActive={TickNotSaved} />
                                        </div>
                                      </div>
                                    </>
                                  )
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          ) : (
                            (savedBackground = false)
                          )
                        )
                      ) : null
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="artist-page__albums">
                  <div className="artist-page__header">
                    <div className="artist-page__title">
                      <p className="artist-page__title-text-top">Albums</p>
                    </div>
                  </div>
                  <div className="artist-page__grid">
                    {artistAlbums
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
                      : null}
                  </div>
                </div>
              </div>
              <div className="artist-page__column">
                <div className="artist-page__related">
                  <div className="artist-page__header">
                    <div className="artist-page__title">
                      <p className="artist-page__title-text-top">Related artists</p>
                    </div>
                    <div className="show-more__button" onClick={onMoreRelated}>
                      <div className="show-more__button-link">
                        {moreRelated ? "Show less" : "Show more"}
                      </div>
                    </div>
                  </div>
                  <div className="artist-page__related-wrapper">
                    {related
                      ? related.map((item, index) =>
                          index < 5 ? (
                            <Link
                              className="artist-page__related-row"
                              key={index}
                              to={`/artist/${item.id}`}
                              onClick={topFunction}
                            >
                              <div className="artist-page__related-image">
                                {getItem(item.images, "url") ? (
                                  <img src={getItem(item.images, "url")} alt="" />
                                ) : (
                                  <img src={NoArtist} alt="" />
                                )}
                              </div>
                              <div className="artist-page__related-name">
                                <p className="artist-page__related-name-text">{item.name}</p>
                              </div>
                            </Link>
                          ) : (
                            (savedBackground = false)
                          )
                        )
                      : null}
                    {moreRelated ? (
                      related ? (
                        related.map((item, index) =>
                          index >= 5 && index < 10 ? (
                            <Link
                              className="artist-page__related-row"
                              key={index}
                              to={`/artist/${item.id}`}
                            >
                              <div className="artist-page__related-image">
                                {getItem(item.images, "url") ? (
                                  <img src={getItem(item.images, "url")} alt="" />
                                ) : (
                                  <img src={NoArtist} alt="" />
                                )}
                              </div>
                              <div className="artist-page__related-name">
                                <p className="artist-page__related-name-text">{item.name}</p>
                              </div>
                            </Link>
                          ) : (
                            (savedBackground = false)
                          )
                        )
                      ) : null
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Artist;
