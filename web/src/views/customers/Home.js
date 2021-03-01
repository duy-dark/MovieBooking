import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TabListFilm from "../../components/customer/TabsListFilm.js";
import TabsTheater from "../../components/customer/TabsTheater.js";
import TabsNew from "../../components/customer/TabsNew.js";
import SliderMovies from "../../components/customer/SliderMovies.js";
import { getListFilmFuture, getListFilmNow, getListFilmToday, getSearch } from "../../redux/films/actions";
import ModalTrailer from "../../components/customer/ModalTrailer";
import Select, { components } from "react-select";
import * as moment from "moment";
import { updateHeaderFooter, getUserInfo } from "../../redux/users/actions";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import filter from "lodash/filter";
import { useHistory } from 'react-router-dom';

const days = ['chủ nhật', 'thứ 2', 'thứ 3', 'thứ 4', 'thứ 5', 'thứ 6', 'thứ 7']
export default function Home() {
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    dispatch(getListFilmNow());
    dispatch(getListFilmFuture());
    dispatch(getListFilmToday());
    dispatch(getSearch());
    dispatch(
      updateHeaderFooter({
        header: true,
        footer: true,
      })
    )

    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userID");
    if (token && userID) {
      dispatch(getUserInfo({ token, userID }));
    }
  // eslint-disable-next-line
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
  const search = useSelector((state) => state.films.search);
  const storeToken = useSelector((state) => state.users.token);

  const [selectFilm, setSelectFilm] = useState();
  const [selectThreater, setSelectThreater] = useState();
  const [selectDate, setSelectDate] = useState();
  const [selectTime, setSelectTime] = useState();

  const [optionFilm, setOptionFilm] = useState();
  const [optionTheater, setOptionTheater] = useState();
  const [optionDate, setOptionDate] = useState();
  const [optionTime, setOptionTime] = useState();
  const [typeSearch, setTypeSearch] = useState(0);

  const disabledBtn = selectFilm && selectThreater && selectDate && selectTime;

  const formatTime = (time) => {
    return moment(time).format('hh-mm')
  }

  useEffect(() => {
    // eslint-disable-next-line
    if (search) {
      let arr = [];
      // eslint-disable-next-line
      search.dayOfWeek.map(val => {
        val.schedules.map(schedule => arr.push(schedule))
      })
      if (typeSearch === 0) {
        if (selectFilm) {
          let arrTheater = arr.filter(val => val.film_id === selectFilm._id)
          let option = search.theaters.filter(val => filter(arrTheater, o => o.theater_id === val._id).length > 0)
          setOptionTheater(option.map(val => ({ ...val, label: val.name, value: val._id })))
          setOptionDate([{ label: "vui lòng chọn rạp", isDisabled: true }])
          setOptionTime([{ label: "vui lòng chọn ngày", isDisabled: true }])
          setSelectThreater('')
          setSelectDate('')
          setSelectTime('')
        }
      } else if (typeSearch === 1) {
        if (selectFilm) {
          // eslint-disable-next-line
          let arrDate = search.dayOfWeek.filter(val => {
            if (val.schedules.filter(schedule => schedule.film_id === selectFilm._id && schedule.theater_id === selectThreater._id).length > 0) return val
          })
          setOptionDate(arrDate.map((val, index) => ({ ...val, label: days[moment(val.date).day()], value: index})))
          setSelectDate('')
          setSelectTime('')
        }
      } else {
        if (selectFilm) {
          let arrTemp = selectDate.schedules.filter(val => val.film_id === selectFilm._id)
          let arrTemp1 = arrTemp.map(val => val.theater_id)
          let arrTheater = arrTemp1.filter((item, index) => arrTemp1.indexOf(item) === index)
          let option = search.theaters.filter(val => arrTheater.includes(val._id))
          setOptionTheater(option.map(val => ({ ...val, label: val.name, value: val._id })))
          setSelectThreater('')
          setSelectTime('')
        }
      }
    }
    // eslint-disable-next-line
  }, [selectFilm])

  useEffect(() => {
    // eslint-disable-next-line
    if (search) {
      let arr = [];
      // eslint-disable-next-line
      search.dayOfWeek.map(val => {
        val.schedules.map(schedule => arr.push(schedule))
      })
      if (typeSearch === 0) {
        // eslint-disable-next-line
        if (selectThreater) {
          let arrDate = search.dayOfWeek.filter(val => {
            if (val.schedules.filter(schedule => schedule.film_id === selectFilm._id && schedule.theater_id === selectThreater._id).length > 0) return val
          })
          setOptionDate(arrDate.map((val, index) => ({ ...val, label: days[moment(val.date).day()], value: index})))
          setSelectDate('')
          setSelectTime('')
        }
      } else if (typeSearch === 1) {
        if (selectThreater) {
          let arrFilm = arr.filter(val => val.theater_id === selectThreater._id)
          let option = search.films.filter(val => arrFilm.filter(o => o.film_id === val._id).length > 0)
          setOptionFilm(option.map(val => ({ ...val, label: val.name, value: val._id })))
          setSelectFilm('')
          setSelectDate('')
          setSelectTime('')
        }
      } else {
        if (selectThreater) {
          filterOptionsTime()
        }
        // eslint-disable-next-line
      }
    }
  }, [selectThreater])
  const filterOptionsTime = () => {
      let arrTime = selectDate.schedules.filter(schedule => schedule.film_id === selectFilm._id && schedule.theater_id === selectThreater._id)
      setOptionTime(arrTime.map(val => ({ ...val, label: formatTime(val.time_start) + '~' + formatTime(val.time_end), value: val._id })))
      setSelectTime('')
  }
  useEffect(() => {
    if (typeSearch === 0) {
      if (selectDate) {
        filterOptionsTime()
      }
    } else if (typeSearch === 1) {
      if (selectDate) {
        filterOptionsTime()
      }
    } else {
      if (selectDate) {
        let arrTemp = selectDate.schedules.map(val => val.film_id)
        let arrFilm = arrTemp.filter((item, index) => arrTemp.indexOf(item) === index)
        let option = search.films.filter(val => arrFilm.includes(val._id))
        setOptionFilm(option.map(val => ({ ...val, label: val.name, value: val._id })))
        setSelectFilm('')
        setSelectThreater('')
        // eslint-disable-next-line
        setSelectTime('')
      }
    }
  }, [selectDate])

  useEffect(() => {
    if (search) {
      if (typeSearch === 0) {
        setOptionFilm(search.films.map(val => ({ ...val, label: val.name, value: val._id })))
        setOptionTheater([{ label: "vui lòng chọn phim", isDisabled: true }])
        setOptionDate([{ label: "vui lòng chọn rạp", isDisabled: true }])
        setOptionTime([{ label: "vui lòng chọn ngày", isDisabled: true }])
        setSelectFilm('')
        setSelectDate('')
        setSelectTime('')
        setSelectThreater('')
      } else if (typeSearch === 1) {
        setOptionTheater(search.theaters.map(val => ({ ...val, label: val.name, value: val._id })))
        setOptionFilm([{ label: "vui lòng chọn rạp", isDisabled: true }])
        setOptionDate([{ label: "vui lòng chọn phim", isDisabled: true }])
        setOptionTime([{ label: "vui lòng chọn ngày", isDisabled: true }])
        setSelectFilm('')
        setSelectDate('')
        setSelectTime('')
        setSelectThreater('')
      } else {
        setOptionDate(search.dayOfWeek.map((val, index) => ({ ...val, label: days[moment(val.date).day()], value: index})))
        setOptionFilm([{ label: "vui lòng chọn ngày", isDisabled: true }])
        setOptionTheater([{ label: "vui lòng chọn phim", isDisabled: true }])
        setOptionTime([{ label: "vui lòng chọn rạp", isDisabled: true }])
        setSelectFilm('')
        setSelectDate('')
        setSelectTime('')
        setSelectThreater('')
      }
    }
  }, [typeSearch, search])

  const BookingTicketFast = () => {
    if (storeToken) {
      history.push({
        pathname: `/${selectFilm._id}/booking`,
        state: {
          schedule_id: selectTime._id,
          schedule: selectTime,
          theater_name: selectThreater.name,
          theater_url_image: selectThreater.url_image,
          name: selectFilm.name
        }
      })
    } else {
      alert('Bạn Cần đăng nhập')
    }
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
        <Tabs className="search" onSelect={index => setTypeSearch(index)}>
          <TabList className="search-headers">
            <Tab className="search-headers__item">Theo Phim</Tab>
            <Tab className="search-headers__item">Theo Rạp</Tab>
            <Tab className="search-headers__item">Theo Ngày</Tab>
          </TabList>
          <TabPanel>
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
          </TabPanel>
          <TabPanel>
            <div className="filter-film">
              <Select
                className="select"
                value={selectThreater}
                options={optionTheater}
                onChange={setSelectThreater}
                placeholder="Rạp"
              />
              <Select
                className="select"
                value={selectFilm}
                options={optionFilm}
                onChange={setSelectFilm}
                placeholder="Phim"
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
          </TabPanel>
          <TabPanel>
            <div className="filter-film">
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
          </TabPanel>
        </Tabs>

        <TabListFilm id="homeSchedule" filmsNow={filmsNow} filmsFuture={filmsFuture} clickTrailer={showTrailer} />
        { filmsToday.length > 0 && (<TabsTheater id="listTheater" theaters={filmsToday} />) }
        <TabsNew id="listNews"/>
      </div>
      <ModalTrailer show={modalShow} onHide={() => setModalShow(false)} trailer={modalId} />
    </div>
  );
}
