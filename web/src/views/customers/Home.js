import React, { useEffect } from "react";
import TabListFilm from "../../components/customer/TabsListFilm.js"
import TabsTheater from "../../components/customer/TabsTheater.js"
import TabsNew from "../../components/customer/TabsNew.js"
import SliderMovies from "../../components/customer/SliderMovies.js"
import MainBlog from "../customers/blog/MainBlog"
import { useDispatch } from "react-redux";
import { getListFilmNow } from "../../redux/films/actions";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(dispatch(getListFilmNow()))
  }, [])
  return (
    <div className="home">
      <div className="home__slider">
        {/* <SliderMovies /> */}
        <TabListFilm />
        <TabsTheater />
        <TabsNew/>
        {/* <MainBlog /> */}
      </div>
    </div>
  )
}
