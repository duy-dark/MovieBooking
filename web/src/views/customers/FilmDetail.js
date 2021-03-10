import React, { useState, useEffect } from "react";
import ModalTrailer from "../../components/customer/ModalTrailer";
import TabsSchedule from "../../components/customer/TabsSchedule.js";
// import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../../styles/customers/detail/detail.scss';
import * as moment from 'moment';
import { useLocation, useParams } from "react-router-dom"
import { getFilmDetails, getComments } from "../../redux/films/actions"
import { useDispatch , useSelector} from "react-redux";
import { getUserInfo } from "../../redux/users/actions";

export default function FilmDetail() {
  const [modalShow, setModalShow] = useState(false);
  const [modalId, setModalId] = useState("");
  const showTrailerSlider = (id) => {
    setModalId(id);
    setModalShow(true);
  };
  let { id } = useParams();
  const location = useLocation();
  // eslint-disable-next-line
  const [future, setFuture] = useState(location.state || {});

  const [showMore, setShowMore] = useState(1);

  useEffect(() => {
    dispatch(getComments({id: id, limit: showMore}));
  }, [showMore])

  const  dispatch = useDispatch();
  useEffect(() =>{
    const info = {
      id: id
    };
    dispatch(getFilmDetails(info));
    // dispatch(getComments({id: id, limit: showMore}));
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userID");
    if (token && userID) {
      dispatch(getUserInfo({ token, userID }));
    }
  // eslint-disable-next-line
  },[])

   let data = useSelector(state =>state.films.filmDetail)
   let dayOfWeeks = useSelector(state=>state.films.dayOfWeeks)
   let comments = useSelector(state=>state.films.comments)
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
            <img className="detail-slider__image__play" onClick={() => showTrailerSlider(data._id)} src={`/assets/images/film/play-video.png`} alt=""/>
          </div>
          <div className="detail-slider__content">
            <div className="detail-slider__date">{moment('2021/01/02').format('DD-MM-YYYY')}</div>
            <div className="detail-slider__name">{data.name}</div>
            <div className="detail-slider__time">{data.long_time} phút</div>
            <div className="detail-slider__rates">
              <span>{data.rate_average && data.rate_average.toFixed(2)}</span>
              <div>
                { data.rate_average / 2 >= 1 && (<img src={`https://tix.vn/app/assets/img/icons/star1.png`} alt="star"/>)}
                { data.rate_average / 2 >= 2 && (<img src={`https://tix.vn/app/assets/img/icons/star1.png`} alt="star"/>)}
                { data.rate_average / 2 >= 3 && (<img src={`https://tix.vn/app/assets/img/icons/star1.png`} alt="star"/>)}
                { data.rate_average / 2 >= 4 && (<img src={`https://tix.vn/app/assets/img/icons/star1.png`} alt="star"/>)}
                { data.rate_average / 2 === 5 && (<img src={`https://tix.vn/app/assets/img/icons/star1.png`} alt="star"/>)}
                { data.rate_average !== 0 && (<img src={`https://tix.vn/app/assets/img/icons/star1.2.png`} alt="star"/>)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="detail-wrapper">
       {data && dayOfWeeks && <TabsSchedule showMore={showMore} onShowMoreComment={more => setShowMore(more)} future={future.future ? 0 : 1} detail={data} dayOfWeeks={dayOfWeeks} comments={comments}/>}
      </div>
      <ModalTrailer
        show={modalShow}
        trailer={data.trailer}
        onHide={() => setModalShow(false)}
        id={modalId}
      />
    </div>
  );
}
