import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from "antd";
import { getTheaters, deleteTheater,getListFilmNow } from "../../redux/films/actions"
import { useHistory } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux';
import * as moment from "moment"
import "../../styles/new/list-new.scss";

const { Header } = Layout;
  
export default function ListTheater() {
  const dispatch = useDispatch();
  const history = useHistory();
  let listTheater = useSelector(state =>state.films.theaters)

  useEffect(() => {
    dispatch(getTheaters())
  }, [])

  const goDetail = id => {
    history.push(`/theater/${id}`)
  }

  const onDelete = id => {
    dispatch(deleteTheater(id))
  }
  
  return (
    <Layout className="layout">
      <Header style={{ background: "#FFFFFF", borderBottom: '1px solid #ccc', marginBottom: 1}}>
        <Menu style={{border: 'none', height: '100%'}} theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1"><Link to="/theater/list">List Theater</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/theater/create">Add Theater</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/room/create">Add Room</Link></Menu.Item>
        </Menu>
      </Header>
      <div className="list-film">
        <div className="tr list-film__header">
          <div className="td list-film__header__title">Title</div>
          <div className="td list-film__header__date">Date Created</div>
          <div className="td list-film__header__btns"></div>
        </div>
        { listTheater.length > 0 && listTheater.map(item => (
          <div key={item._id} className="tr  list-film__item">
            <div className="td list-film__item__title" onClick={() => goDetail(item._id)}>{item.name}</div>
            <div className="td list-film__item__date">{moment(item.created_at).format("DD-MM-YYYY")}</div>
            <div className="td list-film__item__btns">
              <button className="btn btn-default" onClick={() => onDelete(item._id)}>delete</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}