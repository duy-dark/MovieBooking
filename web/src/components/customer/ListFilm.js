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
  var slides = Math.floor(props.films.length / 8) ;
  const surplus = props.films.length % 8;
  if (surplus > 0) {slides = slides + 1};
  function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }
  const listSlidesFilm = []
  for (var i = 0; i < slides; i++) {
    listSlidesFilm.push(
      <div className="list-film" key={i}>
        {paginate(props.films, 8, i + 1).map((film,index) => 
        <CardFilm key={index} film={film} clickTrailer={props.clickTrailer} />   
        )}
    </div>
    )
  } 
  return (
    <Slider className="list-slider" {...settings}>
      {listSlidesFilm}
    </Slider>
  )
}
