import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from "antd";
import Select, { components } from "react-select";
import { useDispatch , useSelector } from 'react-redux';
import "../../styles/Theater/create-room.scss";
import { createRoom, getTheaters } from "../../redux/films/actions"
import { useHistory } from "react-router-dom";

const { Header } = Layout;


export default function AddRoom() {
  const dispatch = useDispatch();
  const history = useHistory();
  let theaters = useSelector(state =>state.films.theaters)
  const [optionTheater, setOptionTheater] = useState([])
  const [selectTheater, setSelectTheater] = useState()
  const [files, setFiles] = useState("")
  const [name, setName] = useState()
  const [type, setType] = useState()

  useEffect(() => {
    setOptionTheater(theaters.map(item => ({...item, label: item.name, value: item._id})))
  }, [theaters])

  useEffect(() => {
    dispatch(getTheaters())

  }, [])

  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      setFiles(JSON.parse(e.target.result));
    }
  }

  const submitForm = () => {
    let params = {
      name: name,
      type: type,
      theater_id: selectTheater._id,
      seats: files
    }
    dispatch(createRoom(params, history))
  }

  return (
    <Layout className="layout">
      <Header style={{ background: "#FFFFFF", borderBottom: '1px solid #ccc', marginBottom: 1}}>
        <Menu style={{border: 'none', height: '100%'}} theme="light" mode="horizontal" defaultSelectedKeys={["3"]}>
          <Menu.Item key="1"><Link to="/theater/list">List Theater</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/theater/create">Add Theater</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/room/create">Add Room</Link></Menu.Item>
        </Menu>
      </Header>
      <div className="create-room">
        <div className="create-room__form">
          <div className="form-control">
            <label>Name</label>
            <input type="text" onChange={e => setName(e.target.value)}/>
          </div>
          <div className="form-control">
            <label>Type</label>
            <input type="text" onChange={e => setType(e.target.value)}/>
          </div>
          <div className="form-control">
            <label>Select Theater</label>
            <Select
                className="select"
                value={selectTheater}
                options={optionTheater}
                onChange={setSelectTheater}
                placeholder="Phim"
              />
          </div>
          <div className="form-control room-detail__item">
            <label>Seat</label>
            <input type="file" onChange={handleChange} />
          </div>
          <div className="layout-detail__group-btn">
            <button className="btn btn-submit" onClick={submitForm}>Submit</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}