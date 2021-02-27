import React from "react";

export default function CardFilm(props) {
  const goDetail = (id) => {
    history.push({
      pathname: `/${id}/detail`,
      state: {
        future: props.future
      }
    })
  };
  return (
    <div className="card-film">
      <div className="card-film__content">
        <div className="card-film__image">
          <img src={`${props.film.url_avatar}`} alt="" />
        </div>
        <div className="card-film__name">{props.film.name}</div>
        <div className="card-film__long">{`${props.film.long_time} min`}</div>
      </div>
      <div className="card-film__link" onClick={() => goDetail(props.film._id)}>
        <div className="card-film__image">
          <img
            src="/assets/images/film/play-video.png"
            alt=""
            onClick={(e) => {
              props.clickTrailer(props.film.trailer);
              e.stopPropagation();
            }}
          />
        </div>
        <div className="card-film__booking">
          <button className="btn btn--default">Mua Vé</button>
        </div>
      </div>
    </div>
  );
}
