import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../../styles/films/film.scss';
import ListFilm from './ListFilm.js';

export default function TabsListFilm(props) {
  return (
    <Tabs id={props.id ? props.id : ''} className="tab-film">
      <TabList className="tab-film__header">
        <Tab className="tab-film__header__item">Đang Chiếu</Tab>
        <Tab className="tab-film__header__item">Sắp Chiếu</Tab>
        {props.filmsLike.length > 0 && (<Tab className="tab-film__header__item">Yêu Thích</Tab>)}
      </TabList>
      <TabPanel className="tab-film__content">
        <ListFilm future={false} films={props.filmsNow} clickTrailer={props.clickTrailer} />
      </TabPanel>
      <TabPanel className="tab-film__content">
        <ListFilm future={true} films={props.filmsFuture} clickTrailer={props.clickTrailer} />
      </TabPanel>
      {props.filmsLike.length > 0 && (
        <TabPanel className="tab-film__content">
          <ListFilm future={true} films={props.filmsLike} clickTrailer={props.clickTrailer} />
        </TabPanel>
      )}
    </Tabs>
  )
}
