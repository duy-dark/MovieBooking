import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from 'antd';
import "./../../styles/Film/film.scss";
import Detail from "./DetailPopup"
import Schedule from "./SchedulePopup"
import { useSelector, useDispatch } from "react-redux";
import {  getListFilmNow } from "../../redux/films/actions";
export default function Film(){
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListFilmNow());
  }, []);
  const filmsNow = useSelector((state) => state.films.filmsNow.data);
  const data = []
for (let i = 0; i <filmsNow.length(); i++) {
  data.push(
  {
    key: i,
    name: data.name,
    director: data.directors,
    country: data.countries,
  })

}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Director',
    dataIndex: 'director',
    key: 'director',
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <Detail />
        <a>Delete</a>
       <Schedule/>
        <a>Add Schedules</a>
      </Space>
    ),
  },
];


return (<div class="listfilm" ><Table columns={columns} dataSource={data} /></div>)
}
