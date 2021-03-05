import { useSelector, useDispatch } from "react-redux";
import {  updateFilmSchedules } from "../../../redux/films/actions";
import { Input, Select,Button,TimePicker ,DatePicker} from 'antd';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
const { Option } = Select;


const Time_End_Change = (timestart,longtime)=>{
  timestart=timestart.split(/\D/);
  longtime=longtime.split(/\D/);
var x1=parseInt(timestart[0])*60*60 + parseInt(timestart[1])*60 + parseInt(timestart[2]);
var x2=parseInt(longtime[0])*60*60 + parseInt(longtime[1])*60 + parseInt(longtime[2]);
var s=x1+x2;
var m=Math.floor(s/60); s=s%60;
var h=Math.floor(m/60); m=m%60;
if(h>=24) h-=24;
return h+':'+m+':'+s
} 
export default function EditSchedule(props){

  let room=[];
       props.theaters.filter(item=> item._id==props.schedule.Theaterid?item.rooms.map(roomname=>room.push({value:roomname.name,id:roomname._id})):false)
  const [optionRoom, setOptionRoom] = useState(room)
  const [starttime, setStartTime] = useState(props.schedule.Time_Start)
  const [endtime, setEndTime] = useState(props.schedule.Time_End)
  const [date, setDate] = useState(props.schedule.Date)
  const [theaterid, setTheater] = useState(props.schedule.Theaterid)
  const [roomid, setRoom] = useState(props.schedule.Roomid)
  const [filmid, setFilm] = useState(props.schedule.Filmid)
 
  let _date=props.schedule.Date;
    const hours = Math.floor(props.longtime / 60);  
  const minutes = props.longtime % 60;
  const long_time = hours + ":" + minutes+":00";   
  const dispatch = useDispatch();
  useEffect(()=>{

    // setTheater(props.schedule.Theaterid)
    // setRoom(props.schedule.Roomid)
    // setFilm(props.schedule.Filmid)
   // console.log(starttime,endtime,date,theaterid,roomid,filmid)
  },[starttime,endtime,date,theaterid,roomid,filmid])
  
  let roomOfTheater=[];
  let options=[];
  


  
  
  function getRoom(value,record){
  
  setRoom(record.id)

  }
  function handleChange(value,record){
    // setFilm(record.key)
    setTheater(record.key)
    console.log(record)
    options=[]
   
    props.theaters.filter(theater=>theater.name==value?roomOfTheater=[...theater.rooms]:false)
   let optionTemp = roomOfTheater.map(item => ({value: item.name,id:item._id}))
 
   setOptionRoom(optionTemp)

    }
    const update = ()=>{
   
     const x=Time_End_Change(starttime,long_time);
     const data={"time_start":new Date(starttime+" "+date),
                "time_end":new Date(x+" "+date),
                "film_id":filmid,
                "theater_id":theaterid,
                "room_id":roomid
    }
    
 dispatch(updateFilmSchedules(props.schedule.FilmScheduleid,data))
    
      
    }
  return (
    <div style={{display:"flex"}}>
    <div style={{display:"row"}}>
    <a style={{marginTop:5,marginLeft:10}}>THEATER</a>
    <Select defaultValue={props.schedule.Theater} style={{ width: 250,marginLeft:10 }}onChange={handleChange} >
      {
       props.theaters.map((item,key)=>{
         return(
      <Option key={item._id} value={item.name} >{`${item.name}`}</Option>
      )
    })
      }
    </Select>
    </div>
    <div style={{display:"row"}}>
    <a style={{marginTop:5,marginLeft:10}}>ROOM</a>
    <Select className="room" defaultValue={props.schedule.Room} onChange={getRoom} style={{ width: 120,marginLeft:10 }} options={optionRoom}   />
     </div>
     <div style={{display:"row"}}>
    <a style={{marginTop:5}}>TIMESTART</a>
    <TimePicker  defaultValue={moment(props.schedule.Time_Start, 'HH:mm:ss')}  style={{ width: 120,marginLeft:0 }}   onChange={(time,timeString)=>setStartTime(timeString)} />
    </div>
    <div style={{display:"row"}}>
    <a style={{marginTop:5,marginLeft:20}}>DATE</a>
    {/* <Input    style={{ width: 120,marginLeft:20 }} disabled={true} value={props.schedule.Time_End} /> */}
    <DatePicker  defaultValue={moment(props.schedule.Date)} style={{ width: 140,marginLeft:20 }} onChange={(date,dateString) => setDate(dateString)} />
    </div>
  <Button style={{marginLeft:20,marginTop:21 }} onClick={update}>UPDATE</Button>
  </div>)
}