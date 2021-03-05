import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from 'antd';
import "./../../../styles/Film/film.scss";
import Detail from "../editFilm/DetailPopup"
import AddNewFilm from "../addFilm/AddFilmPopUp"
import Schedule from "../editSchedule/SchedulePopup"
import { useSelector, useDispatch } from "react-redux";
import {  getListFilmNow,getCategories ,getTheaters} from "../../../redux/films/actions";
import AddSchedulePopup from "../addSchedule/addSchedulePopup"
export default function Film(){
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListFilmNow());
    dispatch((getCategories()))
    dispatch((getTheaters()))
  }, []);

 
  
  const theaters = useSelector((state) => state.films.theaters);
  const filmsNow = useSelector((state) => state.films.filmsNow);
  const categories = useSelector((state) => state.films.categories);
  const data = filmsNow.map((item,index)=>({...item, key: index}))

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record, index) => <a>{text}</a>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record,index) => (
      <Space size="middle">
       <Detail index={index} detail={record} />
        <a>Delete</a>
       <Schedule schedule={record} theaters={theaters}/>
        <AddSchedulePopup theaters={theaters} schedule={record}/>
      </Space>
    ),
  },
  {
    title: <AddNewFilm categories={categories}/>,
    

  },
];


return (
<div className="listfilm" >

<Table columns={columns} dataSource={data}  />

</div>)

}
