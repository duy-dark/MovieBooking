import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TabListFilm from "../../components/customer/TabsListFilm.js";
import TabsTheater from "../../components/customer/TabsTheater.js";
import TabsNew from "../../components/customer/TabsNew.js";
import SliderMovies from "../../components/customer/SliderMovies.js";
import { getListFilmFuture, getListFilmNow, getListFilmToday } from "../../redux/films/actions";
import ModalTrailer from "../../components/customer/ModalTrailer";

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
  return (
    <div className="home">
      <div className="home__slider">
        <SliderMovies listSlider={filmsSlider} clickTrailer={showTrailer} />
        <TabListFilm filmsNow={filmsNow} filmsFuture={filmsFuture} clickTrailer={showTrailer} />
        <TabsTheater theaters={filmsToday} />
        <TabsNew />
      </div>
      <ModalTrailer show={modalShow} onHide={() => setModalShow(false)} trailer={modalId} />
    </div>
  );
}
