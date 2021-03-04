
import React, { useEffect, useState } from 'react';

import { Table, Input, InputNumber, Form, TimePicker ,DatePicker, Button ,Select} from 'antd';
import Api from "../../../api/api"

import moment from 'moment';
import EditSchedulePopup from './EditSchedulePopup'
import { useSelector, useDispatch } from "react-redux";
import { getFilmSchedules } from "../../../redux/films/actions";
const { Option } = Select;




const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function ShowSchedule  (props) {
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [editingKey, setEditingKey] = useState('');
  const dispatch = useDispatch();
 
  useEffect(() => {
   
    dispatch((getFilmSchedules(props.idFilm)))
  }, []);
  const filmschedules = useSelector((state) => state.films.filmSchedule);
 
  let data1 =[]

  filmschedules.map((item,index)=>{
    if (item.theater) {
     
      const key=index;
      const timestart=moment(item.time_start);
      const timeend=moment(item.time_end);
      const time_start = timestart.hour()+":"+timestart.minute();
      const time_end =timeend.hour()+":"+timeend.minute();
      const room = item.room.name;
      let theater =item.theater.name;
      const filmid=item.film_id;
      const roomid=item.room_id;
      const theaterid=item.theater_id;
      const filmscheduleid=item._id;
   const date = timestart.format('YYYY-MM-DD')
    
   data1.push({"key":key,"Time_Start":time_start,"Time_End":time_end,"Room":room,"Theater":theater,"Date":date,"Filmid":filmid,
               "Roomid":roomid,"Theaterid":theaterid,"FilmScheduleid":filmscheduleid })
    }
 })

 useEffect(()=>{
    
  setData(data1);
},[])

const updateScheulde =()=>{
   let update=[];
  data.map((item,index)=>{
    if(item.Time_Start!=data1[index].Time_Start||item.Time_End!=data1[index].Time_End||
      item.Room!=data1[index].Room||item.Date!=data1[index].Date){
        filmschedules.map(itemchange=>itemchange._id==item.id?console.log(item):false)
      
      }
  })
 
}

  const isEditing = (record) => record.key === editingKey;


 
  const columns = [
    {
      title: 'Theater',
      dataIndex: 'Theater',
      width: '25%',
     
    },
    {
      title: 'Time_Start ',
      dataIndex: 'Time_Start',
      width: '20%',
      editable:false,
    render: (text, record, index) =>  {return <TimePicker value={moment(text,"HH:mm:ss")}  disabled />},
    },
    {
      title: 'Time_End ',
      dataIndex: 'Time_End',
      width: '20%',
      editable:false,
      render: (text, record, index) =>  {return <TimePicker value={moment(text,"HH:mm:ss")} disabled  />}
    },
    {
      title: 'Room',
      dataIndex: 'Room',
      width: '15%',
      editable: true,
    },
    {
      title: 'Date ',
      dataIndex: 'Date',
      width: '30%',
      render: (text, record, index) =>  {return <DatePicker value={moment(text,"YYYY-MM-DD")}  disabled />},
    },
  
    {
      title: 'Edit',
      dataIndex: 'operation',
      render: (_, record) => {
     
      
        return (
         <EditSchedulePopup schedule={record} theaters={props.theaters} longtime={props.longtime}/>
        )
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'Theater' ? 'bbbb' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data1}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
      />
      <Button style={{marginLeft:872,marginTop:10}} onClick={updateScheulde} >SUBMIT</Button>
    </Form>
  );
};