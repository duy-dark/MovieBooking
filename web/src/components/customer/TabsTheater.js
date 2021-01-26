import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Collapse } from 'react-collapse';
import '../../styles/films/film.scss';
import CardTime from './CardTime';

export default function TabsTheater(props) {
  const [activeIndex, setActiveIndex] = useState([]);
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

  useEffect(() => {
    let arr = []
    props.theaters.map(theater => {
      theater.films.map(film => {
        arr.push(film._id)
      })
    })
    setActiveIndex(arr)
  }, [props.theaters])

  const [tabSelect, setTabSelect] = useState(0);

  return (
    <Tabs className="tab-theater" selectedIndex={tabSelect} onSelect={tab => setTabSelect(tab)}>
      <TabList className="tab-theater__header" >
        {props.theaters.map((theater,index) =>
          <Tab key={index} className="tab-theater__header__item">
            <div className="tab-theater__header__item__image">
              <img src={theater.url_image} alt=""/>
            </div>
            <div className="tab-theater__header__item__content">
              <div className="tab-theater__header__item-name">{theater.name}</div>
              <div className="tab-theater__header__item-address">{theater.address}</div>
            </div>
          </Tab>
        )}
      </TabList>
      {
        props.theaters.map((theater, index) => {
        return (
          <TabPanel className="tab-theater__content" key={index}>
            { theater.films.map((film, i) => {
              return (
                <div className="tab-theater__item" key={i}>
                  <div className="tab-theater__item__film"
                    onClick={() => changeCollapse(film._id)}
                  >
                    <div className="tab-theater__item__film-image">
                      <img src={film.url_avatar} alt=""/>
                    </div>
                    <div className="tab-theater__item__film-content">
                      <span>{film.name}</span>
                      <span>{`${film.long_time} min`}</span>
                    </div>
                  </div>
                  <Collapse isOpened={activeIndex.includes(film._id)}>
                    <div className="tab-theater__item__title">2D Digital</div>
                    <div className="tab-theater__item__schedules">
                      {film.film_schedules.map((schedule, i) => <CardTime name={film.name} theater_url_image={theater.url_image} theater_name={theater.name} film={film} schedule={schedule} key={i} />)}
                    </div>
                  </Collapse>
                </div>)
            })}
          </TabPanel>
        )
        })
      }
    </Tabs>
  )
}
