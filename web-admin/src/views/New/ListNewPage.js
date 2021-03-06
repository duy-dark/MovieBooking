import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from "antd";
import { useDispatch , useSelector } from 'react-redux';
import { getListNew } from '../../redux/films/actions';
import { useHistory } from 'react-router-dom'
import "../../styles/new/list-new.scss";
import * as moment from "moment"

const { Header, Content, Footer } = Layout;

export default function ListNewPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const [ list, setList ] = useState([]);
  let listNews = useSelector(state =>state.films.listNews)

  useEffect(() => {
    dispatch(getListNew())
  }, [])

  // useEffect(() => {
  //   setList()
  // }, [listNews])

  const goDetail = (id) => {
    history.push(`/new/${id}`)
  }

  return (
    <Layout className="layout">
      <Header style={{ background: "#FFFFFF" }}>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1"><Link to="/new/list">List New</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/new/create">Add New</Link></Menu.Item>
        </Menu>
      </Header>
      <div className="list-film">
        <div className="tr list-film__header">
          <div className="td list-film__header__title">Title</div>
          <div className="td list-film__header__date">Date Created</div>
        </div>
        { listNews.length > 0 && listNews.map(item => (
          <div key={item._id} className="tr  list-film__item" onClick={() => goDetail(item._id)}>
            <div className="td list-film__item__title">{item.title}</div>
            <div className="td list-film__item__date">{moment(item.created_at).format("DD-MM-YYYY")}</div>
          </div>
        ))}
        
      </div>
    </Layout>
  )
}