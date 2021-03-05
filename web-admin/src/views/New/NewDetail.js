import React, { useEffect, useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { getNewDetail, updateNewDetail } from '../../redux/films/actions'
import { useParams } from "react-router-dom";
import "../../styles/new/create-new.scss";
import httpFilm from '../../api/films'


export default function NewDetail() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [title, setTitle] = useState('');
  const [seflEdit, setSeflEdit] = useState(false);
  const [arrContent, setArrContent] = useState([{ text: '', image: ''}]);
  const detail = useSelector(state => state.films.newDetail)

  useEffect(() => {
    dispatch(getNewDetail(id))
  }, [])

  useEffect(() => {
    if (detail.title) {
      setTitle(detail.title)
      setArrContent(detail.content)
    }
  }, [detail])

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
      title: title,
      id: detail._id
    }
    dispatch(updateNewDetail(params))
  }

  const CancelSubmit = () => {
    setSeflEdit(false)
    setTitle(detail.title)
    setArrContent(detail.content)
  }

  const onEdit = () => {
    setSeflEdit(true)
  }

  return (
    <div className={`create-new new-detail`}>
      { !seflEdit && (<div className="new-detail__edit">
        <button className="btn btn-edit" onClick={onEdit}>Edit Content</button>
      </div>
      )}
      <div className="create-new__list">
        <div className="form-control create-new__title">
          <label >Title</label>
          { seflEdit ? (<input type="text" value={title} onChange={e => setTitle(e.target.value)}/>) : (<span>{title}</span>)}
        </div>
        { arrContent.map((item, index) => {
          return (
            <div key={index} className="card-addnew">
              <div className="form-control card-addnew__form-text">
                <label>Content</label>
                { seflEdit ? (<input className="card-addnew__text" value={item.text} onChange={e => changeTextContent(e.target.value, index)} type="text"/>) : (<span>{item.text}</span>)}
                
              </div>
              <div className="form-control card-addnew__form-image">
                <label>Image</label>
                <div className="group-img">
                  <img src={`${item.image}`} alt=""/>
                  { seflEdit && (<input className="card-addnew__text" type="file" onChange={e => changeFileContent(e.target.files[0], index)}/>) }
                </div>
              </div>
            </div>
          )
        })}
      </div>
      { seflEdit && (
        <div className="create-new__submit">
          <button className="btn-add-new" onClick={addNewBlock}><img src={`/assets/ic-plus.png`} alt=""/> Add block</button>
          <button className="btn btn-submit" onClick={submitForm}>Submit</button>
          <button className="btn btn-cancel" onClick={CancelSubmit}>Cancel</button>
        </div>
      )}
    </div>
  )
}