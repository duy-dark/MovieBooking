import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Collapse } from 'react-collapse';
import '../../styles/films/film.scss';
import CardTime from './CardTime';

export default function TabsTheater(props) {
  const [activeIndex, setActiveIndex] = useState([1, 2, 3]);
  const changeCollapse = (index) => {
    let arr = [...activeIndex]
    if (activeIndex.includes(index)) {
      let i = arr.indexOf(index);
      arr.splice(i, 1)
      setActiveIndex(arr)
    } else {
      setActiveIndex([...arr, index])
    }
  }

  return (
    <Tabs className="tab-theater">
      <TabList className="tab-theater__header">
        <Tab className="tab-theater__header__item">
          <div className="tab-theater__header__item__image">
            <img src={`/assets/film/threater1.jpg`} alt=""/>
          </div>
          <div className="tab-theater__header__item__content">
            <div className="tab-theater__header__item-name">BHD Star - Bitexco</div>
            <div className="tab-theater__header__item-address">L3-Bitexco Icon 68, 2 Hải Triều, Q.1</div>
          </div>
        </Tab>
        <Tab className="tab-theater__header__item">
          <div className="tab-theater__header__item__image">
            <img src={`/assets/film/threater1.jpg`} alt=""/>
          </div>
          <div className="tab-theater__header__item__content">
            <div className="tab-theater__header__item-name">BHD Star - Bitexco</div>
            <div className="tab-theater__header__item-address">L3-Bitexco Icon 68, 2 Hải Triều, Q.1</div>
          </div>
        </Tab>
      </TabList>
      <TabPanel className="tab-theater__content">
        <div className="tab-theater__item">
          <div className="tab-theater__item__film"
            onClick={() => changeCollapse(1)}
          >
            <div className="tab-theater__item__film-image">
              <img src={`/assets/film/film1.png`} alt=""/>
            </div>
            <div className="tab-theater__item__film-content">
              <span>Nữ Thần Chiến Binh 1984 - Wonder Woman 1984 (C13)</span>
              <span>100 min - IMDb0</span>
            </div>
          </div>
          <Collapse isOpened={activeIndex.includes(1)}>
            <div className="tab-theater__item__title">2D Digital</div>
            <div className="tab-theater__item__schedules">
              <CardTime/>
              <CardTime/>
            </div>
          </Collapse>
        </div>
        <div className="tab-theater__item">
          <div className="tab-theater__item__film"
            onClick={() => changeCollapse(2)}
          >
            <div className="tab-theater__item__film-image">
              <img src={`/assets/film/film1.png`} alt=""/>
            </div>
            <div className="tab-theater__item__film-content">
              <span>Nữ Thần Chiến Binh 1984 - Wonder Woman 1984 (C13)</span>
              <span>100 min - IMDb0</span>
            </div>
          </div>
          <Collapse isOpened={activeIndex.includes(2)}>
            <div className="tab-theater__item__title">2D Digital</div>
            <div className="tab-theater__item__schedules">
              <CardTime/>
              <CardTime/>
            </div>
          </Collapse>
        </div>
      </TabPanel>
      <TabPanel className="tab-theater__content">
        <div className="tab-theater__item">
          <div className="tab-theater__item__film"
            onClick={() => changeCollapse(3)}
          >
            <div className="tab-theater__item__film-image">
              <img src={`/assets/film/film1.png`} alt=""/>
            </div>
            <div className="tab-theater__item__film-content">
              <span>Nữ Thần Chiến Binh 1984 - Wonder Woman 1984 (C13)</span>
              <span>100 min - IMDb0</span>
            </div>
          </div>
          <Collapse isOpened={activeIndex.includes(3)}>
            <div className="tab-theater__item__title">2D Digital</div>
            <div className="tab-theater__item__schedules">
              <CardTime/>
              <CardTime/>
            </div>
          </Collapse>
        </div>
      </TabPanel>
    </Tabs>
  )
}
