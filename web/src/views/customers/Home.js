import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TabListFilm from "../../components/customer/TabsListFilm.js";
import TabsTheater from "../../components/customer/TabsTheater.js";
import TabsNew from "../../components/customer/TabsNew.js";
import SliderMovies from "../../components/customer/SliderMovies.js";
import { getListFilmFuture, getListFilmNow, getListFilmToday, getSearch } from "../../redux/films/actions";
import ModalTrailer from "../../components/customer/ModalTrailer";
import Select, { components } from "react-select";
import * as moment from "moment";

const days = ['chủ nhật', 'thứ 2', 'thứ 3', 'thứ 4', 'thứ 5', 'thứ 6', 'thứ 7']
export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListFilmNow());
    dispatch(getListFilmFuture());
    dispatch(getListFilmToday());
    dispatch(getSearch());
  }, []);

  const [modalShow, setModalShow] = useState(false);
  const [modalId, setModalId] = useState("");
  const showTrailer = (trailer) => {
    setModalId(trailer);
    setModalShow(true);
  };

  const filmsNow = useSelector((state) => state.films.filmsNow);
  const filmsFuture = useSelector((state) => state.films.filmsFuture);
  const filmsToday = useSelector((state) => state.films.filmsToday);
  const search = useSelector((state) => state.films.search);
  const filmsSlider = filmsNow.slice(0, 4);

  const [selectFilm, setSelectFilm] = useState();
  const [selectThreater, setSelectThreater] = useState();
  const [selectDate, setSelectDate] = useState();
  const [selectTime, setSelectTime] = useState();

  const [optionFilm, setOptionFilm] = useState();
  const [optionTheater, setOptionTheater] = useState();
  const [optionDate, setOptionDate] = useState();
  const [optionTime, setOptionTime] = useState();
  const [arrSchedules, setArrSchedules] = useState([]);

  const disabledBtn = selectFilm && selectThreater && selectDate && selectTime;

  useEffect(() => {
    if (search) {
      let arr = [];
      search.dayOfWeek.map(val => {
        val.schedules.map(schedule => arr.push(schedule))
      })
      setOptionFilm(search.films.map(val => ({ ...val, label: val.name, value: val._id })));
      setOptionTheater(search.theaters.map(val => ({ ...val, label: val.name, value: val._id })));
      setOptionDate(search.dayOfWeek.map((val, index) => ({ ...val, label: days[moment(val.date).day()], value: index})))
      setOptionTime([{ label: "vui lòng chọn rạp", isDisabled: true }])
      setArrSchedules(arr)
    }
  }, [search])

  useEffect(() => {
    if (selectFilm) {
      // option theater
      let arr = arrSchedules.map(val => val.theater_id)
      let arrfilms = arrSchedules.map(val => val.film_id)
      setOptionTheater(search.theaters.filter(val => arr.includes(val._id) && arrfilms.includes(selectFilm._id)).map(val => ({ ...val, label: val.name, value: val._id })))
      //option time
    }
  }, [selectFilm])

  const BookingTicketFast = () => {

  }

  const OptionComponent = (props) => {
    return (
      <components.Option {...props}>
        <div styles={{ display: "flex", flexDirection: "column" }}>
          <div>{props.data.label}</div>
          <div style={{ marginTop: "5px", color: "#ccc" }}>
            {props.data.date}
          </div>
        </div>
      </components.Option>
    );
  };

  return (
    <div className="home">
      <div className="home__slider">
        <SliderMovies listSlider={filmsSlider} clickTrailer={showTrailer} />

        <div className="filter-film">
          <Select
            className="select"
            value={selectFilm}
            options={optionFilm}
            onChange={setSelectFilm}
            placeholder="Phim"
          />
          <Select
            className="select"
            value={selectThreater}
            options={optionTheater}
            onChange={setSelectThreater}
            placeholder="Rạp"
          />
          <Select
            className="select"
            value={selectDate}
            options={optionDate}
            onChange={setSelectDate}
            components={{ OptionComponent }}
            placeholder="Ngày xem"
          />
          <Select
            className="select"
            value={selectTime}
            options={optionTime}
            onChange={setSelectTime}
            placeholder="Suất chiếu"
          />
          <button
            className={"btn btn-booking" + (disabledBtn ? "" : " btn-disabled")}
            onClick={BookingTicketFast}
          >
            MUA VÉ NGAY
          </button>
        </div>

        <TabListFilm filmsNow={filmsNow} filmsFuture={filmsFuture} clickTrailer={showTrailer} />
        <TabsTheater theaters={filmsToday} />
        <TabsNew />
      </div>
      <ModalTrailer show={modalShow} onHide={() => setModalShow(false)} trailer={modalId} />
    </div>
  );
}
