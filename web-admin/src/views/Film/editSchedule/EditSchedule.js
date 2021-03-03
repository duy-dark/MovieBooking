import { Input, Select,Button } from 'antd';
import React, { useEffect, useState } from 'react';

const { Option } = Select;



export default function EditSchedule(props){

  const [optionRoom, setOptionRoom] = useState([])

  let roomOfTheater=[];
  let options=[];
  let roomid;
  let filmid;

  function getRoom(value,record){roomid=record.id}
  function handleChange(value,record){
   filmid=record._id
    options=[]
    console.log(`selected ${value}`);
    props.theaters.filter(theater=>theater.name==value?roomOfTheater=[...theater.rooms]:false)
   let optionTemp = roomOfTheater.map(item => ({value: item.name,id:item._id}))
   setOptionRoom(optionTemp)

    }
    const update = ()=>{

    }
  return (
    <div style={{display:"flex"}}>
    <Select defaultValue={props.schedule.Theater} style={{ width: 250 }}onChange={handleChange} >
      {
       props.theaters.map((item,key)=>{
         return(
      <Option index={key} value={item.name} >{`${item.name}`}</Option>
      )
    })
      }
    </Select>
    <Select className="room" defaultValue={props.schedule.Room} onChange={getRoom} style={{ width: 120,marginLeft:20 }} options={optionRoom}   />
     

  <Input class="timestart" value={props.schedule.Time_Start} style={{ width: 120,marginLeft:20 }}   />
  <Input class="timeend"value={props.schedule.Time_End} style={{ width: 120,marginLeft:20 }}/>
  <Input class="date"value={props.schedule.Date} style={{ width: 120,marginLeft:20 }}/>
  <Button style={{marginLeft:20 }} onClick={update()}>UPDATE</Button>
  </div>)
}