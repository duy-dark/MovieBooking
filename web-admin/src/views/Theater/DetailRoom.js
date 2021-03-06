
import React, { useState, useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux'
import { getRoomDetail, updateRoom } from "../../redux/films/actions"
import { useParams } from "react-router-dom";
import ButtonEdit from '../../components/ButtonEdit'
import "../../styles/Theater/room-detail.scss";

export default function DetailRoom() {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  let roomDetail = useSelector(state =>state.films.roomDetail)
  let [room, setRoom] = useState({})
  const [files, setFiles] = useState("")
  const { id } = useParams()
  useEffect(() => {
    dispatch(getRoomDetail(id))
  }, [])

  useEffect(() => {
    if (roomDetail._id) {
      setRoom(roomDetail)
    }
  },[roomDetail])

  const submitForm = () => {
    let params = { ...room, seats: files}
    dispatch(updateRoom(params))
    setIsEdit(false)
  }

  const CancelSubmit = () => {
    setIsEdit(false)
    setRoom(roomDetail)
  }

  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      setFiles(JSON.parse(e.target.result));
    }
  }

  return (
    <div className="layout-detail layout-detail__room">
      <div className="room-detail">
        { !isEdit && (
          <div className="room-detail__edit">
            <ButtonEdit onEdit={() => setIsEdit(!isEdit)} />
          </div>
        )}
        <div className="form-control room-detail__item room-detail__name">
          <label>Name</label>
          { isEdit ? (<input value={room.name} type="text" onChange={e => setRoom({ ...room, name: e.target.value })}/>) : (<span>{room.name}</span>)}
        </div>
        <div className="form-control room-detail__item room-detail__type">
          <label>Type</label>
          { isEdit ? (<input value={room.type} type="text" onChange={e => setRoom({ ...room, type: e.target.value })}/>) : (<span>{room.type}</span>)}
        </div>
        <div className="form-control room-detail__item room-detail__theater">
          <label>Theater</label>
          <div className="room-detail__theater__content">
            <img src={`${room.theaters ? room.theaters.url_image : ''}`} alt=""/>
            <div>
              <span>{room.theaters ? room.theaters.name : ''}</span>
              <span>{room.theaters ? room.theaters.address : ''}</span>
            </div>
          </div>
        </div>
        { isEdit && (
          <div className="form-control room-detail__item">
            <label>Seat</label>
            <input type="file" onChange={handleChange} />
          </div>
        ) }
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