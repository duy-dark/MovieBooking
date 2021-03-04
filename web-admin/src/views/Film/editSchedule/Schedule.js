import React, { useEffect, useState } from 'react';

import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button ,Select} from 'antd';
import Api from "../../../api/api"
import { useDispatch , useSelector} from "react-redux";

import EditSchedulePopup from './EditSchedulePopup'

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
  let data1 =[]
 props.filmschedule.map((item,index)=>{
    if (item.theater) {
      const key=index;
      const timestart=new Date(item.time_start);
      const timeend=new Date(item.time_end);
      const time_start = timestart.getHours()+":"+timestart.getMinutes();
      const time_end =timeend.getHours()+":"+timeend.getMinutes();
      const room = item.room.name;
      let theater =item.theater.name;
      const id=item._id;
   const date = timestart.getDate()+'-'+timestart.getMonth()+'-'+timestart.getFullYear();
   data1.push({"key":key,"Time_Start":time_start,"Time_End":time_end,"Room":room,"Theater":theater,"Date":date,"id":id})
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
        props.filmschedule.map(itemchange=>itemchange._id==item.id?console.log(item):false)
      
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
      title: 'Time_Start (24h)',
      dataIndex: 'Time_Start',
      width: '20%',
      editable: true,
    },
    {
      title: 'Time_End (24h)',
      dataIndex: 'Time_End',
      width: '20%',
      editable: true,
    },
    {
      title: 'Room',
      dataIndex: 'Room',
      width: '15%',
      editable: true,
    },
    {
      title: 'Date (ddmmyyyy)',
      dataIndex: 'Date',
      width: '30%',
      editable: true,
    },
  
    {
      title: 'Edit',
      dataIndex: 'operation',
      render: (_, record) => {
     
      
        return (
         <EditSchedulePopup schedule={record}/>
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
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
      />
      <Button style={{marginLeft:872,marginTop:10}} onClick={updateScheulde} >SUBMIT</Button>
    </Form>
  );
};