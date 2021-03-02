import { Input, Select,Button } from 'antd';
import React, { useEffect, useState } from 'react';

const { Option } = Select;



export default function EditSchedule(props){
  
  console.log(props.theaters)
  return (
    <div style={{display:"flex"}}>
    <Select defaultValue={props.schedule.Theater} style={{ width: 250 }} >
      {
       props.theaters.map((item,key)=>{
         return(
      <Option index={key} >{`${item.name}`}</Option>)
    })
      }
    </Select>
    <Select defaultValue={props.schedule.Room} style={{ width: 120,marginLeft:20 }} >
    <Option value="jack">Rap 1</Option>
    <Option value="lucy">Rap 2</Option>
  </Select>
  <Input value={props.schedule.Time_Start} style={{ width: 120,marginLeft:20 }}/>
  <Input value={props.schedule.Time_End} style={{ width: 120,marginLeft:20 }}/>
  <Input value={props.schedule.Date} style={{ width: 120,marginLeft:20 }}/>
  <Button style={{marginLeft:20 }}>UPDATE</Button>
  </div>)
}