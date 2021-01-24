import React from 'react';
import Slider from "react-slick";
import CardFilm from './CardFilm.js';
import '../../styles/films/film.scss';

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="s-arrow s-arrow--next"
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="s-arrow s-arrow--prev"
      onClick={onClick}
    />
  );
}

export default function ListFilm(props) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Slider className="list-slider" {...settings}>
      <div className="list-film">
        <CardFilm />
        <CardFilm />
        <CardFilm />
        <CardFilm />
        <CardFilm />
        <CardFilm />
        <CardFilm />
        <CardFilm />
      </div>
      <div className="list-film">
        <CardFilm />
        <CardFilm />
        <CardFilm />
        <CardFilm />
        <CardFilm />
      </div>
    </Slider>
  )
}
