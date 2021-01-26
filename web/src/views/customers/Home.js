import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TabListFilm from "../../components/customer/TabsListFilm.js";
import TabsTheater from "../../components/customer/TabsTheater.js";
import TabsNew from "../../components/customer/TabsNew.js";
import SliderMovies from "../../components/customer/SliderMovies.js";
import { getListFilmFuture, getListFilmNow, getListFilmToday } from "../../redux/films/actions";
import ModalTrailer from "../../components/customer/ModalTrailer";
import Select, { components } from "react-select";

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


  return (
    <div className="home">
      <div className="home__slider">
        <SliderMovies listSlider={filmsSlider} clickTrailer={showTrailer} />

        {/* <div className="filter-film">
          <Select
            className="select"
            value={selectFilm}
            options={optionsFilm}
            onChange={setSelectFilm}
            placeholder="Phim"
          />
          <Select
            className="select"
            value={selectThreater}
            options={optionsThreater}
            onChange={setSelectThreater}
            placeholder="Rạp"
          />
          <Select
            className="select"
            value={selectDate}
            options={optionsDate}
            onChange={setSelectDate}
            components={{ OptionComponent }}
            placeholder="Ngày xem"
          />
          <Select
            className="select"
            value={selectTime}
            options={optionsTime}
            onChange={setSelectTime}
            placeholder="Suất chiếu"
          />
          <button
            className={"btn btn-booking" + (disabledBtn ? "" : " btn-disabled")}
            onClick={BookingTicketFast}
          >
            MUA VÉ NGAY
          </button>
        </div> */}

        <TabListFilm filmsNow={filmsNow} filmsFuture={filmsFuture} clickTrailer={showTrailer} />
        <TabsTheater theaters={filmsToday} />
        <TabsNew />
      </div>
      <ModalTrailer show={modalShow} onHide={() => setModalShow(false)} trailer={modalId} />
    </div>
  );
}
