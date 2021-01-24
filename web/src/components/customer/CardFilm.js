import React from 'react';

export default function CardFilm(props) {
  return (
    <div className="card-film">
      <div className="card-film__content">
        <div className="card-film__image">
          <img src={`/assets/film/film1.png`} alt=""/>
        </div>
        <div className="card-film__name">Nữ Thần Chiến Binh 1984 - Wonder Woman 1984 (C13)</div>
        <div className="card-film__long">100 min</div>
      </div>
      <div className="card-film__link">
        <div className="card-film__image">
          <img src={`/assets/film/play-video.png`} alt=""/>
        </div>
        <div className="card-film__booking">
          <button className="btn btn--default">Mua Vé</button>
        </div>
      </div>
    </div>
  )
}
