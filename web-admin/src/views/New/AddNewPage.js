import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from "antd";
import "../../styles/new/create-new.scss";
import httpFilm from '../../api/films'
import { useDispatch , useSelector } from 'react-redux'
import { createNewPaper } from '../../redux/films/actions'

const { Header, Content, Footer } = Layout;

export default function AddNewPage() {
  const dispatch = useDispatch();
  // const [file, setFile] = useState()
  // const [listFile, setListFile] = useState([])

  // useEffect(() => {
  //   console.log('file', file)
  // }, [file])

  // const uploadFileImage = async (index) => {
  //   let data = await httpFilm.uploadFile(file)
  //   if (data.status === 'ok') {
  //     setFile('')
  //     document.getElementById("file").value = "";
  //     setListFile([...listFile, data.data])
  //   }
  // }

  const [title, setTitle] = useState();
  const [arrContent, setArrContent] = useState([{ text: '', image: ''}]);

  useEffect(() => {
    console.log(arrContent)

  }, [arrContent])

  const changeTextContent = (value, index) => {
    let obj = {...arrContent[index]}
    obj.text = value
    let arr = [...arrContent]
    arr[index] = obj
    setArrContent([...arr])
  }

  const changeFileContent = async (value, index) => {
    let obj = {...arrContent[index]}
    let data = await httpFilm.uploadFile(value)
    if (data.status === 'ok') {
      obj.image = data.data
    }
    let arr = [...arrContent]
    arr[index] = obj
    setArrContent([...arr])
  }

  const addNewBlock = () => {
    setArrContent([...arrContent, { text: '', image: ''}])
  }

  const submitForm = () => {
    let params = {
      content: arrContent,
      film_id: null,
      title: title
    }

    dispatch(createNewPaper(params))
  }

  return (
    <Layout className="layout">
      <Header style={{ background: "#FFFFFF" }}>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1"><Link to="/new/list">List New</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/new/create">Add New</Link></Menu.Item>
        </Menu>
      </Header>
      <div className="create-new">
        <div className="create-new__list">
          <div className="form-control create-new__title">
            <label >Title</label>
            <input type="text" onChange={e => setTitle(e.target.value)}/>
          </div>
          { arrContent.map((item, index) => {
            return (
              <div key={index} className="card-addnew">
                <div className="form-control card-addnew__form-text">
                  <label>Content</label>
                  <input className="card-addnew__text" onChange={e => changeTextContent(e.target.value, index)} type="text"/>
                </div>
                <div className="form-control card-addnew__form-image">
                  <label>Image</label>
                  <input className="card-addnew__text" type="file" onChange={e => changeFileContent(e.target.files[0], index)}/>
                  <button>Upload Image</button>
                </div>
              </div>
            )
          })}
        </div>
        <div className="create-new__submit">
          <button className="btn-add-new" onClick={addNewBlock}><img src={`/assets/ic-plus.png`} alt=""/> Add block</button>
          <button className="btn" onClick={submitForm}>Submit</button>
        </div>
      </div>
    </Layout>
  )
}