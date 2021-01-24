import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../../styles/films/film.scss';
import ListFilm from './ListFilm.js';

export default function TabsListFilm(props) {
  return (
    <Tabs className="tab-film">
      <TabList className="tab-film__header">
        <Tab className="tab-film__header__item">Đang Chiếu</Tab>
        <Tab className="tab-film__header__item">Sắp Chiếu</Tab>
      </TabList>
      <TabPanel className="tab-film__content">
        <ListFilm />
      </TabPanel>
      <TabPanel className="tab-film__content">
        <ListFilm />
      </TabPanel>
    </Tabs>
  )
}