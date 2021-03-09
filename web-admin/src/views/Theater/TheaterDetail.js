import React, { useState, useEffect } from 'react';
import { getTheaterDetail, updateTheater, deleteRoom } from "../../redux/films/actions"
import { Link } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import httpFilm from '../../api/films';
import "../../styles/Theater/detail.scss";
import ButtonEdit from '../../components/ButtonEdit'

export default function TheaterDetail() {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const theaterDetail = useSelector((state) => state.films.theaterDetail)
  const [theater, setTheater] = useState({});
  const [rooms, setRooms] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getTheaterDetail(id))
  }, [])

  useEffect(() => {
    if (theaterDetail) {
      const { rooms = [] } = theaterDetail
      setTheater(theaterDetail)
      setRooms(rooms)
    }

  }, [theaterDetail])

  const changeFileContent = async (file) => {
    let data = await httpFilm.uploadFile(file)
    if (data.status === 'ok') {
      setTheater({ ...theater, url_image: data.data })
    }
  }

  const submitForm = () => {
    dispatch(updateTheater(theater))
    setIsEdit(false)
  }

  const CancelSubmit = () => {
    setIsEdit(false)
    setTheater(theaterDetail)
  }

  const onDeleteRoom = (id) => {
    dispatch(deleteRoom(id))
  }

  return (
    <div className="layout-detail layout-detail__theater">
      <div className="theater-detail">
        { !isEdit && (
          <div className="theater-detail__edit">
            <ButtonEdit onEdit={() => setIsEdit(!isEdit)} />
          </div>
        )}
        <div className="form-control theater-detail__content">
          <div className="theater-content__item theater-content__name">
            <label>Name</label>
            { isEdit ? (<input type="text" value={theater.name} onChange={e => setTheater({ ...theater, name: e.target.value })}/>) : (<span>{theater.name}</span>)}
          </div>
          <div className="form-control theater-content__item theater-content__address">
            <label>Address</label>
            { isEdit ? (<input className="form-control" type="text" value={theater.address} onChange={e => setTheater({ ...theater, address: e.target.value })}/>) : (<span>{theater.address}</span>)}
          </div>
          <div className="theater-content__item theater-content__image">
            <label>Image</label>
            <div className="theater-content__image__image">
              <img src={`${theater.url_image}`} alt=""/>
              { isEdit && (<input className="" type="file" onChange={e => changeFileContent(e.target.files[0])}/>) }
            </div>
          </div>
          <div className="theater-content__item theater-content__rooms">
            <label>Danh sách Room</label>
            <div className="theater-content__rooms__list">
              {rooms.length > 0 && rooms.map(room => (
                <div key={room._id} className="theater-content__rooms__list__item">
                  <Link to={`/room/${room._id}`}>{room.name}</Link>
                  <button onClick={() => onDeleteRoom(room._id)}>delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        { isEdit && (
          <div className="layout-detail__group-btn">
            <button className="btn btn-submit" onClick={submitForm}>Submit</button>
            <button className="btn btn-cancel" onClick={CancelSubmit}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  )
}