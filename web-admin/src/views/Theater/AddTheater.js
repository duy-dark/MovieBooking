import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from "antd";
import "../../styles/Theater/create.scss";
// import { useForm } from "react-hook-form";
import ButtonEdit from '../../components/ButtonEdit'
import httpFilm from '../../api/films';
import { createTheater } from "../../redux/films/actions"
import { useHistory } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux';

const { Header } = Layout;


export default function AddTheater() {
  const [name, setName] = useState(false);
  const [address, setAddress] = useState(false);
  const [image, setImage] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const submitForm = () => {
    let params = {
      name: name,
      address: address,
      url_image: image
    }
    dispatch(createTheater(params, history))
  }

  const changeFileContent = async (file) => {
    let data = await httpFilm.uploadFile(file)
    setImage(data.data)
  }

  return (
    <Layout className="layout">
      <Header style={{ background: "#FFFFFF", borderBottom: '1px solid #ccc', marginBottom: 1}}>
        <Menu style={{border: 'none', height: '100%'}} theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1"><Link to="/theater/list">List Theater</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/theater/create">Add Theater</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/room/create">Add Room</Link></Menu.Item>
        </Menu>
      </Header>
      <div className="theater-create">
        <div className="theater-create--form">
          <div className="form-control">
            <label>Name</label>
            <input type="text" onChange={e => setName(e.target.value)}/>
          </div>
          <div className="form-control">
            <label>Address</label>
            <input type="text" onChange={e => setAddress(e.target.value)}/>
          </div>
          <div className="form-control">
            <label>Image</label>
            <div className="group-img">
              <img className={`${image ? 'group-img__img' : ''}`} src={`${image}`} alt=""/>
              <input className="card-addnew__text" type="file" onChange={e => changeFileContent(e.target.files[0])}/>
            </div>
          </div>
          <div className="layout-detail__group-btn">
            <button className="btn btn-submit" onClick={submitForm}>Submit</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}