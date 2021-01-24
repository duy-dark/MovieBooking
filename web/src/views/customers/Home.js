import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import TabListFilm from "../../components/customer/TabsListFilm.js";
import TabsTheater from "../../components/customer/TabsTheater.js";
import TabsNew from "../../components/customer/TabsNew.js";
import SliderMovies from "../../components/customer/SliderMovies.js";
import { getListFilmNow } from "../../redux/films/actions";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListFilmNow());
  }, []);
  return (
    <div className="home">
      <div className="home__slider">
        {/* <SliderMovies /> */}
        <TabListFilm />
        <TabsTheater />
        <TabsNew />
      </div>
    </div>
  );
}
