import React, {  } from "react";
import TabListFilm from "../../components/customer/TabsListFilm.js"
import TabsTheater from "../../components/customer/TabsTheater.js"
import TabsNew from "../../components/customer/TabsNew.js"
import SliderMovies from "../../components/customer/SliderMovies.js"

export default function Home() {
  return (
    <div className="home">
      <div className="home__slider">
        {/* <SliderMovies /> */}
        <TabListFilm />
        <TabsTheater />
        <TabsNew/>
      </div>
    </div>
  )
}
