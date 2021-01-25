import React, { useState, useEffect } from "react";
import ModalTrailer from "../../components/customer/ModalTrailer";
import TabsSchedule from "../../components/customer/TabsSchedule.js";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../../styles/customers/detail/detail.scss';
import * as moment from 'moment';
import {useParams} from "react-router-dom"
import { getFilmDetails } from "../../redux/films/actions"
import { useDispatch , useSelector} from "react-redux";

export default function FilmDetail() {
  const [modalShow, setModalShow] = useState(false);
  const [modalId, setModalId] = useState("");
  const showTrailerSlider = (id) => {
    setModalId(id);
    setModalShow(true);
  };
  let { id } = useParams();

  const  dispatch = useDispatch();
  useEffect(() =>{
    const info = {
      id: id
    };
    dispatch(getFilmDetails(info));
  },[])

   let data=useSelector(state =>state.films.filmDetail)
   let dayOfWeeks =useSelector(state=>state.films.dayOfWeeks)
  return (
    <div className="detail">
         <div className="detail-slider">
        <div className="detail-image">
          <img src={`${data.url_background}`} alt=""/>
        </div>
        <div className="detail-bg"></div>
        <div className="detail-slider__wrapper">
          <div className="detail-slider__image">
            <img className="detail-slider__image__movie" src={`${data.url_avatar}`} alt=""/>
            <img className="detail-slider__image__play" onClick={() => {}} src={`/assets/film/play-video.png`} alt=""/>
          </div>
          <div className="detail-slider__content">
            <div className="detail-slider__date">{moment('2021/01/02').format('DD-MM-YYYY')}</div>
            <div className="detail-slider__name">Nữ Thần Chiến Binh 1984 - Wonder Woman 1984 (C13)</div>
            <div className="detail-slider__time">100 min</div>
          </div>
        </div>
      </div>
      <div className="detail-wrapper">
       {data,dayOfWeeks && <TabsSchedule detail={data} dayOfWeeks={dayOfWeeks}/>}
      </div>
      <ModalTrailer
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={modalId}
      />
    </div>
  );
}
