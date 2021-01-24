import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/slider.scss";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
    />
  );
}

export default function SliderMovies(props) {
  const settings = {
    
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="block-slider">
      <Slider className="slider" {...settings}>
        {
          props.listSlider.map(item => {
            return (
              <div key={item._id} className="slider__list">
                <img className="slider__image" src={`${item.url_background}`}  alt=""/>
                <img className="play" onClick={() => props.clickTrailer(item.trailer)} name={item._id} src={`/assets/images/film/play-video.png`} alt=""/>
              </div>
            )
          })
        }
      </Slider>
    </div>
  );
}
