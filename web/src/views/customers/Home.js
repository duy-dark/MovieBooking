import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TabListFilm from "../../components/customer/TabsListFilm.js";
import TabsTheater from "../../components/customer/TabsTheater.js";
import TabsNew from "../../components/customer/TabsNew.js";
import SliderMovies from "../../components/customer/SliderMovies.js";
import { getListFilmFuture, getListFilmNow, getListFilmToday } from "../../redux/films/actions";
import ModalTrailer from "../../components/customer/ModalTrailer";
import Select, { components } from "react-select";
import *as moment from "moment";

const days = ['chủ nhật', 'thứ 2', 'thứ 3', 'thứ 4', 'thứ 5', 'thứ 6', 'thứ 7']
export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListFilmNow());
    dispatch(getListFilmFuture());
    dispatch(getListFilmToday());
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
  const filmsSlider = filmsNow.slice(0, 4);

  const [selectFilm, setSelectFilm] = useState();
  const [selectThreater, setSelectThreater] = useState();
  const [selectDate, setSelectDate] = useState();
  const [selectTime, setSelectTime] = useState();

  const [optionFilm, setOptionFilm] = useState();
  const [optionTheater, setOptionTheater] = useState();
  const [optionDate, setOptionDate] = useState();
  const [optionTime, setOptionTime] = useState();

  const disabledBtn = selectFilm && selectThreater && selectDate && selectTime;

  useEffect(() => {
    setOptionFilm(filmsNow.map((item, index) => ({...item, label: item.name, value: index})));
    selectFilm ? setOptionTheater(selectFilm.theaters.map((item, index) => ({...item, label: item.name, value: index}))) : setOptionTheater([{ label: "vui lòng chọn phim", isDisabled: true }])
    if (selectThreater) {
      let arr = []
      selectThreater.film_schedules.map(item => {
        let d = moment(item.time_start).format("DD-MM-YYYY")
        let date = arr.filter(day => day.name === d)
        console.log(d)
        console.log(days[moment(item.time_start).day()])
        console.log(moment(item.time_start).day())
        if(date.length < 0) {
          arr.push({
            date: d,
            name: days[moment(item.time_start).day()],
            label: days[moment(item.time_start).day()],
            value: moment(item.time_start).day()
          })
        }
      })
      setOptionDate(arr);
    } else {
      setOptionDate([{ label: "vui lòng chọn rạp", isDisabled: true }])
    }

    setOptionTime([{ label: "vui lòng chọn rạp", isDisabled: true }])
  }, [filmsNow, selectFilm, selectThreater, selectDate])

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
